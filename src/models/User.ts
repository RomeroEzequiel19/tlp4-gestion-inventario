import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    done: Boolean,
    rol: Number
  },
  {
    timestamps: true,
  }
);

export default model("users", UserSchema);
