'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const API_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_ADMIN_URL;

export default function ListTagsPage() {
  const [tags, setTags] = useState([]);
  
  return (
    <>
      <div>
          <h2>Tags</h2>
          
          <button>Add Tag</button>

          {/* Search Form */}
          <div>
            <h3>Search Tag</h3>
            <form>
              <label>
                Tag Name:
                <input type="text" name="tag_name"/>
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
            {tags.length > 0 ? (
              tags.map((tag, index) => (
                <tr key={index}>
                  {/* <td>{(currentPage - 1) * limit + index + 1}</td> */}
                  <td>{index + 1}</td>
                  <td>{tag.brandName}</td>
                  <td>{tag.categoryId}</td>
                  <td>{tag.active == 1 ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button onClick={() => viewCategoryData(tag.id)}>View</button>
                    <button onClick={() => openEditCategoryModal(tag.id)}>Edit</button>
                    <button onClick={() => handleDeleteCategory(tag.id)}>Delete</button>
                  </td>
                </tr>
              ))) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    No Tag Found.
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
