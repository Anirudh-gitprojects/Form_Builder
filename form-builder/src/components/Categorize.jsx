import React, { useState } from 'react';
import axios from 'axios';
import AddBoxIcon from '@mui/icons-material/AddBox';

const CategorizeForm = ({ onFormSubmit }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [items, setItems] = useState([]);
  const [catItems, setCatItems] = useState('');
  const [categorize_items, setCategorizeItems] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      formData.append('image', imageFile);

      const response = await axios.post('http://localhost:5000/api/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setItems([...items, response.data]);
      setName('');
      setCategory('');
      setImageFile(null); // Clear the image file after submission
      alert('Successfully added');
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  function addCategoriesClickcable() {
    if(catItems==""){
      alert('Please enter a category');
    }
    else{
    setCategorizeItems((prev) => [...prev, catItems]);
    console.log(categorize_items);
  }}

  return (
    <div className="grid justify-center container mx-auto">
      <div className="bg-white w-96 rounded-lg shadow-md p-6" style={{ width: 800 }}>
        <h2 className="text-2xl font-semibold">Categorization Form Builder</h2>
        <br />
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Enter the Categories:</label>
            <input
              className="w-11/12 x-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              onChange={(e) => setCatItems(e.target.value)}
            />
            <button
              className="px-4 py-2 mt-2 text-white bg-blue-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="button"
              style={{ position: 'relative', left: '20px' }}
              onClick={addCategoriesClickcable}
            >
              <AddBoxIcon />
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Category:</label>
            <select
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categorize_items.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Item Name:</label>
            <input
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>
          <button
            className="w-full px-4 py-2 text-white bg-blue-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="submit"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategorizeForm;
