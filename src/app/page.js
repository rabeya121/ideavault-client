"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import axios from "axios";
import {
  FaRocket, FaLightbulb, FaUsers, FaArrowRight,
  FaStar, FaFire, FaEye, FaUser, FaClock,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { BsBraces } from "react-icons/bs";
import useTitle from "@/hook/useTitle";



const slides = [
  {
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1400",
    icon: <FaLightbulb className="text-yellow-300 text-6xl mx-auto mb-4" />,
    tag: "💡 Share Ideas",
    title: "Turn Your Vision Into Reality",
    subtitle: "Share your startup ideas with a passionate community and get the feedback you need to grow.",
    cta: "Explore Ideas",
    href: "/ideas",
    stats: [
      { icon: <FaStar />, label: "500+ Ideas" },
      { icon: <FaUsers />, label: "1K+ Users" },
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400",
    icon: <FaRocket className="text-orange-300 text-6xl mx-auto mb-4" />,
    tag: "🚀 Trending Now",
    title: "Discover What's Hot Right Now",
    subtitle: "Explore the most innovative and trending startup ideas from creators around the world.",
    cta: "See Trending",
    href: "/ideas",
    stats: [
      { icon: <FaFire />, label: "Trending Daily" },
      { icon: <HiSparkles />, label: "Top Picks" },
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400",
    icon: <FaUsers className="text-green-300 text-6xl mx-auto mb-4" />,
    tag: "🤝 Collaborate",
    title: "Build Together, Grow Together",
    subtitle: "Comment, discuss, and help refine concepts with like-minded innovators and entrepreneurs.",
    cta: "Join Community",
    href: "/register",
    stats: [
      { icon: <BsBraces />, label: "Open Platform" },
      { icon: <FaUsers />, label: "Global Community" },
    ],
  },
];

export default function Home() {
  useTitle("Home");
  const [trendingIdeas, setTrendingIdeas] = useState([]);
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/ideas/trending")
      .then((res) => setTrendingIdeas(res.data))
      .catch(console.error);

    axios
      .get("http://localhost:8000/api/auth/top-contributors")
      .then((res) => setContributors(res.data))
      .catch(console.error);
  }, []);

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
            <div
              className="relative text-white min-h-[520px] flex items-center justify-center px-4"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="max-w-3xl mx-auto text-center py-20 relative z-10">
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1 rounded-full mb-6 border border-white/30">
                  {slide.tag}
                </span>
                {slide.icon}
                <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight drop-shadow-md">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.href}
                  className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg"
                >
                  {slide.cta} <FaArrowRight />
                </Link>
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

        {trendingIdeas.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No trending ideas yet. Be the first to add one!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingIdeas.map((idea) => (
              <div key={idea._id} className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
                <div className="h-48 bg-gradient-to-br from-purple-100 to-indigo-100 overflow-hidden">
                  {idea.imageURL ? (
                    <img src={idea.imageURL} alt={idea.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">💡</div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="inline-block bg-purple-100 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
                    {idea.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{idea.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{idea.shortDescription}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400 mt-auto mb-4">
                    <span className="flex items-center gap-1"><FaUser /> {idea.authorName}</span>
                    <span className="flex items-center gap-1"><FaEye /> {idea.views} views</span>
                    <span className="flex items-center gap-1"><FaClock /> {new Date(idea.createdAt).toLocaleDateString()}</span>
                  </div>
                  <Link href={`/ideas/${idea._id}`} className="w-full text-center bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition font-medium">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/ideas" className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition font-semibold">
            See All Ideas <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* Extra Section 1 - How It Works */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">🚀 How It Works</h2>
            <p className="text-gray-500 mt-2">Simple steps to share your idea with the world</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "📝", title: "Submit Your Idea", desc: "Fill in the details of your startup idea including problem, solution, and target audience." },
              { icon: "🌍", title: "Share With Community", desc: "Your idea gets published and shared with thousands of innovators and entrepreneurs." },
              { icon: "💬", title: "Get Feedback", desc: "Receive comments, suggestions, and validation from the community to refine your idea." },
            ].map((step, i) => (
              <div key={i} className="text-center p-6 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition">
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Section 2 - Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">📂 Browse by Category</h2>
            <p className="text-gray-500 mt-2">Find ideas that match your interests</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Tech", icon: "💻", color: "bg-blue-50 text-blue-600 border-blue-100" },
              { name: "Health", icon: "🏥", color: "bg-green-50 text-green-600 border-green-100" },
              { name: "AI", icon: "🤖", color: "bg-purple-50 text-purple-600 border-purple-100" },
              { name: "Education", icon: "📚", color: "bg-yellow-50 text-yellow-600 border-yellow-100" },
              { name: "Finance", icon: "💰", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
              { name: "Food", icon: "🍔", color: "bg-orange-50 text-orange-600 border-orange-100" },
              { name: "Environment", icon: "🌿", color: "bg-teal-50 text-teal-600 border-teal-100" },
              { name: "Other", icon: "✨", color: "bg-pink-50 text-pink-600 border-pink-100" },
            ].map((cat, i) => (
              <Link key={i} href={`/ideas?category=${cat.name}`}
                className={`flex items-center gap-3 p-4 rounded-2xl border ${cat.color} hover:scale-105 transition-transform font-semibold`}>
                <span className="text-2xl">{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Section 3 - Top Contributors */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 text-sm font-semibold px-4 py-1 rounded-full mb-3">
              <FaStar /> Top Contributors
            </span>
            <h2 className="text-3xl font-bold text-gray-800">🏆 Top Contributors</h2>
            <p className="text-gray-500 mt-2">Our most active community members</p>
          </div>

          {contributors.length === 0 ? (
            <p className="text-center text-gray-400">No contributors yet!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contributors.map((person, i) => (
                <div key={i} className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 text-center relative border border-gray-100">
                  <div className={`absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                    i === 0 ? "bg-yellow-400 text-white" :
                    i === 1 ? "bg-gray-300 text-white" :
                    i === 2 ? "bg-orange-400 text-white" :
                    "bg-purple-100 text-purple-600"
                  }`}>
                    {i + 1}
                  </div>
                  <div className="relative inline-block mb-4">
                    <img
                      src={person.photoURL && person.photoURL.startsWith("http")
                        ? person.photoURL
                        : `https://ui-avatars.com/api/?name=${person.name}&background=7c3aed&color=fff&size=128`
                      }
                      alt={person.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-purple-100"
                    />
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{person.name}</h3>
                  <span className="inline-block bg-purple-100 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    Contributor
                  </span>
                  <div className="flex justify-around mt-2 border-t pt-4">
                    <div className="text-center">
                      <div className="text-yellow-500 font-bold text-sm">⭐ {person.score}</div>
                      <div className="text-xs text-gray-400 mt-1">Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-600 font-bold text-sm">💡 {person.ideaCount}</div>
                      <div className="text-xs text-gray-400 mt-1">Ideas</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
