import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Import CSS
import PropTypes from "prop-types";

export default function Login({ setIsAuthenticated }) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log("hello");
      
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setError("No user found. Please sign up.");
        console.log("abcd");
        
        return;
      }

      const user = JSON.parse(storedUser);

      if (user.email !== values.email || user.password !== values.password) {
        setError("Invalid email or password.");
        console.log("auhfa");
        
        return;
      }

      localStorage.setItem("isAuthenticated", "true"); // Set authentication state
    
      setIsAuthenticated(true);
      navigate("/user-management"); // Redirect to user management page
      console.log("hello123");
    },

  });

  return (
    <div className="outer-box">
      <div className="inner-box">
        <header className="login-header">
          <h1>Login</h1>
          <p>Welcome back! Please login to continue.</p>
        </header>

        <main className="login-body">
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={formik.handleSubmit}>
            <p>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...formik.getFieldProps("email")}
                className={formik.touched.email && formik.errors.email ? "input-error" : ""}
              />
              {formik.touched.email && formik.errors.email && <span className="error-message">{formik.errors.email}</span>}
            </p>

            <p>
              <label htmlFor="password">Password</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  {...formik.getFieldProps("password")}
                  className={formik.touched.password && formik.errors.password ? "input-error" : ""}
                />
                <i
                  className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} toggle-password`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
              {formik.touched.password && formik.errors.password && <span className="error-message">{formik.errors.password}</span>}
            </p>

            <p><a href="#">Forgot Password?</a></p>

            <p>
              <input type="submit" id="submit" value="Login"  />
            </p>
          </form>
        </main>

        <footer className="login-footer">
          <p>Not a Member? <Link to="/signup">Signup</Link></p>
        </footer>
      </div>
    </div>
  );
}

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};
