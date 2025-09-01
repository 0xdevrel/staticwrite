import { 
  HiCode, 
  HiLightningBolt, 
  HiGlobe, 
  HiShieldCheck, 
  HiCloudUpload, 
  HiTemplate,
  HiArrowRight,
  HiCheck
} from 'react-icons/hi';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <HiCode className="text-white text-lg" />
                </div>
                <span className="text-xl font-bold text-slate-900">Static Write</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <a href="/app" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                Launch App
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Build <span className="text-emerald-600">Lightning-Fast</span><br />
              Static Websites
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              The modern static site generator powered by Google Gemini Pro AI.<br />
              Get your free API key from <a href="https://aistudio.google.com/u/1/apikey" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline font-medium">Google AI Studio</a> and start building in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/app" className="bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 transition-all transform hover:scale-105 font-medium text-lg flex items-center justify-center space-x-2">
                <span>Get Started Free</span>
                <HiArrowRight />
              </a>
              <a href="/app" className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-lg hover:border-slate-400 hover:bg-slate-100 transition-all font-medium text-lg">
                View Demo
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything you need to build amazing sites
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Powerful features that make static site generation a breeze, from development to deployment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <HiLightningBolt className="text-emerald-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Lightning Fast</h3>
              <p className="text-slate-600">
                Optimized build process and CDN delivery ensure your sites load in milliseconds.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <HiTemplate className="text-emerald-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Beautiful Themes</h3>
              <p className="text-slate-600">
                Choose from dozens of professionally designed themes or create your own.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <HiCloudUpload className="text-emerald-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Deploy Anywhere</h3>
              <p className="text-slate-600">
                One-click deployment to Netlify, Vercel, GitHub Pages, or any hosting provider.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <HiShieldCheck className="text-emerald-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Secure by Default</h3>
              <p className="text-slate-600">
                No databases, no servers, no vulnerabilities. Just pure, secure static files.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <HiGlobe className="text-emerald-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">SEO Optimized</h3>
              <p className="text-slate-600">
                Built-in SEO optimization with meta tags, sitemaps, and social media integration.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <HiCode className="text-emerald-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Developer Friendly</h3>
              <p className="text-slate-600">
                Modern tooling, hot reload, and integrations with your favorite development workflow.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to build something amazing?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Powered by Google Gemini Pro AI. Get your free API key from <a href="https://aistudio.google.com/u/1/apikey" target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-50 underline font-medium">Google AI Studio</a> and start building faster, more reliable websites today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/app" className="bg-white text-emerald-600 px-8 py-4 rounded-lg hover:bg-emerald-50 transition-all transform hover:scale-105 font-medium text-lg flex items-center justify-center space-x-2">
              <span>Start Building Free</span>
              <HiArrowRight />
            </a>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-8 text-emerald-100">
            <div className="flex items-center space-x-2">
              <HiCheck className="text-lg" />
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiCheck className="text-lg" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiCheck className="text-lg" />
              <span>Deploy in 60 seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <HiCode className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold text-white">Static Write</span>
            </div>
            <p className="text-slate-400 mb-8 max-w-md">
              The modern static site generator powered by Google Gemini Pro AI that makes creating lightning-fast websites effortless.
            </p>
            
            <div className="border-t border-slate-800 pt-8 w-full">
              <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8">
                <p className="text-slate-400 text-sm">
                  © 2025 Static Write. All rights reserved.
                </p>
                <p className="text-slate-400 text-sm">
                  Built for Appwrite hackathon
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
