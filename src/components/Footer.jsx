export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">💡 IdeaVault</h2>
          <p className="text-sm text-gray-400">
            A platform to share, discover, and validate innovative startup ideas.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Platform</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/ideas" className="hover:text-white">Ideas</a></li>
            <li><a href="/add-idea" className="hover:text-white">Add Idea</a></li>
            <li><a href="/my-ideas" className="hover:text-white">My Ideas</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>📧 support@ideavault.com</li>
            <li>📍 Dhaka, Bangladesh</li>
            <li className="flex gap-3 mt-2">
              <a href="#" className="hover:text-white">Facebook</a>
              <a href="#" className="hover:text-white">LinkedIn</a>
              <a href="#" className="hover:text-white">𝕏</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © 2024 IdeaVault. All rights reserved.
      </div>
    </footer>
  );
}