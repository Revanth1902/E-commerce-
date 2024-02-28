import React, { useState, useCallback } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductList from "./products";
import "./login.css";

const Login = () => {
  const [cookies, setCookie] = useCookies(["userData"]);
  const [signIn, setSignIn] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toastConfig = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  const handleSignUp = () => {
    if (!name || !email || !password) {
      toast.warn("Please fill in all details.", toastConfig);
      return;
    }

    const existingUserData = cookies.userData;
    console.log("Existing User Data:", existingUserData);

    if (existingUserData) {
      try {
        const existingUser = JSON.parse(existingUserData);
        if (existingUser.email === email) {
          toast.info("User already exists. Please sign in.", toastConfig);
          return;
        }
      } catch (error) {
        console.error("Error parsing existing user data:", error);
      }
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.", toastConfig);
      return;
    }

    // Validate password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters with at least one uppercase letter, one lowercase letter, one numeric digit, and one special character.",
        toastConfig
      );
      return;
    }

    const userData = { name, email, password };
    setCookie("userData", userData, { path: "/" });
    setSignIn(true);
    navigate("/");
  };

  const handleSignIn = () => {
    try {
      const storedUserData = cookies.userData || null;

      if (!email || !password) {
        toast.warn("Please enter both email and password.", toastConfig);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a Valid Email Id.", toastConfig);
        return;
      }

      if (
        storedUserData &&
        storedUserData.email === email &&
        storedUserData.password === password
      ) {
        toast.success("Login successful.", toastConfig);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.warn("Invalid Credentials or Sign Up first.", toastConfig);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("An Error Occured.", toastConfig);
    }
  };

  const togglePanel = useCallback(() => {
    setSignIn((prevSignIn) => !prevSignIn);
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="mainbody">
        <div className={`container ${signIn ? "" : "right-panel-active"}`}>
          <div className="form-container sign-up-container">
            <form>
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={handleSignUp}>
                Sign Up
              </button>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form>
              <h1>Sign In</h1>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="button" onClick={handleSignIn}>
                Sign In
              </button>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div
                className={`overlay-panel overlay-left ${
                  signIn ? "overlay-left-active" : ""
                }`}
              >
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us, please login with your personal
                  info
                </p>
                <button className="ghost" onClick={togglePanel}>
                  Sign In
                </button>
              </div>
              <div
                className={`overlay-panel overlay-right ${
                  signIn ? "" : "overlay-right-active"
                }`}
              >
                <h1>Hello, Friend!</h1>
                <p>
                  Enter your personal details and start your journey with us
                </p>
                <button className="ghost" onClick={togglePanel}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
