import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function LogoutButton({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Remove auth status
    setIsAuthenticated(false); //update state
    navigate("/login"); // Redirect to login
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger position-absolute top-0 end-0 m-3">
      Logout
    </button>
  );
}
LogoutButton.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default LogoutButton;
