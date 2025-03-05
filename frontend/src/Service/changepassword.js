import axios from "axios";


export const changePassword = async (currentPassword, newPassword)=>{
    try {
        console.log(currentPassword,newPassword);
        const resp =await axios.put('http://localhost:8000/user/changepassword',{currentPassword,newPassword},{withCredentials:true});
        console.log(resp.data);
        alert(resp.data.message);
        return resp.data;

    }catch(error){
        alert(error.response?.data?.message|| "error changing password");
    }
}