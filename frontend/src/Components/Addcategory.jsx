import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

function Addcategory() {
  const [formData,setFormData]=useState({
    categoryName:""
  });
  const {id} = useParams();

  const navi=useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const addCategory=async(e)=>{
    e.preventDefault();
    // console.log(formData)
    try{
      const resp=await axios.post('http://localhost:8000/category/addcategory',formData);
      console.log(resp.data);
      setFormData({categoryName:""});
      setSuccessMessage("Category added successfully");
      setShowSuccessMessage(true);
      console.log(successMessage);
      setTimeout(() => {
        setShowSuccessMessage(false);
      },3000);
    }catch(error){
      console.log(error);
    }
  }

  // fetch category by id
  const fetchCategory=async()=>{
    try{
      const resp=await axios.get(`http://localhost:8000/category/getcategory/${id}`);
      const data=await resp.data;
      // console.log(data);
      setFormData(data);
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    if(id){
      fetchCategory();
    }
  },[id]);

  
  //update category
  const updateCategory=async(e)=>{
    e.preventDefault();
    try{
      const resp=await axios.put(`http://localhost:8000/category/updatecategory/${id}`,formData);
      // console.log(resp.data);
      // setFormData({categoryName:""});
      setSuccessMessage("Category updated successfully");
      setShowSuccessMessage(true);
      console.log(successMessage);
      setTimeout(() => {
        setShowSuccessMessage(false);
      },3000);
      navi('/dashboard');
    }catch(error){
      console.log(error);
    }
  }

  

  return (
    <div>
      <div className="addcatContainer h-full w-full ">
        {/* successMessage */}
      {showSuccessMessage && (
        <div className="success-message h-20 w-2/4 m-auto  bg-slate-200 rounded-md flex justify-center items-center">
          {/* <img src="https://img.icons8.com/ios/50/000000/checkmark.png" alt="" /> */}
          <img src="./success gif.gif" alt="" className='h-20 w-20 mix-blend-multiply'/>
          <p className='text-center font-serif font-bold  '>{successMessage}</p>
        </div>
      )}
      <div className="addcontact w-1/2 h-auto bg-slate-200 m-auto mt-11 p-5 rounded-md">

      <h1 className="text-3xl font-bold text-center">{id?"Update Category":"Add Category"}</h1>
        <div className="cetInput">
          <input type="text" placeholder='category name'
          name='categoryName'
          value={formData.categoryName}
          onChange={(e)=>setFormData({...formData,categoryName:e.target.value})}
          className='p-2 w-full mt-5 rounded-md'/>
          <button className='p-2 w-full mt-5 rounded-md bg-slate-600 hover:bg-slate-800 text-white transition-all  '
          onClick={id?updateCategory:addCategory}
          >{id?"Update":"Add"}</button>
        </div>
      </div>
        
      </div>
      
    </div>
  )
}

export default Addcategory
