'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import styles from '../admin.module.css';
import AddCategoryForm from './addCategoryForm';
import ViewCategory from './viewCategory';
import EditCategoryForm from './EditCategoryForm';
import { getAuthToken } from "../../../utils/utilities";

export default function ListCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(3);
  const router = useRouter();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewCategory, setViewCategory] = useState(null);
  const [editCategory, setEditCategory] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  
  const [filters, setFilters] = useState({
    category_name: '',
  });

  const [searchForm, setSearchForm] = useState({
    category_name: '',
  });

  useEffect(() => {
    /** Getting the token from the cookies */
    const token = getAuthToken();

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ADMIN_URL}/category/list`, {
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

  /** Function to open the add model */
  const openAddModal = () => {
    setIsAddModalOpen(true);
    setCurrentPage(1);
  }

  /** Function to close the add model */
  const closeAddModal = () => setIsAddModalOpen(false);
  
  /** Function to open the category view model */
  const viewCategoryData = async (cat_id) => {

  /** Getting the token from the cookies */
  const token = getAuthToken();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ADMIN_URL}/category/details`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
         },
        body: JSON.stringify({ id: cat_id }),
      });
      if (!res.ok) throw new Error('Failed to fetch category details');
      const data = await res.json();

      /** recode = 0 is used for the token error */
      if(data.rcode == 0){
        router.push('/auth/admin');
      }
      const categoryData = data.data;
      setViewCategory(categoryData);
      setIsViewModalOpen(true);
    } catch (err) {
      console.error('Error fetching category details:', err);
    }
  };

  /** Function to delete the category */
  const handleDeleteCategory = async (cat_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;

    /** Getting the token from the cookies */
    const token = getAuthToken();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ADMIN_URL}/category/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: cat_id }),
      });

      const data = await res.json();
      /** recode = 0 is used for the token error */
      if(data.rcode == 0){
        router.push('/auth/admin');
      }

      if (!res.ok) throw new Error('Failed to delete category');

      setCurrentPage(1);
      alert('Category deleted successfully.');
      setFilters({ ...filters });
    } catch (err) {
      console.error('Delete error:', err);
      alert('An error occurred while deleting the category.');
    }
  };

  /** Function to close the view and update model */
  const closeViewModal = () => setIsViewModalOpen(false);
  const closeEditModal = () => setIsEditModalOpen(false);

  /** Function to open the edit model for the category */
  const openEditCategoryModal = async (cat_id) => {
    
    /** Getting the token from the cookies */
    const token = getAuthToken();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ADMIN_URL}/category/details`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
         },
        body: JSON.stringify({ id: cat_id }),
      });
      if (!res.ok) throw new Error('Failed to fetch category details');
      const data = await res.json();

      /** recode = 0 is used for the token error */
      if(data.rcode == 0){
        router.push('/auth/admin');
      }
      const categoryData = data.data;
      setEditCategory(categoryData);
      setIsEditModalOpen(true);
    } catch (err) {
      console.error('Error fetching category details:', err);
    }
  }

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

  /* Handling input change for search */
  const handleSearchFormChange = (e) => {
    const { name, value } = e.target;
    setSearchForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* Handling form submit (Search) */
  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({ ...searchForm });
    setCurrentPage(1);
  };

  /* Handeling the cancel of the search */
  const handleCancel = (e) => {
    e.preventDefault();
    setSearchForm({ category_name: '' });
    setFilters({});
    setCurrentPage(1);
  };

  return (
    <div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
          <img src="/infinity-loading.gif" alt="Loading..." width="80" />
        </div>
      ) : (
        <div>
          <h2>Category</h2>
          
          <button onClick={openAddModal}>Add Category</button>
          {/* Search Form */}
          <div>
            <h3>Search Category</h3>
            <form>
              <label>
                Category Name:
                <input type="text" name="category_name" value={searchForm.category_name} onChange={handleSearchFormChange}/>
              </label>
              <button type="submit" onClick={handleSearch}>Search</button>
              <button type="submit" onClick={handleCancel}>Cancel</button>
            </form>
          </div>

          {/* Category Table */}
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
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={index}>
                  <td>{(currentPage - 1) * limit + index + 1}</td>
                  <td>{category.name}</td>
                  <td>{category.parent_category_name}</td>
                  <td>{category.active == 1 ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button onClick={() => viewCategoryData(category.id)}>View</button>
                    <button onClick={() => openEditCategoryModal(category.id)}>Edit</button>
                    <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                  </td>
                </tr>
              ))) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    No Category Found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Section */}
          <div style={{ marginTop: '20px' }}>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
            <span> Page {currentPage} of {totalPages} </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>
      )}

    {/* Add New Category Modal */}
    {isAddModalOpen && (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
        <div className={styles.modalContent}>
          <button className={styles.modalCloseButton} onClick={closeAddModal}> × </button>
          <AddCategoryForm onClose={closeAddModal} onSuccess={() => { setIsAddModalOpen(false); }} />
        </div>
      </div>
    )}

    
    {/* View Category Modal */}
    {isViewModalOpen && (
      <ViewCategory category={viewCategory} onClose={closeViewModal} />
    )}

    {/* Edit Category Modal */}
    {isEditModalOpen && (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <EditCategoryForm category={editCategory} onClose={closeEditModal} onSuccess={() => { setIsAddModalOpen(false); }} />
      </div>
    )}

    </div>
  );
}
