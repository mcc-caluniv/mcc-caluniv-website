import React, { useEffect } from "react";
import { CalendarDays, Link2Icon, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import BG from "../assets/img/asset-1.png";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "../store/useAdminStore";
import { Card } from "../components/ui/card";
import { Link } from "react-router-dom";

export default function EventsPage() {
  const { events, isEventsLoading, getEvents } = useAdminStore();
  const navigate = useNavigate();

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <section className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#1B2A4A] py-20 text-white relative z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 -z-10"
          style={{ backgroundImage: `url(${BG})` }}
        />
        <div className="container mx-auto px-4">
          <h1 className="text-center text-4xl font-bold font-serif">
            Upcoming Events
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-gray-300">
            Discover and participate in our upcoming moot court competitions and
            sessions.
          </p>
        </div>
      </div>

      {/* Events List */}
      <div className="container my-20 px-4">
        <div className="space-y-12">
          {isEventsLoading ? (
            <p className="text-center text-lg font-semibold">
              Loading events...
            </p>
          ) : events.length === 0 ? (
            <p className="text-center text-lg font-semibold">
              No events found.
            </p>
          ) : (
            events.map((event, index) => (
              <Card className="flex flex-col md:flex-row overflow-hidden hover:-translate-y-4 duration-300 hover:shadow-md">
                {/* Left Side Image with Fade Effect */}
                <div
                  className="relative w-full md:w-1/2 min-h-72 h-auto bg-cover bg-center [mask-image:linear-gradient(to_bottom,transparent,black_0%,black_20%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_0%,black_20%,transparent)]"
                  style={{
                    backgroundImage: `url(${event.image})`,
                  }}
                />

                {/* Right Side Content */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                  <h3 className="text-xl md:text-3xl font-normal text-gray-900">
                    {event.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    {event.status ? (
                      <Badge className="bg-green-500">Active</Badge>
                    ) : (
                      <Badge variant="destructive">Closed</Badge>
                    )}
                  </div>
                  <div className="mt-6 space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-5 w-5 text-gray-500" />
                      {new Date(event.dateTime).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      {event.location}
                    </div>
                    {event.status && (
                      <div className="flex items-center gap-2">
                        <Link2Icon className="h-5 w-5 text-gray-500" />
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-[#25407b] hover:underline ${
                            event.status
                              ? "pointer-events-auto"
                              : "pointer-events-none cursor-not-allowed"
                          }`}
                        >
                          {event.link}
                        </a>
                      </div>
                    )}
                  </div>
                  <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="mt-8">
                    <Button
                      disabled={!event.status}
                      className="w-full"
                      size={"lg"}
                    >
                      <Link to={event.link}>Register Now</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
