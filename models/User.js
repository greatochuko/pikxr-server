import mongoose, { mongo } from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter your name"] },
    email: {
      type: String,
      unique: [true, "User alread exists"],
      required: [true, "Please enter your email"],
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      minlength: [6, "Password must be greater than 6 characters"],
    },
  },
  { timestamps: true }
);

// Hash password before saving user
UserSchema.pre("save", function (next) {
  console.log(this);
  next();
});

export const User = mongoose.model("user", UserSchema);
