export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-secondary-900 to-accent-900/20"></div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
          <span className="text-secondary-100">Welcome to </span>
          <span className="glow-text">Mystery.exe</span>
        </h1>

        <p className="text-xl sm:text-2xl text-secondary-300 mb-8 max-w-2xl mx-auto">
          Unleash the power of code in a world of digital mysteries.
          Where algorithms meet imagination and bugs become features.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="btn-primary">
            Explore Code
          </button>
          <button className="btn-secondary">
            View Projects
          </button>
        </div>

        <div className="mt-16">
          <div className="terminal max-w-2xl mx-auto">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-secondary-400 ml-4">Terminal - Mystery.exe</span>
            </div>
            <div className="text-green-400">
              <p>$ whoami</p>
              <p className="typing-effect">developer | coder | mystery_solver</p>
              <p className="mt-2">$ ./run_mystery.sh</p>
              <p className="text-primary-400 animate-pulse">Initializing mystery protocol...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent-500/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-secondary-400/10 rounded-full blur-xl"></div>
    </section>
  )
}
