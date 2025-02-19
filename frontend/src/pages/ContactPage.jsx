import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Asset from "../assets/img/asset-1.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { useClientStore } from "@/store/useClientStore";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const { isSendingMessage, sendMessage } = useClientStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Handle form submission
      sendMessage(formData);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#1B2A4A] py-20 text-white relative z-0">
        <div
          className={`absolute inset-0 bg-cover bg-center opacity-20 -z-10`}
          style={{ backgroundImage: `url(${Asset})` }}
        />
        <div className="container mx-auto px-4">
          <h1 className="text-center text-4xl font-bold font-serif">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-center text-gray-300">
            Get in touch with us for any queries about moot court competitions,
            membership, or general information
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl  font-bold">
                  Send us a message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="min-h-[200px] resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSendingMessage}
                    variant={"default"}
                    className="w-full"
                    size={"lg"}
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-6 text-2xl font-bold ">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="mr-4 h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-gray-600">
                        Department of Law
                        <br />
                        University of Calcutta
                        <br />
                        51/1, Hazra Rd, Ballygunge
                        <br />
                        Kolkata, West Bengal 700019
                      </p>
                    </div>
                  </div>
                  <Link
                    to={"tel:+919331079392"}
                    className="flex items-start hover:underline duration-300 transition-all w-max"
                  >
                    <Phone className="mr-4 h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-gray-600">+91 9331079392</p>
                    </div>
                  </Link>
                  <Link
                    to={`mailto:culawmcc@gmail.com`}
                    className="flex items-start hover:underline duration-300 transition-all w-max"
                  >
                    <Mail className="mr-4 h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-600">culawmcc@gmail.com</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Map */}
              <div>
                <h2 className="mb-4 text-2xl font-bold">Location</h2>
                <div className="h-[300px] overflow-hidden rounded-lg bg-gray-200 border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.416965638333!2d88.36071207512522!3d22.52604807952492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0276d7daf6fbc7%3A0x9f5bf1da9c5d6c8d!2sDepartment%20of%20Law%2C%20University%20of%20Calcutta!5e0!3m2!1sen!2sin!4v1739724205282!5m2!1sen!2sin"
                    style={{ border: 0 }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  ></iframe>
                  <div className="h-full w-full bg-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
