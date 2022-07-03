const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

/**
 * Blogs route
 */
router.get("/", blogController.blog_index);

/**
 * Blogs route post request
 */

router.post("/", blogController.blog_insert);

/**
 * Create blog post from this route
 */
router.get("/create", blogController.create_blog);

/**
 * Single post page
 */
router.get("/:id", blogController.blog_details);
/**
 * Delete post page
 */
router.delete("/:id", blogController.blog_delete);

module.exports = router;
