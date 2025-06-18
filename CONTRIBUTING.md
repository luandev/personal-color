# Contributing to Personal Color Assistant

Thank you for your interest in contributing to the Personal Color Assistant app! This document provides guidelines and instructions for contributing to this project.

## Development Setup

1. Fork the repository
2. Clone your fork
   ```bash
   git clone https://github.com/YOUR-USERNAME/personal-color.git
   cd personal-color
   ```
3. Install dependencies
   ```bash
   npm install
   ```
4. Create a branch for your feature or bug fix
   ```bash
   git checkout -b feature/your-feature-name
   ```
   
## Development Workflow

1. Make your changes
2. Test your changes locally
   ```bash
   npx expo start
   ```
3. Ensure code quality
   ```bash
   npm run lint
   npx tsc --noEmit
   ```
4. Commit your changes with a descriptive message
   ```bash
   git commit -m "Add feature: your feature description"
   ```
5. Push to your fork
   ```bash
   git push origin feature/your-feature-name
   ```
6. Create a Pull Request on GitHub

## Pull Request Guidelines

- Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification
- Include a clear description of the changes
- Update documentation as needed
- Ensure all tests pass
- Keep PRs focused on a single concern

## Code Style

- Follow the existing code style and structure
- Use TypeScript types appropriately
- Document complex functions
- Keep components small and focused

## Creating Issues

When creating issues, please:

1. Check if a similar issue already exists
2. Use a clear and descriptive title
3. Include steps to reproduce (for bugs)
4. Include expected and actual behavior
5. Include screenshots if relevant
6. Tag with appropriate labels

## CI/CD Pipeline

All pull requests are automatically tested using GitHub Actions workflows:

- Lint and type checking
- Build verification

Make sure your changes pass all CI checks before requesting a review.

## License

By contributing to this project, you agree that your contributions will be licensed under the project's license.

Thank you for your contribution!
