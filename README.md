# Detailed technical and feature overview of the project.
Tiny restaurant management system 

## Technical Description
    - Main Framework: React (latest version, 19.x)
    - Build Tool: Vite (for fast development and build)
    - Styling: TailwindCSS (utility-first CSS), DaisyUI (UI component library for Tailwind)
    - State Management: React Context and possibly custom hooks (see /src/providers and /src/hooks)
    - Routing: React Router DOM (v7.x)
    - Forms: React Hook Form (for handling and validating forms)
    - Icons: React Icons
    - Animations: Framer Motion (for UI animations)
    - Utilities:
    - Axios (for HTTP requests)
    - Match Sorter (for advanced filtering/searching)
    - React Responsive Carousel (for image carousels/slideshows)
    - React Tabs (for tabbed interfaces)
    - SweetAlert2 (for beautiful alert dialogs)
    - Firebase (integration, likely for authentication and/or backend)
    - LocalForage (for offline/local storage)
    - Sort By (utility for sorting data)

## Directory Structure (Key Points)
    - /src/App.jsx and /src/main.jsx: Application entry points
    - /src/Layout: Layout components for page structure
    - /src/Pages: Likely contains main page components (Home, Menu, About, etc.)
    - /src/Routes: Route definitions for React Router
    - /src/components: Reusable/shared UI components
    - /src/assets: Static assets (images, logos, etc.)
    - /src/firebase: Firebase configuration and hooks
    - /src/hooks: Custom React hooks
    - /src/providers: Context providers for global state

## Feature Highlights (inferred)
    - User Interface: Modern, mobile-friendly, and responsive using TailwindCSS and DaisyUI
    - Navigation: Multi-page navigation with React Router
    - Authentication: Likely via Firebase
    - Forms: User input forms with validation (React Hook Form)
    - Dynamic Content: Carousels, tabs, and animated UI
    - Data Handling: API calls using Axios, local storage with LocalForage
    - Alerts: Stylish popups and alerts with SweetAlert2

## Key Packages Used
    react, react-dom, react-router-dom, react-helmet, react-icons, framer-motion, axios, daisyui, tailwindcss, firebase, localforage, sweetalert2, react-responsive-carousel, react-tabs, match-sorter, sort-by
    For a complete list, see your package.json file.


