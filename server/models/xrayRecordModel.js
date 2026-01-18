// import mongoose from "mongoose";

// const parameterSchema = new mongoose.Schema({
//   overallNotes: {
//       type: String,
//       default: ""
//     },

//     records: [
//       {
//         image: {
//           type: String, // image URL or file path
//           required: true
//         },
//         note: {
//           type: String,
//           default: ""
//         }
//       }
//     ]
  
// }, { _id: false });

// const xrayRecordSchema = new mongoose.Schema({
//   // Flat structure - directly from your frontend data
//   patientId: {
//     type: String,
//     required: true
//   },
//   patientName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   patientUniqueId: {
//     type: String,
//     required: true
//   },
//   age: {
//     type: Number,
//     required: true
//   },
//   gender: {
//     type: String,
//     enum: ['Male', 'Female', 'Other'],
//     required: true
//   },
//   doctorId: {
//     type: String,
//     required: true
//   },
//   doctorName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   testName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   category: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   diagnosis: {
//     type: String,
//     default: ''
//   },
//   overallNotes: {
//     type: String,
//     default: ''
//   },
//   instructions: {
//     type: String,
//     default: ''
//   },
//   parameters: [parameterSchema],
//   performedBy: {
//     type: String,
//     default: 'Lab Technician'
//   },
//   performedDate: {
//     type: Date,
//     default: Date.now
//   },
//   priority: {
//     type: String,
//     enum: ['Routine', 'Urgent', 'STAT', 'Critical','Emergency'],
//     default: 'Routine'
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
//     default: 'Completed'
//   }
// }, {
//   timestamps: true
// });

// const XrayRecord = mongoose.model('XrayRecord', xrayRecordSchema);
// export default XrayRecord;







import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  image: {
    type: String, // Cloudinary URL
    required: true
  },
  cloudinary_id: {
    type: String, // Store Cloudinary public_id for deletion
    required: true
  },
  note: {
    type: String,
    default: ""
  },
  filename: {
    type: String,
    default: ""
  }
}, { _id: false });

const xrayRecordSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'Patient',
    // required: true
  },
  patientName: {
    type: String,
    required: true,
    trim: true
  },
  patientUniqueId: {
    type: String,
    // required: true
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
    type: mongoose.Schema.Types.Mixed,
    ref: 'User',
    // required: true
  },
  doctorName: {
    type: String,
    // required: true,
    trim: true
  },
  testName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    // required: true,
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
  records: [recordSchema],
  performedBy: {
    type: String,
    default: 'X-ray Technician'
  },
  performedDate: {
    type: Date,
    default: Date.now
  },
  priority: {
    type: String,
    enum: ['Routine', 'Urgent', 'STAT', 'Critical', 'Emergency','Normal'],
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

const XrayRecord = mongoose.model('XrayRecord', xrayRecordSchema);
export default XrayRecord;