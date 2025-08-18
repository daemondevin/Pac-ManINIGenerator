# Pac-Man INI Generator

## Overview

This is a web application for creating and managing PortableApps Compiler (PAC) configuration files. The application provides a user-friendly interface to configure portable applications settings including app information, launch parameters, activation settings, registry entries, file operations, and services. It's built as a full-stack TypeScript application with a React frontend and Express backend, designed to simplify the complex process of creating PAC configuration files.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: React hooks for local state, TanStack Query for server state

### Backend Architecture
- **Runtime**: Node.js with Express framework
- **Language**: TypeScript with ES modules

### Development Environment
- **Build System**: Vite for frontend bundling and development server
- **TypeScript**: Strict mode enabled with path mapping for clean imports
- **Code Organization**: Modular structure with shared utilities and components

## External Dependencies

### UI Framework & Components
- **@radix-ui/**: Complete suite of accessible UI primitives
- **@tanstack/react-query**: Data fetching and caching library
- **class-variance-authority**: Utility for creating component variants
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library for React applications

### Development & Build Tools
- **vite**: Next-generation frontend build tool
- **@vitejs/plugin-react**: React plugin for Vite

### Form & Validation
- **react-hook-form**: Performant forms library for React
- **@hookform/resolvers**: Validation resolvers for React Hook Form

### Utility Libraries
- **date-fns**: Modern JavaScript date utility library
- **clsx**: Utility for constructing className strings
- **wouter**: Minimalistic routing for React applications
- **nanoid**: Unique string ID generator