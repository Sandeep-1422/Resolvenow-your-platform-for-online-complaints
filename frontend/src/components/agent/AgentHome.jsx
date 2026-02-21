import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';
import { NavLink, useNavigate } from 'react-router-dom';
import ChatWindow from '../common/ChatWindow';
import Footer from '../common/FooterC';
import axios from 'axios';

const AgentHome = () => {
  const [userName, setUserName] = useState('');
  const [agentComplaintList, setAgentComplaintList] = useState([]);
  const [toggle, setToggle] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgentComplaints = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
          navigate('/');
          return;
        }

        setUserName(user.name);
        const response = await axios.get(`http://localhost:8000/allcomplaints/${user._id}`);
        setAgentComplaintList(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchAgentComplaints();
  }, [navigate]);

  const handleStatusChange = async (complaintId) => {
    try {
      await axios.put(`http://localhost:8000/complaint/${complaintId}`, {
        status: 'completed',
      });

      setAgentComplaintList((prev) =>
        prev.map((item) =>
          item.complaintId === complaintId
            ? { ...item, status: 'completed' }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleToggle = (complaintId) => {
    setToggle((prev) => ({
      ...prev,
      [complaintId]: !prev[complaintId],
    }));
  };

  const LogOut = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" className="text-white">
        <Container fluid>
          <Navbar.Brand className="text-white">Hi Agent {userName}</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto text-white">
              <NavLink className="text-white nav-link">View Complaints</NavLink>
            </Nav>
            <Button onClick={LogOut} variant="outline-danger">
              Log out
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container mt-4 d-flex flex-wrap">
        {agentComplaintList.length > 0 ? (
          agentComplaintList.map((complaint, index) => {
            const isOpen = toggle[complaint.complaintId] || false;

            return (
              <Card key={index} style={{ width: '20rem', margin: '12px' }}>
                <Card.Body>
                  <Card.Title><b>Name:</b> {complaint.name}</Card.Title>
                  <Card.Text><b>Address:</b> {complaint.address}</Card.Text>
                  <Card.Text><b>City:</b> {complaint.city}</Card.Text>
                  <Card.Text><b>State:</b> {complaint.state}</Card.Text>
                  <Card.Text><b>Pincode:</b> {complaint.pincode}</Card.Text>
                  <Card.Text><b>Comment:</b> {complaint.comment}</Card.Text>
                  <Card.Text><b>Status:</b> {complaint.status}</Card.Text>

                  {complaint.status !== 'completed' && (
                    <Button
                      onClick={() => handleStatusChange(complaint.complaintId)}
                      variant="success"
                      className="mb-2"
                    >
                      Mark as Completed
                    </Button>
                  )}

                  <Button
                    onClick={() => handleToggle(complaint.complaintId)}
                    variant="info"
                    className="ms-2"
                  >
                    {isOpen ? 'Hide Chat' : 'Message'}
                  </Button>

                  <Collapse in={isOpen}>
                    <div className="mt-3">
                      <Card body>
                        <ChatWindow
                          key={complaint.complaintId}
                          complaintId={complaint.complaintId}
                          name={userName}
                        />
                      </Card>
                    </div>
                  </Collapse>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <Alert variant="info" className="mt-3 w-100 text-center">
            <Alert.Heading>No complaints assigned to you</Alert.Heading>
          </Alert>
        )}
      </div>

      <Footer style={{ marginTop: '80px' }} />
    </>
  );
};

export default AgentHome;
