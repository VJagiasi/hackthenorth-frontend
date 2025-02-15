# Hackathon Global

Welcome to the Hack the North Events! This project is the result of thoughtful design, careful planning, and hands-on development. It’s built with modern tools to give you features like user authentication, event sorting, filtering, and more—all in a simple, easy-to-use interface.

## 🚀 Getting Started

### Clone the Repository
```bash
git clone https://github.com/VJagiasi/hackthenorth-frontend
```

### Install Dependencies
```bash
npm install
```

### Run the Application
```bash
npm run dev
```

Your app will be live at http://localhost:3000.

## 🛠️ Approach and Development Journey

I knew that jumping straight into coding would be a mess, so I started by sketching out ideas in Figma. I played around with layouts, user flows, and features until everything made sense. This wasn’t just about looks—it was about making sure the app felt natural and worked well on all devices.

Once the design felt right, I chose Next.js 14 with TypeScript. Next.js gave me the speed and performance I needed, and TypeScript made sure my code stayed clean and easy to maintain. I wanted the project to be easy to scale, so I kept everything modular: reusable components, a centralized place for utilities, and clear state management.

## 📁 Project Structure

```
HACKTHENORTH
│
├── public/                   # Static assets
│   ├── icons/                # SVGs and PNGs
│   └── ...
│
├── src/                      # Source code
│   ├── app/                  # Next.js pages and routes
│   ├── components/           # Reusable UI components
│   ├── context/              # Global state management
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utilities
│   ├── styles/               # Tailwind styles
│   └── types/                # TypeScript types
│
├── next.config.mjs           # Next.js config
└── tailwind.config.ts        # Tailwind config
```

This structure ensured that everything had its place, making it easy for any developer to jump in and understand the codebase.

## 🛠️ Technologies Used and Why

- Next.js 14 for SSR capabilities, improving performance and SEO.
- TypeScript for type safety and maintainable code.
- shadcn/ui and Radix UI for accessible and customizable UI components.
- Tailwind CSS for efficient styling.
- React Context API for global state management.
- React DnD for drag-and-drop functionality.

## ⚙️ Implemented Features

- **API Integration**: Next.js API routes for fetching and displaying event data dynamically.
- **Authentication**: React Context with localStorage for session persistence.
- **Sorting and Filtering**: React state and hooks with memoization for performance.
- **Responsive Event Modal**: Radix Dialog for accessibility and responsiveness.
- **Drag & Drop Reordering**: React DnD for intuitive event management.
- **Performance Optimization**: useMemo and useCallback for efficient rendering.

## ⚡ Challenges I faced

- **Responsive Design**: CSS breakpoints and viewport units ensured seamless design across devices.
- **State Management**: Combined Context API for global state and local state for component-specific data.

## 🔮 Future Enhancements

- Real-time WebSocket updates
- Calendar synchronization
- Dark mode support
- Advanced filtering
- CI/CD pipelines and comprehensive testing
