import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { SignJWT } from "jose";
import "../styles/Signup.css"; // Import CSS

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().min(3, "Full Name must be at least 3 characters").required("Full Name is required"),
      email: Yup.string().email("Invalid email format").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      const secret = new TextEncoder().encode("34710678cac914fa803e1048853a4da6b396a8f5327f9ce3b84610db38705ca0");
      const jwt = await new SignJWT({ fullname: values.fullname, email: values.email })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1h")
        .sign(secret);

      // Store user credentials in localStorage for login validation
      const user = { fullname: values.fullname, email: values.email, password: values.password, token: jwt };
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/login"); // Redirect to login after successful signup
    },
  });

  return (
    <div className="outer-box">
      <div className="inner-box">
        <header className="signup-header">
          <h1>Sign up</h1>
          <p>Sign up to continue</p>
        </header>

        <main className="signup-body">
          <form onSubmit={formik.handleSubmit}>
            <p>
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                placeholder="Enter your name"
                {...formik.getFieldProps("fullname")}
                className={formik.touched.fullname && formik.errors.fullname ? "input-error" : ""}
              />
              {formik.touched.fullname && formik.errors.fullname && <span className="error-message">{formik.errors.fullname}</span>}
            </p>

            <p>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
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

            <p>
              <input type="submit" id="submit" value="Create Account" disabled={!formik.isValid || !formik.dirty} />
            </p>
          </form>
        </main>

        <footer className="signup-footer">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </footer>
      </div>
    </div>
  );
}
