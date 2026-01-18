import mongoose from "mongoose";

const walkInXraySchema = new mongoose.Schema({
  // Patient Information
  patientName: {
    type: String,
    required: true
  },
  patientUniqueId: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  phone: {
    type: String,
    default: null
  },
  
  // Test Information
  testName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['chest', 'abdomen', 'spine', 'skull', 'extremities', 'dental', 'mammography', 'other']
  },
  overallNotes: {
    type: String,
    default: ''
  },
  instructions: {
    type: String,
    default: ''
  },
  priority: {
    type: String,
    enum: ['emergency', 'urgent', 'routine'],
    default: 'routine'
  },
  
  // X-ray Images
  images: [{
    image: {
      type: String, // Cloudinary URL
      required: true
    },
    cloudinary_id: {
      type: String, // Cloudinary public_id
      required: true
    },
    note: {
      type: String,
      default: ''
    },
    filename: {
      type: String,
      default: ''
    }
  }],
  
  // Technician Information
  performedBy: {
    type: String,
    required: true
  },
  performedDate: {
    type: Date,
    default: Date.now
  },
  
  // Status
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Completed'
  },
  
  // Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const WalkInXray = mongoose.model('WalkInXray', walkInXraySchema);
export default WalkInXray;