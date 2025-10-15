"use client";
import { useState, useEffect } from "react";
import ViewEntry from "./ViewEntry";
import styles from "./inquiry.module.css";
import { getAuthToken } from "../../../utils/utilities";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_USER_URL;

export default function ContactEntriesPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // 👈 actual query sent to API

  useEffect(() => {
    fetchContactEntries(page, searchQuery);
  }, [page, searchQuery]);

  const fetchContactEntries = async (pageNum = 1, query = "") => {
    try {
      const token = getAuthToken();
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/getallcontactusentries?page=${pageNum}&limit=10&search=${encodeURIComponent(
          query
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch contact entries");

      const data = await response.json();
      setEntries(data?.data || []);
      setTotalPages(data?.totalPages || 1);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 👇 Form submit handler
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1); // reset to first page
    setSearchQuery(search.trim());
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className={styles.admin_container}>
      <h1 className={styles.admin_title}>Contact Us Entries</h1>

      {/* 🔹 Search Form */}
      <form className={styles.admin_filter_bar} onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search by email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.admin_search_input}
        />
        <button type="submit" className={styles.page_btn}>
          Search
        </button>
      </form>

      {loading && <p className={styles.admin_loader}>Loading...</p>}
      {error && <p className={styles.admin_error}>{error}</p>}

      {!loading && entries.length === 0 && (
        <p className={styles.admin_empty}>No contact entries found.</p>
      )}

      {!loading && entries.length > 0 && (
        <>
          <table className={styles.admin_table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.full_name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.subject}</td>
                  <td>
                    <span
                      className={
                        item.email_status === "sent"
                          ? styles.status_sent
                          : styles.status_failed
                      }
                    >
                      {item.email_status}
                    </span>
                  </td>
                  <td>{item.created_at}</td>
                  <td>
                    <ViewEntry entryId={item.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 🔹 Pagination */}
          <div className={styles.admin_pagination}>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className={styles.page_btn}
            >
              ⬅ Prev
            </button>
            <span className={styles.page_info}>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
              className={styles.page_btn}
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
}
