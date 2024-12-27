import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Addproduct() {
  const location = useLocation();
  const user = location.state.userData;
  console.log("user",user);
  const [formData, setFormData] = useState({
    userName: user._id,
    productName: '',
    category: '',
    quantity: '',
    price: '',
    description: '',
    productImage: null
  });

 
  // const {userData}= location.state || {};

  // useEffect(() => {
  //   if (location.state) {
  //     const userData = location.state.userData;
  //     setFormData({ ...formData, userName: userData._id });
  //   }
  // }, [location.state]);
  // console.log("user",userData);

  const handleFileChange = (e) => {
    setFormData({ ...formData, productImage: e.target.files[0] });
  };

//get category
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

  const handleSubmit =async (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    try {
      const formdatasend = new FormData();
      formdatasend.append('userName', formData.userName);
      formdatasend.append('productName', formData.productName);
      formdatasend.append('category', formData.category);
      formdatasend.append('quantity', formData.quantity);
      formdatasend.append('price', formData.price);
      formdatasend.append('description', formData.description);
      formdatasend.append('productImage', formData.productImage);
      const resp = await axios.post('http://localhost:8000/product/addproduct', formdatasend);
      const data = await resp.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    
  };
  return (
    <div>
      <div className="addco h-full w-full">
        <div className="addcontact w-3/4 h-auto bg-slate-200 m-auto mt-11 p-5 rounded-md">

          <h1 className="text-3xl font-bold text-center">Add Product</h1>
          <div className="cetInput ">
            <div className='flex flex-col gap-2 mt-5'>
            {/* <label htmlFor='userName' className='text-lg ml-24'>User</label> */}
            <input type="text" placeholder='User Name'
              name='userName'
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              className='p-2  w-3/4 m-auto rounded-md' />
            </div>
            <div className='flex flex-col gap-2 mt-5'>
            {/* <label htmlFor='userName' className='text-lg'>Product Name</label> */}
            <input type="text" placeholder='Product Name'
              name='productName'
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              className='p-2 w-3/4 rounded-md m-auto' />
            </div>
            <div className='flex flex-col gap-2 mt-5'>
            {/* <label htmlFor='userName' className='text-lg'>Category</label> */}
            <select
            name='category'
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className='p-2 w-3/4 rounded-md m-auto'
            >
            <option value={''}>Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}</select>
           
            </div>
            <div className='flex flex-col gap-2 mt-5'>
            {/* <label htmlFor='userName' className='text-lg'>Quantity</label> */}
            <input type="Number" placeholder='Quantity'
              name='quantity'
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className='p-2 w-3/4 rounded-md m-auto' />
            </div>
            <div className='flex flex-col gap-2 mt-5'>
            {/* <label htmlFor='userName' className='text-lg'>Price</label> */}
            <input type="Number" placeholder='Price'
              name='price'
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className='p-2 w-3/4 rounded-md m-auto' />
            </div>
            <div className='flex flex-col gap-2 mt-5'>
            {/* <label htmlFor='userName' className='text-lg'>Description</label> */}
            <textarea type="text" placeholder='Description' rows={3}
              name='description'
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} className='p-2 w-3/4 rounded-md m-auto' />

          
            </div>
            <div className='flex flex-col gap-2 mt-5'>
            {/* <label htmlFor='userName' className='text-lg'>Product Image</label> */}
            <input type="file" placeholder=''
              name='productImage'
              // value={formData.description}
              onChange={handleFileChange}
              className='p-2 w-3/4 m-auto rounded-md' />
            </div>
            
            <button className='p-2 w-3/4 mt-5 ml-24 rounded-md bg-slate-600 hover:bg-slate-800 text-white transition-all duration-300 '
              onClick={handleSubmit}
            >Add Product</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Addproduct
