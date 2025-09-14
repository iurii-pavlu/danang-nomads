import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

type Bindings = {
  CROSSMINT_API_KEY: string
  STRIPE_SECRET_KEY: string
  U2U_RPC_URL: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for API routes
app.use('/api/*', cors({
  origin: ['http://localhost:3000', 'https://*.pages.dev'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}))

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Apply renderer to HTML routes
app.use(renderer)

// Landing Page
app.get('/', (c) => {
  return c.render(
    <div class="min-h-screen">
      {/* Navigation */}
      <nav class="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0 flex items-center">
                <i class="fas fa-passport text-2xl text-indigo-600 mr-2"></i>
                <span class="text-xl font-bold text-gray-900">VietPass</span>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <button 
                onclick="document.getElementById('how-it-works').scrollIntoView({behavior: 'smooth'})"
                class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                How It Works
              </button>
              <button 
                onclick="document.getElementById('get-pass').scrollIntoView({behavior: 'smooth'})"
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors transform hover:scale-105"
              >
                Get Your Pass
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section class="relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div class="text-center">
            <div class="flex justify-center mb-6">
              <div class="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium">
                <i class="fas fa-sparkles mr-2"></i>
                Web3 Powered Digital Nomad Experience
              </div>
            </div>
            
            <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Settle into <span class="text-indigo-600">Da Nang</span><br />
              <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Like a Local
              </span>
            </h1>
            
            <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Skip the research, avoid the tourist traps. Get your VietPass NFT for just <span class="font-bold text-indigo-600">$19</span> 
              and unlock curated local deals, insider tips, and your complete Digital Welcome Kit.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onclick="document.getElementById('get-pass').scrollIntoView({behavior: 'smooth'})"
                class="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
              >
                <i class="fas fa-rocket mr-2"></i>
                Get Your Pass Now - $19
              </button>
              <div class="flex items-center text-sm text-gray-500">
                <i class="fas fa-check-circle text-green-500 mr-2"></i>
                Instant NFT delivery via social login
              </div>
            </div>
            
            <div class="mt-12 flex justify-center items-center space-x-8 text-gray-400">
              <div class="flex items-center">
                <i class="fab fa-ethereum text-2xl mr-2"></i>
                <span>U2U Network</span>
              </div>
              <div class="flex items-center">
                <i class="fab fa-stripe text-2xl mr-2"></i>
                <span>Stripe Payments</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-shield-alt text-2xl mr-2"></i>
                <span>Crossmint Security</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to unlock the best of Da Nang
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-shadow">
              <div class="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fab fa-google text-2xl text-white"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">1. Login with Google</h3>
              <p class="text-gray-600">
                No crypto wallet needed! Sign in with your Google account and we'll create your Web3 wallet automatically using Crossmint.
              </p>
            </div>
            
            <div class="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-shadow">
              <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-credit-card text-2xl text-white"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">2. Pay & Get Your NFT Pass</h3>
              <p class="text-gray-600">
                Simple $19 credit card payment via Stripe. Your VietPass NFT is automatically minted to your wallet on U2U Network.
              </p>
            </div>
            
            <div class="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-shadow">
              <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-map-marked-alt text-2xl text-white"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">3. Show Your Pass & Save</h3>
              <p class="text-gray-600">
                Access your dashboard, download your Welcome Kit, and show your digital membership card at partner locations for exclusive deals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section class="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">What's Inside Your VietPass</h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to settle into Da Nang like you have a local friend
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div class="text-center">
                <i class="fas fa-home text-3xl text-indigo-600 mb-4"></i>
                <h3 class="font-semibold text-gray-900 mb-2">Accommodation</h3>
                <p class="text-sm text-gray-600">Vetted hotels & apartments with 5% exclusive discounts</p>
              </div>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div class="text-center">
                <i class="fas fa-motorcycle text-3xl text-purple-600 mb-4"></i>
                <h3 class="font-semibold text-gray-900 mb-2">Transport</h3>
                <p class="text-sm text-gray-600">Trusted motorbike rentals with fair pricing</p>
              </div>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div class="text-center">
                <i class="fas fa-dumbbell text-3xl text-green-600 mb-4"></i>
                <h3 class="font-semibold text-gray-900 mb-2">Fitness</h3>
                <p class="text-sm text-gray-600">Premium gyms with member rates</p>
              </div>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div class="text-center">
                <i class="fas fa-coffee text-3xl text-orange-600 mb-4"></i>
                <h3 class="font-semibold text-gray-900 mb-2">Welcome Kit</h3>
                <p class="text-sm text-gray-600">Free coffee voucher, ATM guide, SIM card tips & more</p>
              </div>
            </div>
          </div>
          
          <div class="mt-12 bg-white rounded-2xl p-8 shadow-lg">
            <div class="flex items-center justify-center mb-6">
              <i class="fas fa-gift text-4xl text-indigo-600 mr-4"></i>
              <h3 class="text-2xl font-bold text-gray-900">Digital Welcome Kit Highlights</h3>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div class="flex items-start">
                  <i class="fas fa-plane-arrival text-indigo-600 mt-1 mr-3"></i>
                  <div>
                    <h4 class="font-semibold text-gray-900">Your First 3 Hours Guide</h4>
                    <p class="text-sm text-gray-600">Airport pickup, ATM locations, SIM card setup</p>
                  </div>
                </div>
                <div class="flex items-start">
                  <i class="fas fa-map text-indigo-600 mt-1 mr-3"></i>
                  <div>
                    <h4 class="font-semibold text-gray-900">Curated Da Nang Map</h4>
                    <p class="text-sm text-gray-600">Private Google Maps with all partner locations</p>
                  </div>
                </div>
              </div>
              
              <div class="space-y-4">
                <div class="flex items-start">
                  <i class="fas fa-coffee text-indigo-600 mt-1 mr-3"></i>
                  <div>
                    <h4 class="font-semibold text-gray-900">Free Vietnamese Coffee</h4>
                    <p class="text-sm text-gray-600">Digital voucher for cà phê sữa đá at partner café</p>
                  </div>
                </div>
                <div class="flex items-start">
                  <i class="fas fa-users text-indigo-600 mt-1 mr-3"></i>
                  <div>
                    <h4 class="font-semibold text-gray-900">VietPass Community</h4>
                    <p class="text-sm text-gray-600">Exclusive WhatsApp group for members</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Pass Section */}
      <section id="get-pass" class="py-20 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-12 text-white">
            <h2 class="text-4xl font-bold mb-6">Ready to Settle in Like a Local?</h2>
            <p class="text-xl mb-8 opacity-90">
              Join hundreds of nomads who've made Da Nang their home with VietPass
            </p>
            
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <div class="flex items-center justify-center mb-4">
                <span class="text-3xl font-bold">$19 USD</span>
                <span class="text-lg ml-2 opacity-75">one-time payment</span>
              </div>
              <div class="text-sm opacity-90">
                ✅ 30 days of exclusive access • ✅ Digital Welcome Kit • ✅ NFT membership proof
              </div>
            </div>
            
            <button 
              onclick="window.location.href='/auth'"
              class="bg-white text-indigo-600 hover:bg-gray-50 px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg inline-flex items-center"
            >
              <i class="fab fa-google mr-3"></i>
              Login with Google & Get Your Pass
            </button>
            
            <p class="text-sm mt-4 opacity-75">
              Secure checkout powered by Stripe • NFT minted on U2U Network • Wallet created automatically
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Curation Promise</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              We personally visit and vet every partner to ensure fair prices and exceptional service for our community
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center">
              <i class="fas fa-handshake text-4xl text-indigo-600 mb-4"></i>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Personally Vetted</h3>
              <p class="text-gray-600">Every partner is visited and verified by our local team</p>
            </div>
            
            <div class="text-center">
              <i class="fas fa-tag text-4xl text-green-600 mb-4"></i>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Fair Pricing</h3>
              <p class="text-gray-600">No markup - you get local prices plus exclusive discounts</p>
            </div>
            
            <div class="text-center">
              <i class="fas fa-heart text-4xl text-red-600 mb-4"></i>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Community First</h3>
              <p class="text-gray-600">Built by nomads, for nomads. Your success is our success</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <div class="flex items-center justify-center mb-4">
              <i class="fas fa-passport text-2xl text-indigo-400 mr-2"></i>
              <span class="text-xl font-bold">VietPass</span>
            </div>
            <p class="text-gray-400 mb-6 max-w-2xl mx-auto">
              The Web3-powered digital companion for nomads in Da Nang. 
              Making settling in faster, cheaper, and more connected.
            </p>
            
            <div class="flex justify-center space-x-6 mb-6">
              <a href="mailto:hello@vietpass.io" class="text-gray-400 hover:text-white transition-colors">
                <i class="fas fa-envelope text-xl"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <i class="fab fa-telegram text-xl"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <i class="fab fa-twitter text-xl"></i>
              </a>
            </div>
            
            <div class="border-t border-gray-800 pt-6">
              <p class="text-sm text-gray-400">
                © 2025 VietPass. Built for VietBUIDL Hackathon. Powered by U2U Network, Crossmint & Stripe.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
})

// Auth page route
app.get('/auth', (c) => {
  return c.render(
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div class="max-w-md w-full">
        <div class="text-center mb-8">
          <div class="flex items-center justify-center mb-4">
            <i class="fas fa-passport text-4xl text-indigo-600 mr-3"></i>
            <span class="text-2xl font-bold text-gray-900">VietPass</span>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Get Your VietPass</h1>
          <p class="text-gray-600">Login with Google to continue to secure checkout</p>
        </div>
        
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <div class="space-y-6">
            <div class="text-center p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
              <h3 class="font-semibold text-gray-900 mb-2">What you'll get:</h3>
              <div class="text-sm text-gray-600 space-y-1">
                <div>✅ VietPass NFT on U2U Network</div>
                <div>✅ 30 days exclusive partner access</div>
                <div>✅ Digital Welcome Kit download</div>
                <div>✅ 5% discounts at all partners</div>
              </div>
            </div>
            
            <button 
              id="crossmint-login"
              class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center"
            >
              <i class="fab fa-google mr-3 text-xl"></i>
              Continue with Google
            </button>
            
            <div class="text-center">
              <div class="text-2xl font-bold text-indigo-600 mb-1">$19 USD</div>
              <div class="text-sm text-gray-500">Secure payment via Stripe</div>
            </div>
            
            <div class="text-xs text-gray-400 text-center">
              By continuing, you agree to our terms of service. 
              Your wallet will be created automatically via Crossmint.
            </div>
          </div>
        </div>
        
        <div class="text-center mt-6">
          <button 
            onclick="window.location.href='/'"
            class="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            ← Back to Homepage
          </button>
        </div>
      </div>
    </div>
  )
})

// API Routes
app.post('/api/auth/crossmint', async (c) => {
  // Crossmint authentication endpoint
  return c.json({ message: 'Crossmint auth endpoint' })
})

app.post('/api/stripe/create-payment-intent', async (c) => {
  // Stripe payment intent creation
  return c.json({ message: 'Stripe payment intent endpoint' })
})

app.post('/api/mint-nft', async (c) => {
  // NFT minting endpoint after successful payment
  return c.json({ message: 'NFT minting endpoint' })
})

app.get('/dashboard', (c) => {
  // Token-gated dashboard (to be implemented)
  return c.json({ message: 'Dashboard - Token gating to be implemented' })
})

export default app
