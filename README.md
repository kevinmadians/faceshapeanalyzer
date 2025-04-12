# Face Shape Analyzer

![Face Shape Analyzer Logo](/public/face-shape-icon.svg)

## 🌟 Overview

Face Shape Analyzer is an AI-powered web application that accurately analyzes facial features to determine your face shape and provide personalized style recommendations. Using advanced facial landmark detection technology, the tool identifies whether your face is oval, round, square, heart-shaped, diamond, or oblong.

**Live Demo:** [https://faceshapeanalyzer.net](https://faceshapeanalyzer.net)

## ✨ Features

- **AI-Powered Face Shape Analysis**: Accurately detects facial features and determines face shape using TensorFlow.js
- **Personalized Recommendations**: Get tailored advice for hairstyles, glasses, makeup, and more
- **Privacy-Focused**: All processing happens directly in the browser with no server-side storage of photos
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Accessible UI**: User-friendly interface with clear instructions and feedback
- **Fast Analysis**: Results in seconds with detailed visual feedback during processing

## 🚀 Technology Stack

- **Frontend**: React.js with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **AI Model**: TensorFlow.js with face-landmarks-detection
- **Routing**: React Router
- **State Management**: React Hooks and Context API
- **Build Tools**: Vite
- **Deployment**: Vercel

## 📷 Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
  <img src="screenshots/homepage.png" alt="Homepage" width="400"/>
  <img src="screenshots/analysis.png" alt="Analysis Process" width="400"/>
  <img src="screenshots/results.png" alt="Results Page" width="400"/>
  <img src="screenshots/face-shapes.png" alt="Face Shapes Guide" width="400"/>
</div>

> Note: Add screenshots of your application to a `/screenshots` directory and update the paths accordingly.

## 🛠️ Setup and Installation

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/face-shape-analyzer.git
   cd face-shape-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

### Production Build

```bash
npm run build
# or
yarn build
```

## 🌐 Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Keep the default settings and click "Deploy"
5. Your site will be live at a Vercel URL within minutes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Privacy

We take privacy seriously. All face analysis happens directly in your browser. Your photos are never sent to or stored on our servers. See our [Privacy Policy](/src/pages/Privacy.tsx) for more details.

## 🙏 Acknowledgements

- [TensorFlow.js](https://www.tensorflow.org/js) - For browser-based machine learning
- [face-landmarks-detection](https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection) - For facial landmark detection
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component system
- [Lucide Icons](https://lucide.dev/) - Beautiful icons

---

<p align="center">Made with ❤️ by Kevin Madian S.</p>
<p align="center">© 2025 Face Shape Analyzer</p>
#   f a c e s h a p e a n a l y z e r  
 