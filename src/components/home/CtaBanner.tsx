import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-24 bg-[#f8f5f0]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="gradient-ocean rounded-3xl p-12 lg:p-16 relative overflow-hidden text-center">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-amber-400/10 translate-y-1/2 -translate-x-1/4" />
          <div className="absolute inset-0 net-pattern opacity-20" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 rounded-full px-4 py-2 text-sm text-amber-300 font-medium mb-6">
              <Mail className="w-4 h-4" /> Get in Touch Today
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5">
              Ready to Place an Order?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Contact us for bulk pricing, custom specifications, or a free consultation.
              Our team responds within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-[#0d3b66] font-bold rounded-xl hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/30"
              >
                Request a Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
