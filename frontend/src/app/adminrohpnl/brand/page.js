'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken } from "../../../utils/utilities";

const API_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_ADMIN_URL;

export default function ListBrandPage() {
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(3);

  const [filters, setFilters] = useState({
    brand_name: '',
  });

  useEffect(() => {
    /** Getting the token from the cookies */
    const token = getAuthToken();

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_ADMIN_BASE_URL}/brand/list`, {
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
        console.log("data>> ", data);
        /** recode = 0 is used for the token error */
        if(data.rcode == 0){
          window.location.href = "/auth/admin";  
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

  return (
    <>
      <div>
          <h2>Brand</h2>
          <button>Add Brand</button>

          {/* Search Form */}
          <div>
            <h3>Search Brand</h3>
            <form>
              <label>
                Brand Name:
                <input type="text" name="brand_name"/>
              </label>
              <button type="submit">Search</button>
              <button type="submit">Cancel</button>
            </form>
          </div>

          {/* Category Table */}
          <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginTop: '20px' }}>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Category Name</th>
                <th>Active</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {brands.length > 0 ? (
              brands.map((brand, index) => (
                <tr key={index}>
                  {/* <td>{(currentPage - 1) * limit + index + 1}</td> */}
                  <td>{index + 1}</td>
                  <td>{brand.brandName}</td>
                  <td>{brand.categoryId}</td>
                  <td>{brand.active == 1 ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button onClick={() => viewCategoryData(category.id)}>View</button>
                    <button onClick={() => openEditCategoryModal(category.id)}>Edit</button>
                    <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                  </td>
                </tr>
              ))) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    No Brand Found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Section */}
          {/* <div style={{ marginTop: '20px' }}>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
            <span> Page {currentPage} of {totalPages} </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
          </div> */}

        </div>
    </>
  );
}
