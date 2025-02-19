import Admin from "../models/admin.model.js";
import cloudinary from "../lib/cloudinary.config.js";
import Member from "../models/member.model.js";
import Event from "../models/event.model.js";
import Contact from "../models/contact.model.js";
import Award from "../models/award.model.js";
import Partner from "../models/partner.model.js";

export const getAllAdminRequests = async (req, res) => {
  try {
    const requests = await Admin.find({ isVerified: false })
      .sort({
        dateTime: 1,
      })
      .select("-password");

    if (!requests.length) {
      // return res.status(404).json({ message: "No requests found" });
      return;
    }

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    console.log("Error in getEventsController: ", error.message);
  }
};

export const updateVerificationStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (typeof status !== "boolean") {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const admin = await Admin.findById(userId);

    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    if (admin.isVerified === status) {
      return res.status(200).json({
        message: status
          ? "Admin is already verified"
          : "Admin request is already denied",
      });
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      userId,
      { isVerified: status },
      { new: true }
    );

    res.status(200).json({
      message: status
        ? "Admin verified successfully"
        : "Admin verification request denied",
    });
  } catch (error) {
    console.error("Error updating verification status:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addMember = async (req, res) => {
  try {
    const { name, email, phone, timeframe, designation, image, socialHandles } =
      req.body;
    //Form validation
    if (
      !name ||
      !email ||
      !phone ||
      !timeframe ||
      !designation ||
      !image ||
      !socialHandles
    ) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    //Upload the image to cloud
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    //Adding the uploaded link & saving the event
    const newMember = new Member({
      name,
      email,
      phone,
      timeframe,
      designation,
      image: imageUrl,
      socialHandles,
    });

    await newMember.save();

    res.status(201).json(newMember);
  } catch (error) {
    console.log("Error in createEventController: ", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    // Find member by ID
    const member = await Member.findById(id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Delete image from Cloudinary
    if (member.image) {
      const imagePublicId = member.image.split("/").pop().split(".")[0]; // Extract public ID
      await cloudinary.uploader.destroy(imagePublicId);
    }

    // Delete member from database
    await Member.findByIdAndDelete(id);

    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMember: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateEventStatus = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { status } = req.body;

    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required" });
    }

    // Find and update event status
    const event = await Event.findByIdAndUpdate(
      eventId,
      { status },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ event });
  } catch (error) {
    console.error("Error updating event status:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { name, description, dateTime, location, link, image } = req.body;

    // console.log(name, description, dateTime, location, link, image);

    //Form validation
    if (!name || !description || !dateTime || !location || !link || !image) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    //Upload the image to cloud
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    //Adding the uploaded link & saving the event
    const newEvent = new Event({
      name,
      description,
      dateTime,
      location,
      link,
      image: imageUrl,
    });

    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (error) {
    console.log("Error in createEventController: ", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete event image from Cloudinary if it exists
    if (event.image) {
      const publicId = event.image.split("/").pop().split(".")[0]; // Extract publicId
      await cloudinary.uploader.destroy(publicId);
    }

    // Delete event from database
    await Event.findByIdAndDelete(eventId);

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.log("Error in deleteEventController:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    if (!messages || messages.length === 0) {
      return res.status(404).json({ message: "No messages found" });
    }
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getAllMessages:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add a new award
export const addAward = async (req, res) => {
  try {
    const { title, description, date, link } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAward = new Award({ title, description, date, link });
    await newAward.save();

    res
      .status(201)
      .json({ message: "Award added successfully", award: newAward });
  } catch (error) {
    console.error("Error adding award:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all awards
export const getAwards = async (req, res) => {
  try {
    const awards = await Award.find().sort({ date: -1 });
    res.status(200).json(awards);
  } catch (error) {
    console.error("Error fetching awards:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete an award by ID
export const deleteAward = async (req, res) => {
  try {
    const { id } = req.params;
    const award = await Award.findById(id);

    if (!award) {
      return res.status(404).json({ message: "Award not found" });
    }

    await Award.findByIdAndDelete(id);
    res.status(200).json({ message: "Award deleted successfully" });
  } catch (error) {
    console.error("Error deleting award:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add a new partner (Partner)
export const addPartner = async (req, res) => {
  try {
    const { name, email, description, image, link } = req.body;

    if (!name || !email || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new Partner (partner)
    const newPartner = new Partner({ name, email, description, image, link });
    await newPartner.save();

    res
      .status(201)
      .json({ message: "Partner added successfully", partner: newPartner });
  } catch (error) {
    console.error("Error adding partner:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all partners (Partners)
export const getPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    res.status(200).json(partners);
  } catch (error) {
    console.error("Error fetching partners:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a partner by ID
export const deletePartner = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the partner by ID
    const partner = await Partner.findById(id);
    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    // Delete the partner from the database
    await Partner.findByIdAndDelete(id);

    res.status(200).json({ message: "Partner deleted successfully" });
  } catch (error) {
    console.error("Error deleting partner:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
