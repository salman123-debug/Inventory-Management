import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchproducts = async () => {
    try {
      const resp = await axios.get('http://localhost:8000/product/getallproducts');
      const data = await resp.data;
      setProducts(data);
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
  const handleEditProduct =async (productId) => {
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
    try{
      const formdatasend = new FormData();
      formdatasend.append('productName', editProduct.productName);
      formdatasend.append('category', editProduct.category);
      formdatasend.append('quantity',editProduct.quantity);
      formdatasend.append('price',editProduct.price);
      formdatasend.append('description',editProduct.description)
    }
    catch(err){
      console.log(err)
    }
  }


  return (
    <div className="flex justify-center items-center min-h-screen  bg-gray-100">
      
    {viewProduct && (
      <div className="fixed top-0 left-0 w-full h-full p-5 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-7 rounded  shadow-lg min-h-9 flex flex-col justify-center items-center gap-5 w-1/3">
          <h2 className="text-4xl font-bold font-serif mb-2">Product Details</h2>
          <div className=' flex flex-col justify-center items-center gap-2'>
            <img src={`http://localhost:8000/uploads/${viewProduct.productImage}`} alt={viewProduct.productName} className="w-[300px] h-[200px]"/>
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
      <div className="fixed top-0 left-0 w-full h-full p-5 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-7 rounded  shadow-lg min-h-9 flex flex-col justify-center items-center gap-5 w-1/3">
          <h2 className="text-4xl font-bold font-serif mb-2">Edit Product</h2>
          {/* <div className=' flex flex-col justify-center items-center gap-2'>
            <img src={`http://localhost:8000/uploads/${editProduct.productImage}`} alt={editProduct.productName} className="w-[300px] h-[200px]"/>
          <p className='text-xl font-bold font-serif'>Product Name: {editProduct.productName}</p>
          <p className='text-xl font-bold font-serif'>Category: {editProduct.category}</p>
          <p className='text-xl font-bold font-serif'>Quantity: {editProduct.quantity}</p>
          <p className='text-xl font-bold font-serif'>Price: {editProduct.price}</p>
          <p className='text-xl font-bold font-serif'>Description: {editProduct.description}</p>
          </div> */}
          <form onSubmit={handleEditProductSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="productName">Product Name</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="productName"
                type="text"
                value={editProduct.productName}
                onChange={(e) => setEditProduct({ ...editProduct, productName: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="category">Category</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="category"
                type="text"
                value={editProduct.category}
                onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="quantity">Quantity</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="quantity"
                type="number"
                value={editProduct.quantity}
                onChange={(e) => setEditProduct({ ...editProduct, quantity: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="price">Price</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                value={editProduct.price}
                onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="description">Description</label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                value={editProduct.description}
                onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
              />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              type="submit"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    )}
      <div className="category-container w-2/3 bg-white shadow-lg rounded-lg mt-5 p-5">
        <h1 className="text-3xl font-bold text-center mb-5 text-gray-800">Category List</h1>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Product Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Category</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Quaitity</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Price</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-100 transition duration-200"
              >
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{product.productName}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{product.category}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{product.quantity}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{product.quantity * product.price}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{product.description}</td>
                <td className="border border-gray-300 px-4 py-2 ">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200"
                  onClick={()=>handleViewProduct(product._id)}
                  >
                    <GrView />
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 ml-2 rounded-md hover:bg-blue-600 transition duration-200"
                  onClick={()=>handleEditProduct(product._id)}
                  >
                    <FaEdit />

                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 ml-2 rounded-md hover:bg-red-600 transition duration-200"
                  onClick={()=> handleProductDelete(product._id)}
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
  );
}

export default ProductList;
