import Link from "next/link";
import { Anchor, Mail, Phone, MapPin, Globe, Share2, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="gradient-warm text-white">
      {/* Wave divider */}
      <div className="overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" className="w-full fill-[#f8f5f0]">
          <path d="M0,32L60,26.7C120,21,240,11,360,16C480,21,600,43,720,48C840,53,960,43,1080,37.3C1200,32,1320,32,1380,32L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center">
                <Anchor className="w-5 h-5 text-[#0d3b66]" />
              </div>
              <span className="font-bold text-lg">
                Ramesh<span className="text-amber-400"> Traders</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Trusted suppliers of premium thread yarn, fishing nets, and marine equipment since 1980.
            </p>
            <div className="flex gap-3 pt-2">
              {[Globe, Share2, ExternalLink].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-400 hover:text-[#0d3b66] transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-amber-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-white mb-4">Our Products</h3>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="hover:text-amber-400 transition-colors cursor-pointer">Thread Yarn</li>
              <li className="hover:text-amber-400 transition-colors cursor-pointer">Fishing Nets</li>
              <li className="hover:text-amber-400 transition-colors cursor-pointer">Marine Equipment</li>
              <li className="hover:text-amber-400 transition-colors cursor-pointer">Ropes & Cordage</li>
              <li className="hover:text-amber-400 transition-colors cursor-pointer">Custom Orders</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span>Khajekalan, near Janta Market, Patna City, Bihar 800008</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <span>+91 93085 70270</span>
                  <span>+91 93341 17166</span>
                  <span>+91 93867 51306</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>rameshtraderssutawale@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© {new Date().getFullYear()} Ramesh Traders. All rights reserved.</p>
          <p>Crafted with precision for the marine industry.</p>
        </div>
      </div>
    </footer>
  );
}
