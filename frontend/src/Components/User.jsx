import React, { useEffect } from 'react'
import axios from 'axios'

function User() {

  const [user, setUser] = React.useState([])

  const fetchUser = async () => {
    try {
      const resp = await axios.get('http://localhost:8000/user/getuser');
      const data = await resp.data;
    setUser(data);
    
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <div>
      <div className="user-Container h-3/4 w-2/3 m-auto ">
        <h1 className="text-3xl font-bold text-center">User Details</h1>
        {user && user.map((item) => 
           (
            <div className="user-Container h-3/4 w-2/3 m-auto " key={item._id}>
              <img src={item.photo} alt="" />
              <p>Name: {item.name}</p>
              <p>Email: {item.email}</p>
              <p>Phone: {item.phone}</p>
            </div>
          )
        )
             
                
                }
      </div>
    </div>
  )
}

export default User
