const testimonials = [
  {
    quote:
      "Ramesh Traders has been our go-to supplier for trawl nets for 10 years. Consistent quality and fast delivery every single time.",
    name: "Rajesh Pillai",
    role: "Fleet Manager, Kerala Deep Sea Fisheries",
    avatar: "RP",
    rating: 5,
  },
  {
    quote:
      "The polyester thread yarn quality is unmatched. Our production line runs smoother than ever. Highly recommend for industrial use.",
    name: "Meera Sharma",
    role: "Production Head, TextilePro Ltd.",
    avatar: "MS",
    rating: 5,
  },
  {
    quote:
      "Best quality ropes and nets in Patna. We have been buying from Ramesh Traders for years and the consistency is excellent.",
    name: "Sunil Kumar Gupta",
    role: "Wholesale Dealer, Patna",
    avatar: "SK",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-amber-400">★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-amber-600 uppercase tracking-widest mb-3">
            Testimonials
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0d3b66]">
            Trusted by Industry Leaders
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-3xl border border-[#0d3b66]/10 p-8 flex flex-col gap-6 product-card-hover bg-[#f8f5f0]"
            >
              <Stars count={t.rating} />
              <p className="text-[#0d3b66]/70 leading-relaxed italic flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4 pt-2 border-t border-[#0d3b66]/10">
                <div className="w-11 h-11 rounded-full gradient-ocean flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-[#0d3b66] text-sm">{t.name}</p>
                  <p className="text-[#0d3b66]/50 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
