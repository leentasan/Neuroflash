export default function Footer() {
    return (
      <footer className="bg-white py-8 px-6 border-t">
        <div className="container mx-auto grid grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">NeuroFlash</h3>
            <p className="text-sm text-gray-600">AI-powered learning platform</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>Flashcards</li>
              <li>Quizzes</li>
              <li>Analytics</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>About</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <p className="text-sm text-gray-600">Social Media</p>
            <p className="text-sm text-gray-600 mt-6">Copyright</p>
          </div>
        </div>
      </footer>
    );
  }