import { useFormik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from "react-router-dom";

function UserForm({ initialValues, onSubmit, buttonText }) {
  const navigate = useNavigate();
  const { state } = useLocation(); // Get data from the route state
  const user = state?.user; // Check if user data is passed

  // Initialize form with existing user data if available
  const formik = useFormik({
    initialValues: user || initialValues || { name: "", email: "", profile_pic: null },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      profile_pic: Yup.mixed().nullable(),
    }),
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
      navigate("/user-management"); // Redirect to the user list after form submission
    },
  });

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">{buttonText}</h2>

      <form onSubmit={formik.handleSubmit} className="p-4 border rounded shadow bg-light">
        {/* Name Field */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className={`form-control ${formik.errors.name && "is-invalid"}`}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && <div className="invalid-feedback">{formik.errors.name}</div>}
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={`form-control ${formik.errors.email && "is-invalid"}`}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
        </div>

        {/* Profile Picture Upload */}
        <div className="mb-3">
          <label htmlFor="profile_pic" className="form-label">Profile Picture</label>
          <input
            id="profile_pic"
            name="profile_pic"
            type="file"
            accept="image/png, image/jpeg"
            className="form-control"
            onChange={(event) => {
              formik.setFieldValue("profile_pic", event.currentTarget.files[0]);
            }}
          />
          {formik.errors.profile_pic && <div className="text-danger">{formik.errors.profile_pic}</div>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          {buttonText} 
        </button>
        <br /><br />
        <button type="submit" className="btn btn-primary w-100" disabled={!formik.dirty || !formik.isValid}>
          Update User
        </button>
      </form>
    </div>
  );
}

UserForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.any,
  }),
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default UserForm;
