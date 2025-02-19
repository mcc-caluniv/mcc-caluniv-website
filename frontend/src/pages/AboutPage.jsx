import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import Asset from "../assets/img/asset-1.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAdminStore } from "../store/useAdminStore";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function About() {
  const { members, getMembers, isMembersLoading } = useAdminStore();
  const navigate = useNavigate();

  // Fetch events when the component mounts
  useEffect(() => {
    getMembers();
  }, [getMembers]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-[#1B2A4A] py-20 text-white text-center z-0">
        <div
          className={`absolute inset-0 bg-cover bg-center opacity-20 -z-10`}
          style={{ backgroundImage: `url(${Asset})` }}
        />
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-wide font-serif">
            About Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            The Moot Court Committee is a student run committee entrusted with
            the responsibility of administering and facilitating all
            mooting-related activities at Department of Law, University of
            Calcutta.
          </p>
        </div>
      </section>

      {/* Committee Members */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-[#1B2A4A] font-serif">
            Office Bearers
          </h2>

          <div className="w-full py-4 mx-auto">
            {isMembersLoading ? (
              <p className="text-center">Loading members..</p>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-8">
                {members.map((member) => (
                  <div
                    key={member.name}
                    className="relative w-80 h-96 group overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-3 flex flex-col items-center"
                  >
                    {/* Profile Image */}
                    <div className="w-full h-60 overflow-hidden rounded-t-2xl">
                      <LazyLoadImage
                        src={member.image}
                        alt={member.name}
                        effect="blur"
                        width={"100%"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 w-full p-5 bg-white/80 backdrop-blur-md text-center rounded-b-2xl">
                      <h3 className="text-xl font-bold text-[#1B2A4A]">
                        {member.name}
                      </h3>
                      <p className="text-gray-600">{member.designation}</p>
                      <p className="text-gray-600">{member.timeframe}</p>

                      {/* Social Handles */}
                      <div className="mt-4 flex justify-center gap-4">
                        {Object.entries(member.socialHandles || {}).map(
                          ([platform, link]) => {
                            const icons = {
                              linkedin: <Linkedin size={20} />,
                              github: <Github size={20} />,
                              twitter: <Twitter size={20} />,
                              facebook: <Facebook size={20} />,
                              instagram: <Instagram size={20} />,
                            };

                            return (
                              <a
                                key={platform}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 duration-200 bg-gray-200 text-black p-2.5 rounded-xl"
                              >
                                {icons[platform.toLowerCase()] || (
                                  <Globe size={20} />
                                )}
                              </a>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* History & Achievements */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-[#1B2A4A] font-serif">
            Our Legacy
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-[#1B2A4A]">History</h3>
              <p className="text-gray-600 ">
                Established in 1995, the Moot Court Committee of the University
                of Calcutta has been at the forefront of legal education and
                advocacy training. Over the years, we have evolved into a
                premier institution for mooting excellence, producing numerous
                distinguished legal professionals.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-[#1B2A4A]">
                Key Achievements
              </h3>
              <ul className="list-inside list-image-none space-y-3  text-gray-600">
                <li>🏆 National Moot Court Champions 2023</li>
                <li>📜 Best Memorial Award at International Law Competition</li>
                <li>
                  🌍 Host of the prestigious South Asian Moot Court Competition
                </li>
                <li>🎓 Recognition for Excellence in Legal Education</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
