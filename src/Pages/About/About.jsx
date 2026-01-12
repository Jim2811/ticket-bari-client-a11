import React from "react";
import { FaHandsHelping, FaGlobeAsia, FaShieldAlt } from "react-icons/fa";
import { MdOutlineRocketLaunch } from "react-icons/md";
import teamImg from "../../assets/banner.png";
import bannerImg from "../../assets/banner.png"

const About = () => {
  return (
    <section className="min-h-screen bg-base-200 text-base-content">
      <div
        className="h-72 w-full bg-cover bg-center relative flex items-center justify-center"
        style={{
          backgroundImage: `url(${bannerImg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <h1 className="relative text-4xl md:text-5xl font-bold text-white">
          About TicketBari
        </h1>
      </div>

      <div className="container mx-auto px-6 py-16 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Our Story
          </h2>
          <p className="text-base-content/70 text-sm md:text-base leading-relaxed">
            TicketBari started with a vision to make traveling easier for everyone in Bangladesh.
            We bring together multiple transport services—bus, train, launch, and airlines—into one seamless platform,
            so you can book tickets anytime, anywhere, with complete confidence and security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-base-100 border border-base-300 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <FaHandsHelping className="text-5xl text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-base-content mb-2">
              Our Mission
            </h3>
            <p className="text-sm text-base-content/70 leading-relaxed">
              To simplify the ticket booking process and connect travelers
              with trusted transport providers through a single digital platform.
            </p>
          </div>

          <div className="bg-base-100 border border-base-300 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <MdOutlineRocketLaunch className="text-5xl text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-base-content mb-2">
              Our Vision
            </h3>
            <p className="text-sm text-base-content/70 leading-relaxed">
              To become Bangladesh’s most reliable ticket booking platform and contribute to a fully digital transport ecosystem.
            </p>
          </div>

          <div className="bg-base-100 border border-base-300 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <FaShieldAlt className="text-5xl text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-base-content mb-2">
              Our Promise
            </h3>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Safety, transparency, and trust are at the heart of everything we do. 
              We ensure secure payments and verified vendors only.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-20">
          <div className="md:w-1/2 space-y-5">
            <h2 className="text-3xl font-bold text-primary">Meet Our Team</h2>
            <p className="text-base-content/70 leading-relaxed text-sm md:text-base">
              A small team with big dreams. Our developers, designers, and support specialists are driven by one goal: 
              to make transportation more accessible and smoother for you. We’re a proud Bangladeshi startup, 
              constantly evolving to serve you better every day.
            </p>
            <div className="flex items-center gap-3">
              <FaGlobeAsia className="text-2xl text-primary" />
              <p className="text-sm text-base-content/70">
                Serving passengers all over Bangladesh with dedication.
              </p>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src={teamImg}
              alt="Team"
              className="rounded-xl shadow-md border border-base-300"
            />
          </div>
        </div>

        <div className="text-center mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
            Join Us on This Journey
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto text-sm md:text-base">
            We’re always working to improve your travel experience.
            Thank you for trusting TicketBari as your travel companion.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;