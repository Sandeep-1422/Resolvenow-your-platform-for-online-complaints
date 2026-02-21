import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatWindow = ({ name, complaintId }) => {
  const [messageInput, setMessageInput] = useState('');
  const [messageList, setMessageList] = useState([]);
  const messageWindowRef = useRef(null);

  // Fetch messages
  const fetchMessageList = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/messages/${complaintId}`);
      setMessageList(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Fetch on complaintId change
  useEffect(() => {
    fetchMessageList();
  }, [complaintId]);

  // Auto-scroll
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const scrollToBottom = () => {
    if (messageWindowRef.current) {
      messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight;
    }
  };

  // Send new message
  const sendMessage = async () => {
    if (!messageInput.trim()) return;

    try {
      const data = { name, message: messageInput, complaintId };
      await axios.post('http://localhost:8000/messages', data);
      setMessageInput('');
      fetchMessageList();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <h5>Message Box</h5>
      <div className="message-window" ref={messageWindowRef} style={{ maxHeight: '200px', overflowY: 'auto', padding: '5px', border: '1px solid lightgray' }}>
        {messageList.slice().reverse().map((msg) => (
          <div className="message" key={msg._id}>
            <p><b>{msg.name}:</b> {msg.message}</p>
            <p style={{ fontSize: '10px', marginTop: '-10px' }}>
              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},
              {' '}
              {new Date(msg.createdAt).toLocaleDateString()}
            </p>
            <hr />
          </div>
        ))}
      </div>
      <div className="input-container d-flex mt-2">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button className="btn btn-success" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
