# LoveHeart - Enhanced Link Protection

LoveHeart is a web application that provides enhanced link encryption to make it harder for web trackers and internet providers to track your browsing habits.

## Features

- **Link Encryption**: Encrypts outgoing links to protect your privacy
- **Secure Redirects**: Routes external links through a secure redirect service
- **Privacy Protection**: Makes it harder for trackers to monitor your browsing
- **Customizable Settings**: Configure encryption strength and redirect behavior
- **Statistics Tracking**: See how many links you've protected

## How It Works

1. When you click on a protected link, the destination URL is encrypted
2. You're redirected through our secure service
3. The service decrypts the URL and sends you to your destination
4. This process breaks the direct connection that trackers use to monitor your activity

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Router

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/love-heart.git
   cd love-heart
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Enter a URL in the encryption tool
2. Click "Encrypt" to generate a protected link
3. Use the protected link to visit the website securely
4. Configure your preferences in the Settings page

## Security Considerations

This project is primarily for educational purposes. While it does provide some privacy benefits, it should not be relied upon for high-security needs. The encryption methods used are relatively simple and could be improved for production use.

## License

MIT

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide Icons](https://lucide.dev/) for the icon set