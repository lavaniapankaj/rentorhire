"use client";
import { useState, useEffect } from "react";
import style from "./singleblog.module.css";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function SingleBlogPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    // 🔹 Dummy Data (replace with your API later)
    const allBlogs = [
      {
        id: 1,
        slug: "future-of-web-development",
        title: "Exploring the Future of Web Development",
        date: "October 12, 2025",
        image: "/images/blog1.jpg",
        content:
          "Web development is evolving rapidly with frameworks like Next.js, Astro, and Remix. Developers are now focusing more on performance, accessibility, and SEO-driven architectures. Server-side rendering and static generation have become the new standards for web excellence.",
      },
      {
        id: 2,
        slug: "wordpress-plugin-tips",
        title: "10 Tips for WordPress Plugin Developers",
        date: "October 10, 2025",
        image: "/images/blog2.jpg",
        content:
          "As a WordPress plugin developer, always use hooks effectively, sanitize user input, and keep your plugin lightweight. Proper documentation and security practices are crucial to maintain plugin quality and reputation.",
      },
      {
        id: 3,
        slug: "nextjs-15-new-features",
        title: "Next.js 15: What’s New and Exciting",
        date: "October 8, 2025",
        image: "/images/blog3.jpg",
        content:
          "Next.js 15 introduces faster builds, the React Compiler, Partial Prerendering, and improved edge deployment support. It continues to be the most popular React framework for production-grade apps.",
      },
      {
        id: 4,
        slug: "build-rest-api-nodejs",
        title: "Building REST APIs with Node.js and Express",
        date: "October 6, 2025",
        image: "/images/blog3.jpg",
        content:
          "Learn how to build powerful REST APIs using Node.js and Express. Focus on scalability, error handling, and modular routes to keep your backend clean and maintainable.",
      },
    ];

    // find single blog by slug
    const single = allBlogs.find((b) => b.slug === slug);
    setBlog(single);

    // get 3 related blogs (excluding current one)
    const related = allBlogs.filter((b) => b.slug !== slug).slice(0, 3);
    setRelatedBlogs(related);
  }, [slug]);

  if (!blog) return <div className={style.loading}>Loading...</div>;

  return (
    <div className={style.single_container}>
      {/* === Blog Header === */}
      <div className={style.blog_header}>
        <Image
          src={blog.image}
          alt={blog.title}
          width={1200}
          height={600}
          className={style.blog_image}
        />
        <h1 className={style.blog_title}>{blog.title}</h1>
        <p className={style.blog_date}>{blog.date}</p>
      </div>

      {/* === Blog Content === */}
      <div className={style.blog_content}>
        <p>{blog.content}</p>
      </div>

      {/* === Related Blogs === */}
      <div className={style.related_section}>
        <h2>Related Posts</h2>
        <div className={style.related_grid}>
          {relatedBlogs.map((rel) => (
            <div key={rel.slug} className={style.related_card}>
              <div className={style.related_img}>
                <Image
                  src={rel.image}
                  alt={rel.title}
                  fill
                  className={style.img_cover}
                />
              </div>
              <div className={style.related_info}>
                <h3>{rel.title}</h3>
                <p className={style.related_date}>{rel.date}</p>
                <a href={`/blogs/${rel.slug}`} className={style.read_more}>
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
