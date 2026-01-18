import mongoose from "mongoose";

const parameterSchema = new mongoose.Schema({
  parameter: {
    type: String,
    required: true,
    trim: true
  },
  value: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    default: ''
  },
  normalRange: {
    type: String,
    default: ''
  },
  flag: {
    type: String,
    enum: ['Normal', 'High', 'Low', 'Critical'],
    required: true
  },
  notes: {
    type: String,
    default: ''
  }
}, { _id: false });

const labRecordSchema = new mongoose.Schema({
  // Flat structure - directly from your frontend data
  patientId: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
    trim: true
  },
  patientUniqueId: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  doctorId: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    required: true,
    trim: true
  },
  testName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  diagnosis: {
    type: String,
    default: ''
  },
  overallNotes: {
    type: String,
    default: ''
  },
  instructions: {
    type: String,
    default: ''
  },
  parameters: [parameterSchema],
  performedBy: {
    type: String,
    default: 'Lab Technician'
  },
  performedDate: {
    type: Date,
    default: Date.now
  },
  priority: {
    type: String,
    enum: ['Routine', 'Urgent', 'STAT', 'Critical','Emergency'],
    default: 'Routine'
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Completed'
  }
}, {
  timestamps: true
});

const LabRecord = mongoose.model('LabRecord', labRecordSchema);
export default LabRecord;
