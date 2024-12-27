import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
function Categorylist() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const resp = await axios.get('http://localhost:8000/category/getallcategories');
      const data = await resp.data;
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []); // Added empty dependency array to prevent infinite re-fetching

  //delete category
  const handleCategoryDelete = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:8000/category/deletecategory/${categoryId}`);
      
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  //update category 
  const handleCategoryUpdate = (categoryId) => {
    navigate(`/addcategory/${categoryId}`);
  }

  return (
    <div className="flex justify-center items-center min-h-screen  bg-gray-100">
      <div className="category-container w-2/3 bg-white shadow-lg rounded-lg mt-5 p-5">
        <h1 className="text-3xl font-bold text-center mb-5 text-gray-800">Category List</h1>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Category Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category._id}
                className="hover:bg-gray-100 transition duration-200"
              >
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{category.categoryName}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200"
                  onClick={()=>handleCategoryUpdate(category._id)}
                  >
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 ml-2 rounded-md hover:bg-red-600 transition duration-200"
                  onClick={()=> handleCategoryDelete(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categorylist;
