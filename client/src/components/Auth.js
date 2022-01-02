/** @format */

import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

const signInImage =
  "https://www.posist.com/wp-content/uploads/2020/12/POSist-Marketplace.png";
const cookies = new Cookies();
const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  avatarURL: "",
  emailId: "",
  region: "",
};
const Auth = () => {
  const [form, setform] = useState(initialState);
  const [isSignup, setisSignup] = useState(false);
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, emailId, avatarURL, username, region } = form;
    const URL = "http://localhost:5000/auth";
    //const URL = "https://posist-messaging-app.herokuapp.com/auth";
    const {
      data: { token, userId, hashedPassword, fullName },
    } = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
      username,
      password,
      fullName: form.fullName,
      emailId,
      avatarURL,
      region,
    });
    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("fullName", fullName);
    cookies.set("userId", userId);
    if (isSignup) {
      cookies.set("region", region);
      cookies.set("emailId", emailId);
      cookies.set("avatarURL", avatarURL);
      cookies.set("hashedPassword", hashedPassword);
    }
    window.location.reload();
  };
  const switchMode = () => {
    setisSignup((prevIsSignup) => !prevIsSignup);
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignup ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder=" Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>

            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="emailId">Email ID</label>
                <input
                  name="emailId"
                  type="email"
                  placeholder="Email ID"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="region">Region</label>
                <input
                  name="region"
                  type="text"
                  placeholder="Enter Your State"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Profile Image URL</label>
                <input
                  name="avatarURL"
                  type="text"
                  placeholder="Profile Image URL"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button> {isSignup ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignup
                ? "Already have an account ?"
                : "Don't have an account?"}
              &nbsp;{" "}
              <span onClick={switchMode}>
                {isSignup ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signInImage} alt="sign in" />
      </div>
    </div>
  );
};

export default Auth;
