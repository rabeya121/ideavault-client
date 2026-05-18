"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import { FaRocket, FaLightbulb, FaUsers, FaArrowRight, FaStar, FaFire } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { BsBraces } from "react-icons/bs";

const slides = [
  {
    icon: <FaLightbulb className="text-yellow-300 text-6xl mx-auto mb-4" />,
    tag: "💡 Share Ideas",
    title: "Turn Your Vision Into Reality",
    subtitle: "Share your startup ideas with a passionate community and get the feedback you need to grow.",
    bg: "from-purple-700 via-purple-600 to-indigo-700",
    cta: "Explore Ideas",
    href: "/ideas",
    stats: [
      { icon: <FaStar />, label: "500+ Ideas" },
      { icon: <FaUsers />, label: "1K+ Users" },
    ],
  },
  {
    icon: <FaRocket className="text-orange-300 text-6xl mx-auto mb-4" />,
    tag: "🚀 Trending Now",
    title: "Discover What's Hot Right Now",
    subtitle: "Explore the most innovative and trending startup ideas from creators around the world.",
    bg: "from-rose-600 via-pink-600 to-orange-500",
    cta: "See Trending",
    href: "/ideas",
    stats: [
      { icon: <FaFire />, label: "Trending Daily" },
      { icon: <HiSparkles />, label: "Top Picks" },
    ],
  },
  {
    icon: <FaUsers className="text-green-300 text-6xl mx-auto mb-4" />,
    tag: "🤝 Collaborate",
    title: "Build Together, Grow Together",
    subtitle: "Comment, discuss, and help refine concepts with like-minded innovators and entrepreneurs.",
    bg: "from-teal-600 via-cyan-600 to-blue-600",
    cta: "Join Community",
    href: "/register",
    stats: [
      { icon: <BsBraces />, label: "Open Platform" },
      { icon: <FaUsers />, label: "Global Community" },
    ],
  },
];

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Banner Slider */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={`bg-gradient-to-br ${slide.bg} text-white min-h-[520px] flex items-center justify-center px-4`}>
              <div className="max-w-3xl mx-auto text-center py-20">

                {/* Tag */}
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1 rounded-full mb-6 border border-white/30">
                  {slide.tag}
                </span>

                {/* Icon */}
                {slide.icon}

                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight drop-shadow-md">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto">
                  {slide.subtitle}
                </p>

                {/* CTA */}
                <Link
                  href={slide.href}
                  className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg"
                >
                  {slide.cta} <FaArrowRight />
                </Link>

                {/* Stats */}
                <div className="flex justify-center gap-6 mt-10">
                  {slide.stats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                      {stat.icon} {stat.label}
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Trending Ideas Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1 rounded-full mb-3">
            <FaFire /> Trending
          </span>
          <h2 className="text-3xl font-bold text-gray-800">🔥 Trending Ideas</h2>
          <p className="text-gray-500 mt-2">Most viewed ideas from our community</p>
        </div>
        <p className="text-center text-gray-400">Ideas will appear here soon...</p>
      </section>

    </div>
  );
}