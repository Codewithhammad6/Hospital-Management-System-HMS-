import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validator: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    unique: true,
  },
  password: {
    type: String,
    select: false,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
    maxlength: [32, "Password cannot exceed 32 characters"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken:String,
  role:{
     type: String,
    required: true
  },
  uniqueId:{
  type: String,
    required: true,
  },
phone: {
  type: String,
  match: [/^03\d{9}$/, "Phone number must be 11 digits and start with 03"],
},

  address:{
type: String,
default: "None",
  },
emergencyContact: {
  type: String,
  match: [/^03\d{9}$/, "Emergency contact must be valid"],
},

bloodGroup: {
  type: String,
  enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-","Unknown"],
},

allergies: {
  type: String,
  default: "None",
},
SpecialistDoctor:{
 type: String,
  default: "None",
},
    ConsultationCharges:{
 type: String,
  default: "None",
    },
    ConsultationTime:{
 type: String,
  default: "None",
    },
    ConsultationTimePerPatient:{
 type: String,
  default: "None",
    },
    TotalAppointments:{
 type: String,
  default: "None",
    },
    licenseNumber:{
 type: String,
  default: "None",
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash Password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});


// Compare Password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// JWT Token
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY,
     {expiresIn: process.env.JWT_EXPIRE});
    return token;
};

//  Generate a 5-digit verification code
userSchema.methods.generateCode = function () {
  const code = Math.floor(10000 + Math.random() * 90000).toString();
  this.verificationToken = code;
  return code;
};



const User = mongoose.model("User", userSchema);
export default User;
