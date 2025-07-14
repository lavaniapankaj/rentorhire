'use client'

export default function CategoryList() {
  const categories = ['Electronics', 'Fashion', 'Home Appliances', 'Books']; // Sample categories
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Category List</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
}
