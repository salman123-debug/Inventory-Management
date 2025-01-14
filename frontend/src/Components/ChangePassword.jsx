import React, { useState } from 'react'
import axios from 'axios'
import { changePassword } from '../Service/changepassword';

function ChangePassword() {
    const [formData, setFormData] = useState({
        currentPassword:"",
        newPassword:""
    })

    const handlePasswordChange =async (e)=>{
        e.preventDefault();
        const {currentPassword,newPassword} = formData
        try {
            await changePassword(currentPassword,newPassword);
            setFormData({
                currentPassword:'',
                newPassword:''
            })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
      <div className="addcontact w-1/2 h-auto bg-slate-200 m-auto mt-11 p-5 rounded-md">

<h1 className="text-3xl font-bold text-center">Change Password</h1>
  <div className="cetInput">
    <input type="text" placeholder='Old Password'
    name='currentPassword'
    value={formData.currentPassword}
    onChange={(e)=>setFormData({...formData,currentPassword:e.target.value})}
    className='p-2 w-full mt-5 rounded-md'/>
    <input type="text" placeholder='New Password'
    name='newPassword'
    value={formData.newPassword}
    onChange={(e)=>setFormData({...formData,newPassword:e.target.value})}
    className='p-2 w-full mt-5 rounded-md'/>
    <button className='p-2 w-full mt-5 rounded-md bg-slate-600 hover:bg-slate-800 text-white transition-all  '
    onClick={handlePasswordChange}
    >Change Password</button>
  </div>
</div>
    </div>
  )
}

export default ChangePassword
