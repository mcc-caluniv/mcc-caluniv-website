import Contact from "../models/contact.model.js";
import Event from "../models/event.model.js";
import Member from "../models/member.model.js";

export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    if (!members) {
      return res.status(404).json({ message: "No members found" });
    }
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: "Error fetching members" });
  }
};

export const submitContactForm = async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;

    // Validate form fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Save to database
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      subject,
      message,
    });
    await newContact.save();

    res
      .status(201)
      .json({ message: "Your message has been submitted successfully." });
  } catch (error) {
    console.error("Error in submitContactForm:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLatestEvent = async (req, res) => {
  try {
    const latestEvent = await Event.findOne().sort({ dateTime: -1 });

    if (!latestEvent) {
      return res.status(404).json({ message: "No events found" });
    }

    res.status(200).json(latestEvent);
  } catch (error) {
    console.error("Error in getLatestEvent:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

