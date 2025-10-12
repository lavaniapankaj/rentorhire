const { pool } = require('../../../config/connection');
const path = require('path');

function PostsApi() {

    /** Add new post in roh_posts table - Coded by Vishnu Oct 11, 2025 */
    this.AddnewPost = async (req, res) => {
    try {
        const { 
        post_title, 
        post_slug, 
        description, 
        post_excerpt, 
        cate_id,
        post_status 
        } = req.body;

        let postImageName = null;
        let postImagePath = null;
        let postImageType = null;

        if (req.body.post_picture_url) {
        const fileExtension = path.extname(req.body.post_picture_url);
        postImageName = req.body.post_picture_url;
        postImagePath = `/uploads/media/post/`;
        postImageType = fileExtension.slice(1);
        }

        /** ✅ If image uploaded, insert into roh_media_gallery first */
        if (postImageName) {
        const mediaQuery = `
            INSERT INTO roh_media_gallery (file_name, file_path, file_type, active)
            VALUES (?, ?, ?, ?)
        `;
        const mediaValues = [postImageName, postImagePath, postImageType, 1];

        pool.execute(mediaQuery, mediaValues, (err, mediaResult) => {
            if (err) {
            console.error('Error inserting into media gallery:', err);
            return GLOBAL_ERROR_RESPONSE("Error saving image to media gallery", err, res);
            }

            const postQuery = `
            INSERT INTO roh_posts 
            (post_title, post_slug, description, post_excerpt, post_status, post_img_id, cate_id, add_date, edit_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
            `;
            const postValues = [
            post_title,
            post_slug,
            description,
            post_excerpt,
            post_status || 'draft',
            mediaResult.insertId,
            cate_id || null
            ];

            pool.execute(postQuery, postValues, (err, result) => {
            if (err) {
                console.error('Error inserting post:', err);
                return GLOBAL_ERROR_RESPONSE("Please check your input values", err, res);
            }

            return GLOBAL_SUCCESS_RESPONSE("Post added successfully", { id: result.insertId }, res);
            });
        });
        } else {
        /** ✅ If no image uploaded */
        const postQuery = `
            INSERT INTO roh_posts 
            (post_title, post_slug, description, post_excerpt, post_status, post_img_id, cate_id, add_date, edit_date)
            VALUES (?, ?, ?, ?, ?, NULL, ?, NOW(), NOW())
        `;
        const postValues = [
            post_title,
            post_slug,
            description,
            post_excerpt,
            post_status || 'draft',
            cate_id || null
        ];

        pool.execute(postQuery, postValues, (err, result) => {
            if (err) {
            console.error('Error inserting post:', err);
            return GLOBAL_ERROR_RESPONSE("Please check your input values", err, res);
            }

            return GLOBAL_SUCCESS_RESPONSE("Post added successfully", { id: result.insertId }, res);
        });
        }

    } catch (err) {
        console.error('Unexpected error:', err);
        return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
    }
    };

    /** List all posts with pagination and search - Coded by Vishnu Oct 11, 2025 */
    this.ListAllPosts = async (req, res) => {
        try {
            // Extract query params
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;

            const searchTitle = (req.query.title || "").trim();
            const searchStatus = (req.query.status || "").trim();

            // Build dynamic WHERE conditions
            let whereClauses = [];
            let params = [];

            if (searchTitle) {
            whereClauses.push(`p.post_title LIKE ?`);
            params.push(`%${searchTitle}%`);
            }

            if (searchStatus) {
            whereClauses.push(`p.post_status = ?`);
            params.push(searchStatus);
            }

            const whereSQL = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : "";

            // Main query
            const listQuery = `
            SELECT 
                p.id, p.post_title, p.post_slug, p.description, p.post_excerpt, 
                p.post_status, p.add_date, p.edit_date, p.cate_id,
                m.file_name AS post_image_name, m.file_path AS post_image_path
            FROM roh_posts p
            LEFT JOIN roh_media_gallery m ON p.post_img_id = m.id
            ${whereSQL}
            ORDER BY p.add_date DESC
            LIMIT ? OFFSET ?
            `;

            params.push(limit, offset);

            // Count query for pagination
            const countQuery = `
            SELECT COUNT(*) AS total
            FROM roh_posts p
            ${whereSQL}
            `;

            // Execute both queries
            const [rows] = await pool.promise().query(listQuery, params);
            const [countRows] = await pool.promise().query(countQuery, params.slice(0, -2)); // remove limit, offset

            const totalPosts = countRows[0].total;
            const totalPages = Math.ceil(totalPosts / limit);

            const formattedResults = rows.map(post => ({
            id: post.id,
            post_title: post.post_title,
            post_slug: post.post_slug,
            description: post.description,
            post_excerpt: post.post_excerpt,
            post_status: post.post_status,
            add_date: post.add_date,
            edit_date: post.edit_date,
            cate_id: post.cate_id,
            post_image_url: post.post_image_name
                ? post.post_image_path + post.post_image_name
                : null
            }));

            return res.status(200).json({
            status: true,
            message: "Posts fetched successfully",
            data: formattedResults,
            pagination: {
                currentPage: page,
                totalPages,
                totalPosts,
                limit
            }
            });

        } catch (err) {
            console.error("Unexpected error:", err);
            return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
    };

    /** View single post - Optimized - Coded by Vishnu Oct 12, 2025 */
    this.ViewSinglePost = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
        return GLOBAL_ERROR_RESPONSE("Post ID is required", null, res);
        }

        // ⚡ Only necessary fields for View popup
        const viewQuery = `
        SELECT 
            p.id, 
            p.post_title, 
            p.post_slug,
            p.description, 
            p.post_excerpt, 
            p.post_status, 
            p.cate_id,
            p.add_date,
            m.file_name AS post_image_name, 
            m.file_path AS post_image_path,
            c.name AS category_name
        FROM roh_posts p
        LEFT JOIN roh_media_gallery m ON p.post_img_id = m.id
        LEFT JOIN roh_categories c ON p.cate_id = c.id
        WHERE p.id = ?
        LIMIT 1
        `;

        pool.execute(viewQuery, [id], (err, results) => {
        if (err) {
            console.error("Error fetching post:", err);
            return GLOBAL_ERROR_RESPONSE("Error fetching post details", err, res);
        }

        if (results.length === 0) {
            return GLOBAL_ERROR_RESPONSE("Post not found", null, res);
        }

        const post = results[0];
        const formattedPost = {
            id: post.id,
            post_title: post.post_title,
            post_slug: post.post_slug,
            cate_id: post.cate_id,
            description: post.description,
            post_excerpt: post.post_excerpt,
            post_status: post.post_status,
            add_date: post.add_date,
            category_name: post.category_name || null,
            post_image_url: post.post_image_name
            ? post.post_image_path + post.post_image_name
            : null,
        };

        return GLOBAL_SUCCESS_RESPONSE("Post details fetched successfully", formattedPost, res);
        });
    } catch (err) {
        console.error("Unexpected error:", err);
        return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
    }
    };

    /** Update single post - Coded by Vishnu Oct 12, 2025 */
    this.UpdateSinglePost = async (req, res) => {
    try {
        const {
        id,
        post_title,
        post_slug,
        description,
        post_excerpt,
        cate_id,
        post_status,
        } = req.body;

        if (!id) {
        return GLOBAL_ERROR_RESPONSE("Post ID is required", null, res);
        }

        let postImageName = null;
        let postImagePath = null;
        let postImageType = null;

        if (req.body.post_picture_url) {
        const fileExtension = path.extname(req.body.post_picture_url);
        postImageName = req.body.post_picture_url;
        postImagePath = `/uploads/media/post/`;
        postImageType = fileExtension.slice(1);
        }

        /** ✅ If new image uploaded */
        if (postImageName) {
        const mediaQuery = `
            INSERT INTO roh_media_gallery (file_name, file_path, file_type, active)
            VALUES (?, ?, ?, ?)
        `;
        const mediaValues = [postImageName, postImagePath, postImageType, 1];

        pool.execute(mediaQuery, mediaValues, (err, mediaResult) => {
            if (err) {
            console.error("Error inserting into media gallery:", err);
            return GLOBAL_ERROR_RESPONSE("Error saving new image", err, res);
            }

            const updateQuery = `
            UPDATE roh_posts
            SET post_title = ?, post_slug = ?, description = ?, post_excerpt = ?, 
                post_status = ?, cate_id = ?, post_img_id = ?, edit_date = NOW()
            WHERE id = ?
            `;
            const updateValues = [
            post_title,
            post_slug,
            description,
            post_excerpt,
            post_status || "draft",
            cate_id || null,
            mediaResult.insertId,
            id,
            ];

            pool.execute(updateQuery, updateValues, (err) => {
            if (err) {
                console.error("Error updating post:", err);
                return GLOBAL_ERROR_RESPONSE("Error updating post", err, res);
            }
            return GLOBAL_SUCCESS_RESPONSE("Post updated successfully", {}, res);
            });
        });
        } else {
        /** ✅ No new image — keep existing one */
        const updateQuery = `
            UPDATE roh_posts
            SET post_title = ?, post_slug = ?, description = ?, post_excerpt = ?, 
                post_status = ?, cate_id = ?, edit_date = NOW()
            WHERE id = ?
        `;
        const updateValues = [
            post_title,
            post_slug,
            description,
            post_excerpt,
            post_status || "draft",
            cate_id || null,
            id,
        ];

        pool.execute(updateQuery, updateValues, (err) => {
            if (err) {
            console.error("Error updating post:", err);
            return GLOBAL_ERROR_RESPONSE("Error updating post", err, res);
            }
            return GLOBAL_SUCCESS_RESPONSE("Post updated successfully", {}, res);
        });
        }
    } catch (err) {
        console.error("Unexpected error:", err);
        return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
    }
    };


}

module.exports = new PostsApi();
