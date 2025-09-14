// VietPass Crossmint Authentication
class VietPassAuth {
  constructor() {
    this.crossmint = null;
    this.user = null;
    this.isInitialized = false;
    this.init();
  }

  async init() {
    try {
      // Initialize Crossmint SDK
      if (typeof CrossmintSDK !== 'undefined') {
        this.crossmint = new CrossmintSDK({
          clientId: "sk_production_5zmfn8THHeirbk9rrQJJT7VHeNe63Z9KrLc9B8mx2bNyvmkPkf14Sf3ZLSHQXKFFH8vN1nKJdSgyfNqcCVNQfTh3HuF4f9qFdB2ULUbTegf6J2GKiUvC8Qv6FSqXgmbtMozjZZjaU3KK3KcZ5h9PgE2ktmsdFjThFNHyt6YYAmmfJNwfbrJcEnUFWWysgYwekXraWr1AUwHvymLSuPwdoJQo",
          environment: "production"
        });
        this.isInitialized = true;
        console.log('VietPass: Crossmint SDK initialized');
      } else {
        console.error('VietPass: Crossmint SDK not loaded');
        setTimeout(() => this.init(), 1000); // Retry after 1 second
      }
    } catch (error) {
      console.error('VietPass: Failed to initialize Crossmint SDK:', error);
    }
  }

  async loginWithGoogle() {
    if (!this.isInitialized) {
      throw new Error('Crossmint SDK not initialized');
    }

    try {
      console.log('VietPass: Starting Google login...');
      
      // Show loading state
      this.showLoadingState();
      
      // Perform social login via Crossmint
      const authResult = await this.crossmint.auth.login({
        provider: 'google',
        scopes: ['openid', 'email', 'profile']
      });

      if (authResult.success) {
        this.user = authResult.user;
        console.log('VietPass: Login successful', this.user);
        
        // Store user info
        localStorage.setItem('vietpass_user', JSON.stringify(this.user));
        
        // Redirect to payment page
        this.redirectToPayment();
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('VietPass: Login error:', error);
      this.showErrorState(error.message);
    }
  }

  showLoadingState() {
    const button = document.getElementById('crossmint-login');
    if (button) {
      button.disabled = true;
      button.innerHTML = '<i class="fas fa-spinner fa-spin mr-3"></i>Connecting...';
      button.classList.add('loading');
    }
  }

  showErrorState(message) {
    const button = document.getElementById('crossmint-login');
    if (button) {
      button.disabled = false;
      button.innerHTML = '<i class="fab fa-google mr-3 text-xl"></i>Continue with Google';
      button.classList.remove('loading');
    }
    
    // Show error message
    this.showNotification('Login failed: ' + message, 'error');
  }

  redirectToPayment() {
    // Redirect to payment page with user info
    window.location.href = '/payment';
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
      type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
    }`;
    notification.innerHTML = `
      <div class="flex items-center">
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'} mr-2"></i>
        <span>${message}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }

  // Get current user
  getCurrentUser() {
    if (this.user) return this.user;
    
    // Try to get from localStorage
    const storedUser = localStorage.getItem('vietpass_user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      return this.user;
    }
    
    return null;
  }

  // Logout
  async logout() {
    try {
      if (this.crossmint && this.crossmint.auth) {
        await this.crossmint.auth.logout();
      }
      this.user = null;
      localStorage.removeItem('vietpass_user');
      localStorage.removeItem('vietpass_nft');
      window.location.href = '/';
    } catch (error) {
      console.error('VietPass: Logout error:', error);
    }
  }

  // Check if user has VietPass NFT
  async checkVietPassNFT() {
    const user = this.getCurrentUser();
    if (!user || !user.wallet) return null;

    try {
      // This would integrate with the NFT contract on U2U Network
      // For now, we'll check localStorage for demo purposes
      const nft = localStorage.getItem('vietpass_nft');
      return nft ? JSON.parse(nft) : null;
    } catch (error) {
      console.error('VietPass: Error checking NFT:', error);
      return null;
    }
  }
}

// Initialize VietPass Auth when page loads
let vietPassAuth;
document.addEventListener('DOMContentLoaded', function() {
  vietPassAuth = new VietPassAuth();
  
  // Bind login button
  const loginButton = document.getElementById('crossmint-login');
  if (loginButton) {
    loginButton.addEventListener('click', () => {
      vietPassAuth.loginWithGoogle();
    });
  }
});

// Make it globally available
window.vietPassAuth = vietPassAuth;