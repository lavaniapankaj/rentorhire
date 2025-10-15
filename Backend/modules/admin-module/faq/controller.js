const { pool } = require('../../../config/connection');
const path = require('path');

function FaqsApi() {

    /** Add new faq in roh_posts table - Coded by Vishnu Oct 14, 2025 */
    this.AddnewFaq = async (req, res) => {
        try {
        const { title, description, cate_id, add_id, edit_id, active } = req.body;

        /** Validate mandatory fields */
        if (!title || !description) {
            return GLOBAL_ERROR_RESPONSE("Title and Description are required", {}, res);
        }

        /** Insert FAQ record */
        const faqQuery = `
            INSERT INTO roh_faqs 
            (title, description, cate_id, add_id, edit_id, active, add_date, edit_date)
            VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;

        const faqValues = [
            title,
            description,
            cate_id || null,
            add_id || null,
            edit_id || null,
            active || 1,
        ];

        pool.execute(faqQuery, faqValues, (err, result) => {
            if (err) {
            console.error("Error inserting FAQ:", err);
            return GLOBAL_ERROR_RESPONSE("Please check your input values", err, res);
            }

            return GLOBAL_SUCCESS_RESPONSE("FAQ added successfully", { id: result.insertId }, res);
        });

        } catch (err) {
        console.error("Unexpected error:", err);
        return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
    };

    /** List All FAQs - Coded by Vishnu Oct 14, 2025 */
   this.ListAllFaqs = async (req, res) => {
        try {
            /** Extract query params */
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;

            const searchTitle = (req.query.title || "").trim();
            const searchStatus = (req.query.status || "").trim();
            const cate_id = req.query.cate_id ? parseInt(req.query.cate_id) : null;

            /** Build dynamic WHERE conditions */
            let whereClauses = [];
            let params = [];

            if (searchTitle) {
            whereClauses.push(`f.title LIKE ?`);
            params.push(`%${searchTitle}%`);
            }

            if (searchStatus) {
            whereClauses.push(`f.active = ?`);
            params.push(searchStatus === "active" ? 1 : 0);
            }

            if (cate_id && !isNaN(cate_id)) {
            whereClauses.push(`f.cate_id = ?`);
            params.push(cate_id);
            }

            const whereSQL = whereClauses.length
            ? `WHERE ${whereClauses.join(" AND ")}`
            : "";

            /** Main query with category name */
            const listQuery = `
            SELECT 
                f.id,
                f.title,
                f.description,
                f.active,
                f.add_date,
                f.edit_date,
                f.cate_id,
                c.name AS category_name
            FROM roh_faqs f
            LEFT JOIN roh_categories c ON f.cate_id = c.id
            ${whereSQL}
            ORDER BY f.add_date DESC
            LIMIT ? OFFSET ?
            `;

            params.push(limit, offset);

            /** Count query for pagination */
            const countQuery = `
            SELECT COUNT(*) AS total
            FROM roh_faqs f
            ${whereSQL}
            `;

            /** Execute queries */
            const [rows] = await pool.promise().query(listQuery, params);
            const [countRows] = await pool.promise().query(
            countQuery,
            params.slice(0, -2)
            );

            const totalFaqs = countRows[0].total;
            const totalPages = Math.ceil(totalFaqs / limit);

            /** Format results for frontend */
            const formattedResults = rows.map((faq) => ({
            id: faq.id,
            title: faq.title,
            description: faq.description,
            category_name: faq.category_name || "-",
            active: faq.active === 1 ? "Active" : "Inactive",
            add_date: faq.add_date,
            edit_date: faq.edit_date,
            }));

            return res.status(200).json({
            status: true,
            message: "FAQs fetched successfully",
            data: formattedResults,
            pagination: {
                currentPage: page,
                totalPages,
                totalFaqs,
                limit,
            },
            });
        } catch (err) {
            console.error("Unexpected error in ListAllFaqs:", err);
            return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
   };

    /** View single FAQ - Optimized - Coded by Vishnu Oct 14, 2025 */
    this.ViewSingleFaq = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
        return GLOBAL_ERROR_RESPONSE("FAQ ID is required", null, res);
        }

        /** ⚡ Fetch only required fields */
        const viewQuery = `
        SELECT 
            f.id,
            f.title,
            f.description,
            f.cate_id,
            f.active,
            f.add_date,
            c.name AS category_name
        FROM roh_faqs f
        LEFT JOIN roh_categories c ON f.cate_id = c.id
        WHERE f.id = ?
        LIMIT 1
        `;

        pool.execute(viewQuery, [id], (err, results) => {
        if (err) {
            console.error("Error fetching FAQ:", err);
            return GLOBAL_ERROR_RESPONSE("Error fetching FAQ details", err, res);
        }

        if (results.length === 0) {
            return GLOBAL_ERROR_RESPONSE("FAQ not found", null, res);
        }

        const faq = results[0];
        const formattedFaq = {
            id: faq.id,
            title: faq.title,
            description: faq.description,
            cate_id: faq.cate_id,
            category_name: faq.category_name || null,
            active: Number(faq.active),
            add_date: faq.add_date,
        };


        return GLOBAL_SUCCESS_RESPONSE("FAQ details fetched successfully", formattedFaq, res);
        });

    } catch (err) {
        console.error("Unexpected error:", err);
        return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
    }
    };


    /** Update single FAQ - Coded by Vishnu Oct 14, 2025 */
    this.UpdateSingleFaq = async (req, res) => {
    try {
        const { id, title, description, cate_id, active, edit_id } = req.body;

        if (!id) {
        return GLOBAL_ERROR_RESPONSE("FAQ ID is required", null, res);
        }

        /** Build update query */
        const updateQuery = `
        UPDATE roh_faqs
        SET 
            title = ?, 
            description = ?, 
            cate_id = ?, 
            active = ?, 
            edit_id = ?, 
            edit_date = NOW()
        WHERE id = ?
        `;

        const updateValues = [
        title || null,
        description || null,
        cate_id || null,
        active !== undefined ? active : 1,
        edit_id || null,
        id,
        ];

        pool.execute(updateQuery, updateValues, (err, result) => {
        if (err) {
            console.error("Error updating FAQ:", err);
            return GLOBAL_ERROR_RESPONSE("Error updating FAQ", err, res);
        }

        if (result.affectedRows === 0) {
            return GLOBAL_ERROR_RESPONSE("FAQ not found or no changes made", null, res);
        }

        return GLOBAL_SUCCESS_RESPONSE("FAQ updated successfully", {}, res);
        });
    } catch (err) {
        console.error("Unexpected error:", err);
        return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
    }
    };



}

module.exports = new FaqsApi();
