import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>VietPass - Settle into Da Nang Like a Local</title>
        <meta name="description" content="The essential digital companion for nomads in Da Nang. Get your VietPass NFT for $19 and unlock exclusive deals, insider tips, and your Digital Welcome Kit." />
        
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Font Awesome Icons */}
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Custom CSS */}
        <link href="/static/style.css" rel="stylesheet" />
        
        {/* Crossmint SDK */}
        <script src="https://www.crossmint.com/assets/crossmint/embed/checkout.js"></script>
      </head>
      <body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        {children}
        
        {/* Alpine.js for interactivity */}
        <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
      </body>
    </html>
  )
})
