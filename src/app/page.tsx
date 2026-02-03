export default function UnderConstruction() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Animated Icon */}
        <div className="mb-8 animate-pulse">
          <span className="text-8xl">⏳</span>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-white">
          Coming Soon
        </h1>
      </div>
    </main>
  );
}
