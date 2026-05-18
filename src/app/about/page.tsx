import Link from "next/link";
import { ArrowRight, Target, Eye, Heart } from "lucide-react";

const timeline = [
  { year: "1980", event: "Founded in Patna City, Bihar — supplying thread and fishing nets to local fishing communities." },
  { year: "1992", event: "Expanded product range into industrial-grade thread yarn and rope, growing our regional presence." },
  { year: "2000", event: "Established long-term partnerships with textile mills and net manufacturers across Bihar." },
  { year: "2010", event: "Grew into one of the most trusted marine supply names in Eastern India." },
  { year: "2018", event: "Modernised operations with digital inventory management and wider distribution reach." },
  { year: "2026", event: "Celebrating 45+ years — a trusted name serving businesses across the region." },
];

const team = [
  { name: "Arjun Mehta", role: "Founder & CEO", initials: "AM", experience: "28 years in marine supply" },
  { name: "Priya Nair", role: "Head of Operations", initials: "PN", experience: "15 years in logistics" },
  { name: "Suresh Krishnan", role: "Chief of Quality", initials: "SK", experience: "20 years in QA" },
  { name: "Fatima Al-Rashid", role: "Export Manager", initials: "FA", experience: "12 years in trade" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-ocean py-28 relative overflow-hidden">
        <div className="absolute inset-0 net-pattern opacity-20" />
        <div className="absolute -bottom-10 right-0 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-sm font-semibold text-amber-400 uppercase tracking-widest mb-4">
              Our Story
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              45+ Years of Marine Excellence
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              From a small fishing net supplier in Mumbai&apos;s harbour to a globally trusted marine
              supply company — our journey is built on integrity, craftsmanship, and an unwavering
              commitment to the people who rely on the sea.
            </p>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { num: "45+", label: "Years" },
              { num: "500+", label: "Clients" },
              { num: "30+", label: "Countries" },
              { num: "200+", label: "Team Members" },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-6 text-center">
                <p className="text-4xl font-bold text-amber-400">{s.num}</p>
                <p className="text-white/70 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" className="w-full fill-[#f8f5f0]">
            <path d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,60L1360,60C1280,60,1120,60,960,60C800,60,640,60,480,60C320,60,160,60,80,60L0,60Z" />
          </svg>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-24 bg-[#f8f5f0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: "Our Mission",
              text: "To supply the world's marine and textile industries with the highest-quality thread, nets, and equipment — at fair prices, with reliable delivery.",
              color: "text-blue-600 bg-blue-100",
            },
            {
              icon: Eye,
              title: "Our Vision",
              text: "To be the most trusted marine supply partner on every ocean — enabling fishing communities, industries, and businesses to thrive.",
              color: "text-teal-600 bg-teal-100",
            },
            {
              icon: Heart,
              title: "Our Values",
              text: "Quality, integrity, sustainability, and community. We care deeply about the people who depend on our products and the oceans they work in.",
              color: "text-rose-600 bg-rose-100",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-3xl p-8 shadow-sm product-card-hover border border-gray-100">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0d3b66] mb-3">{item.title}</h3>
              <p className="text-[#0d3b66]/60 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-amber-600 uppercase tracking-widest mb-3">
              Our Journey
            </span>
            <h2 className="text-4xl font-bold text-[#0d3b66]">Milestones That Shaped Us</h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#0d3b66]/10" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div key={item.year} className="flex gap-8 items-start">
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-full gradient-ocean flex items-center justify-center text-white font-bold text-sm shadow-lg z-10 relative">
                      {item.year}
                    </div>
                  </div>
                  <div className="bg-[#f8f5f0] rounded-2xl p-6 flex-1 mt-2 hover:shadow-md transition-shadow">
                    <p className="text-[#0d3b66]/70 leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-[#f8f5f0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-amber-600 uppercase tracking-widest mb-3">
              Leadership
            </span>
            <h2 className="text-4xl font-bold text-[#0d3b66]">Meet Our Team</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-3xl p-8 text-center shadow-sm product-card-hover border border-gray-100">
                <div className="w-20 h-20 rounded-full gradient-ocean flex items-center justify-center text-white font-bold text-xl mx-auto mb-5 shadow-lg">
                  {member.initials}
                </div>
                <h3 className="font-bold text-[#0d3b66] text-lg">{member.name}</h3>
                <p className="text-amber-600 font-medium text-sm mt-1">{member.role}</p>
                <p className="text-[#0d3b66]/50 text-sm mt-2">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-warm">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Partner With Us</h2>
          <p className="text-white/60 text-lg mb-8">
            Join 500+ businesses that trust Ramesh Traders for their supply needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-[#0d3b66] font-bold rounded-xl hover:bg-amber-300 transition-colors shadow-lg"
          >
            Get in Touch <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
