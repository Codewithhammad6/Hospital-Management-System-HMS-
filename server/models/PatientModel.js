import mongoose from "mongoose";
import Counter from "./counterModel.js";

//          Patient ID 
const generatePatientID = async () => {
  const today = new Date();
  const dateKey = today
    .toISOString()
    .slice(2, 10)
    .replace(/-/g, ""); // YYMMDD

  const counter = await Counter.findOneAndUpdate(
    { date: dateKey },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const paddedSeq = counter.seq.toString().padStart(4, "0");
  return `HMS-${dateKey}-${paddedSeq}`;
};

/* ---------------- Schema ---------------- */
const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
    },

    weight: {
      type: Number,
      required: true,
      min: 0,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
  phone: {
  type: String,
  match: [/^03\d{9}$/, "Phone number must be 11 digits and start with 03"],
},
bloodGroup: {
  type: String,
  enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-","Unknown"],
},
    uniqueID: {
      type: String,
      unique: true,
      index: true,
    },

 doctorAppointment: {
      doctorId: {
       type: String,
      },
      doctorName: {
        type: String,
      },
      charges: {
        type: Number,
        default: 0
      },
      appointmentDate: {
        type: Date,
        default: Date.now,
      },
      licenseNumber:{
        type: String,
      },
      status: {
        type: String,
        enum: ["Pending", "Completed", "Cancelled","Come"],
        default: "Pending",
      },
      appointmentNumber:{
         type: Number,
        default: 0
      },
    },




prescriptions: [
  {
    doctorId: {
      type: String,
      required: true
    },

    doctorName: {
      type: String,
      required: true
    },

    specialist: {
      type: String, // e.g. Cardiologist, Orthopedic, ENT
      required: true
    },

    prescribedDate: {
      type: Date,
      default: Date.now
    },

    diagnosis: {
      type: String // optional: fever, infection etc
    },
 charges: {
        type: Number,
        default: 0
      },
       status: {
        type: String,
        enum: ["Pending", "Completed", "Cancelled"],
        default: "Pending",
      },
      PharmacyPerson:{
 type: String 
      },
    medicines: [
      {
        medicineName: {
          type: String,
          required: true
        },

        dosage: {
          type: String, 
        },

        quantity: {
          type: Number,
        },

        frequency: {
          type: String,
          enum: [
            "Once a day",
            "Twice a day",
            "Three times a day",
            "Morning",
            "Morning & Evening",
            "Morning Afternoon Night",
            "Night"
          ],
          required: true
        },

        timing: {
          type: String,
          enum: [
            "Before Meal",
            "After Meal",
            "With Meal"
          ],
          required: true
        },

        duration: {
          type: String,
          // e.g. "5 days", "1 week", "10 days"
          required: true
        },

        notes: {
          type: String // e.g. "Avoid cold water"
        }
      }
    ]
  }
],




recommendedTests: [{
    doctorId: String,
    doctorName: String,
    specialist: String,
    recommendedDate: {
      type: String,
      default: () => new Date().toISOString()
    },
    diagnosis: String,
    tests: [{
      testName: String,
      category: String,
      xRay: Boolean,
      priority: {
        type: String,
        enum: ['Normal', 'Urgent', 'Emergency'],
        default: 'Normal'
      },
      instructions: String,
      notes: String,
      status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Pending'
      },
      result: {
        type: String,
        default: ''
      },
      resultDate: String,
      labTechnician: String
    }]
  }],




},{ timestamps: true }
);



        //  Auto-generate UniqueID
patientSchema.pre("save", async function () {
  if (!this.uniqueID) {
    this.uniqueID = await generatePatientID();
  }

});


const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
