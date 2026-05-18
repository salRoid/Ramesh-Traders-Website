import { ShieldCheck, Truck, Headphones, Award, Recycle, Globe } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Certified Quality",
    desc: "All products meet ISO 9001 standards with rigorous QA at every stage.",
    color: "text-blue-600 bg-blue-100",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Reliable logistics network ensuring on-time delivery to your doorstep.",
    color: "text-green-600 bg-green-100",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Dedicated account managers and round-the-clock customer support.",
    color: "text-purple-600 bg-purple-100",
  },
  {
    icon: Award,
    title: "45+ Years Expertise",
    desc: "Deep domain knowledge built over decades in the marine supply industry.",
    color: "text-amber-600 bg-amber-100",
  },
  {
    icon: Recycle,
    title: "Sustainable Sourcing",
    desc: "Eco-friendly materials and responsible manufacturing practices.",
    color: "text-teal-600 bg-teal-100",
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "Export network spanning 30+ countries across Asia, Europe, and Americas.",
    color: "text-rose-600 bg-rose-100",
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-[#f8f5f0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <span className="inline-block text-sm font-semibold text-amber-600 uppercase tracking-widest mb-3">
              Why Choose Us
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0d3b66] leading-tight mb-6">
              Built on Trust, <br />Driven by Quality
            </h2>
            <p className="text-[#0d3b66]/60 text-lg leading-relaxed mb-8">
              For over 45 years, Ramesh Traders has been the backbone of marine supply chains
              worldwide. We combine premium materials, stringent testing, and unmatched service
              to deliver products you can depend on.
            </p>

            {/* Ocean wave decoration */}
            <div className="w-full h-24 relative overflow-hidden rounded-2xl gradient-ocean opacity-80">
              <div className="wave-animate absolute bottom-0 flex gap-0" style={{ width: "200%" }}>
                <svg viewBox="0 0 800 60" className="w-[800px] fill-white/20 shrink-0">
                  <path d="M0,30 C100,0 200,60 300,30 C400,0 500,60 600,30 C700,0 800,60 800,30 L800,60 L0,60 Z" />
                </svg>
                <svg viewBox="0 0 800 60" className="w-[800px] fill-white/20 shrink-0">
                  <path d="M0,30 C100,0 200,60 300,30 C400,0 500,60 600,30 C700,0 800,60 800,30 L800,60 L0,60 Z" />
                </svg>
              </div>
              <p className="relative z-10 text-white font-semibold text-center pt-6 text-lg">
                🌊 Sailing strong since 1980
              </p>
            </div>
          </div>

          {/* Right: feature grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-[#0d3b66]/5 product-card-hover"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#0d3b66] mb-1">{f.title}</h3>
                <p className="text-[#0d3b66]/55 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
