import NavHeader from '@/components/NavHeader'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-space-950 via-space-900 to-space-800">
      <NavHeader />
      
      <div className="pt-16"> {/* 为固定定位的header留出空间 */}
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
          
          {/* 示例内容块 */}
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
      </div>
    </main>
  )
}
