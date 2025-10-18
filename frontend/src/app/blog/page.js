"use client";
import { useState, useEffect } from "react";
import style from "./blog.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_USER_URL;
const WEB_BASE_URL = process.env.NEXT_PUBLIC_WEB_BASE_URL;

export default function AllBlogsPage() {
  const searchParams = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(pageFromUrl);
  const [limit] = useState(21);
  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / limit);

  /** Fetch blogs from backend (pagination + category join) */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/getallactiveblogs?page=${page}&limit=${limit}`
        );
        const result = await res.json();

        if (Array.isArray(result.data)) {
          setPosts(result.data);
          setTotal(result.total || 0);
        } else if (Array.isArray(result)) {
          setPosts(result);
        } else {
          console.error("Invalid response:", result);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, [page, limit]);

  /** Ripple Hover Effect */
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
    ripple.classList.add(style.ripple_effect);
    setTimeout(() => ripple.remove(), 1500);
  };

  /** SEO-Friendly Navigation (keeps ?page= in URL permanently) */
  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    window.location.href = `/blog?page=${p}`;
  };

  const handlePrev = () => goToPage(page - 1);
  const handleNext = () => goToPage(page + 1);

  return (
    <>
      {/* ===== Hero Section ===== */}
      <div className={style.roh_prouct_hero_wrap}>
        <div className={style.roh_prouct_hero_inner}>
          <div className={style.roh_prouct_hero}>
            <div className="container">
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

      {/* ===== Blog Grid ===== */}
      <div className={style.roh_blog_post_inner}>
        <div className="container">
          <div className={style.roh_blog_grid}>
            {posts.length === 0 ? (
              <p className="text-center py-5">Loading blogs...</p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className={style.roh_blog_card}>
                  {/* === Image Section === */}
                  <div className={style.roh_blog_img} onMouseEnter={createRipple}>
                    <img
                      src={`${WEB_BASE_URL}${post.file_path+post.file_name || ""}`}
                      alt={post.post_title}
                      className={style.roh_postFeature_img_cover}
                    />
                  </div>

                  {/* === Content Section === */}
                  <div className={style.roh_blog_content}>
                    <p className={style.roh_blog_date}>
                      <Image
                        src="/calendar.svg"
                        width={15}
                        height={15}
                        alt="Date"
                      />
                      {new Date(post.add_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {post.category_name && (
                        <span style={{ marginLeft: "10px", color: "#999" }}>
                          | {post.category_name}
                        </span>
                      )}
                    </p>
                    <h2 className={style.roh_blog_heading}>
                      {post.post_title}
                    </h2>
                    <p className={style.roh_blog_excerpt}>
                      {post.post_excerpt}
                    </p>

                    <div
                      className={`d-flex align-items-center justify-content-start ${style.roh_redBtns}`}
                    >
                      <div className={style.roh_button_custom}>
                        <Link href={`/blog/${post.post_slug}`}>Read More</Link>
                      </div>
                      <div className={style.roh_circl_btn}>
                        <Link href={`/blog/${post.post_slug}`}>
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
              ))
            )}
          </div>

          {/* ===== Pagination ===== */}
          {totalPages > 1 && (
            <div
              className={`${style.rohproducts_pagination} d-flex justify-content-center mt-4 gap-2 flex-wrap mt-5`}
            >
              {/* Prev Button */}
              <div className={style.roh_paginationPrev_btn}>
                <div className={style.roh_circl_btn}>
                  <button onClick={handlePrev} disabled={page === 1}>
                    <Image
                      src="/arrow.svg"
                      alt="Arrow Left"
                      width={24}
                      height={24}
                      style={{ transform: "rotate(180deg)" }}
                    />
                  </button>
                </div>
                <button
                  onClick={handlePrev}
                  className={style.rohproducts_btn}
                  disabled={page === 1}
                >
                  Previous
                </button>
              </div>

              {/* Dynamic Page Numbers */}
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                const isActive = page === pageNum;
                return (
                  <button
                    key={i}
                    onClick={() => goToPage(pageNum)}
                    className={`${style.rohproducts_btn_page} ${
                      isActive
                        ? style.rohproducts_btn_active
                        : style.rohproducts_btn_inactive
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next Button */}
              <div className={style.roh_paginationNext_btn}>
                <button
                  onClick={handleNext}
                  className={style.rohproducts_btn}
                  disabled={page === totalPages}
                >
                  Next
                </button>
                <div className={style.roh_circl_btn}>
                  <button onClick={handleNext} disabled={page === totalPages}>
                    <Image
                      src="/arrow.svg"
                      alt="Arrow Right"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
