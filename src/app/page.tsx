export default function UnderConstruction() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated Icon */}
        <div className="mb-8 animate-pulse">
          <span className="text-8xl">⏳</span>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Coming Soon
        </h1>
        
        {/* Tagline */}
        <p className="text-xl md:text-2xl text-purple-200 mb-8">
          Welcome to your life — in numbers.
        </p>
        
        {/* Description */}
        <p className="text-slate-400 mb-12 max-w-md mx-auto">
          We&apos;re building something special. A new way to visualize your journey through time.
        </p>
        
        {/* Decorative Line */}
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-8"></div>
        
        {/* Brand */}
        <p className="text-slate-500 text-sm">
          getlifestats.com
        </p>
      </div>
    </main>
  );
}
