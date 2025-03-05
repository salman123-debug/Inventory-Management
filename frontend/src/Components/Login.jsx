
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope, faPhone, faImage } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faTwitter, faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Login = () => {

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData); // Form data displayed in console
    try {
      const formtosend = new FormData();
      formtosend.append('name',formData.name);
      formtosend.append('email',formData.email);
      formtosend.append('password',formData.password);
      formtosend.append('phone',formData.phone);
      formtosend.append('photo',formData.photo);
      const resp = await axios.post('http://localhost:8000/user/register',formtosend,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': `Bearer ${document.cookie.split('=')[1]}`
        },
      }
      );
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        photo: null,
      })

      setIsSignUpMode(false);
      console.log(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleLoginData = (e)=>{
    const {name,value} = e.target;
    setLoginFormData({...loginFormData,[name]:value})
  }

  //login form

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/user/login', loginFormData, {withCredentials:true},

      );
      console.log(response.data);
      // const userData = response.data;
      const result = await response.data.accessToken;
      console.log(result);
      axios.defaults.headers.common['authorization'] = `Bearer ${result}`               
      navigate('/dashboard',{state:response.data});
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* Log In Form */}
          <form className="sign-in-form" onSubmit={handleSubmit}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className="icon" />
              <input
                type="text"
                placeholder="email"
                name="email"
                value={loginFormData.email}
                onChange={handleLoginData}
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className="icon" />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={loginFormData.password}
                onChange={handleLoginData}
              />
            </div>
            <input type="submit"
            onClick={handleLoginSubmit}
            value="Login" className="btnn solid" />
            <div className="social-media">
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </form>

          {/* Sign Up Form */}
          <form className="sign-up-form" onSubmit={handleSubmit}>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className="icon" />
              <input
                type="text"
                placeholder="Username"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className="icon" />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faPhone} className="icon" />
              <input
                type="tel"
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faImage} className="icon" />
              <input
                type="file"
                // accept="image/*"
                name="photo"
                onChange={handleFileChange}
              />
            </div>
            <input type="submit"
            onClick={handleSubmit}
            className="btnn" value="Sign up" />
            {/* <div className="social-media">
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div> */}
          </form>
        </div>
      </div>

      {/* Panels */}
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex ratione. Aliquid!</p>
            <button className="btnn transparent" onClick={() => setIsSignUpMode(true)}>
              Sign up
            </button>
          </div>
          <img src="log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam ad deleniti.</p>
            <button className="btnn transparent" onClick={() => setIsSignUpMode(false)}>
              Sign in
            </button>
          </div>
          <img src="register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
