import React, { useEffect, useState } from 'react';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { AiOutlineDollar } from "react-icons/ai";
import { MdDoNotDisturb } from 'react-icons/md';
import { BiCategory } from "react-icons/bi";
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";



function Hero({user}) {
  // console.log(user);
   const [products, setProducts] = useState([]);
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
  }, []); 

  //user details
    const [userData, setUserData] = React.useState([]); 
    const getUser = async () => {
      try {
        const resp = await axios.get('http://localhost:8000/user/getuser');
        const data = await resp.data;
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
      getUser();
    }, []);

  // total products
  const totalProducts = products.length;

  // total sales
  const totalSales = products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  // total orders
  const totalOrders = products.reduce((total, product) => {
    return total + product.quantity;
  }, 0);

  //out of stock
  const outOfStock = products.filter(product => product.quantity === 0).length;

  //active categories
  const activeCategories = products.filter(product => product.quantity > 0).map(product => product.category).filter((value, index, array) => array.indexOf(value) === index).length;

  // total categories
  //  const [categories, setCategories] = useState([]);

  //  const fetchCategories = async () => {
  //   try {
  //     const resp = await axios.get('http://localhost:8000/category/getallcategories');
  //     const data = await resp.data;
  //     setCategories(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  // // total categories
  // const totalCategories = categories.length;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of products per page

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get products for the current page
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render products for the current page
  // const renderProducts = () => {
  //   return currentProducts.map((product) => (
  //     <div className="product-card" key={product._id}>
  //       <img src={product.image} alt={product.name} className="product-image" />
  //       <div className="product-details">
  //         <h3 className="product-name">{product.name}</h3>
  //         <p className="product-price">${product.price}</p>
  //         <p className="product-category">{product.category}</p>
  //         <p className="product-quantity">Quantity: {product.quantity}</p>
  //       </div>
  //     </div>
  //   ));
  // }

  //get msg for admin good morning
  const getGreeting = () => {
    const currenthour = new Date().getHours();
    if(currenthour < 12){
      return "Good Morning";
    }else if(currenthour >= 12 && currenthour < 18){
      return "Good Afternoon";
    }else{
      return "Good Evening";
    }
  }
  return (
    <div className="hero-container ">
      {/* user welcome */}
      <div className='user-welcome flex justify-between bg-teal-50 p-4 mb-5 rounded-md shadow-sm'>
        <div className='text-left flex flex-col  '>
          <h1 className="text-4xl font-bold text-gray-800 mb-3 font-serif">
            {getGreeting()},
          </h1>
          <h1 className="text-4xl font-bold text-gray-800 mb-3 font-serif">
            {userData && (userData.name)}
          </h1>

          <p className="text-lg text-gray-600 mb-3">
            Here's what's happening with your store today. See the static at once
          </p>
        </div>
        {/* for image */}
        <div className='store-image'>
          <img src="./truck.avif" alt="" className='w-40 rounded-md mix-blend-multiply' />
        </div>
      </div>
      {/* Header Section */}
      <div className="text-left flex flex-col  bg-white p-4 mb-5 rounded-md shadow-sm">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Inventory Stats
        </h1>
        <p className="text-lg text-gray-600 mb-3">
          Get a quick overview of your inventory and sales performance.
        </p>
      </div>

      {/* Stats Section */}
      <div className="stats-box flex flex-wrap gap-5 justify-center items-center">
        {/* Card 1 */}
        <div className="stats-card w-60 bg-purple-600 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-purple-700">
          <MdOutlineProductionQuantityLimits className="text-6xl text-white mx-auto" />
          <h2 className="text-xl text-white font-semibold mt-4 text-center">
            Total Products
          </h2>
          <p className="text-3xl text-white font-bold text-center">{totalProducts}</p>
        </div>

        {/* Card 2 */}
        <div className="stats-card w-60 bg-green-600 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-green-700">
        <AiOutlineDollar className='text-6xl text-white mx-auto '/>

          <h2 className="text-xl text-white font-semibold mt-4 text-center">
            Total Store Value 
          </h2>
          <p className="text-3xl text-white font-bold text-center">${totalSales.toFixed(2)}</p>
        </div>

        {/* Card 3 */}
        <div className="stats-card w-60 bg-red-500 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-red-600">
        <MdDoNotDisturb className="text-6xl text-white mx-auto" />
          <h2 className="text-xl text-white font-semibold mt-4 text-center">
            Out of Stock
          </h2>
          <p className="text-3xl text-white font-bold text-center">{outOfStock}</p>
        </div>

        {/* Card 4 */}
        <div className="stats-card w-60 bg-blue-600 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-blue-700">
       
        <BiCategory className="text-6xl text-white mx-auto" />
          <h2 className="text-xl text-white font-semibold mt-4 text-center">
            Active Categories
          </h2>
          <p className="text-3xl text-white font-bold text-center">{activeCategories}</p>
        </div>
      </div>
      {/* <div className="text-left mt-10 flex justify-between bg-white p-4 items-center rounded-md shadow-sm">
        <h1 className="text-4xl font-bold text-gray-800 ">
          Inventory Items
        </h1>
        <input
          type="search"
          placeholder="Search by name"
          className="p-2 w-1/3 rounded-md bg-slate-100"
        />
      </div>

      {/* Table Section 
      <div className="table-container mt-5">
        {/* <Table products={products} /> 
        <div className="category-container min-w-1/2 bg-white shadow-md rounded-lg p-5">
      <h1 className="text-3xl font-bold text-center mb-5 text-gray-800">Prodect List</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Sr/No.</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Product Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Category</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Quantity</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Price</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Value</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Description</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => (
            <tr key={product._id} className="hover:bg-gray-100 transition duration-200">
              <td className="border border-gray-300 px-4 py-2 text-gray-800">
                {indexOfFirstItem + index + 1}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-gray-800">{product.productName}</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-800">{product.category}</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-800">{product.quantity}</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-800">{product.price}</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-800">
                {product.price * product.quantity}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-gray-800">{product.description}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200"
                  onClick={() => handleViewProduct(product._id)}
                >
                  <GrView />
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 ml-2 rounded-md hover:bg-blue-600 transition duration-200"
                  onClick={() => handleEditProduct(product._id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 ml-2 rounded-md hover:bg-red-600 transition duration-200"
                  onClick={() => handleProductDelete(product._id)}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls 
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 rounded-md ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>

      </div> */}
    </div>
  );
}

export default Hero;
