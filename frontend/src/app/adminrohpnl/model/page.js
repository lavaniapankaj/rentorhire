'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const API_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_ADMIN_URL;

export default function ListModelPage() {
  const [models, setModels] = useState([]);

  return (
    <>
      <div>
          <h2>Models</h2>
          
          <button>Add Model</button>

          {/* Search Form */}
          <div>
            <h3>Search Model</h3>
            <form>
              <label>
                Model Name:
                <input type="text" name="model_name"/>
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
            {models.length > 0 ? (
              models.map((model, index) => (
                <tr key={index}>
                  {/* <td>{(currentPage - 1) * limit + index + 1}</td> */}
                  <td>{index + 1}</td>
                  <td>{model.brandName}</td>
                  <td>{model.categoryId}</td>
                  <td>{model.active == 1 ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button onClick={() => viewBrandData(brand.id)}>View</button>
                    <button onClick={() => openEditBrandModal(brand.id)}>Edit</button>
                    <button onClick={() => handleDeleteBrand(brand.id)}>Delete</button>
                  </td>
                </tr>
              ))) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    No Model Found.
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
