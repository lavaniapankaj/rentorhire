"use client";
import { useState, useEffect } from "react";
import style from "./blog.module.css";
import Image from "next/image";
import Link from "next/link";

export default function AllBlogsPage() {
  const [posts, setPosts] = useState([]);

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

  // ✅ Ripple Hover Function
  const createRipple = (e) => {
    const target = e.currentTarget;
    const ripple = document.createElement("span");
    ripple.classList.add(style.ripple);

    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left - 60; // mouse position ripple
    const y = e.clientY - rect.top - 60;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    target.appendChild(ripple);
    ripple.classList.add(style.ripple_effect);

    setTimeout(() => ripple.remove(), 1500);
  };

  return (
    <>
      <div className={style.roh_prouct_hero_wrap}>
        <div className={style.roh_prouct_hero_inner}>
          <div className={style.roh_prouct_hero}>
            <div className={`container`}>
              <div className={style.roh_Zindex}>
                <div className={style.roh_hero_heading}>
                  <h1 data-wow-duration="2s">Blog</h1>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <ol className={style.roh_ekit_breadcrumb}>
                    <li className={style.roh_ekit_breadcrumbs_start}>
                      <Link href="/">Home</Link>
                    </li>
                    <li className={style.roh_brd_sep}>
                      <span className={style.roh_separate_icon}>/</span>
                    </li>
                    <li>Blog</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.roh_blog_post_inner}>
        <div className="container">
          <div className={style.roh_blog_grid}>
            {posts.map((post) => (
              <div key={post.slug} className={style.roh_blog_card}>
                {/* ✅ Image Section with Ripple */}
                <div
                  className={style.roh_blog_img}
                  onMouseEnter={createRipple}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className={style.roh_postFeature_img_cover}
                  />
                </div>

                {/* === Content Section === */}
                <div className={style.roh_blog_content}>
                  <p className={style.roh_blog_date}><Image src="calendar.svg" width="15" height="15" alt="Date" />{post.date}</p>
                  <h2 className={style.roh_blog_heading}>{post.title}</h2>
                  <p className={style.roh_blog_excerpt}>{post.excerpt}</p>

                  <div className={`d-flex align-items-center justify-content-start ${style.roh_redBtns}`}>
                    <div className={`${style.roh_button_custom}`}><Link href={`/blog/${post.slug}`}>Read More</Link></div>
                    <div className={`${style.roh_circl_btn}`}>
                      <Link href={`/blog/${post.slug}`}><Image src="/arrow.svg" alt="Arrow Right" width={18} height={18} /></Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Post Pagination Buttons  */}

          <div className={`${style.rohproducts_pagination} d-flex justify-content-center mt-4 gap-2 flex-wrap mt-5`}>
            <div className={`${style.roh_paginationPrev_btn}`}>

              <div className={`${style.roh_circl_btn}`}>
                <button><Image src="/arrow.svg" alt="Arrow Right" width={24} height={24} /></button>
              </div>
              <button className={`${style.rohproducts_btn}`}>Previous</button>
            </div>
            <button
              key={0}
              className={`${style.rohproducts_btn_page} ${1 === 1 ? style.rohproducts_btn_active : style.rohproducts_btn_inactive}`}

            >
              {1 + 1}
            </button>
            <div className={`${style.roh_paginationNext_btn}`}>
              <button
                className={`${style.rohproducts_btn}`}>
                Next
              </button>
              <div className={`${style.roh_circl_btn}`}>
                <button><Image src="/arrow.svg" alt="Arrow Right" width={24} height={24} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
