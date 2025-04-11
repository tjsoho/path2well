"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, MapPin, Mail, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    type: "general", // general, consultation, or partnership
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success("Message sent successfully!");
    setIsSubmitting(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      type: "general",
    });
  };

  return (
    <main className="min-h-screen bg-[#001618] overflow-hidden relative">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/newTech.png"
            alt="Contact Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        {/* Circuit Pattern Overlay */}
        <div
          className="absolute inset-0 bg-[url('/images/newTech.png')] opacity-5"
          style={{ backgroundSize: "30px 30px", backgroundRepeat: "repeat" }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#001618]/90 via-[#001618]/80 to-[#001618]/90" />

        <div className="absolute inset-0">
          <Image
            src="/images/newTech.png"
            alt="Contact Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-kiona text-white mb-6"
          >
            Let&apos;s Connect
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto font-kiona"
          >
            Take the first step towards optimal health and wellness
          </motion.p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-[#001618]/50 backdrop-blur-lg rounded-2xl p-8 border border-[#4ECDC4]/20"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#4ECDC4] text-sm mb-2 font-kiona">
                      Inquiry Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-[#001618] border border-[#4ECDC4]/20 text-white focus:outline-none focus:border-[#4ECDC4] transition-colors font-kiona"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="consultation">Book Consultation</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#4ECDC4] text-sm mb-2 font-kiona">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-[#001618] border border-[#4ECDC4]/20 text-white focus:outline-none focus:border-[#4ECDC4] transition-colors font-kiona"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#4ECDC4] text-sm mb-2 font-kiona">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-[#001618] border border-[#4ECDC4]/20 text-white focus:outline-none focus:border-[#4ECDC4] transition-colors font-kiona"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#4ECDC4] text-sm mb-2 font-kiona">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-[#001618] border border-[#4ECDC4]/20 text-white focus:outline-none focus:border-[#4ECDC4] transition-colors font-kiona"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-[#4ECDC4] text-sm mb-2 font-kiona">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-[#001618] border border-[#4ECDC4]/20 text-white focus:outline-none focus:border-[#4ECDC4] transition-colors font-kiona resize-none"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-[#4ECDC4] text-[#001618] rounded-lg font-kiona hover:bg-[#4ECDC4]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-8"
            >
              <div className="bg-[#001618]/50 backdrop-blur-lg rounded-2xl p-8 border border-[#4ECDC4]/20">
                <h2 className="text-2xl font-kiona text-white mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#4ECDC4]/10 rounded-lg">
                      <Phone className="w-6 h-6 text-[#4ECDC4]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-kiona text-white">Phone</h3>
                      <p className="text-white/80 font-kiona">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#4ECDC4]/10 rounded-lg">
                      <Mail className="w-6 h-6 text-[#4ECDC4]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-kiona text-white">Email</h3>
                      <p className="text-white/80 font-kiona">
                        contact@path2well.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#4ECDC4]/10 rounded-lg">
                      <MapPin className="w-6 h-6 text-[#4ECDC4]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-kiona text-white">Location</h3>
                      <p className="text-white/80 font-kiona">
                        123 Health Street
                        <br />
                        Wellness City, WC 12345
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#001618]/50 backdrop-blur-lg rounded-2xl p-8 border border-[#4ECDC4]/20">
                <h2 className="text-2xl font-kiona text-white mb-6">
                  Business Hours
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-kiona">Monday - Friday</span>
                    <span className="text-[#4ECDC4] font-kiona">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-kiona">Saturday</span>
                    <span className="text-[#4ECDC4] font-kiona">10:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-kiona">Sunday</span>
                    <span className="text-[#4ECDC4] font-kiona">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
