import React from "react";

function About() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            About Limestone Watch
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Timeless design. Reliable quality. Watches made for everyday style.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* LEFT TEXT */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Who We Are
            </h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Limestone Watch is a modern watch brand focused on delivering
              stylish, durable, and affordable timepieces for everyday use.
              Our watches are designed to complement both casual and formal
              looks.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We believe a watch is not just a time-keeping device, but a part
              of your personality. That’s why we focus on clean design,
              reliable mechanisms, and comfortable wear.
            </p>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-lg">✔ Premium Design</h3>
              <p className="text-slate-600 text-sm">
                Elegant designs suitable for every occasion.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">✔ Trusted Quality</h3>
              <p className="text-slate-600 text-sm">
                Built with durable materials and precise mechanisms.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">✔ Affordable Pricing</h3>
              <p className="text-slate-600 text-sm">
                Premium look without premium prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold text-center mb-10">
            Why Choose Limestone Watch?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-lg p-6 text-center shadow">
              <h3 className="font-semibold mb-2">Modern Styles</h3>
              <p className="text-slate-600 text-sm">
                Designs that match today’s fashion trends.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6 text-center shadow">
              <h3 className="font-semibold mb-2">Comfort First</h3>
              <p className="text-slate-600 text-sm">
                Lightweight and comfortable for all-day wear.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6 text-center shadow">
              <h3 className="font-semibold mb-2">Customer Trust</h3>
              <p className="text-slate-600 text-sm">
                Loved by customers for quality and value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOT NOTE */}
      {/* <section className="text-center py-10 text-slate-500 text-sm">
        © {new Date().getFullYear()} Limestone Watch. All rights reserved.
      </section> */}
    </div>
  );
}

export default About;
