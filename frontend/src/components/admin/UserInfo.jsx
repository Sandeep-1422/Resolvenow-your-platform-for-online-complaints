import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import Footer from '../common/FooterC';
import axios from 'axios';

const UserInfo = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [toggle, setToggle] = useState({});
  const [updateUser, setUpdateUser] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setUpdateUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e, userId) => {
    e.preventDefault(); // Prevents page reload
    if (!updateUser.name && !updateUser.email && !updateUser.phone) {
      alert("At least one field must be filled");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to update this user?");
    if (!confirmed) return;

    try {
      const res = await axios.put(`http://localhost:8000/user/${userId}`, updateUser);
      alert("User updated successfully");

      // Update local state after successful update
      setUserList((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, ...res.data } : user
        )
      );
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/OrdinaryUsers');
        setUserList(response.data);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };
    getUsers();
  }, [navigate]);

  const deleteUser = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:8000/OrdinaryUsers/${userId}`);
      setUserList((prev) => prev.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleToggle = (userId) => {
    setToggle((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));

    const currentUser = userList.find((u) => u._id === userId);
    if (currentUser) {
      setUpdateUser({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
      });
    }
  };

  return (
    <>
      <div className="body">
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userList.length > 0 ? (
                userList.map((user) => {
                  const open = toggle[user._id] || false;

                  return (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <Button
                          onClick={() => handleToggle(user._id)}
                          aria-controls={`collapse-${user._id}`}
                          aria-expanded={open}
                          className="mx-2"
                          variant="outline-warning"
                        >
                          Update
                        </Button>

                        <Collapse in={open}>
                          <div>
                            <Form onSubmit={(e) => handleSubmit(e, user._id)} className="p-3">
                              <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                  name="name"
                                  type="text"
                                  value={updateUser.name}
                                  onChange={handleChange}
                                  placeholder="Enter name"
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                  name="email"
                                  type="email"
                                  value={updateUser.email}
                                  onChange={handleChange}
                                  placeholder="Enter email"
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                  name="phone"
                                  type="tel"
                                  value={updateUser.phone}
                                  onChange={handleChange}
                                  placeholder="Enter phone number"
                                />
                              </Form.Group>
                              <Button size="sm" variant="outline-success" type="submit">
                                Submit
                              </Button>
                            </Form>
                          </div>
                        </Collapse>

                        <Button
                          onClick={() => deleteUser(user._id)}
                          className="mx-2"
                          variant="outline-danger"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4">
                    <Alert variant="info" className="text-center">
                      <Alert.Heading>No Users to show</Alert.Heading>
                    </Alert>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default UserInfo;
