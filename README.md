# Pathfinding Visualizer

A dynamic web application that visualizes various pathfinding algorithms, enabling users to understand and compare their performance in real-time.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Algorithm Visualization:** Demonstrates how different path finding algorithms traverse grids to find optimal paths.
- **Interactive Interface:** Users can draw obstacles, and watch algorithms in action.

## Tech Stack

- **Frontend Framework:** React
- **Language:** TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS
- **Linting:** ESLint

## Installation

To set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dnguyen316/pathfinding-visualizer.git
   ```

2. **Navigate to the project directory:**

   ```bash
    cd pathfinding-visualizer
   ```

3. **Install dependencies:**

   ```bash
    npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

# Usage

- Draw Obstacles: Click and drag to create barriers that the algorithms must navigate around.
- Select Algorithm: Choose from a list of path finding algorithms to visualize.
- Run Visualization: Click the 'Start' button to see the selected algorithm in action.

# Project Structure

The project follows a straightforward structure. Here’s an overview:

```graphql
pathfinding-visualizer/
├── .github/               # GitHub-specific configurations (e.g., workflows)
├── dist/                  # Compiled and built files (generated after running build)
├── node_modules/          # Installed dependencies (ignored in Git)
├── public/                # Public static assets
│   ├── vite.svg           # Static asset example
├── src/                   # Source code
│   ├── assets/            # Static assets like images or icons
│   ├── components/        # Reusable UI components for the application
│   ├── context/           # React Context API for global state management
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Core logic and helper utilities
│   ├── utils/             # General utility functions
│   ├── App.css            # Main app styles
│   ├── App.tsx            # Root application component
│   ├── index.css          # Global styling file
│   ├── main.tsx           # Entry point of the application
│   ├── vite-env.d.ts      # Vite environment type definitions
├── .gitignore             # Specifies files/folders to ignore in Git
├── eslint.config.js       # ESLint configuration for code linting
├── index.html             # Main HTML template file
├── package-lock.json      # Dependency lock file
├── package.json           # Project metadata, dependencies, and scripts
├── postcss.config.js      # PostCSS configuration (used with Tailwind CSS)
├── README.md              # Project documentation
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.app.json      # TypeScript configuration specific to the app
├── tsconfig.node.json     # TypeScript configuration for Node.js
├── tsconfig.node.tsbuildinfo # Build info for incremental TypeScript compilation
├── tsconfig.app.tsbuildinfo  # Build info for incremental TypeScript compilation
├── vite.config.ts         # Vite configuration file
└── tsconfig.json        # TypeScript configuration
```

# License

This project is licensed under the MIT License. See the LICENSE file for details.

```pgsql
  Feel free to update or adjust any sections as needed to better fit your project's specifics.
```
