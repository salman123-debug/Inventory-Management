import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const fetchproducts = async () => {
    try {
      const resp = await axios.get('http://localhost:8000/product/getallproducts');
      const data = await resp.data;
      setProducts(data);
      //send data to props
      navigate('/dashboard', { state: data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchproducts();
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

  const [categories, setCategories] = useState([]);

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
  }, []);


  //update category 
  //delete product
  const handleProductDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/product/deleteproduct/${productId}`);

      fetchproducts();
    } catch (error) {
      console.log(error);
    }
  };
  const [viewProduct, setViewProduct] = useState(false);
  const handleViewProduct = (productId) => {
    // e.preventDefault();
    try {
      const product = products.find((product) => product._id === productId);
      setViewProduct(product);
    } catch (error) {
      console.log(error);
    }
  }

  const [editProduct, setEditProduct] = useState(false);
  const handleEditProduct = async (productId) => {
    try {
      const resp = await axios.get(`http://localhost:8000/product/getproduct/${productId}`);
      const product = await resp.data;
      setEditProduct(product);
    } catch (error) {
      console.log(error);
    }
  }

  //update product
  const handleEditProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdatasend = new FormData();
      formdatasend.append('productName', editProduct.productName);
      formdatasend.append('category', editProduct.category);
      formdatasend.append('quantity', editProduct.quantity);
      formdatasend.append('price', editProduct.price);
      formdatasend.append('description', editProduct.description);
      if (editProduct.productImage) {
        formdatasend.append('productImage', editProduct.productImage);
      }
      const resp = await axios.put(`http://localhost:8000/product/updateproduct/${editProduct._id}`, formdatasend);
      const data = await resp.data;
      console.log(data);

      fetchproducts();
      setEditProduct(false);
    }
    catch (err) {
      console.log(err)
    }
  }

  //handle cencle
  const handleCancel = () => {
    setEditProduct(false);
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filterProducts = products.filter((product) => {
    const matchsCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchessearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchsCategory && matchessearch;
  })
  //search product by category dropdown
  
 

  return (
    <>
    <div className='product-header flex justify-between min-h-24 min-w-full p-5 rounded-md mb-5  bg-white'>
      <div className='flex flex-col justify-center items-center gap-3'>
      <p className='text-lg font-bold font-serif'>Category by Product</p>
      <select className='text-lg font-bold font-serif py-3 px-2 w-[200px] rounded-sm border border-gray-400'
        value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category._id} value={category.categoryName}>{category.categoryName}</option>
        ))}
      </select>
      </div>
     <div className='search flex items-center gap-3'>
      <button className='search-btn bg-green-600 px-6 py-3 rounded-md  '>Export</button>
       <input type="search" placeholder="Search by Product Name" className='px-5 py-3 rounded-md border border-gray-400'
       value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
       />
       {/* <img src={search_icon_light} alt="" /> */}

     </div>
    </div>
    <div className="flex justify-center min-h-52  bg-gray-100">

      {viewProduct && (
        <div className="fixed top-0 left-0 w-full h-full p-5 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-7 rounded  shadow-lg min-h-9 flex flex-col justify-center items-center gap-5 w-1/3">
            <h2 className="text-4xl font-bold font-serif mb-2">Product Details</h2>
            <div className=' flex flex-col justify-center items-center gap-2'>
              <img src={`http://localhost:8000/uploads/${viewProduct.productImage}`} alt={viewProduct.productName} className="w-[300px] h-[200px]" />
              <p className='text-xl font-bold font-serif'>Product Name: {viewProduct.productName}</p>
              <p className='text-xl font-bold font-serif'>Category: {viewProduct.category}</p>
              <p className='text-xl font-bold font-serif'>Quantity: {viewProduct.quantity}</p>
              <p className='text-xl font-bold font-serif'>Price: {viewProduct.price}</p>
              <p className='text-xl font-bold font-serif'>Description: {viewProduct.description}</p>
            </div>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              onClick={() => setViewProduct(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Edit Product
            </h2>
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={handleCancel}
            >
              ✖ 
            </button>
            <form onSubmit={handleEditProductSubmit} className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="productName">
                  Product Name
                </label>
                <input
                  className="w-full p-2 border rounded focus:ring focus:ring-blue-200 outline-none transition"
                  id="productName"
                  type="text"
                  value={editProduct.productName}
                  onChange={(e) => setEditProduct({ ...editProduct, productName: e.target.value })}
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">
                  Category
                </label>
                <input
                  className="w-full p-2 border rounded focus:ring focus:ring-blue-200 outline-none transition"
                  id="category"
                  type="text"
                  value={editProduct.category}
                  onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  className="w-full p-2 border rounded focus:ring focus:ring-blue-200 outline-none transition"
                  id="quantity"
                  type="number"
                  value={editProduct.quantity}
                  onChange={(e) => setEditProduct({ ...editProduct, quantity: e.target.value })}
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="price">
                  Price
                </label>
                <input
                  className="w-full p-2 border rounded focus:ring focus:ring-blue-200 outline-none transition"
                  id="price"
                  type="number"
                  value={editProduct.price}
                  onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="w-full p-3 border rounded focus:ring focus:ring-blue-200 outline-none transition"
                  id="description"
                  rows="3"
                  cols="22"
                  value={editProduct.description}
                  onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                />
              </div>

              {/* Product Image */}
              <div>
                <label className="block text-sm ml-3 font-medium text-gray-700 mb-1" htmlFor="productImage">
                  Product Image
                </label>
                <input
                  type="file"
                  className="w-full ml-3 "
                  onChange={(e) => setEditProduct({ ...editProduct, productImage: e.target.files[0] })}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  type="submit"
                  // disabled={isSubmitting}
                >
                  update
                </button>

              </div>
            </form>
          </div>
        </div>

      )}
      <div className="category-container min-w-1/2 bg-white shadow-md rounded-lg  p-5 ">
        <h1 className="text-3xl font-bold text-center mb-5 text-gray-800">Product List</h1>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Sr/No.</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Product Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Category</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Quaitity</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Price</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Value</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterProducts.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-100 transition duration-200"
              >
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{products.indexOf(product) + 1}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{product.productName}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{product.category}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{product.quantity}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{product.price}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{product.price * product.quantity}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{product.description}</td>
                <td className="border border-gray-300 px-4 py-2 ">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200"
                    onClick={() => handleViewProduct(product._id)}
                  >
                    <GrView />
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 ml-2 rounded-md hover:bg-blue-600 transition duration-200"
                    onClick={() => handleEditProduct(product._id)}
                  >
                    <FaEdit />

                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 ml-2 rounded-md hover:bg-red-600 transition duration-200"
                    onClick={() => handleProductDelete(product._id)}
                  >
                    <MdDelete />

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}
export default ProductList;