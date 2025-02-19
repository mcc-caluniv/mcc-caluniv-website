import { useState } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";

export default function AddMemberForm() {
  const [eventData, setEventData] = useState({
    name: "",
    email: "",
    phone: "",
    timeframe: "",
    designation: "",
    image: null,
    previewImage: null,
    socialHandles: {},
  });

  const [newPlatform, setNewPlatform] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const { addMember, isAddingMember } = useAdminStore();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      toast.error("Image size should not exceed 2MB.");
      return;
    }

    setIsCompressing(true);

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
        setEventData((prev) => ({
          ...prev,
          image: reader.result,
          previewImage: reader.result,
        }));
        setIsCompressing(false);
      };
    } catch (error) {
      console.error("Image compression error:", error);
      setIsCompressing(false);
    }
  };

  const addSocialHandle = () => {
    if (!newPlatform.trim() || !newUrl.trim()) {
      toast.error("Please enter both platform name and URL.");
      return;
    }

    if (eventData.socialHandles[newPlatform]) {
      toast.error("Platform already exists.");
      return;
    }

    setEventData((prev) => ({
      ...prev,
      socialHandles: {
        ...prev.socialHandles,
        [newPlatform]: newUrl,
      },
    }));

    setNewPlatform("");
    setNewUrl("");
  };

  const handleSocialHandleChange = (e, platform) => {
    setEventData((prev) => ({
      ...prev,
      socialHandles: {
        ...prev.socialHandles,
        [platform]: e.target.value,
      },
    }));
  };

  const removeSocialHandle = (platform) => {
    setEventData((prev) => {
      const updatedHandles = { ...prev.socialHandles };
      delete updatedHandles[platform];
      return { ...prev, socialHandles: updatedHandles };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !eventData.name ||
      !eventData.email ||
      !eventData.phone ||
      !eventData.timeframe ||
      !eventData.designation ||
      !eventData.image ||
      Object.values(eventData.socialHandles).some((url) => !url.trim()) // Ensure all URLs are filled
    ) {
      toast.error(
        "Please fill in all fields and upload an image and social media URLs."
      );
      return;
    }

    await addMember(eventData);

    setEventData({
      name: "",
      email: "",
      phone: "",
      timeframe: "",
      designation: "",
      image: null,
      previewImage: null,
      socialHandles: {}, // Reset socialHandles as an object
    });
  };

  return (
    <ScrollArea className="h-96">
      <form onSubmit={handleSubmit} className="container">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Upload */}
          <div className="relative flex flex-col items-center justify-center w-full md:w-1/3 h-56 bg-gray-200 rounded-lg border border-dashed border-gray-400 cursor-pointer">
            <Label
              htmlFor="memberImage"
              className="w-full h-full flex items-center justify-center"
            >
              {isCompressing ? (
                <Loader2 className="animate-spin" size={24} />
              ) : eventData.previewImage ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={eventData.previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <Button
                    className="absolute top-2 right-2"
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() =>
                      setEventData((prev) => ({
                        ...prev,
                        previewImage: null,
                        image: null,
                      }))
                    }
                  >
                    <Trash2 />
                  </Button>
                </div>
              ) : (
                <>
                  <ImagePlus size={24} className="text-gray-500" />
                  <p className="text-gray-500 mt-2">Click to add image</p>
                </>
              )}
            </Label>
            <Input
              id="memberImage"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Member Details */}
          <div className="flex flex-col w-full md:w-2/3 space-y-4">
            <div>
              <Label>Member Name</Label>
              <Input
                value={eventData.name}
                placeholder="Jhon Doe"
                onChange={(e) =>
                  setEventData({ ...eventData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="mcc@example.com"
                  value={eventData.email}
                  onChange={(e) =>
                    setEventData({ ...eventData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  type="tel"
                  placeholder={"+91"}
                  value={eventData.phone}
                  onChange={(e) =>
                    setEventData({ ...eventData, phone: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Time Frame</Label>
                <Input
                  value={eventData.timeframe}
                  placeholder={"e.g. 2021-2025"}
                  onChange={(e) =>
                    setEventData({ ...eventData, timeframe: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Designation</Label>
                <Input
                  value={eventData.designation}
                  placeholder="President"
                  onChange={(e) =>
                    setEventData({ ...eventData, designation: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Handles */}
        <div className="mt-6 space-y-4">
          <Label>Social Media Handles</Label>
          {Object.entries(eventData.socialHandles).map(([platform, url]) => (
            <div key={platform} className="flex items-center gap-2">
              <Label className="border py-2.5 px-2 rounded-lg border-neutral-300">
                {platform}
              </Label>
              <Input
                value={url}
                onChange={(e) => handleSocialHandleChange(e, platform)}
                placeholder="URL"
                required
              />
              <Button
                type="button"
                onClick={() => removeSocialHandle(platform)}
                variant="outline"
                className="text-red-500"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          ))}

          <div className="flex items-center gap-2">
            <Input
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value)}
              placeholder="Platform Name"
            />
            <Input
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="URL"
            />
            <Button type="button" onClick={addSocialHandle} variant="outline">
              Add
            </Button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full mt-6"
          size={"lg"}
          disabled={isCompressing || isAddingMember}
        >
          {isCompressing
            ? "Compressing..."
            : isAddingMember
            ? "Creating..."
            : "Create Member"}
        </Button>
      </form>
    </ScrollArea>
  );
}
