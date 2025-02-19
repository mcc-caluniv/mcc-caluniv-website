import Event from "../models/event.model.js";



export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ dateTime: -1 });

    if (!events.length) {
      return res.status(404).json({ message: "No events found" });
    }
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    console.log("Error in getEventsController: ", error.message);
  }
};


