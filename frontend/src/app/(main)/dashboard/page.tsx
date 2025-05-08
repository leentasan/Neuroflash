import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gray-800 text-white py-12 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0">
            <h1 className="text-3xl font-bold mb-2">Welcome Back, Anne</h1>
            <p className="text-gray-300 mb-6">
              Embrace your learning journey with AI-powered flashcards
            </p>
            <div className="flex space-x-4">
              <button className="bg-black text-white px-4 py-2 rounded">
                Create Flashcards
              </button>
              <button className="bg-white text-black px-4 py-2 rounded">
                Take quiz
              </button>
            </div>
          </div>
          <div className="bg-blue-900 p-8 rounded w-full md:w-1/3">
            <h2 className="text-xl font-semibold text-center mb-8">
              Learning Progress Visualisation
            </h2>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-6 px-6">
        <div className="container mx-auto">
          <div className="bg-gray-800 rounded-lg text-white p-6 flex flex-wrap justify-between">
            <div className="text-center px-4 py-2">
              <div className="text-2xl font-bold">7 Days</div>
              <div className="text-sm text-gray-300">Current Streak</div>
            </div>
            <div className="text-center px-4 py-2">
              <div className="text-2xl font-bold">156</div>
              <div className="text-sm text-gray-300">Cards Mastered</div>
            </div>
            <div className="text-center px-4 py-2">
              <div className="text-2xl font-bold">125h</div>
              <div className="text-sm text-gray-300">Study Time</div>
            </div>
            <div className="text-center px-4 py-2">
              <div className="text-2xl font-bold">20</div>
              <div className="text-sm text-gray-300">Achievements</div>
            </div>
            <div className="text-center px-4 py-2">
              <div className="text-2xl font-bold">75%</div>
              <div className="text-sm text-gray-300">Retention Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Decks Section */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recently opened decks</h2>
            <Link href="#" className="text-sm">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white p-6 rounded-lg border shadow-sm"
              >
                <div className="text-sm text-blue-600 mb-2">Biology</div>
                <h3 className="text-lg font-semibold mb-4">
                  Cellular Respiration
                </h3>
                <div className="flex justify-between text-sm">
                  <span>100 Cards</span>
                  <span>50% Mastered</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
