import mongoose, { Schema, models } from "mongoose";

const GuestSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["pendente", "ausente", "confirmado"],
      required: true,
    },
  },
  { timestamps: true, versionKey: false, strict: true }
);

const Guest = models.Guest || mongoose.model("Guest", GuestSchema);

export default Guest;
