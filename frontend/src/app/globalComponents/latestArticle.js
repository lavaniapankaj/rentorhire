"use client";
import { useEffect, useState } from "react";
import styles from './css/latestArticle.module.css';
import Image from "next/image";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_USER_URL;

export default function LatestArtical({ cate_id }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cate_id) return;

    const fetchArticles = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/getsinglecategoryrecentposts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category_id: cate_id }),
        });

        const data = await response.json();
        if (data.status && Array.isArray(data.data)) {
          setPosts(data.data);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [cate_id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <img src="/infinity-loading.gif" alt="Loading..." width={100} height={80} />
      </div>
    );
  }

  if (posts.length === 0) {
    return null; // no section if no posts
  }

  return (
    <section className={styles.articles_wrap}>
      <div className={`container ${styles.articles_inner}`}>
        <div className={styles.articles_wrap_main}>
          {/* Star Heading */}
          <div className={`d-flex justify-content-center align-items-center`}>
            <div className={styles.star_box}>
              <div className={` d-flex align-items-center gap-1 ${styles.star_inner}`}>
                <Image src="/images/homepg/star.svg" alt="Star Icon" width={20} height={20} />
                <span className={styles.star_title}>Latest Articles</span>
              </div>
            </div>
          </div>

          <h3 className={`text-center ${styles.second_heading}`}>
            Stay informed and inspired for
            <br />
            your next journey
          </h3>

          <div className={`container-fluid mt-5 position-relative`}>
            <div className={`row g-4`}>
              {/* Left Column — show first article big */}
              {posts[0] && (
                <div className={`col-md-6`}>
                  <div
                    className={`${styles.main_card} ${styles.htiscbox}`}
                    style={{
                      backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url('${posts[0].post_image_url || "/images/blog1.jpg"}')`,
                    }}
                  >
                    <div className={`${styles.main_carddate} ${styles.thedate}`}>
                      <Image src="/calendar_i.svg" alt="Calendar Icon" width={16} height={16} />{" "}
                      {new Date(posts[0].add_date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <h5>{posts[0].post_title}</h5>
                    <div className={`${styles.read_more_btn}`}>
                      <div className={`${styles.circl_btn}`}>
                        <a className={styles.article_btn}>
                          <Image src="/arrow.svg" alt="Arrow" width={18} height={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Right Column — show remaining articles small */}
              <div className={`col-md-6`}>
                {posts.slice(1).map((post, index) => (
                  <div className={styles.sub_card} key={index}>
                    <div className={`${styles.article_sm_imgbox} ${styles.htiscbox}`}>
                      <img
                        src={post.post_image_url || "/images/blog1.jpg"}
                        alt={post.post_title}
                        width={500}
                        height={300}
                      />
                    </div>
                    <div className={styles.article_sm_content}>
                      <small className={`${styles.global_heading} ${styles.gray_global_heading} ${styles.thedate}`}>
                        <Image src="/images/calendar.svg" alt="Calendar" width={16} height={16} />{" "}
                        {new Date(post.add_date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </small>
                      <h6>{post.post_title}</h6>
                      <div className={`${styles.read_link}`}>
                        Read Story
                        <div className={styles.circl_btn}>
                          <a className={styles.article_btn}>
                            <Image src="/arrow.svg" alt="Arrow" width={18} height={18} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
