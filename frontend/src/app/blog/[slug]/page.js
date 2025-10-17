"use client";
import { useState, useEffect } from "react";
import style from "./singleblog.module.css";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SingleBlogPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
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

    const single = allBlogs.find((b) => b.slug === slug);
    setBlog(single);

    const related = allBlogs.filter((b) => b.slug !== slug).slice(0, 3);
    setRelatedBlogs(related);
  }, [slug]);

  // ✅ Ripple Click Effect
  const createRipple = (e) => {
    const target = e.currentTarget;
    const ripple = document.createElement("span");
    ripple.classList.add(style.ripple);

    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left - 60;
    const y = e.clientY - rect.top - 60;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    target.appendChild(ripple);

    requestAnimationFrame(() => {
      ripple.classList.add(style.ripple_effect);
    });

    setTimeout(() => ripple.remove(), 700);
  };

  if (!blog) return <div className={style.loading}>Loading...</div>;

  return (
    <>
      {/* Hero Section  */}
      <div className={style.roh_post_hero_wrap}>
        <div className={style.roh_post_hero_inner}>
          <div className={style.roh_post_hero} style={{ backgroundImage: `url(${blog.image})` }}>
            <div className={`container`}>
              <div className={style.roh_Zindex}>
                <div className={style.roh_hero_left_content}>
                  <h1 className={style.roh_hero_title}>{blog.title}</h1>

                  <div className={style.roh_meta}>
                    <span>👤 Sarah Johnson</span>
                    <span>📅 {blog.date}</span>
                    <span>⏳ 8 min read</span>
                  </div>

                  <p className={style.roh_hero_desc}>
                    Navigate the rental market with confidence using our comprehensive guide
                    designed specifically for first-time renters.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={style.roh_singlePost_innerContainer}>

        <div className={style.roh_blog_content}>
          <p>{blog.content}</p>
        </div>

        <div className={style.roh_related_section}>
          <h2>Related Posts</h2>
          <div className={style.roh_related_grid}>
            {relatedBlogs.map((rel) => (
              <div key={rel.slug} className={style.roh_related_card} onClick={createRipple}>
                <div className={style.roh_related_img}
                  onMouseEnter={createRipple}>
                  <img src={rel.image} alt={rel.title} className={style.roh_img_cover} />
                </div>
                <div className={style.roh_related_info}>
                  <h3>{rel.title}</h3>
                  <p className={style.roh_related_date}>{rel.date}</p>

                  <div className={`d-flex align-items-center justify-content-start ${style.roh_redBtns}`}>
                    <div className={`${style.roh_button_custom}`}><Link href={`/blog/${rel.slug}`}>Read More</Link></div>
                    <div className={`${style.roh_circl_btn}`}>
                      <Link href={`/blog/${rel.slug}`}><Image src="/arrow.svg" alt="Arrow Right" width={18} height={18} /></Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
