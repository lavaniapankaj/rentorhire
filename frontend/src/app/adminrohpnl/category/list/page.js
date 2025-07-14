'use client'
import { useState, useEffect } from 'react';

export default function ListCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(4);

  // // Filter state
  // const [filters, setFilters] = useState({
  //   user_name: '',
  //   user_role_id: '',
  //   active: '',
  // });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/adminrohpnl/category/list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: currentPage,
            limit: limit
            // ...filters, // Include filters in the request
          }),
        });

        console.log("response>>> ", response);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        setCategories(data.data.users || []);
        setTotalPages(data.data.totalPages || 1);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  // }, [currentPage, limit, filters]); // Run again if currentPage or filters change
  }, [currentPage, limit]); // Run again if currentPage or filters change

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const handlePrevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const handleFilterChange = (e) => {
  //   const { name, value } = e.target;
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [name]: value,
  //   }));
  // };

  // const handleSearch = (e) => {
  //   e.preventDefault(); // Prevent form submission
  //   setCurrentPage(1); // Reset to page 1 when search is clicked
  // };

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }

  return (
    <div>
      <h2>Category </h2>
      <p>This is the page to list all categories.</p>

      {/* Filter Section */}
      <div>
        <h3>Search Category</h3>
        {/* <form onSubmit={handleSearch}> */}
        <form>
          <label>
            Category Name:
            {/* <input type="text" name="user_name" value={filters.user_name} onChange={handleFilterChange} /> */}
            <input type="text" name="category_name" />
          </label>
          <label>
            Active:
            {/* <select name="active" value={filters.active} onChange={handleFilterChange}> */}
            <select name="active">
              <option value="">All</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </label>
          <button type="submit">Search</button>
        </form>
      </div>

      {/* Category Table */}
      {categories.length > 0 ? (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Parent Category Name</th>
              <th>Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{category.name}</td>
                <td>{category.name}</td>
                <td>{category.active === 1 ? 'Active' : 'Inactive'}</td>
                <td>{category.active === 1 ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Category Found.</p>
      )}

      {/* Pagination Section */}
      <div style={{ marginTop: '20px' }}>
        {/* <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button> */}
        {/* <button disabled={currentPage === 1}>Previous</button> */}
        <button>Previous</button>
        {/* <span> Page {currentPage} of {totalPages} </span> */}
        <span> Page 1 of 10 </span>
        {/* <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button> */}
        <button disabled={1 === 1}>Next</button>
      </div>
    </div>
  );
}
