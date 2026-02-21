const mongoose = require("mongoose");

//////////////////// USER SCHEMA ////////////////////
const userSchema = mongoose.Schema({
  name: { type: String, required: 'Name is required' }, 
  email: { type: String, required: 'Email is required' },
  password: { type: String, required: 'Password is required' },
  phone: { type: Number, required: 'Phone is required' },
  userType: { type: String, required: 'UserType is required' },
}, {
  timestamps: true
});


const UserSchema = mongoose.model("user_Schema", userSchema);

//////////////////// COMPLAINT SCHEMA ////////////////////
const complaintSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user_Schema" },
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: Number, required: true },
  comment: { type: String, required: true },
  status: { type: String, required: true },
});

const ComplaintSchema = mongoose.model("complaint_schema", complaintSchema);

//////////////////// ASSIGNED COMPLAINT SCHEMA ////////////////////
const assignedComplaint = mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user_Schema" },
  complaintId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "complaint_schema" },
  status: { type: String, required: true },
  agentName: { type: String, required: true },
});

const AssignedComplaint = mongoose.model("assigned_complaint", assignedComplaint);

//////////////////// MESSAGE SCHEMA ////////////////////
const messageSchema = new mongoose.Schema({
  name: { type: String, required: 'Name is required' }, // fixed grammar
  message: { type: String, required: 'Message is required' },
  complaintId: { type: mongoose.Schema.Types.ObjectId, ref: "assigned_complaint" },
}, { timestamps: true });

const MessageSchema = mongoose.model("message", messageSchema);

//////////////////// EXPORTING SCHEMAS ////////////////////
module.exports = {
  UserSchema,
  ComplaintSchema,
  AssignedComplaint,
  MessageSchema,
};
