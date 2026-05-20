import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            💡 IdeaVault
          </h2>
          <p className="text-sm text-gray-400">
            A platform to share, discover, and validate innovative startup ideas.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Platform</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/ideas" className="hover:text-white">Ideas</a></li>
            <li><a href="/add-idea" className="hover:text-white">Add Idea</a></li>
            <li><a href="/my-ideas" className="hover:text-white">My Ideas</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>

          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-gray-400" />
              ideavault@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-400" />
              Dhaka, Bangladesh
            </li>
            <li className="flex gap-4 mt-2 items-center">

              <a href="#" target="_blank">
                <img
                  src="/images/facebook.png"
                  alt="Facebook"
                  className="w-6 h-6 hover:scale-110 transition"
                />
              </a>

              <a href="#" target="_blank">
                <img
                  src="/images/instagram.png"
                  alt="Instagram"
                  className="w-6 h-6 hover:scale-110 transition"
                />
              </a>

              <a href="#" target="_blank">
                <img
                  src="/images/twitter.png"
                  alt="Twitter"
                  className="w-6 h-6 hover:scale-110 transition"
                />
              </a>

            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © 2026 IdeaVault. All rights reserved.
      </div>
    </footer>
  );
}