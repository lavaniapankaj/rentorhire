"use client";
import { useState, useEffect } from "react";
import style from "./singleblog.module.css";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_USER_URL;
const WEB_BASE_URL = process.env.NEXT_PUBLIC_WEB_BASE_URL;

export default function SingleBlogPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    if (!slug) return;

    const fetchSingleBlog = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/viewsingleblog`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });

        const result = await res.json();

        if (result.blog) {
          setBlog(result.blog);
          setRelatedBlogs(result.related || []);
        } else {
          console.error("Blog not found:", result);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchSingleBlog();
  }, [slug]);

  // Ripple Effect
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
    requestAnimationFrame(() => ripple.classList.add(style.ripple_effect));
    setTimeout(() => ripple.remove(), 700);
  };

  if (!blog) return <div className={style.loading}>Loading...</div>;

  return (
    <>
      {/* === Hero Section === */}
      <div className={style.roh_post_hero_wrap}>
        <div className={style.roh_post_hero_inner}>
          <div
            className={style.roh_post_hero}
            style={{
              backgroundImage: `url(${WEB_BASE_URL}${blog.file_path + blog.file_name || ""})`,
            }}
          >
            <div className="container">
              <div className={style.roh_Zindex}>
                <div className={style.roh_hero_left_content}>
                  <h1 className={style.roh_hero_title}>{blog.post_title}</h1>

                  <div className={style.roh_meta}>
                    <span>
                      📅{" "}
                      {new Date(blog.add_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    {blog.category_name && (
                      <span> | 🏷️ {blog.category_name}</span>
                    )}
                    <span> ⏳ 8 min read</span>
                  </div>

                  <p className={style.roh_hero_desc}>
                    {blog.post_excerpt || "Explore our latest insights and tips."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === Blog Content === */}
      <div className={style.roh_singlePost_innerContainer}>
        <div className={style.roh_blog_content}>
          <p>{blog.description}</p>
        </div>

        {/* === Related Blogs === */}
        {relatedBlogs.length > 0 && (
          <div className={style.roh_related_section}>
            <h2>Related Posts</h2>
            <div className={style.roh_related_grid}>
              {relatedBlogs.map((rel) => (
                <div
                  key={rel.post_slug}
                  className={style.roh_related_card}
                  onClick={createRipple}
                >
                  <div
                    className={style.roh_related_img}
                    onMouseEnter={createRipple}
                  >
                    <img
                      src={`${WEB_BASE_URL}${rel.file_path + rel.file_name || ""}`}
                      alt={rel.post_title}
                      className={style.roh_img_cover}
                    />
                  </div>
                  <div className={style.roh_related_info}>
                    <h3>{rel.post_title}</h3>
                    <p className={style.roh_related_date}>
                      {new Date(rel.add_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>

                    <div
                      className={`d-flex align-items-center justify-content-start ${style.roh_redBtns}`}
                    >
                      <div className={style.roh_button_custom}>
                        <Link href={`/blog/${rel.post_slug}`}>Read More</Link>
                      </div>
                      <div className={style.roh_circl_btn}>
                        <Link href={`/blog/${rel.post_slug}`}>
                          <Image
                            src="/arrow.svg"
                            alt="Arrow Right"
                            width={18}
                            height={18}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
