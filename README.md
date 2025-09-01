# Static Write - AI-Powered Static Site Generator

A modern, AI-powered static website generator built with Next.js and Google Gemini AI. Create beautiful, responsive websites through natural language conversation.

## 🚀 Features

- **AI-Powered Generation**: Describe your website in plain English and watch it come to life
- **Real-time Code Streaming**: See your website code generate in real-time as you chat
- **Modern Design**: Built with Tailwind CSS for beautiful, responsive layouts
- **Instant Preview**: Preview your generated website in a new tab
- **Download Ready**: Export your website as a standalone HTML file
- **Professional Templates**: AI generates modern, SEO-optimized websites
- **Responsive Design**: Mobile-first approach with perfect symmetry and alignment
- **High-Quality Images**: Automatic integration with Unsplash and reliable placeholder services

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **AI Integration**: Google Gemini AI (Gemini 2.0 Flash)
- **UI Components**: React Icons, React Resizable Panels
- **Development**: ESLint, Turbopack

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd appwrite
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

5. **Configure AI**
   - Click "Launch App" to access the main application
   - Enter your Google Gemini API key when prompted
   - Start describing your website!

## 🔑 API Key Setup

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Paste it in the API Key modal when prompted

**Note**: Your API key is stored locally in your browser and never sent to our servers.

## 💡 How to Use

### 1. Landing Page
- Browse the features and benefits of Static Write
- Click "Launch App" to access the main application

### 2. Main Application
- **Chat Interface**: Describe your website requirements in natural language
- **Code Editor**: View and edit the generated HTML code in real-time
- **Preview**: See your website in action with the preview button
- **Download**: Export your website as an HTML file

### 3. Website Generation
Simply describe what you want:
- "Create a portfolio website for a React developer"
- "Build a restaurant website with menu and contact info"
- "Make a tech blog with dark theme"
- "Design a business landing page for a SaaS company"

## 🎨 What You Get

- **Complete HTML files** with embedded CSS and JavaScript
- **SEO-optimized** with proper meta tags and structure
- **Mobile-responsive** designs that work on all devices
- **Professional styling** with modern color schemes and typography
- **High-quality images** from Unsplash and reliable placeholders
- **Technology icons** from Simple Icons CDN
- **Clean, semantic HTML** following best practices

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── page.tsx          # Landing page
│   └── app/              # Main application
│       └── page.tsx      # AI-powered website generator
├── components/            # React components
│   └── ApiKeyModal.tsx   # API key configuration modal
└── services/             # Business logic
    └── geminiService.ts  # Google Gemini AI integration
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Components

- **GeminiService**: Handles AI communication and code generation
- **ApiKeyModal**: Manages API key configuration
- **Main App**: Dual-panel interface with chat and code editor
- **Real-time Streaming**: Code generation with live updates

## 🌟 AI Capabilities

The AI is trained to generate:
- Modern, responsive layouts
- Professional color schemes
- SEO-optimized structure
- High-contrast readable text
- Mobile-first design
- Working image integrations
- Technology-specific styling

## 📱 Responsive Design

- **Mobile-first approach** with perfect symmetry
- **8px grid system** for consistent spacing
- **High contrast ratios** for accessibility
- **Modern typography** with proper font weights
- **Subtle animations** and hover effects

## 🚀 Deployment

The generated websites are standalone HTML files that can be deployed to:
- [Appwrite Sites](https://appwrite.io/products/sites) - Perfect for this hackathon project

## 🤝 Contributing

This project was built for the Appwrite hackathon. Contributions are welcome!

## 📄 License

Built for Appwrite hackathon - All rights reserved.

## 🆘 Support

If you encounter any issues:
1. Check that your API key is correctly configured
2. Ensure you have a stable internet connection
3. Verify the API key has sufficient quota

---

**Built with ❤️ for the Appwrite hackathon**
