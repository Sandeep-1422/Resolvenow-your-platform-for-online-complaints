import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';
import ChatWindow from '../common/ChatWindow';
import Collapse from 'react-bootstrap/Collapse';

const Status = () => {
  const [toggle, setToggle] = useState({});
  const [statusComplaints, setStatusComplaints] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?._id) return;

    axios.get(`http://localhost:8000/status/${user._id}`)
      .then((res) => setStatusComplaints(res.data))
      .catch((err) => console.error("Failed to fetch status complaints:", err));
  }, []);

  const handleToggle = (complaintId) => {
    setToggle((prevState) => ({
      ...prevState,
      [complaintId]: !prevState[complaintId],
    }));
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", margin: "20px" }}>
      {statusComplaints.length > 0 ? (
        statusComplaints.map((complaint, index) => {
          const open = toggle[complaint._id] || false;

          return (
            <Card key={index} style={{ width: '18.5rem', margin: '0 15px 15px 0' }}>
              <Card.Body>
                <Card.Title><b>Name:</b> {complaint.name}</Card.Title>
                <Card.Text><b>Address:</b> {complaint.address}</Card.Text>
                <Card.Text><b>City:</b> {complaint.city}</Card.Text>
                <Card.Text><b>State:</b> {complaint.state}</Card.Text>
                <Card.Text><b>Pincode:</b> {complaint.pincode}</Card.Text>
                <Card.Text><b>Comment:</b> {complaint.comment}</Card.Text>
                <Card.Text><b>Status:</b> {complaint.status}</Card.Text>

                <Button
                  onClick={() => handleToggle(complaint._id)}
                  aria-controls={`collapse-${complaint._id}`}
                  aria-expanded={open}
                  variant="primary"
                >
                  Message
                </Button>

                <Collapse in={open} dimension="width">
                  <div id={`collapse-${complaint._id}`} style={{ marginTop: '12px' }}>
                    <Card body style={{ width: '250px' }}>
                      <ChatWindow
                        key={complaint._id}
                        complaintId={complaint._id}
                        name={complaint.name}
                      />
                    </Card>
                  </div>
                </Collapse>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <Alert variant="info">
          <Alert.Heading>No complaints to show</Alert.Heading>
        </Alert>
      )}
    </div>
  );
};

export default Status;
