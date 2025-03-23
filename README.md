# Animated Login Page

A modern, animated login page with smooth transitions and visual feedback built with React, TypeScript, and Express.

![Animated Login Demo](https://github.com/yourusername/animated-login/blob/assets/demo.gif)

## Features

- 🎨 Beautiful UI with modern design practices
- ✨ Sophisticated animations using Framer Motion
- 🔒 Complete authentication system with secure password handling
- 🎭 Form validation with visual feedback
- 🖌️ Floating labels and micro-interactions
- 📱 Fully responsive design for all screen sizes
- 🌈 Animated background with particles effect
- 🔄 Smooth transitions between login and registration forms
- 🎯 Success animations with particle effects
- 💫 3D tilt effect on form hover

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion, ShadCN UI
- **Backend**: Express.js, Node.js
- **Authentication**: Passport.js
- **Form Handling**: React Hook Form, Zod validation
- **API Requests**: TanStack Query (React Query)

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/animated-login.git
   cd animated-login
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5000](http://localhost:5000) in your browser.

## Project Structure

```
├── client/                  # Frontend code
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Helper functions
│   │   ├── pages/           # Page components
│   │   ├── App.tsx          # Main App component
│   │   └── main.tsx         # Entry point
│   └── index.html
├── server/                  # Backend code
│   ├── auth.ts              # Authentication logic
│   ├── routes.ts            # API routes
│   ├── storage.ts           # Data storage
│   └── index.ts             # Server entry point
└── shared/                  # Shared code
    └── schema.ts            # Data schemas
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) for the animation library
- [ShadCN UI](https://ui.shadcn.com/) for the component library
- [Tailwind CSS](https://tailwindcss.com/) for the styling
- [TanStack Query](https://tanstack.com/query) for data fetching
