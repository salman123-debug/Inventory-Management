import React, { useEffect } from 'react'
import axios from 'axios';

function User() {

  const [userData, setUserData] = React.useState([]); 
  const [showForm, setShowForm] = React.useState(false);

  const editFormShow = () => {
    setShowForm(true);
  }

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
// console.log('usetr',userData.photo);
  return (
    <div>
      <div className="user-Container h-3/4 w-2/3 m-auto ">
        <h1 className="text-3xl font-bold text-center">User Details</h1>
        
           
            <div  >
            {userData && (
              <div className="user-Container h-3/4 w-2/3 m-auto flex gap-7 p-5 mt-5 border border-gray-300 shadow-md bg-gray-50  rounded-md">
              <div className='h-40 w-48 '>
            <img src={`http://localhost:8000/uploads/${userData.photo}`} alt="photo" className='h-full w-full rounded-md'/>
            </div>
            <div className='flex flex-col gap-2 justify-center items-center'>
              <p className='text-2xl font-bold font-serif'>Name: {userData.name}</p>
              <p>Email: {userData.email}</p>
              <p>Phone: {userData.phone}</p>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={editFormShow}
              >Update</button>
            </div>
            </div>
            )}
            
              
            </div>
            {showForm && (
              <div className='fixed z-50 top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center '>
                 <div className='bg-white p-8 rounded-lg'>
                        <h2 className='text-2xl font-semibold mb-4'>Are you sure you want to login?</h2>
                        <form>
                            <div className='mb-4'>
                                <label className='block text-gray-700 font-bold mb-2'>Email</label>
                                <input type="email"
                                name='email'
                                // value={.email}
                                // onChange={handleloginchange}
                                className='w-full p-2 border border-gray-300 rounded' />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 font-bold mb-2'>Password</label>
                                <input type="password"
                                name='password'
                                // value={loginData.password}
                                // onChange={handleloginchange}
                                className='w-full p-2 border border-gray-300 rounded' />
                            </div>
                        </form>
                        <div className='flex justify-end mt-4'>
                            <button className='bg-red-500 text-white px-4 py-2 rounded mr-2' 
                            // onClick={handleloginsave}
                            >Submit</button>
                            <button className='bg-gray-500 text-white px-4 py-2 rounded mr-2' onClick={() => setShowForm(false)}>No</button>
                            
                        </div>
                    </div>
                </div>
              
            
            )}
          
      </div>
    </div>
  )
}

export default User
