import { useState } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Loader2, Trash2 } from "lucide-react"; // Added Loader2 icon
import { toast } from "sonner";
import imageCompression from "browser-image-compression";

export default function CreateEventForm() {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    dateTime: "",
    location: "",
    link: "",
    image: null,
    previewImage: null,
  });

  const [isCompressing, setIsCompressing] = useState(false); // New state for loader
  const { createEvent, isCreatingEvent } = useAdminStore();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Restrict size (e.g., 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      toast.error("Image size should not exceed 2MB.");
      return;
    }

    setIsCompressing(true); // Show loader

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onload = async () => {
        const base64Image = reader.result;
        setEventData({
          ...eventData,
          image: base64Image,
          previewImage: base64Image,
        });
        setIsCompressing(false); // Hide loader after compression
      };
    } catch (error) {
      console.error("Image compression error:", error);
      setIsCompressing(false); // Hide loader on error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !eventData.name ||
      !eventData.description ||
      !eventData.dateTime ||
      !eventData.location ||
      !eventData.link ||
      !eventData.image
    ) {
      toast.error("Please fill in all fields and upload an image.");
      return;
    }

    await createEvent(eventData);

    setEventData({
      name: "",
      description: "",
      dateTime: "",
      location: "",
      link: "",
      image: null,
      previewImage: null,
    });
  };

  return (
    <ScrollArea className="h-96">
      <form onSubmit={handleSubmit} className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="mb-4 md:mb-0">
            <Label
              htmlFor="eventImage"
              className="h-full min-h-48 w-full bg-neutral-200 border border-dashed border-gray-400 cursor-pointer rounded-xl flex items-center justify-center text-muted-foreground gap-x-2 relative overflow-hidden"
            >
              {isCompressing ? (
                <Loader2 className="animate-spin" size={24} />
              ) : eventData.previewImage ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={eventData.previewImage}
                    alt="Preview"
                    className="h-full object-cover absolute top-0"
                  />
                  <Button
                    className="absolute top-2 right-2"
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() =>
                      setEventData({
                        ...eventData,
                        previewImage: null,
                        image: null,
                      })
                    }
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              ) : (
                <>
                  <ImagePlus size={20} />
                  <p>Click to add image</p>
                  <span className="sr-only">Event Image</span>
                </>
              )}
            </Label>
            <Input
              id="eventImage"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="eventName">Event Name</Label>
              <Input
                id="eventName"
                placeholder="e.g. National Moot Court Competition"
                name="name"
                value={eventData.name}
                onChange={(e) =>
                  setEventData({ ...eventData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="eventDescription">Description</Label>
              <Textarea
                id="eventDescription"
                name="description"
                placeholder="Description goes here..."
                value={eventData.description}
                onChange={(e) =>
                  setEventData({ ...eventData, description: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="eventDate">Date & Time</Label>
              <Input
                id="eventDate"
                type="datetime-local"
                name="dateTime"
                value={eventData.dateTime}
                onChange={(e) =>
                  setEventData({ ...eventData, dateTime: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="eventLocation">Location</Label>
              <Input
                id="eventLocation"
                name="location"
                placeholder="e.g. Kolkata"
                value={eventData.location}
                onChange={(e) =>
                  setEventData({ ...eventData, location: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="eventLink">Event Registration Link</Label>
              <Input
                id="eventLink"
                name="link"
                placeholder="Registration form url"
                value={eventData.link}
                onChange={(e) =>
                  setEventData({ ...eventData, link: e.target.value })
                }
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              size={"lg"}
              disabled={isCreatingEvent || isCompressing}
            >
              {isCompressing
                ? "Compressing Image..."
                : isCreatingEvent
                ? "Creating..."
                : "Create Event"}
            </Button>
          </div>
        </div>
      </form>
    </ScrollArea>
  );
}
