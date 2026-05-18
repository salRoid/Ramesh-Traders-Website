"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    product: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="gradient-ocean py-24 relative overflow-hidden">
        <div className="absolute inset-0 net-pattern opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="inline-block text-sm font-semibold text-amber-400 uppercase tracking-widest mb-4">
            Contact Us
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-white/70 text-xl max-w-xl mx-auto">
            Request a quote, ask a question, or just say hello. We respond within 24 hours.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" className="w-full fill-[#f8f5f0]">
            <path d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,60L1360,60C1280,60,1120,60,960,60C800,60,640,60,480,60C320,60,160,60,80,60L0,60Z" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-[#f8f5f0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-[#0d3b66] mb-2">Contact Details</h2>
              <p className="text-[#0d3b66]/60">Reach us through any of the channels below.</p>
            </div>

            {[
              {
                icon: MapPin,
                title: "Our Office",
                lines: ["Khajekalan, near Janta Market", "Patna City, Kali Asthan", "Patna, Bihar 800008"],
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: Phone,
                title: "Phone",
                lines: ["+91 93085 70270", "+91 93341 17166", "+91 93867 51306"],
                color: "bg-green-100 text-green-600",
              },
              {
                icon: Mail,
                title: "Email",
                lines: ["info@marinethread.com", "sales@marinethread.com"],
                color: "bg-purple-100 text-purple-600",
              },
              {
                icon: Clock,
                title: "Working Hours",
                lines: ["Mon – Sat: 9:00 AM – 6:00 PM IST", "Sun: Closed"],
                color: "bg-amber-100 text-amber-600",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#0d3b66] mb-1">{item.title}</p>
                  {item.lines.map((line) => (
                    <p key={line} className="text-[#0d3b66]/55 text-sm">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12 gap-5">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0d3b66]">Message Sent!</h3>
                  <p className="text-[#0d3b66]/60 max-w-sm">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", product: "", message: "" }); }}
                    className="mt-2 px-6 py-3 bg-[#0d3b66] text-white rounded-xl font-semibold hover:bg-[#1b6ca8] transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-[#0d3b66] mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-[#0d3b66] mb-1.5">Full Name *</label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0d3b66]/30 focus:border-[#0d3b66] text-sm transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#0d3b66] mb-1.5">Email *</label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0d3b66]/30 focus:border-[#0d3b66] text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0d3b66] mb-1.5">Company Name</label>
                      <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Your company"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0d3b66]/30 focus:border-[#0d3b66] text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0d3b66] mb-1.5">Product Interest</label>
                      <select
                        name="product"
                        value={form.product}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0d3b66]/30 focus:border-[#0d3b66] text-sm transition-all bg-white text-[#0d3b66]"
                      >
                        <option value="">Select a product category</option>
                        <option>Thread Yarn</option>
                        <option>Fishing Nets</option>
                        <option>Marine Equipment</option>
                        <option>Custom Order</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0d3b66] mb-1.5">Message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us about your requirements, quantities, or any questions..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0d3b66]/30 focus:border-[#0d3b66] text-sm transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 gradient-ocean text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                    >
                      <Send className="w-5 h-5" /> Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#0d3b66]">Find Us</h2>
            <p className="text-[#0d3b66]/55 mt-2">
              Khajekalan, near Janta Market, Patna City, Bihar
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100" style={{ height: "450px" }}>
            <iframe
              title="Ramesh Traders Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.3!2d85.2017!3d25.6097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58c5b7e8d3d1%3A0x0!2sKhajekalan%2C%20Patna%20City%2C%20Bihar%20800008!5e0!3m2!1sen!2sin!4v1715680000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center text-sm text-[#0d3b66]/60">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Khajekalan, near Janta Market, Patna City, Kali Asthan, Patna, Bihar 800008</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
