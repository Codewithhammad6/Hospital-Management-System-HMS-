import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  patientName: {
    type: String,
  },
  patientPhone: {
    type: String,
    default: "N/A",
  },
  PharmacyPerson: {
    type: String,
    required: [true, "Pharmacy person is required"],
  },
  charges: {
    type: Number,
    required: [true, "Total charges are required"],
    min: [0, "Charges cannot be negative"],
  },
  medicines: [
    {
      medicineName: {
        type: String,
        required: [true, "Medicine name is required"],
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
      },

pharmacyCharges: {
  type: Number,
  default: 0, // required ko hata kar default set karen
  min: [0, "Charges cannot be negative"],
},


    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field on save
medicineSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
});

const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;