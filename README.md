# 🔍 Face Shape Analyzer

<div align="center">
  <img src="public/face-shape-icon.svg" alt="Face Shape Analyzer Logo" width="120" height="120">
  
  <h3>AI-Powered Face Shape Analysis & Style Recommendations</h3>

  [![Vercel Deployment](https://img.shields.io/badge/Vercel-Ready-black?style=for-the-badge&logo=vercel)](https://vercel.com)
  [![React](https://img.shields.io/badge/React-v18-blue?style=for-the-badge&logo=react)](https://reactjs.org)
  [![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-latest-orange?style=for-the-badge&logo=tensorflow)](https://www.tensorflow.org/js)
  [![TypeScript](https://img.shields.io/badge/TypeScript-v5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

  <p align="center">
    <a href="https://faceshapeanalyzer.net">Live Demo</a> •
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#installation">Installation</a> •
    <a href="#how-it-works">How It Works</a>
  </p>
</div>

## ✨ Overview

**Face Shape Analyzer** is a cutting-edge web application that uses AI to analyze facial features and determine your face shape with high accuracy. The tool identifies oval, round, square, heart, diamond, and oblong face shapes, then provides personalized style recommendations tailored to your unique facial structure.

> **Privacy-First Approach**: All processing happens locally in your browser. Your photos are never uploaded to servers or stored anywhere.

<p align="center">
  <img src="screenshots/homepage.png" alt="Face Shape Analyzer Screenshot" width="700">
</p>

## 🌟 Features

<table>
  <tr>
    <td width="50%">
      <h3>💫 AI-Powered Analysis</h3>
      <p>Leverages TensorFlow.js and facial landmark detection to accurately identify face shapes with precision.</p>
    </td>
    <td width="50%">
      <h3>🔒 Privacy-Focused</h3>
      <p>All image processing happens directly in your browser. No photos are ever uploaded or stored.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>👩‍🦰 Personalized Recommendations</h3>
      <p>Get customized suggestions for hairstyles, glasses, beard styles, and makeup that complement your face shape.</p>
    </td>
    <td width="50%">
      <h3>⚡ Fast & Responsive</h3>
      <p>Quick analysis with real-time feedback, optimized for all devices from mobile to desktop.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📱 Cross-Device Support</h3>
      <p>Works seamlessly across mobile, tablet, and desktop with a fully responsive design.</p>
    </td>
    <td width="50%">
      <h3>🔄 Detailed Results</h3>
      <p>Comprehensive report with visualization of facial measurements and shape characteristics.</p>
    </td>
  </tr>
</table>

## 🛠️ Tech Stack

<div align="center">
  <table>
    <tr>
      <td align="center" width="96">
        <img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React" />
        <br>React
      </td>
      <td align="center" width="96">
        <img src="https://skillicons.dev/icons?i=ts" width="48" height="48" alt="TypeScript" />
        <br>TypeScript
      </td>
      <td align="center" width="96">
        <img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="Tailwind" />
        <br>Tailwind
      </td>
      <td align="center" width="96">
        <img src="https://skillicons.dev/icons?i=vite" width="48" height="48" alt="Vite" />
        <br>Vite
      </td>
      <td align="center" width="96">
        <img src="https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg" width="48" height="48" alt="TensorFlow" />
        <br>TensorFlow
      </td>
      <td align="center" width="96">
        <img src="https://skillicons.dev/icons?i=vercel" width="48" height="48" alt="Vercel" />
        <br>Vercel
      </td>
    </tr>
  </table>
</div>

- **Frontend Framework**: React.js with TypeScript for type-safe code
- **AI & ML**: TensorFlow.js with face-landmarks-detection model
- **Styling**: Tailwind CSS with shadcn/ui component system
- **Routing**: React Router for seamless navigation
- **State Management**: React Hooks and Context API
- **Build Tools**: Vite for fast development and optimized builds
- **Deployment**: Vercel for reliable, global hosting

## 📱 Screenshots

<div align="center">
  <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
    <img src="screenshots/analysis.png" alt="Analysis Process" width="400"/>
    <img src="screenshots/results.png" alt="Results Page" width="400"/>
  </div>
</div>

## 🚀 Installation

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/face-shape-analyzer.git
   cd face-shape-analyzer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or with yarn
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or with yarn
   yarn dev
   ```

4. **Open your browser** at `http://localhost:5173`

### Production Build

```bash
npm run build
# or with yarn
yarn build
```

## 🌐 Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Connect to [Vercel](https://vercel.com) with your GitHub account
3. Import your repository as a new project
4. Vercel will automatically detect the correct settings
5. Click "Deploy" and your site will be live in minutes

## 🔍 How It Works

Face Shape Analyzer uses a three-step process to analyze and provide recommendations:

1. **Detection**: The app uses TensorFlow.js to detect facial landmarks in your photo
2. **Analysis**: Key measurements are calculated to determine face shape proportions
3. **Recommendation**: Based on your face shape, personalized style advice is generated

The entire process happens locally in your browser, ensuring your privacy.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create your feature branch: `git checkout -b amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin amazing-feature`
5. Open a Pull Request

Please ensure your code follows the project's style guidelines and includes appropriate tests.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Privacy

We prioritize user privacy. All face analysis happens directly in your browser using TensorFlow.js. Your photos are never sent to or stored on our servers. For more details, check our [Privacy Policy](/src/pages/Privacy.tsx).

## 💖 Acknowledgements

- [TensorFlow.js](https://www.tensorflow.org/js) for browser-based machine learning
- [face-landmarks-detection](https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection) for facial landmark detection
- [React](https://reactjs.org/) for the UI library
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for the component system
- [Lucide Icons](https://lucide.dev/) for beautiful icons

---

<div align="center">
  <img src="public/face-shape-icon.svg" alt="Face Shape Analyzer Logo" width="60" height="60">
  <p>Made with ❤️ by Kevin Madian S.</p>
  <p>© 2025 Face Shape Analyzer</p>
</div> 