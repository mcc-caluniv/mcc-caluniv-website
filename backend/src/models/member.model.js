import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    timeframe: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    socialHandles: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Member = mongoose.model("Member", MemberSchema);
export default Member;
