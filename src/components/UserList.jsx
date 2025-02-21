import defaultImage from "/default-avatar.png";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { fetchUsers } from "../features/UserSlice";

function UserList({ users, onEdit, onDelete }) {
  const navigate = useNavigate();

  // Handle edit user and navigate to the form
  const handleEdit = (user) => {
    onEdit(user);
    navigate("/add-user",{state: {user}});//pass user data via route state  
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
        onDelete(id);
        fetchUsers;
    }
};



  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">User List</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={`user-${index}`}>  {/* Generate Unique key*/}
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={user.profile_pic || defaultImage}
                      alt={`${user.name}'s profile`}
                      className="rounded-circle"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No users available. Please add a new user.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-4">
        <Link to="/add-user" className="btn btn-success">
          Add New User
        </Link>
      </div>
    </div>
  );
}

// PropTypes validation
UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      profile_pic: PropTypes.string,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserList;
