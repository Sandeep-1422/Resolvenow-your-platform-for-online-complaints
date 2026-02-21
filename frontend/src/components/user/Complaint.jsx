import axios from 'axios';
import React, { useState } from 'react';

const Complaint = () => {
   const user = JSON.parse(localStorage.getItem('user'));
   const [userComplaint, setUserComplaint] = useState({
      userId: user._id,
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      status: 'pending',  
      comment: ''
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUserComplaint({ ...userComplaint, [name]: value });
   };

   const handleClear = () => {
      setUserComplaint({
         userId: user._id,
         name: '',
         address: '',
         city: '',
         state: '',
         pincode: '',
         status: 'pending',
         comment: ''
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         await axios.post(`http://localhost:8000/Complaint/${user._id}`, userComplaint);
         alert("Your Complaint has been submitted!");
         handleClear();
      } catch (err) {
         console.error(err);
         alert("Something went wrong while submitting your complaint.");
      }
   };

   return (
      <div className="text-white complaint-box">
         <form onSubmit={handleSubmit} className="compliant-form row bg-dark p-3">
            <div className="col-md-6 p-2">
               <label htmlFor="name" className="form-label">Name</label>
               <input name="name" value={userComplaint.name} onChange={handleChange} type="text" className="form-control" required />
            </div>

            <div className="col-md-6 p-2">
               <label htmlFor="address" className="form-label">Address</label>
               <input name="address" value={userComplaint.address} onChange={handleChange} type="text" className="form-control" required />
            </div>

            <div className="col-md-6 p-2">
               <label htmlFor="city" className="form-label">City</label>
               <input name="city" value={userComplaint.city} onChange={handleChange} type="text" className="form-control" required />
            </div>

            <div className="col-md-6 p-2">
               <label htmlFor="state" className="form-label">State</label>
               <input name="state" value={userComplaint.state} onChange={handleChange} type="text" className="form-control" required />
            </div>

            <div className="col-md-6 p-2">
               <label htmlFor="pincode" className="form-label">Pincode</label>
               <input name="pincode" value={userComplaint.pincode} onChange={handleChange} type="text" pattern="\d{6}" maxLength="6" className="form-control" required />
            </div>

            <div className="col-md-6 p-2">
               <label htmlFor="status" className="form-label">Status</label>
               <input name="status" value={userComplaint.status} readOnly className="form-control" />
            </div>

            <div className="col-12 p-2">
               <label htmlFor="comment" className="form-label">Description</label>
               <textarea name="comment" value={userComplaint.comment} onChange={handleChange} className="form-control" rows="4" required></textarea>
            </div>

            <div className="text-center p-3 col-12">
               <button type="submit" className="btn btn-success">Register Complaint</button>
            </div>
         </form>
      </div>
   );
};

export default Complaint;
