import mongoose from "mongoose";

const PartnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Partner = mongoose.model("Partner", PartnerSchema);
export default Partner;
