const skills = [
  { name: 'JavaScript/TypeScript', level: 95, color: 'bg-yellow-500' },
  { name: 'React/Next.js', level: 90, color: 'bg-blue-500' },
  { name: 'Node.js', level: 85, color: 'bg-green-500' },
  { name: 'Python', level: 80, color: 'bg-blue-600' },
  { name: 'Database Design', level: 75, color: 'bg-purple-500' },
  { name: 'DevOps/CI/CD', level: 70, color: 'bg-red-500' },
  { name: 'Cloud Platforms', level: 75, color: 'bg-indigo-500' },
  { name: 'UI/UX Design', level: 65, color: 'bg-pink-500' },
]

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary-800/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-100 mb-4">
            Technical <span className="glow-text">Arsenal</span>
          </h2>
          <p className="text-xl text-secondary-300">
            Weapons of choice in the battle against complexity
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <div key={skill.name} className="card">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-secondary-100">{skill.name}</h3>
                <span className="text-primary-400 font-mono">{skill.level}%</span>
              </div>
              <div className="w-full bg-secondary-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                  style={{
                    width: `${skill.level}%`,
                    animationDelay: `${index * 0.1}s`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block card">
            <h3 className="text-xl font-bold text-primary-400 mb-4">Always Learning</h3>
            <div className="code-block">
              <pre className="text-green-400 text-sm">
{`while (true) {
  learn_new_technology();
  solve_complex_problems();
  create_amazing_solutions();
  contribute_to_open_source();
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
