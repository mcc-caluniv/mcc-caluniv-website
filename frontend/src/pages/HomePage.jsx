import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  ArrowRight,
  Award,
  Calendar,
  CalendarDays,
  GlobeIcon,
  ImagesIcon,
  Link2Icon,
  Mail,
  MapPin,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react"; // Import Trophy
import Asset from "../assets/img/asset-1.png";
import { motion } from "framer-motion";
import { useClientStore } from "../store/useClientStore";
import { useEffect } from "react";
import { Badge } from "../components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useAdminStore } from "../store/useAdminStore";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function HomePage() {
  const { latestEvent, fetchLatestEvent, isLoadingEvent } = useClientStore();
  const { awards, partners, getPartners, getAwards } = useAdminStore();

  useEffect(() => {
    fetchLatestEvent();
    getAwards();
    getPartners();
  }, [fetchLatestEvent, getAwards, getPartners]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[600px] overflow-hidden bg-[#1B2A4A] text-white z-20">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="cursor-grab"
        >
          <CarouselContent>
            {/* Hero Section */}
            <CarouselItem className="relative">
              <div className="grid grid-cols-1 container min-h-[600px] items-center justify-items-center z-0">
                <div
                  className={`absolute inset-0 bg-cover bg-center opacity-20 -z-10`}
                  style={{ backgroundImage: `url(${Asset})` }}
                />
                <div className="relative z-10 mx-auto py-20 text-center">
                  <h1 className="font-serif text-3xl font-bold leading-tight md:text-5xl">
                    Moot Court Committee
                  </h1>
                  <span className="text-xl text-primary md:text-2xl font-bold">
                    Department of Law, University of Calcutta
                  </span>
                  <p className="mx-auto md:mx-0 mt-6 max-w-2xl text-lg text-gray-300">
                    We strive to achieve new heights in the field of mooting,
                    continually pushing the boundaries of excellence.
                  </p>
                  <div className="mt-8 flex justify-center gap-4 flex-wrap">
                    <Button variant="default" asChild>
                      <Link to="/events">Upcoming Events</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-transparent"
                      asChild
                    >
                      <Link to="/about">Learn More</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Latest Event Section */}
            {latestEvent !== null && (
              <CarouselItem className="relative">
                {isLoadingEvent ? (
                  <p className="text-center text-gray-300">Loading events...</p>
                ) : (
                  <div className="container h-full flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-12 md:py-20">
                    <img
                      src={latestEvent.image}
                      className={`absolute w-full h-full inset-0 object-cover object-center opacity-20 -z-10`}
                    />
                    <div className="text-center max-w-2xl">
                      <h3 className="text-xl md:text-2xl font-bold text-primary pb-1">
                        Latest Event
                      </h3>
                      <h3 className="text-3xl md:text-5xl font-bold text-white pb-1 font-serif">
                        {latestEvent.name}
                      </h3>
                      <p className="mb-2 text-lg text-gray-300">
                        {latestEvent.description}
                      </p>

                      {latestEvent.status ? (
                        <Badge className="bg-green-500">Active</Badge>
                      ) : (
                        <Badge variant="destructive">Closed</Badge>
                      )}

                      <div className="mt-4 space-y-2 text-gray-300">
                        <div className="flex items-center gap-2 text-base justify-center">
                          <CalendarDays className="h-4 w-4" />
                          {new Date(latestEvent.dateTime).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-2 text-base justify-center">
                          <MapPin className="h-4 w-4" />
                          {latestEvent.location}
                        </div>
                        {latestEvent.status && (
                          <div className="flex items-center gap-2 text-base justify-center">
                            <Link2Icon className="h-4 w-4" />
                            {latestEvent.link}
                          </div>
                        )}
                        <Button
                          disabled={!latestEvent.status}
                          className="w-max z-20"
                        >
                          <Link to={latestEvent.link}>Register Now</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CarouselItem>
            )}
          </CarouselContent>
          <div className="absolute bottom-0 right-14 flex items-center justify-center ">
            <CarouselPrevious className="relative left-0 translate-x-0 bg-transparent z-30" />
          </div>
          <div className="absolute bottom-0 right-4 flex items-center justify-center ">
            <CarouselNext className="relative right-0 translate-x-0 bg-transparent z-30" />
          </div>
        </Carousel>
      </section>

      {/* Features Section */}
      <section className="pt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold font-serif text-primary">
            About MOOT COURT COMMITTEE
          </h2>
          <p className="text-center">
            Department of Law - University of Calcutta
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Link to={"/"}>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm hover:translate-y-4 duration-300 transition-all">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1B2A4A]">
                  <ImagesIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold ">Image Gallary</h3>
                <p className="text-gray-600">
                  Proven track record of success in national and international
                  moot court competitions
                </p>
              </div>
            </Link>
            <div className="rounded-lg bg-white p-6 text-center shadow-sm hover:translate-y-4 duration-300 transition-all">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1B2A4A]">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold ">MCC Specific Rules</h3>
              <p className="text-gray-600">
                Guidance from experienced faculty and legal professionals
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-sm hover:translate-y-4 duration-300 transition-all">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1B2A4A]">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold ">Past Secretaries</h3>
              <p className="text-gray-600">
                Carrying forward the prestigious legacy of University of
                Calcutta
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold font-serif text-primary mb-8">
            Awards & Achievements
          </h2>

          <Table className="[mask-image:linear-gradient(to_bottom,transparent,black_0%,black_70%,transparent)]">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Award</TableHead>
                <TableHead className="text-center">Description</TableHead>
                <TableHead className="text-center">Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {awards.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-600">
                    No Awards
                  </TableCell>
                </TableRow>
              ) : (
                awards.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">
                      {new Date(item.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">{item.title}</TableCell>
                    <TableCell className="text-center">
                      {item.description}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.link || "No link provided"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Recent latestEvent Section */}
      <section className="bg-gray-50 py-20 overflow-hidden relative container mb-20 ">
        <h2 className="text-center text-3xl font-bold font-serif mb-14 text-primary">
          OUR PARTNERS
        </h2>
        <div className="w-full flex overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_40%,black_70%,transparent)]">
          <motion.div className="flex gap-6 w-max animate-scroll hover:[animation-play-state:paused]">
            {[...partners].map((partner, index) => (
              <div
                key={partner.name}
                className="relative w-80 h-[23rem] group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition duration-300 transform hover:-translate-y-3 flex flex-col items-center cursor-pointer"
              >
                {/* Profile Image */}
                <div className="w-full h-60 overflow-hidden rounded-t-2xl py-8">
                  <LazyLoadImage
                    effect="blur"
                    src={partner.image}
                    alt={partner.name}
                    width={"100%"}
                    height={"100%"}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 w-full p-5 bg-white/80 backdrop-blur-md text-center rounded-b-2xl">
                  <>
                    <h3 className="text-xl font-bold text-[#1B2A4A]">
                      {partner.name}
                    </h3>
                    <p className="text-gray-600">{partner.description}</p>
                  </>
                  <div className="flex items-center justify-center gap-x-2 mt-4">
                    <Link
                      to={`mailto:${partner.email}`}
                      className=" duration-200 bg-gray-200 p-2.5 rounded-xl text-black"
                    >
                      <Mail size={18} />
                    </Link>
                    <Link
                      to={partner.link}
                      className="duration-200 bg-gray-200 p-2.5 rounded-xl text-black"
                    >
                      <GlobeIcon size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1B2A4A] py-20 text-white relative z-10">
        <div
          className={`absolute inset-0 bg-cover bg-center opacity-20 rotate-180 -z-10`}
          style={{ backgroundImage: `url(${Asset})` }}
        />
        <div className="container mx-auto px-4 text-center z-10">
          <h2 className="text-3xl font-bold font-serif">From the MCC</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Take the first step towards excellence in mooting and legal advocacy
          </p>
          <Button variant={"secondary"} size="lg" className="mt-8" asChild>
            <Link to="/events">
              Explore Events <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
