# Instagram Stories Clone

A React-based web application that replicates the Instagram Stories feature. Built with React, TypeScript, and Vite, this project demonstrates a modern approach to building interactive web applications with smooth animations and transitions.

## Features

- Horizontal scrollable story list
- Story preview with progress indicators
- Interactive user interface
- Responsive design
- End-to-end testing with Cypress

## Prerequisites

Before you begin, ensure you have Node Version Manager (NVM) installed on your system. This project requires Node.js version 20.

## Setup Instructions

1. **Node.js Setup**

```bash
# Install Node.js version 20
nvm install 20

# Use Node.js version 20
nvm use 20
```

2. **Project Setup**

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Testing

This project uses Cypress for end-to-end testing. To set up and run Cypress tests:

1. **Install Cypress Dependencies**

```bash
npm install
```

2. **Open Cypress Test Runner**

```bash
npm run cypress:open
```

3. **Run Cypress Tests Headlessly**

```bash
npm run cypress:run
```

## Development

- Built with React + TypeScript + Vite
- Uses TailwindCSS for styling
- ESLint for code quality
- Cypress for end-to-end testing

## ESLint Configuration

For production applications, enable type-aware lint rules:

```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

For React-specific linting, install and configure eslint-plugin-react:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  settings: { react: { version: "18.3" } },
  plugins: {
    react,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
