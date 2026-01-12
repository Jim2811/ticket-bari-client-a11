import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="min-h-screen bg-base-200 text-base-content">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
          Contact Us
        </h1>
        <p className="text-center text-base-content/70 mb-10 max-w-2xl mx-auto">
          Have questions or need support? Reach out to us anytime, and our team will get back to you as soon as possible.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-base-100 border border-base-300 rounded-xl shadow-md p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Get in Touch
            </h2>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-primary text-xl" />
              <p className="text-sm text-base-content/80">Hotline: +880 1736 093199</p>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-primary text-xl" />
              <p className="text-sm text-base-content/80">support@ticketbari.com</p>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-primary text-xl" />
              <p className="text-sm text-base-content/80">
                123 Dhaka City, Bangladesh
              </p>
            </div>

            <div className="border-t border-base-300 my-6"></div>

            <h3 className="text-lg font-semibold mb-3">Support Hours</h3>
            <p className="text-sm text-base-content/70">Everyday: 9 AM – 10 PM</p>

            <div className="border-t border-base-300 my-6"></div>

            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-circle btn-outline btn-sm text-primary hover:bg-primary hover:text-base-100"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-circle btn-outline btn-sm text-primary hover:bg-primary hover:text-base-100"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-circle btn-outline btn-sm text-primary hover:bg-primary hover:text-base-100"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="bg-base-100 border border-base-300 rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-primary mb-6">
              Send a Message
            </h2>
            {submitted ? (
              <div className="alert alert-success shadow-md">
                <FaPaperPlane className="text-green-600 text-2xl" />
                <span>Your message has been sent successfully!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-base-content/70 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-base-content/70 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-base-content/70 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full resize-none"
                    placeholder="Type your message..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full normal-case flex items-center justify-center gap-2"
                >
                  <FaPaperPlane /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;