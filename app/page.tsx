import NavHeader from '@/components/NavHeader'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-space-950 via-space-900 to-space-800">
      <NavHeader />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-primary-500 mb-6">
              Welcome to the Future 🚀
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Discover the next generation of Web3 experiences. 
              Built with innovation, powered by community.
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '💎', title: 'Secure', desc: 'Built with the latest security standards' },
              { icon: '⚡', title: 'Fast', desc: 'Lightning-fast transactions and responses' },
              { icon: '🌐', title: 'Decentralized', desc: 'Truly owned by the community' }
            ].map((item, i) => (
              <div 
                key={i}
                className="p-6 rounded-xl bg-space-800/50 backdrop-blur-sm
                  border border-space-700 hover:border-primary-500
                  transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <span className="text-4xl">{item.icon}</span>
                <h3 className="text-xl font-bold text-primary-400 mt-4">
                  {item.title}
                </h3>
                <p className="mt-2 text-primary-200">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-space-900/50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '100K+', label: 'Active Users', icon: '👥' },
                { value: '$10M+', label: 'Total Volume', icon: '💰' },
                { value: '50+', label: 'Partners', icon: '🤝' },
                { value: '99.9%', label: 'Uptime', icon: '⚡' }
              ].map((stat, i) => (
                <div key={i} className="p-6">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-4xl font-bold text-primary-500">{stat.value}</div>
                  <div className="text-primary-200 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-primary-500 text-center mb-16">How It Works 🛠️</h2>
          <div className="space-y-24">
            {[
              {
                icon: '👛',
                title: 'Connect Your Wallet',
                desc: 'Start by connecting your Web3 wallet. We support MetaMask, WalletConnect, and more.',
                align: 'left'
              },
              {
                icon: '🎯',
                title: 'Choose Your Strategy',
                desc: 'Select from various investment strategies tailored to your risk profile and goals.',
                align: 'right'
              },
              {
                icon: '📈',
                title: 'Watch Your Portfolio Grow',
                desc: 'Monitor your investments in real-time with our advanced analytics dashboard.',
                align: 'left'
              }
            ].map((item, i) => (
              <div 
                key={i}
                className={`flex flex-col ${
                  item.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
                } items-center gap-12`}
              >
                <div className="flex-1">
                  <div className="text-6xl mb-6">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-primary-400 mb-4">{item.title}</h3>
                  <p className="text-lg text-primary-200">{item.desc}</p>
                </div>
                <div className="flex-1 h-64 bg-space-800/50 rounded-xl border border-space-700"></div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-space-800/50 py-24">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-primary-500 mb-6">
              Ready to Start? 🚀
            </h2>
            <p className="text-xl text-primary-200 mb-10">
              Join thousands of users who are already experiencing the future of Web3.
              Get started in minutes and discover a new world of possibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-space-900 rounded-lg text-lg font-semibold transition-colors">
                🦊 Connect Wallet
              </button>
              <button className="px-8 py-4 border-2 border-primary-500 text-primary-500 hover:bg-primary-500/10 rounded-lg text-lg font-semibold transition-colors">
                📚 Read Docs
              </button>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-primary-500 text-center mb-16">
            Join Our Community 🌟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { platform: 'Discord', members: '50K+', icon: '💬' },
              { platform: 'Twitter', members: '100K+', icon: '🐦' },
              { platform: 'Telegram', members: '25K+', icon: '📱' }
            ].map((community, i) => (
              <div 
                key={i}
                className="p-8 rounded-xl bg-space-800/50 backdrop-blur-sm
                  border border-space-700 hover:border-primary-500
                  transition-all duration-300 hover:transform hover:-translate-y-1
                  text-center"
              >
                <div className="text-5xl mb-4">{community.icon}</div>
                <h3 className="text-2xl font-bold text-primary-400 mb-2">
                  {community.platform}
                </h3>
                <p className="text-primary-200">{community.members} members</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}