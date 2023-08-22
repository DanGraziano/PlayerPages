import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import {useSelector} from "react-redux";

const Admin = () => {
  const SERVER_API_URL = "http://localhost:4000/api";
  const ADMIN_URL = `${SERVER_API_URL}/admin`;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const currentUser = useSelector((state) => state.auth.currentUser);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  console.log(currentUser)

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`${ADMIN_URL}/users`);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`${ADMIN_URL}/users/${selectedUserId}`);
      setUsers(users.filter((user) => user._id !== selectedUserId));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!currentUser || currentUser.accountType !== 'moderator') {
    return <div>You are not authorized to view this page.</div>;
  }

  return (
      <div className="admin-page container p-0">
        <h2 className="text-uppercase text-center mb-5">Admin Control Panel</h2>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {users.map((user) => (
                <div key={user._id} className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{user.username}</h5>
                    <p className="card-text">Email: {user.email}</p>
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                          setSelectedUserId(user._id);
                          setShowModal(true);
                        }}
                    >
                      Delete User
                    </button>
                  </div>
                </div>
            ))}
          </div>
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this user? This action is permanent and cannot be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete User
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
  );
};

export default Admin;





