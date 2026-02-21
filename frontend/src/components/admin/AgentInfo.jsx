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

const AgentInfo = () => {
  const navigate = useNavigate();
  const [agentList, setAgentList] = useState([]);
  const [toggle, setToggle] = useState({});
  const [updateAgent, setUpdateAgent] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setUpdateAgent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit updated data
  const handleSubmit = async (e, userId) => {
    e.preventDefault(); // prevent form reload
    if (!updateAgent.name && !updateAgent.email && !updateAgent.phone) {
      alert("At least one field must be filled");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to update the agent?");
    if (!confirmed) return;

    try {
      const res = await axios.put(`http://localhost:8000/user/${userId}`, updateAgent);
      alert("Agent updated successfully");

      // Update the local agentList
      setAgentList((prevList) =>
        prevList.map((agent) =>
          agent._id === userId ? { ...agent, ...res.data } : agent
        )
      );
    } catch (err) {
      console.error("Error updating agent:", err);
    }
  };

  // Get agent list
  useEffect(() => {
    const getAgentRecords = async () => {
      try {
        const response = await axios.get('http://localhost:8000/AgentUsers');
        setAgentList(response.data);
      } catch (error) {
        console.error("Error fetching agent list:", error);
      }
    };
    getAgentRecords();
  }, [navigate]);

  // Delete agent
  const deleteUser = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this agent?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:8000/OrdinaryUsers/${userId}`);
      setAgentList((prevList) => prevList.filter((agent) => agent._id !== userId));
    } catch (error) {
      console.error("Error deleting agent:", error);
    }
  };

  // Toggle update form
  const handleToggle = (agentId) => {
    setToggle((prevState) => ({
      ...prevState,
      [agentId]: !prevState[agentId],
    }));

    // Reset updateAgent form fields
    const currentAgent = agentList.find((a) => a._id === agentId);
    if (currentAgent) {
      setUpdateAgent({
        name: currentAgent.name || '',
        email: currentAgent.email || '',
        phone: currentAgent.phone || '',
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
              {agentList.length > 0 ? (
                agentList.map((agent) => {
                  const open = toggle[agent._id] || false;
                  return (
                    <tr key={agent._id}>
                      <td>{agent.name}</td>
                      <td>{agent.email}</td>
                      <td>{agent.phone}</td>
                      <td>
                        <Button
                          onClick={() => handleToggle(agent._id)}
                          aria-controls={`collapse-${agent._id}`}
                          aria-expanded={open}
                          className="mx-2"
                          variant="outline-warning"
                        >
                          Update
                        </Button>

                        <Collapse in={open}>
                          <div>
                            <Form onSubmit={(e) => handleSubmit(e, agent._id)} className="p-3">
                              <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="name"
                                  value={updateAgent.name}
                                  onChange={handleChange}
                                  placeholder="Enter name"
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                  type="email"
                                  name="email"
                                  value={updateAgent.email}
                                  onChange={handleChange}
                                  placeholder="Enter email"
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                  type="tel"
                                  name="phone"
                                  value={updateAgent.phone}
                                  onChange={handleChange}
                                  placeholder="Enter phone no."
                                />
                              </Form.Group>
                              <Button size="sm" variant="outline-success" type="submit">
                                Submit
                              </Button>
                            </Form>
                          </div>
                        </Collapse>

                        <Button
                          onClick={() => deleteUser(agent._id)}
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
                      <Alert.Heading>No Agents to show</Alert.Heading>
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

export default AgentInfo;
