import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, addUser, editUser, deleteUser } from "./features/UserSlice";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

function App() {
  const dispatch = useDispatch();
  const { users, error, status } = useSelector((state) => state.users);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSubmit = (values) => {
    if (editingUser) {
      dispatch(editUser({ id: editingUser.id, updatedUser: values }));
    } else {
      dispatch(addUser(values));
    }
    setEditingUser(null);
  };

  if (status === "loading") return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-danger text-center mt-5">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-primary">User Management</h1>

      <div className="row">
        {/* User Form Section */}
        <div className="col-md-4">
          <div className="card shadow p-3">
            <UserForm
              users={users}
              initialValues={editingUser || { name: "", email: "" }}
              buttonText={editingUser ? "Update User" : "Add User"}
              onSubmit={handleSubmit}
            />
          </div>
        </div>

        {/* User List Section */}
        <div className="col-md-8">
          <div className="card shadow p-3">
            <UserList users={users} onEdit={setEditingUser} onDelete={(id) => dispatch(deleteUser(id))} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;