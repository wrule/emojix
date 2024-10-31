import NavBar from '@/components/NavBar';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <NavBar />
      
      {/* Hero Section with Padding for NavBar */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-6xl font-bold text-primary-900 mb-6">
            Welcome to the Future of Web3 🌟
          </h1>
          <p className="text-xl text-primary-800 max-w-2xl">
            Revolutionizing the digital landscape with decentralized solutions and 
            blockchain technology. Join us in building the next generation of the internet.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary-900 mb-12 text-center">
            Key Features 💎
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🔐', title: 'Secure', desc: 'Enterprise-grade security with advanced encryption' },
              { icon: '⚡', title: 'Fast', desc: 'Lightning-fast transactions and minimal latency' },
              { icon: '🌍', title: 'Scalable', desc: 'Built to scale globally with increasing demand' }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-bold text-primary-800 mb-2">{feature.title}</h3>
                <p className="text-primary-700">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: '100K+', label: 'Active Users' },
              { value: '$10M+', label: 'Total Value Locked' },
              { value: '99.9%', label: 'Uptime' },
              { value: '150+', label: 'Countries' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-primary-700 mb-2">{stat.value}</div>
                <div className="text-primary-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More content for scroll testing */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary-900 mb-12">
            Latest Updates 📢
          </h2>
          <div className="space-y-8">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="p-6 bg-white rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-primary-800 mb-2">
                  Major Protocol Update {i + 1}.0
                </h3>
                <p className="text-primary-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do 
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
