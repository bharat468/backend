// import React, { useState, useEffect } from "react";

// const images = [
//   "/banner1.png",
//   "/banner2.png",
// ];

// function Banner() {
//   const [index, setIndex] = useState(0);

//   // Auto slide
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % images.length);
//     }, 3500);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full overflow-hidden relative mt-6 mb-12">
//       {/* Slider wrapper */}
//       <div
//         className="flex transition-transform duration-900 ease-out"
//         style={{ transform: `translateX(-${index * 100}%)` }}
//       >
//         {images.map((src, i) => (
//           <div key={i} className="w-full flex-shrink-0">
//             <img
//               src={src}
//               alt="banner"
//               className="w-full h-[260px] sm:h-[380px] md:h-[480px] object-fill rounded-b-xl"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Dots */}
//       <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
//         {images.map((_, i) => (
//           <span
//             key={i}
//             className={`h-2 w-2 rounded-full transition-all ${
//               index === i
//                 ? "bg-teal-600 scale-125 shadow-lg"
//                 : "bg-white/60"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Banner;
