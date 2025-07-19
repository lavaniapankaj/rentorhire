'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

export default function ListCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(3);
  const router = useRouter();
  
  const [filters, setFilters] = useState({
    category_name: '',
  });

  const [searchForm, setSearchForm] = useState({
    category_name: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/adminrohpnl/category/list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            page: currentPage,
            limit,
            ...filters,
          }),
        });

        const data = await response.json();
        /** recode = 0 is used for the token error */
        if(data.rcode == 0){
          router.push('/auth/admin');
        }
  
        setCategories(data.data.category || []);
        setTotalPages(data.data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCategories();
  }, [currentPage, filters]);


  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handling input change for search
  const handleSearchFormChange = (e) => {
    const { name, value } = e.target;
    setSearchForm((prev) => ({
      ...prev,
      [name]: value, // Update category_name
    }));
  };

  // Handling form submit (Search)
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    setFilters({ ...searchForm });  // Set filters to searchForm
    setCurrentPage(1); // Reset to page 1 when search is clicked
  };

  return (
    <div>
      <h2>Category</h2>
      <p>This is the page to list all categories.</p>
      
      {/* Search Form */}
      <div>
        <h3>Search Category</h3>
        <form onSubmit={handleSearch}>
          <label>
            Category Name:
            <input 
              type="text" 
              name="category_name" 
              value={searchForm.category_name} // Ensure value is tied to state
              onChange={handleSearchFormChange} // Ensure onChange is tied to function
            />
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
                <td>{(currentPage - 1) * limit + index + 1}</td>
                <td>{category.name}</td>
                <td>{category.parent_category_name}</td>
                <td>{category.active === 1 ? 'Active' : 'Inactive'}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Category Found.</p>
      )}

      {/* Pagination Section */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}
