import mongoose from "mongoose";

const awardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    link:{
      type:String,
    }
  },
  { timestamps: true }
);

const Award = mongoose.model("Award", awardSchema);

export default Award;
