import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, addUser, editUser, deleteUser } from "./features/UserSlice";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Link } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const { users, error, status } = useSelector((state) => state.users);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleSubmit = (values) => {
    if (editingUser) {
        dispatch(editUser({ id: editingUser.id, updatedUser: values }))
            .then(() => dispatch(fetchUsers()));
    } else {
        dispatch(addUser(values))
            .then(() => dispatch(fetchUsers()));
    }
    setEditingUser(null);
};


  if (status === "loading") return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-danger text-center mt-5">Error: {error}</div>;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <div className="container mt-4">
              <h1 className="text-center mb-4 text-primary">User Management</h1>
              <div className="card shadow p-3">
                <UserList
                  users={users}
                  onEdit={setEditingUser}
                  onDelete={(id) => dispatch(deleteUser(id))}
                />
              </div>
            </div>
          }
        />
        
        <Route
          path="/add-user"
          element={
            <div className="container mt-4">
              <h1 className="text-center mb-4 text-primary">Add User To Portal</h1>
              <div className="text-center mb-3">
                <Link to="/" className="btn btn-secondary">
                  Back to User List
                </Link>
              </div>
              <div className="card shadow p-3">
                <UserForm
                  users={users}
                  initialValues={editingUser || { name: "", email: "" }}
                  buttonText={editingUser ? "Update User" : "Add User"}
                  onSubmit={handleSubmit}
                />
              </div>
            </div>
          }
        />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
