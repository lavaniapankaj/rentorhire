// controller.js
const pool = require('../../../config/connection');  /** Correct import of the promisePool */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer');
const saltRounds = 10;


function authApi() {

    /** Function method to register the user Coded by Raj July 08 2025 */
    this.userRegister = async (req, res) => {
      try {
        const { userName, firstName, lastName, email, phone, password } = req.body;
    
        const active = 0; // Initial status 0
        const user_role_id = 3;
    
        let passwordHash;
        try {
          passwordHash = await bcrypt.hash(password, saltRounds);
        } catch (err) {
          return GLOBAL_ERROR_RESPONSE("Error hashing password.", err, res);
        }
    
        // Generate OTP (6 digits)
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
        const sql = `
          INSERT INTO roh_users
            (user_name, first_name, last_name, email, phone_number, password_hash, user_role_id, active, authorize_code, verified)
          VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
    
        const params = [
          userName,
          firstName,
          lastName,
          email,
          phone,
          passwordHash,
          user_role_id,
          active,
          otp, // Save OTP in the 'authorize_code' field
          0, // Set 'verified' status to 0
        ];
    
        const [result] = await pool.query(sql, params);
    
        if (result.affectedRows === 1) {
          /** Send OTP Email using Gmail SMTP */
          try {
            const transporter = nodemailer.createTransport({
              host: process.env.SMTP_HOST,
              port: Number(process.env.SMTP_PORT),
              secure: true, // SSL (465)
              auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
              },
            });
    
            const html = `
              <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color:#0073aa;">Hello ${firstName || "User"},</h2>
                <p>Your One-Time Password (OTP) for verifying your account on <strong>FindOnRent</strong> is:</p>
                <h1 style="letter-spacing:3px;color:#0073aa;">${otp}</h1>
                <p>This code will expire in 10 minutes.</p>
                <br/>
                <hr/>
                <p style="font-size:13px;color:#555;">
                  Regards,<br/>
                  <strong>FindOnRent Team</strong><br/>
                  <a href="https://findonrent.com" style="color:#0073aa;">https://findonrent.com</a>
                </p>
              </div>
            `;
    
            await transporter.sendMail({
              from: process.env.SMTP_FROM || `"FindOnRent" <${process.env.SMTP_USER}>`,
              to: email,
              subject: "Your OTP Code - FindOnRent",
              html,
            });
    
            console.log(`OTP Email sent successfully to ${email}`);
          } catch (emailErr) {
            console.error("Error sending OTP email:", emailErr.message);
          }
    
          /** Response back to frontend */
          return GLOBAL_SUCCESS_RESPONSE(
            "User registered successfully. OTP sent.",
            {},
            res
          );
        } else {
          return GLOBAL_ERROR_RESPONSE("Failed to register user.", {}, res);
        }
      } catch (err) {
        let message = "Internal server error";
        if (err.code === "ER_DUP_ENTRY") {
          message = "Duplicate User Name Or Email.";
        }
        return GLOBAL_ERROR_RESPONSE(message, err, res);
      }
    };

    /** Function method to register the service provider Coded by Raj July 08 2025 */
    this.serviceProviderRegister = async (req, res) => {
        try {
            const { userName, firstName, lastName, email, phone, password, address_1, landmark, city, state, pincode } = req.body;
            
            const active = 1;
            const user_role_id = 2; /** Need to use the role id for the service provider. */
            const profile_picture_url = "";

            let passwordHash;
            try {
                passwordHash = await bcrypt.hash(password, saltRounds);
            } catch (err) {
                return GLOBAL_ERROR_RESPONSE("Error hashing password.", err, res);
            }

            /** SQL query to insert data into the users table */
            const sql = `INSERT INTO roh_users (user_name, first_name, last_name, email, phone_number, password_hash, user_role_id, profile_picture_url, active, address_1, landmark, state, city, pincode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            /* Execute the query using the pool */
            const [result] = await pool.query(sql, [ userName, firstName, lastName, email, phone, passwordHash, user_role_id, profile_picture_url, active, address_1, landmark, city, state, pincode]);

            if (result.affectedRows === 1) {
                return GLOBAL_SUCCESS_RESPONSE(
                    "Service provider registered successfully.",
                    {},
                    res
                );
            } else {
                return GLOBAL_ERROR_RESPONSE("Failed to register service provider.", {}, res);
            }

        } catch (err) {
            let message = "Internal server error";
            /** MySQL errors like duplicate entries for user */
            if (err.code === 'ER_DUP_ENTRY') {
                message = "Duplicate User Name Or Email.";
            }
            return GLOBAL_ERROR_RESPONSE(message, err, res);
        }
    };

    /** Function method to login the user - Coded by Raj July 09 2025 */
    this.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        /** Step 1: Check if email exists */
        const [emailRows] = await pool.query(
        `SELECT user_id, email, user_name, first_name, last_name, password_hash, user_role_id, active, authorize_code, verified, is_service_provider, phone_number 
        FROM roh_users WHERE email = ?`,
        [email]
        );

        if (emailRows.length === 0) {
        return res.status(401).json({ message: "Invalid email address." });
        }

        const user = emailRows[0];

        /** Step 2: Check password */
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
        return res.status(401).json({ message: "Invalid password." });
        }

        /** Step 3: OTP check */
        if (
        (!user.active || user.active === 0) ||
        user.verified === 0 ||
        (user.authorize_code !== null && user.verified !== 1)
        ) {
        let otp = user.authorize_code;

        /** If OTP missing/null, generate & update */
        if (!otp) {
            otp = Math.floor(100000 + Math.random() * 900000).toString();
            await pool.query(
            `UPDATE roh_users SET authorize_code = ? WHERE user_id = ?`,
            [otp, user.user_id]
            );
        }

        /** Send OTP Email */
        try {
            const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            });

            const html = `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color:#0073aa;">Hello ${user.first_name || "User"},</h2>
                <p>Your One-Time Password (OTP) to verify your account on <strong>FindOnRent</strong> is:</p>
                <h1 style="letter-spacing:3px;color:#0073aa;">${otp}</h1>
                <p>This code will expire in 10 minutes.</p>
                <br/>
                <hr/>
                <p style="font-size:13px;color:#555;">
                Regards,<br/>
                <strong>FindOnRent Team</strong><br/>
                <a href="https://findonrent.com" style="color:#0073aa;">https://findonrent.com</a>
                </p>
            </div>
            `;

            await transporter.sendMail({
            from: process.env.SMTP_FROM || `"FindOnRent" <${process.env.SMTP_USER}>`,
            to: user.email,
            subject: "Your OTP Code - FindOnRent (Login Verification)",
            html,
            });

            console.log(`Login OTP Email sent successfully to ${user.email}`);
        } catch (emailErr) {
            console.error("Error sending login OTP email:", emailErr.message);
        }

        /** Return response to frontend */
        return res.status(200).json({
            message: "OTP verification required. Email sent successfully.",
            otpRequired: true,
            userId: user.user_id,
            email: user.email,
            // otp,
        });
        }

        /** Step 4: Normal login (verified user) */
        const token = jwt.sign(
        { id: user.user_id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
        );

        return res.status(200).json({
        message: "Login successful.",
        token,
        user: {
            id: user.user_id,
            userName: user.user_name,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            phoneNumber: user.phone_number,
            role_id: user.user_role_id,
            is_service_provider: user.is_service_provider,
        },
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal Server error" });
    }
    };

    /** Function method to login the admin users - Coded by Raj July 10 2025 */
    this.adminUserLogin = async (req, res) => {
        try {
            const {email, password} = req.body;

            /* Query the user from 'roh_users' by email */
            const [rows] = await pool.query('SELECT user_id, email, password_hash, user_role_id, user_name, first_name, last_name FROM roh_users WHERE email = ?', [email]);

            if (rows.length == 0) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            const user = rows[0];

            /* Compare the password with the stored hash */
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            /* Generate JWT */
            const token = jwt.sign(
                { id: user.user_id, email: user.email},
                // JWT_SECRET,
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );

            /* Respond with success */
            return res.status(200).json({
                message: 'Login successful.',
                token,
                user: {
                    id: user.user_id,
                    userName: user.user_name,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    role_id: user.user_role_id
                }
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server error' });
        }
    };

    /** Function method to check availability of user - Coded by Vishnu Aug 11 2025 */
    this.checkAvailability = async (req, res) => {
    try {
        const { userName, email } = req.body || {};
        const taken = { userName: false, email: false, phone: false };

        // Build dynamic WHEREs only for provided fields
        const checks = [];
        const params = [];
        if (userName) { checks.push("user_name = ?"); params.push(userName); }
        if (email)    { checks.push("email = ?");     params.push(email); }

        if (!checks.length) {
        return GLOBAL_ERROR_RESPONSE("No fields to check.", {}, res);
        }

        // Single query for speed using OR, then inspect rows
        const sql = `
        SELECT user_name, email
        FROM roh_users
        WHERE ${checks.join(" OR ")}
        LIMIT 50
        `;
        const [rows] = await pool.query(sql, params);

        if (rows?.length) {
        for (const r of rows) {
            if (userName && r.user_name === userName) taken.userName = true;
            if (email && r.email === email) taken.email = true;
        }
        }

        return GLOBAL_SUCCESS_RESPONSE("Availability fetched.", { taken }, res);
    } catch (err) {
        return GLOBAL_ERROR_RESPONSE("Failed to check availability.", err, res);
    }
    };

    /** OTP Verification Endpoint - Coded by Vishnu Aug 12 2025 */
    this.signUpverifyOTP = async (req, res) => {
        try {
            const { userName, otp } = req.body;

            const sql = "SELECT authorize_code, active FROM roh_users WHERE user_name = ?";
            const [rows] = await pool.query(sql, [userName]);

            if (rows.length === 0) {
                return GLOBAL_ERROR_RESPONSE("User not found", {}, res);
            }

            const user = rows[0];

            if (user.authorize_code !== otp) {
                return GLOBAL_ERROR_RESPONSE("Invalid OTP", {}, res);
            }

            const updateSql = "UPDATE roh_users SET active = 1, authorize_code = NULL, verified = 1 WHERE user_name = ?";
            await pool.query(updateSql, [userName]);

            return GLOBAL_SUCCESS_RESPONSE("OTP verified successfully. Account activated.", {}, res);
        } catch (err) {
            return GLOBAL_ERROR_RESPONSE("OTP verification failed", err, res);
        }
    };

    /** Resend OTP Endpoint - Coded by Vishnu Aug 12 2025 */
    this.resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        // ✅ Validate email format
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return GLOBAL_ERROR_RESPONSE("Valid email is required", {}, res);
        }

        /** Check if user exists */
        const sql = "SELECT user_id, first_name FROM roh_users WHERE email = ? LIMIT 1";
        const [rows] = await pool.query(sql, [email]);

        if (rows.length === 0) {
        return GLOBAL_ERROR_RESPONSE("User not found", {}, res);
        }

        const { first_name } = rows[0];

        /** Generate new OTP */
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        /** Update OTP in database */
        const updateSql = "UPDATE roh_users SET authorize_code = ? WHERE email = ?";
        await pool.query(updateSql, [otp, email]);

        /** Send OTP Email via Gmail SMTP */
        try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true, // SSL (465)
            auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
            },
        });

        const html = `
            <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color:#0073aa;">Hello ${first_name || "User"},</h2>
            <p>Your new One-Time Password (OTP) for verifying your account on <strong>FindOnRent</strong> is:</p>
            <h1 style="letter-spacing:3px;color:#0073aa;">${otp}</h1>
            <p>This code will expire in 10 minutes.</p>
            <br/>
            <hr/>
            <p style="font-size:13px;color:#555;">
                Regards,<br/>
                <strong>FindOnRent Team</strong><br/>
                <a href="https://findonrent.com" style="color:#0073aa;">https://findonrent.com</a>
            </p>
            </div>
        `;

        await transporter.sendMail({
            from: process.env.SMTP_FROM || `"FindOnRent" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Your New OTP Code - FindOnRent",
            html,
        });

        console.log(`Resend OTP Email sent successfully to ${email}`);
        } catch (emailErr) {
        console.error("Error sending Resend OTP email:", emailErr.message);
        }

        /** Respond back to frontend */
        return GLOBAL_SUCCESS_RESPONSE("New OTP has been sent successfully.", {}, res);
    } catch (err) {
        return GLOBAL_ERROR_RESPONSE("Failed to resend OTP", err, res);
    }
    };


    /** signInverifyOtp user login - Coded by Vishnu Aug 13 2025 */
    this.signInverifyOtp = async (req, res) => {
        try {
            const { userId, otp } = req.body;

            const [rows] = await pool.query(`
                SELECT user_id, authorize_code FROM roh_users
                WHERE user_id = ? AND verified = 0 AND (active = 0 OR active IS NULL)
            `, [userId]);

            if (rows.length === 0) {
                return res.status(400).json({ message: 'Invalid user or already verified.' });
            }

            const user = rows[0];

            if (user.authorize_code !== otp) {
                return res.status(400).json({ message: 'Invalid OTP' });
            }

            await pool.query(`
                UPDATE roh_users
                SET authorize_code = NULL, active = 1, verified = 1
                WHERE user_id = ?
            `, [userId]);

            return res.status(200).json({
                message: 'OTP verified successfully. Please login again.'
            });
        } catch (error) {
            console.error('OTP verification error:', error);
            return res.status(500).json({ message: 'Internal Server error' });
        }
    };

    /** Get all recent 8 Active products on home page - Coded by Vishnu Aug 30 2025 */
    this.getRecentActiveProducts = async (req, res) => {
        try {
            /** Step 1: Fetch product list */
            const [products] = await pool.query(
            `SELECT 
                d.id,
                d.service_provider_id,
                d.item_name,
                d.category_id,
                d.image_ids,
                d.item_status,
                d.add_date,
                d.availability_status,
                d.price_per_day,
                a.registration_number,
                a.rental_period
            FROM roh_vehicle_details d
            LEFT JOIN roh_vehicle_attributes a 
                ON d.id = a.vehicle_id
            WHERE d.item_status = 1 and d.admin_item_status = 1
            ORDER BY d.add_date DESC, d.id DESC
            LIMIT 8`
            );

            if (!products || products.length === 0) {
            return res.status(200).json([]);
            }

            /** Step 2: For each product, parse image_ids and fetch media data */
            const enhancedProducts = await Promise.all(
            products.map(async (product) => {
                let imageIds = [];

                try {
                imageIds = JSON.parse(product.image_ids || "[]");
                if (!Array.isArray(imageIds)) imageIds = [];
                } catch (e) {
                console.warn("Invalid JSON in image_ids for product id:", product.id);
                }

                let mediaGallery = [];
                if (imageIds.length > 0) {
                const placeholders = imageIds.map(() => "?").join(",");
                const [mediaResult] = await pool.query(
                    `SELECT id, file_name, file_path 
                    FROM roh_media_gallery 
                    WHERE id IN (${placeholders})`,
                    imageIds
                );
                mediaGallery = mediaResult;
                }

                return {
                ...product,
                media_gallery: mediaGallery,
                };
            })
            );

            /** Step 3: Return result */
            return res.status(200).json(enhancedProducts);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    /** Get all Active vehicles -- card on vehicles/cars page - Coded by Vishnu Aug 29 2025 */
    this.getActivevehiclesCars = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 4;
        const offset = (page - 1) * limit;

        const qRaw = (req.query.q || "").trim();
        const qLike = qRaw ? `%${qRaw}%` : null;

        const locRaw = (req.query.location || "").trim();
        const locTokens = locRaw ? locRaw.split(/\s+/).filter(Boolean) : [];

        const userCity = (req.query.user_city || "").trim(); /** user city from query */

        let whereClauses = [`d.item_status = 1 AND d.admin_item_status = 1`];
        let params = [];

        /** only cars (sub_cat_id = 2) */
        whereClauses.push(`d.sub_cat_id = ?`);
        params.push(2);

        if (qLike) {
        whereClauses.push(`d.item_name LIKE ?`);
        params.push(qLike);
        }

        if (locTokens.length) {
        const groups = [];
        for (const tok of locTokens) {
            const like = `%${tok}%`;
            if (/^\d{4,6}$/.test(tok)) {
            groups.push(`(a.pincode LIKE ?)`);
            params.push(like);
            } else {
            groups.push(`(
                a.address_1 LIKE ? OR 
                a.landmark LIKE ? OR 
                a.item_state LIKE ? OR 
                a.city LIKE ?
            )`);
            params.push(like, like, like, like);
            }
        }
        whereClauses.push(`(${groups.join(" AND ")})`);
        }

        const whereSQL = `WHERE ${whereClauses.join(" AND ")}`;

        // ---- FETCH PRODUCTS ----
        const [products] = await pool.query(
        `
        SELECT 
            d.id,
            d.service_provider_id,
            d.item_name,
            d.category_id,
            d.sub_cat_id,
            d.image_ids,
            d.item_status,
            d.add_date,
            d.availability_status,
            d.price_per_day,
            a.registration_number,
            a.rental_period,
            a.address_1,
            a.landmark,
            a.item_state,
            a.city,
            a.pincode
        FROM roh_vehicle_details d
        LEFT JOIN roh_vehicle_attributes a ON d.id = a.vehicle_id
        ${whereSQL}
        ORDER BY 
            CASE WHEN a.city = ? THEN 0 ELSE 1 END, 
            d.add_date DESC, 
            d.id DESC
        LIMIT ? OFFSET ?
        `,
        [...params, userCity, limit, offset] /** add userCity in params */
        );

        if (!products || products.length === 0) {
        return res.status(200).json({ products: [], total: 0 });
        }

        // ---- TOTAL COUNT ----
        const [[{ total }]] = await pool.query(
        `
        SELECT COUNT(*) AS total 
        FROM roh_vehicle_details d
        LEFT JOIN roh_vehicle_attributes a ON d.id = a.vehicle_id
        ${whereSQL}
        `,
        params
        );

        // ---- ENHANCE: media_gallery ----
        const enhancedProducts = await Promise.all(
        products.map(async (product) => {
            let imageIds = [];
            try {
            imageIds = JSON.parse(product.image_ids || "[]");
            } catch {
            console.warn("Invalid JSON for product id:", product.id);
            }

            let mediaGallery = [];
            if (imageIds.length > 0) {
            const placeholders = imageIds.map(() => "?").join(",");
            const [mediaResult] = await pool.query(
                `SELECT id, file_name, file_path 
                FROM roh_media_gallery 
                WHERE id IN (${placeholders})`,
                imageIds
            );
            mediaGallery = mediaResult;
            }

            return { ...product, media_gallery: mediaGallery };
        })
        );

        return res.status(200).json({ products: enhancedProducts, total });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
    };


    /** Get all Active vehicles -- card on vehicles/bikes page - Coded by Vishnu Oct 01 2025 */
   this.getActivevehiclesBikes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 4;
        const offset = (page - 1) * limit;

        const qRaw = (req.query.q || "").trim();
        const qLike = qRaw ? `%${qRaw}%` : null;

        const locRaw = (req.query.location || "").trim();
        const locTokens = locRaw ? locRaw.split(/\s+/).filter(Boolean) : [];

        const userCity = (req.query.user_city || "").trim(); /** user city from query */

        let whereClauses = [`d.item_status = 1 AND d.admin_item_status = 1`];
        let params = [];

        // only bikes (sub_cat_id = 3)
        whereClauses.push(`d.sub_cat_id = ?`);
        params.push(3);

        if (qLike) {
        whereClauses.push(`d.item_name LIKE ?`);
        params.push(qLike);
        }

        if (locTokens.length) {
        const groups = [];
        for (const tok of locTokens) {
            const like = `%${tok}%`;
            if (/^\d{4,6}$/.test(tok)) {
            groups.push(`(a.pincode LIKE ?)`);
            params.push(like);
            } else {
            groups.push(`(
                a.address_1 LIKE ? OR 
                a.landmark LIKE ? OR 
                a.item_state LIKE ? OR 
                a.city LIKE ?
            )`);
            params.push(like, like, like, like);
            }
        }
        whereClauses.push(`(${groups.join(" AND ")})`);
        }

        const whereSQL = `WHERE ${whereClauses.join(" AND ")}`;

        // ---- FETCH PRODUCTS ----
        const [products] = await pool.query(
        `
        SELECT 
            d.id,
            d.service_provider_id,
            d.item_name,
            d.category_id,
            d.sub_cat_id,
            d.image_ids,
            d.item_status,
            d.add_date,
            d.availability_status,
            d.price_per_day,
            a.registration_number,
            a.rental_period,
            a.address_1,
            a.landmark,
            a.item_state,
            a.city,
            a.pincode
        FROM roh_vehicle_details d
        LEFT JOIN roh_vehicle_attributes a ON d.id = a.vehicle_id
        ${whereSQL}
        ORDER BY 
            CASE WHEN a.city = ? THEN 0 ELSE 1 END, 
            d.add_date DESC, 
            d.id DESC
        LIMIT ? OFFSET ?
        `,
        [...params, userCity, limit, offset] /** add userCity in params */
        );

        if (!products || products.length === 0) {
        return res.status(200).json({ products: [], total: 0 });
        }

        // ---- TOTAL COUNT ----
        const [[{ total }]] = await pool.query(
        `
        SELECT COUNT(*) AS total 
        FROM roh_vehicle_details d
        LEFT JOIN roh_vehicle_attributes a ON d.id = a.vehicle_id
        ${whereSQL}
        `,
        params
        );

        // ---- ENHANCE: media_gallery ----
        const enhancedProducts = await Promise.all(
        products.map(async (product) => {
            let imageIds = [];
            try {
            imageIds = JSON.parse(product.image_ids || "[]");
            } catch {
            console.warn("Invalid JSON for product id:", product.id);
            }

            let mediaGallery = [];
            if (imageIds.length > 0) {
            const placeholders = imageIds.map(() => "?").join(",");
            const [mediaResult] = await pool.query(
                `SELECT id, file_name, file_path 
                FROM roh_media_gallery 
                WHERE id IN (${placeholders})`,
                imageIds
            );
            mediaGallery = mediaResult;
            }

            return { ...product, media_gallery: mediaGallery };
        })
        );

        return res.status(200).json({ products: enhancedProducts, total });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
    };

    /** Api to view single items - Coded by Vishnu August 30 2025 */
    this.getsingleListedItemsVie = async (req, res) => {
        try {
            const { id } = req.body;

            /** Step 1: Fetch vehicle details + attributes + user info */
            const [result] = await pool.query(
                `SELECT 
                    d.*, 
                    a.*,                     
                    u.first_name, 
                    u.last_name
                FROM roh_vehicle_details d
                LEFT JOIN roh_vehicle_attributes a 
                    ON d.id = a.vehicle_id
                LEFT JOIN roh_users u 
                    ON d.service_provider_id = u.user_id
                WHERE d.id = ?`,
                [id]
            );

            if (!result || result.length === 0) {
                return res.status(404).json({ message: "Item not found" });
            }

            const vehicle = result[0];

            /** Step 2: Parse image_ids */
            let imageIds = [];
            try {
                imageIds = JSON.parse(vehicle.image_ids || "[]");
                if (!Array.isArray(imageIds)) imageIds = [];
            } catch (e) {
                console.warn("Invalid JSON in image_ids for vehicle id:", vehicle.id);
            }

            /** Step 3: Fetch media data */
            let mediaGallery = [];
            if (imageIds.length > 0) {
                const placeholders = imageIds.map(() => "?").join(",");
                const [mediaResult] = await pool.query(
                    `SELECT id, file_name, file_path 
                    FROM roh_media_gallery 
                    WHERE id IN (${placeholders})`,
                    imageIds
                );
                mediaGallery = mediaResult;
            }

            /** Step 4: Return merged response */
            return res.status(200).json({
                ...vehicle,
                media_gallery: mediaGallery
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    /** Api to get single category recent 4 post/blogs - Coded by Vishnu Oct 13 2025 */
    this.getSingleCategoryRecentPosts = async (req, res) => {
    try {
        const { category_id } = req.body;

        if (!category_id) {
        return res.status(400).json({
            status: false,
            message: "category_id is required",
        });
        }

        const limit = 4; /** show 4 recent posts by default */

        const query = `
        SELECT 
            p.id,
            p.post_title,
            p.post_slug,
            p.post_excerpt,
            p.post_status,
            p.add_date,
            m.file_name AS post_image_name,
            m.file_path AS post_image_path,
            c.name AS category_name
        FROM roh_posts p
        LEFT JOIN roh_media_gallery m ON p.post_img_id = m.id
        LEFT JOIN roh_categories c ON p.cate_id = c.id
        WHERE p.cate_id = ? AND p.post_status = 'published'
        ORDER BY p.add_date DESC
        LIMIT ?
        `;

        const [rows] = await pool.query(query, [category_id, limit]);

        if (!rows.length) {
        return res.status(200).json({
            status: true,
            message: "No posts found for this category.",
            data: [],
        });
        }

        const formattedResults = rows.map((post) => ({
        id: post.id,
        post_title: post.post_title,
        post_slug: post.post_slug,
        post_excerpt: post.post_excerpt,
        post_status: post.post_status,
        add_date: post.add_date,
        category_name: post.category_name || "-",
        post_image_url: post.post_image_name
            ? post.post_image_path + post.post_image_name
            : null,
        }));

        return res.status(200).json({
        status: true,
        message: "Recent posts fetched successfully.",
        data: formattedResults,
        });
    } catch (error) {
        console.error("Error in getSingleCategoryRecentPosts:", error);
        return res.status(500).json({
        status: false,
        message: "Internal server error",
        error: error.message,
        });
    }
    };

    /** Api to get single catregory recent 3 FAQs - Coded by Vishnu Oct 14 2025 */
    this.getSingleCategoryRecentFaqs = async (req, res) => {
    try {
        const { category_id } = req.body;

        if (!category_id) {
        return res.status(400).json({
            status: false,
            message: "category_id is required",
        });
        }

        const limit = 3; 

        const query = `
        SELECT 
            f.id,
            f.title,
            f.description,
            f.cate_id,
            c.name AS category_name,
            f.add_date
        FROM roh_faqs f
        LEFT JOIN roh_categories c ON f.cate_id = c.id
        WHERE f.cate_id = ? AND f.active = 1
        ORDER BY f.add_date DESC
        LIMIT ?
        `;

        const [rows] = await pool.query(query, [category_id, limit]);

        if (!rows.length) {
        return res.status(200).json({
            status: true,
            message: "No FAQs found for this category",
            data: [],
        });
        }

        // Format the response
        const formattedFaqs = rows.map((faq) => ({
        id: faq.id,
        title: faq.title,
        description: faq.description,
        category_name: faq.category_name || null,
        add_date: faq.add_date,
        }));

        return res.status(200).json({
        status: true,
        message: "FAQs fetched successfully",
        data: formattedFaqs,
        });
    } catch (error) {
        console.error("Error in getSingleCategoryRecentFaqs:", error);
        return res.status(500).json({
        status: false,
        message: "Internal server error",
        error: error.message,
        });
    }
    };


    /** Api Get service provider details this APIs useing on the single products contact button - Coded by Vishnu August 31 2025 */
    this.getServiceProviderDetails = async (req, res) => {
        try {
            const { service_provider_id } = req.body;

            /**Fetch only required fields */
            const [result] = await pool.query(
                `SELECT first_name, last_name, phone_number 
                FROM roh_users 
                WHERE user_id = ?`,
                [service_provider_id]
            );

            if (!result || result.length === 0) {
                return res.status(404).json({ message: "Service provider not found" });
            }

            return res.status(200).json(result[0]);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
}
module.exports = new authApi();
