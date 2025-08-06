# SpecBoard - AI-Powered Specification Platform

A modern specification management platform designed for the age of prompt-driven software development. SpecBoard helps teams create, version, and refine specifications with AI assistance, making it easier to maintain clear communication and intent in software projects.

## 🎯 Project Purpose

SpecBoard addresses the growing need for structured communication in AI-assisted software development by providing:

- **Specification IDE**: A dedicated environment for creating and refining specifications
- **AI Enhancement**: AI-powered specification improvement and clarification
- **Version Control**: Git-style versioning for specifications with change history
- **Thought Clarification**: Interactive prompts to improve specification clarity
- **Team Collaboration**: Built-in sharing and collaboration features
- **Semantic Search**: Find specifications by meaning, not just keywords

## 🚀 Features

### Core Functionality
- **Specification Editor**: Rich text editor with markdown support
- **AI Enhancement**: Automatically improve specifications with technical details
- **Thought Clarifiers**: Interactive questions to refine specification intent
- **Version History**: Track changes and improvements over time
- **Dashboard**: Overview of all specifications with metrics
- **Responsive Design**: Works seamlessly on desktop and mobile

### AI-Powered Features
- **Specification Enhancement**: Add technical implementation details
- **Error Handling Strategies**: Suggest robust error handling approaches
- **Performance Requirements**: Define benchmarks and monitoring
- **Security Considerations**: Identify security measures needed
- **Testing Strategies**: Suggest comprehensive testing approaches

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **AI Integration**: Groq API (Llama 3.1-8b-instant)
- **Development**: Node.js, npm/pnpm
- **Deployment**: Vercel-ready

## 📋 Prerequisites

Before running SpecBoard, ensure you have:

- **Node.js** (version 18 or higher)
- **npm** or **pnpm** package manager
- **Groq API Key** (for AI enhancement features)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd SpecBoard
```

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
```

**Note**: The `--legacy-peer-deps` flag is required due to React 19 compatibility with some dependencies.

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Required for AI enhancement features
GROQ_API_KEY=your_groq_api_key_here
```

**Getting a Groq API Key:**
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add it to your `.env.local` file

### 4. Start the Development Server
```bash
npm run dev
```

The application will be available at:
- **Local**: http://localhost:3000 (or 3001 if 3000 is in use)
- **Network**: http://your-ip:3000

### 5. Access the Application

1. **Homepage**: Visit the landing page to learn about SpecBoard
2. **Dashboard**: Click "Try Demo" to access the main dashboard
3. **Editor**: Create or edit specifications with AI assistance

## 🎮 Usage Guide

### Creating a New Specification
1. Navigate to the Dashboard
2. Click "New Spec" button
3. Enter a title and start writing your specification
4. Use the "Generate" button to get AI enhancements
5. Respond to thought clarifiers to improve your spec
6. Save your work when ready

### AI Enhancement Features
- **Automatic Enhancement**: Click "Generate" to get AI-improved specifications
- **Thought Clarifiers**: Answer questions to refine your specification
- **Technical Details**: AI adds implementation guidance, error handling, and security measures
- **Performance Optimization**: Get suggestions for monitoring and benchmarks

### Dashboard Features
- **Overview**: See all your specifications at a glance
- **Metrics**: Track active specs, AI enhancements, and clarity scores
- **Search**: Find specifications by meaning or keywords
- **Version History**: View changes and improvements over time

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Project Structure
```
SpecBoard/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── enhance-spec/  # AI enhancement endpoint
│   │   ├── save-spec/     # Save specification endpoint
│   │   └── submit-response/ # Clarifier response endpoint
│   ├── dashboard/         # Dashboard page
│   ├── editor/           # Specification editor
│   └── page.tsx          # Homepage
├── components/            # Reusable UI components
│   └── ui/              # Radix UI components
├── lib/                  # Utility functions
└── public/              # Static assets
```

### API Endpoints
- `POST /api/enhance-spec`: AI-powered specification enhancement
- `POST /api/save-spec`: Save specification to storage
- `POST /api/submit-response`: Submit clarifier responses

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
```bash
GROQ_API_KEY=your_production_groq_api_key
```

## 🔒 Security Considerations

- **API Keys**: Never commit API keys to version control
- **Environment Variables**: Use `.env.local` for local development
- **Production**: Set environment variables in your deployment platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

**Port Already in Use**
- The app will automatically try the next available port (3001, 3002, etc.)
- Check the terminal output for the correct URL

**AI Enhancement Not Working**
- Ensure `GROQ_API_KEY` is set in `.env.local`
- Verify your Groq API key is valid and has sufficient credits
- Check the browser console for error messages

**Installation Errors**
- Use `npm install --legacy-peer-deps` for dependency conflicts
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall if needed

**Build Errors**
- Ensure all environment variables are set
- Check TypeScript compilation errors
- Verify all dependencies are installed correctly

## 📞 Support

For issues and questions:
- Check the troubleshooting section above
- Review the console logs for error details
- Ensure all prerequisites are met
- Verify environment variables are correctly set

---

**SpecBoard** - Reclaiming Developer Intent in the Age of AI