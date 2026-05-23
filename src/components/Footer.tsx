import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

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
                <span className="text-[#0d3b66] font-black text-sm leading-none">RT</span>
              </div>
              <span className="font-bold text-lg">
                Ramesh<span className="text-amber-400"> Traders</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Trusted suppliers of premium thread yarn, fishing nets, and marine equipment since 1980.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="https://wa.me/919308570270"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-all"
                title="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </a>
              <a
                href="mailto:rameshtraderssutawale@gmail.com"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-400 hover:text-[#0d3b66] transition-all"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
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
          <p>A Legacy of Trust & Quality in Bihar Since 1980</p>
        </div>
      </div>
    </footer>
  );
}
