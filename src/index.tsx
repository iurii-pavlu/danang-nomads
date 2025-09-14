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

// Payment page route
app.get('/payment', (c) => {
  return c.render(
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div class="max-w-lg w-full">
        <div class="text-center mb-8">
          <div class="flex items-center justify-center mb-4">
            <i class="fas fa-passport text-4xl text-indigo-600 mr-3"></i>
            <span class="text-2xl font-bold text-gray-900">VietPass</span>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Complete Your Purchase</h1>
          <p class="text-gray-600">Secure your VietPass NFT with Stripe</p>
        </div>
        
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <div class="space-y-6">
            {/* Order Summary */}
            <div class="border-b pb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-passport text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">VietPass NFT</h4>
                    <p class="text-sm text-gray-500">30 days access + Digital Welcome Kit</p>
                  </div>
                </div>
                <span class="text-2xl font-bold text-indigo-600">$19</span>
              </div>
            </div>
            
            {/* What's Included */}
            <div class="bg-indigo-50 rounded-xl p-6">
              <h4 class="font-semibold text-gray-900 mb-3">What's Included:</h4>
              <div class="space-y-2 text-sm">
                <div class="flex items-center text-gray-700">
                  <i class="fas fa-check-circle text-green-500 mr-2"></i>
                  VietPass NFT on U2U Network
                </div>
                <div class="flex items-center text-gray-700">
                  <i class="fas fa-check-circle text-green-500 mr-2"></i>
                  30 days exclusive partner access
                </div>
                <div class="flex items-center text-gray-700">
                  <i class="fas fa-check-circle text-green-500 mr-2"></i>
                  Digital Welcome Kit (PDF)
                </div>
                <div class="flex items-center text-gray-700">
                  <i class="fas fa-check-circle text-green-500 mr-2"></i>
                  5% discounts at all partners
                </div>
                <div class="flex items-center text-gray-700">
                  <i class="fas fa-check-circle text-green-500 mr-2"></i>
                  Free coffee voucher
                </div>
                <div class="flex items-center text-gray-700">
                  <i class="fas fa-check-circle text-green-500 mr-2"></i>
                  VietPass community access
                </div>
              </div>
            </div>
            
            {/* Payment Form */}
            <div id="payment-form">
              <h4 class="font-semibold text-gray-900 mb-4">Payment Details</h4>
              
              {/* Stripe Elements will be inserted here */}
              <div id="card-element" class="p-4 border border-gray-300 rounded-lg mb-4">
                {/* Stripe Elements Placeholder */}
              </div>
              
              <div id="card-errors" role="alert" class="text-red-600 text-sm mb-4 hidden"></div>
              
              <button 
                id="submit-payment"
                class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center"
              >
                <i class="fas fa-lock mr-3"></i>
                Complete Purchase - $19
              </button>
              
              <p class="text-xs text-gray-400 text-center mt-4">
                Secure payment powered by Stripe. Your NFT will be minted automatically upon successful payment.
              </p>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-6">
          <button 
            onclick="window.location.href='/auth'"
            class="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            ← Back to Login
          </button>
        </div>
      </div>
      
      {/* Stripe Payment Script */}
      <script>{`
        // Initialize Stripe
        const stripe = Stripe('pk_test_YOUR_STRIPE_PUBLISHABLE_KEY'); // This will be replaced with actual key
        const elements = stripe.elements();
        
        // Create card element
        const cardElement = elements.create('card', {
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
          },
        });
        
        // Mount card element
        cardElement.mount('#card-element');
        
        // Handle form submission
        document.getElementById('submit-payment').addEventListener('click', async function(event) {
          event.preventDefault();
          
          const button = event.target;
          button.disabled = true;
          button.innerHTML = '<i class="fas fa-spinner fa-spin mr-3"></i>Processing...';
          
          try {
            // Create payment intent
            const response = await fetch('/api/stripe/create-payment-intent', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                amount: 1900, // $19.00 in cents
                currency: 'usd',
                user: JSON.parse(localStorage.getItem('vietpass_user') || '{}')
              })
            });
            
            const { clientSecret } = await response.json();
            
            // Confirm payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
              payment_method: {
                card: cardElement,
              }
            });
            
            if (error) {
              throw error;
            }
            
            // Payment successful, mint NFT
            if (paymentIntent.status === 'succeeded') {
              await mintVietPassNFT(paymentIntent.id);
            }
            
          } catch (error) {
            console.error('Payment error:', error);
            document.getElementById('card-errors').textContent = error.message;
            document.getElementById('card-errors').classList.remove('hidden');
            
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-lock mr-3"></i>Complete Purchase - $19';
          }
        });
        
        async function mintVietPassNFT(paymentIntentId) {
          try {
            const response = await fetch('/api/mint-nft', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                paymentIntentId,
                user: JSON.parse(localStorage.getItem('vietpass_user') || '{}')
              })
            });
            
            const result = await response.json();
            
            if (result.success) {
              // Store NFT info
              localStorage.setItem('vietpass_nft', JSON.stringify(result.nft));
              
              // Redirect to success page
              window.location.href = '/success';
            } else {
              throw new Error(result.error || 'NFT minting failed');
            }
          } catch (error) {
            console.error('NFT minting error:', error);
            alert('Payment successful but NFT minting failed. Please contact support.');
          }
        }
      `}</script>
    </div>
  )
})

// Success page route
app.get('/success', (c) => {
  return c.render(
    <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <div class="max-w-lg w-full text-center">
        <div class="bg-white rounded-3xl shadow-2xl p-12">
          <div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="fas fa-check text-3xl text-white"></i>
          </div>
          
          <h1 class="text-3xl font-bold text-gray-900 mb-4">Welcome to VietPass!</h1>
          
          <p class="text-lg text-gray-600 mb-8">
            Your VietPass NFT has been minted successfully! 
            You now have exclusive access to our curated partner network in Da Nang.
          </p>
          
          <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8">
            <h3 class="font-semibold text-gray-900 mb-4">Next Steps:</h3>
            <div class="space-y-3 text-left">
              <div class="flex items-center">
                <i class="fas fa-download text-indigo-600 mr-3"></i>
                <span>Download your Digital Welcome Kit</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-tachometer-alt text-purple-600 mr-3"></i>
                <span>Access your member dashboard</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-map-marked-alt text-green-600 mr-3"></i>
                <span>Explore partner locations</span>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <button 
              onclick="window.location.href='/dashboard'"
              class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105"
            >
              Go to Dashboard
            </button>
            
            <a 
              href="/static/welcome-kit.pdf" 
              download
              class="w-full bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-4 px-6 rounded-xl font-semibold transition-all inline-block"
            >
              <i class="fas fa-download mr-2"></i>
              Download Welcome Kit
            </a>
          </div>
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
  try {
    const body = await c.req.json()
    const { amount, currency, user } = body
    
    // Here you would integrate with Stripe API
    // For now, return a mock response
    const clientSecret = 'pi_test_mock_client_secret'
    
    return c.json({ 
      clientSecret,
      amount,
      currency 
    })
  } catch (error) {
    return c.json({ error: 'Payment intent creation failed' }, 500)
  }
})

app.post('/api/mint-nft', async (c) => {
  try {
    const body = await c.req.json()
    const { paymentIntentId, user } = body
    
    // Here you would integrate with U2U Network and mint the NFT
    // For now, return a mock response
    const mockNFT = {
      tokenId: Math.floor(Math.random() * 1000000),
      contractAddress: '0x...',
      network: 'U2U',
      mintedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      user: user.email
    }
    
    return c.json({ 
      success: true,
      nft: mockNFT
    })
  } catch (error) {
    return c.json({ error: 'NFT minting failed' }, 500)
  }
})

app.get('/dashboard', (c) => {
  // Token-gated dashboard (to be implemented)
  return c.json({ message: 'Dashboard - Token gating to be implemented' })
})

export default app
