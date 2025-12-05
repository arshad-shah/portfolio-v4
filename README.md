# Portfolio v4

> Personal portfolio website showcasing my work as a Software Engineer specializing in high-performance systems and microfrontend architecture.

[![Live Site](https://img.shields.io/badge/Live-arshadshah.com-blue)](https://arshadshah.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Features

- **Modern Stack**: Built with React 19, TypeScript, and Vite
- **Responsive Design**: Mobile-first approach with Tailwind CSS v4
- **Smooth Animations**: Framer Motion for fluid interactions
- **SEO Optimized**: Meta tags, Open Graph, and web manifest configured
- **Performance**: Fast loading with code splitting and optimized assets
- **Type Safe**: Full TypeScript coverage with strict mode
- **Code Quality**: ESLint and Prettier configured for consistent code style

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher
- **pnpm**: v8.0.0 or higher (recommended) or npm/yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arshad-shah/portfolio-v4.git
   cd portfolio-v4
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

## 🏃 Development

Start the development server with hot module replacement:

```bash
pnpm dev
```

The site will be available at `http://localhost:5173`

## 📦 Build

Create a production build:

```bash
pnpm build
```

The optimized files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
pnpm preview
```

## 🧹 Code Quality

### Linting

Check for code issues:

```bash
pnpm lint
```

### Formatting

Format code with Prettier:

```bash
# Format all files
pnpm format

# Check formatting without making changes
pnpm format:check
```

## 📁 Project Structure

```
portfolio-v4/
├── public/              # Static assets
│   ├── images/         # Image files
│   ├── *.png           # Favicon and app icons
│   ├── resume.pdf      # Resume file
│   └── site.webmanifest # PWA manifest
├── src/
│   ├── components/     # React components
│   │   ├── layout/    # Layout components (Header, Footer)
│   │   ├── sections/  # Page sections (Hero, About, Projects, etc.)
│   │   └── ui/        # Reusable UI components
│   ├── data/          # Static data (projects, skills, experience)
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and helpers
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx        # Main app component
│   ├── main.tsx       # Application entry point
│   └── index.css      # Global styles and Tailwind imports
├── index.html         # HTML template with meta tags
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript configuration
├── eslint.config.js   # ESLint configuration
└── package.json       # Project dependencies and scripts
```

## 🎨 Tech Stack

### Core
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **clsx & tailwind-merge** - Conditional class utilities

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting

### SEO & PWA
- **react-helmet-async** - Dynamic meta tags
- **Web Manifest** - PWA configuration
- **Open Graph** - Social media previews

## 🔧 Configuration

### Environment Variables

No environment variables are required for basic functionality. The site is fully static.

### Customization

1. **Personal Information**: Update `src/data/` files with your information
2. **Styling**: Modify `src/index.css` for global styles or component files for specific changes
3. **Assets**: Replace images in `public/` directory
4. **Meta Tags**: Update `index.html` for SEO and social media tags

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Install Netlify CLI
pnpm add -g netlify-cli

# Deploy
netlify deploy --prod
```

### Manual Deployment

1. Build the project: `pnpm build`
2. Upload the `dist/` directory to your hosting provider

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Arshad Shah**
- Website: [arshadshah.com](https://arshadshah.com)
- GitHub: [@arshad-shah](https://github.com/arshad-shah)
- Email: arshad@arshadshah.com

## 🙏 Acknowledgments

- Design inspiration from modern portfolio trends
- Icons and assets optimized for web performance
- Built with best practices for accessibility and SEO

---

Made with ❤️ by Arshad Shah
