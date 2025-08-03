# Overview

This is a modern full-stack web application for RealWorld AI, an AI and automation consulting company. The application is built as a professional marketing website showcasing AI services, with contact forms and newsletter subscription functionality. It features a React frontend with shadcn/ui components, an Express.js backend with PostgreSQL database integration using Drizzle ORM, and is designed for rapid deployment and scaling.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side application uses React with TypeScript, built with Vite for fast development and optimized production builds. The UI is constructed using shadcn/ui components based on Radix UI primitives, providing a comprehensive design system with consistent styling through Tailwind CSS. The application follows a single-page application (SPA) pattern with client-side routing via Wouter, and uses TanStack React Query for server state management and API communication.

## Backend Architecture
The server is built with Express.js and follows a RESTful API design pattern. The application uses a modular route structure with dedicated endpoints for contact form submissions and newsletter subscriptions. Error handling is centralized through Express middleware, and the server includes request logging and response time tracking for monitoring.

## Data Storage
The application uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations. The schema defines three main entities: users, contact submissions, and newsletter subscriptions. For development flexibility, the system includes both database-backed storage and in-memory storage implementations through an interface-based storage abstraction.

## Development and Build Process
The project uses a monorepo structure with shared TypeScript types and schemas between client and server. Vite handles the frontend build process with React support, while esbuild bundles the backend for production. The development environment includes hot module replacement and integrated error overlays for rapid iteration.

## External Dependencies

- **UI Framework**: React with TypeScript for component-based frontend development
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design system
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Build Tools**: Vite for frontend bundling and esbuild for backend compilation
- **State Management**: TanStack React Query for server state and API interactions
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing
- **Routing**: Wouter for lightweight client-side routing
- **Development**: Replit integration with cartographer plugin for enhanced development experience