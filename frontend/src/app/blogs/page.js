"use client";
import { useState, useEffect } from "react";
import style from "./blogs.module.css";
import Image from "next/image";
import Link from "next/link";

export default function AllBlogsPage() {
  const [posts, setPosts] = useState([]);

  // 🔹 Sample data (replace this with API call later)
  useEffect(() => {
    const dummyPosts = [
      {
        id: 1,
        slug: "future-of-web-development",
        title: "Exploring the Future of Web Development",
        date: "October 12, 2025",
        image: "/images/blog1.jpg",
        excerpt:
          "Discover the trends shaping the next generation of web technologies and tools.",
      },
      {
        id: 2,
        slug: "wordpress-plugin-tips",
        title: "10 Tips for WordPress Plugin Developers",
        date: "October 10, 2025",
        image: "/images/blog2.jpg",
        excerpt:
          "A practical guide for WordPress plugin developers to improve their workflow.",
      },
      {
        id: 3,
        slug: "nextjs-15-new-features",
        title: "Next.js 15: What’s New and Exciting",
        date: "October 8, 2025",
        image: "/images/blog3.jpg",
        excerpt:
          "Next.js 15 introduces a range of new features for better performance and DX.",
      },
    ];
    setPosts(dummyPosts);
  }, []);

  return (
    <div className={style.blogs_container}>
      <h1 className={style.blogs_title}>Latest Blog Posts</h1>

      <div className={style.blog_grid}>
        {posts.map((post) => (
          <div key={post.slug} className={style.blog_card}>
            {/* === Image Section === */}
            <div className={style.blog_img}>
              <Image
                src={post.image}
                alt={post.title}
                fill
                className={style.img_cover}
              />
            </div>

            {/* === Content Section === */}
            <div className={style.blog_content}>
              <h2 className={style.blog_heading}>{post.title}</h2>
              <p className={style.blog_date}>{post.date}</p>
              <p className={style.blog_excerpt}>{post.excerpt}</p>

              <Link href={`/blogs/${post.slug}`} className={style.blog_link}>
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
