export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-100 mb-4">
            About the <span className="glow-text">Mystery</span>
          </h2>
          <p className="text-xl text-secondary-300 max-w-2xl mx-auto">
            Diving deep into the digital abyss where code meets creativity
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="card">
              <h3 className="text-2xl font-bold text-primary-400 mb-4">The Developer</h3>
              <p className="text-secondary-300 mb-6">
                A passionate coder who thrives on solving complex problems and creating
                elegant solutions. With a background in full-stack development and a
                fascination for emerging technologies.
              </p>
              <div className="code-block">
                <pre className="text-green-400">
{`const developer = {
  name: "Mystery.exe",
  skills: ["React", "Next.js", "TypeScript", "Node.js"],
  passion: "Solving digital mysteries",
  status: "Always learning..."
}`}
                </pre>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h4 className="text-xl font-semibold text-primary-400 mb-3">Problem Solver</h4>
              <p className="text-secondary-300">
                Turning complex challenges into elegant, maintainable solutions
                with clean, efficient code.
              </p>
            </div>

            <div className="card">
              <h4 className="text-xl font-semibold text-primary-400 mb-3">Tech Enthusiast</h4>
              <p className="text-secondary-300">
                Always exploring new technologies, frameworks, and methodologies
                to stay ahead in the ever-evolving tech landscape.
              </p>
            </div>

            <div className="card">
              <h4 className="text-xl font-semibold text-primary-400 mb-3">Open Source Contributor</h4>
              <p className="text-secondary-300">
                Believing in the power of community-driven development and
                contributing back to the ecosystem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
