# VietPass - Web3 Digital Nomad Companion

## Project Overview
- **Name**: VietPass
- **Goal**: Essential digital companion for digital nomads settling in Da Nang, Vietnam
- **Features**: Web3-powered NFT membership system with frictionless onboarding and real-world utility

## 🌐 URLs
- **Production**: https://1038f013.vietpass.pages.dev
- **GitHub**: https://github.com/iurii-pavlu/danang-nomads
- **Development**: https://3000-i7iav6326qp990ekbmbph-6532622b.e2b.dev
- **Landing Page**: `/` - Beautiful homepage with value proposition
- **Auth Flow**: `/auth` - Social login via Google (Crossmint)
- **Payment**: `/payment` - Stripe integration for NFT minting
- **Dashboard**: `/dashboard` - Token-gated member area
- **Success**: `/success` - Post-purchase confirmation

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Hono + TypeScript + TailwindCSS
- **Backend**: Hono on Cloudflare Workers
- **Blockchain**: U2U Network (ERC-721 NFT)
- **Web3 Auth**: Crossmint SDK (social login)
- **Payments**: Stripe
- **Hosting**: Cloudflare Pages

### Data Models
- **VietPass NFT**: ERC-721 token with 30-day membership
- **User Authentication**: Social login via Crossmint (Google)
- **Payment Tracking**: Stripe payment intents
- **Partner Network**: Curated local businesses (15+ partners)

### Smart Contract
```solidity
// VietPassNFT.sol - ERC-721 contract on U2U Network
contract VietPassNFT {
  - mintVietPass(address, email, paymentIntentId)
  - hasActiveVietPass(address)
  - renewMembership(tokenId, paymentIntentId)
}
```

## 🎯 Core Features Implemented

### ✅ 1. Frictionless Web3 Onboarding
- **Social Login**: Google authentication via Crossmint
- **Auto Wallet Creation**: No crypto knowledge required
- **Credit Card to NFT**: $19 Stripe payment → instant NFT minting

### ✅ 2. Beautiful Landing Page
- **Hero Section**: Clear value proposition
- **How It Works**: 3-step process visualization
- **What's Inside**: Partner categories and benefits
- **Trust Signals**: Curation promise and testimonials

### ✅ 3. Secure Payment Flow
- **Stripe Integration**: Credit card payments
- **Payment Intent Tracking**: Prevent double-spending
- **Automatic NFT Minting**: Post-payment blockchain interaction

### ✅ 4. Token-Gated Dashboard
- **NFT Verification**: Check wallet for active VietPass
- **Digital Membership Card**: Visual proof of membership
- **Partner Directory**: Filterable list of local businesses
- **Welcome Kit Download**: PDF with essential Da Nang info

### ✅ 5. Partner Network System
- **Curated Partners**: 15+ vetted local businesses
- **Categories**: Accommodation, Transport, Lifestyle
- **Exclusive Discounts**: 5% off for VietPass holders
- **Insider Tips**: Local knowledge for each partner

### ✅ 6. Digital Welcome Kit
- **First 3 Hours Guide**: Airport, ATM, SIM card setup
- **Free Coffee Voucher**: Partner café welcome gift
- **Curated Maps**: Private Google Maps with all partners
- **Community Access**: WhatsApp group invitation

## 🚀 User Flow

1. **Discovery**: Land on homepage, learn about VietPass
2. **Authentication**: Click "Get Your Pass" → Google login
3. **Payment**: Enter payment details, complete $19 purchase
4. **NFT Minting**: Automatic VietPass NFT minted to wallet
5. **Dashboard Access**: Token-gated member dashboard
6. **Partner Benefits**: Show digital card for discounts
7. **Community**: Join WhatsApp group, download kit

## 📱 User Guide

### For Nomads:
1. Visit VietPass website
2. Click "Get Your Pass Now"
3. Login with Google (wallet created automatically)
4. Pay $19 with credit card
5. Access your dashboard and download Welcome Kit
6. Show your digital membership card at partner locations

### For Partners:
- Partners get direct access to high-value, long-stay customers
- No upfront fees - only pay commission on actual customers
- VietPass provides marketing and customer referrals

## 🔧 Technical Implementation

### Frontend Routes
```typescript
'/' - Landing page
'/auth' - Social authentication
'/payment' - Stripe checkout
'/success' - Purchase confirmation
'/dashboard' - Token-gated member area
```

### API Endpoints
```typescript
POST /api/stripe/create-payment-intent
POST /api/mint-nft
POST /api/auth/crossmint
```

### NFT Metadata
```json
{
  "name": "VietPass #123",
  "description": "30-day Da Nang nomad membership",
  "attributes": [
    {"trait_type": "Duration", "value": "30 Days"},
    {"trait_type": "Location", "value": "Da Nang, Vietnam"},
    {"trait_type": "Access Level", "value": "Premium"}
  ]
}
```

## 🌟 Innovation Highlights

### 1. **True Web2 UX for Web3**
- No crypto jargon or complex wallet setup
- Social login creates wallet automatically
- Credit card payment feels familiar

### 2. **Real-World Utility**
- Actual discounts at local businesses
- Practical value beyond speculation
- Community and insider knowledge

### 3. **Hackathon Perfect**
- Built specifically for VietBUIDL on U2U Network
- Solves real nomad problems in Da Nang
- Demonstrates Web3 mainstream adoption

## 🎛️ Environment Variables
```bash
CROSSMINT_API_KEY=sk_production_...
STRIPE_SECRET_KEY=sk_test_...
U2U_RPC_URL=https://rpc-mainnet.uniultra.xyz
```

## 📊 Success Metrics (MVP Goals)
- **30 VietPass NFT purchases** within first month
- **15+ partner agreements** signed
- **5% conversion rate** landing page to purchase
- **15+ redemption events** tracked

## 🚀 Deployment Status
- **Platform**: Cloudflare Pages
- **Status**: ✅ LIVE IN PRODUCTION
- **Production URL**: https://1038f013.vietpass.pages.dev
- **Tech Stack**: Hono + TypeScript + TailwindCSS + U2U Network
- **Last Updated**: September 14, 2025

## 🔮 Future Roadmap
- **Multi-City Expansion**: Ho Chi Minh City, Bangkok, Bali
- **Advanced Features**: Direct booking, automated payouts
- **Mobile App**: Native iOS/Android applications
- **Community Features**: Reviews, recommendations, events

---

Built with ❤️ for VietBUIDL Hackathon 2025  
Powered by U2U Network, Crossmint & Stripe