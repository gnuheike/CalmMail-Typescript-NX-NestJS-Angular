# AI Agent Onboarding: Project CalmMail

Welcome, Junie. This document is your primary guide for understanding and contributing to the CalmMail project. It
outlines the project's architecture, technologies, coding standards, and development workflow. Adherence to these
guidelines is crucial for maintaining a clean, scalable, and maintainable codebase.

## 1. Project Mission & High-Level Overview

**Your Role:** You are an expert AI software engineer. Your goal is to write clean, performant, and maintainable code
that aligns with the principles and patterns outlined below.

**Project CalmMail:** A cross-platform email client designed for a calm and focused user experience. It is built as a
monorepo to maximize code sharing and maintain consistency across web, mobile, and desktop platforms.

---

## 2. Architectural Philosophy

The project is built upon the principles of **Clean Architecture** and **Separation of Concerns (SoC)**. This means we
strictly separate different layers of the application to ensure that business logic is independent of frameworks and
external agencies (like databases or UIs).
The project follows **Clean Architecture** principles with clear separation of concerns:

1. **Domain Layer** (`shared/domain`): Core business logic and models with zero external dependencies
2. **Application Layer** (`shared/contract`, `apps/server`, `apps/web`): Orchestrates data flow between layers
3. **Infrastructure Layer** (`apps/server`, `apps/web`): External frameworks and libraries

## 3. Technology Stack

| Area           | Technologies                      |
|----------------|-----------------------------------|
| Monorepo       | Nx with Bun                       |
| Backend        | NestJS (v11+)                     |
| Frontend       | Angular (v20+), Ionic (v8+)       |
| API            | ts-rest with Zod schemas          |
| Mobile/Desktop | Capacitor (iOS/Android), Electron |
| Testing        | Jest                              |

## Project Structure

```
apps/
  server/       # NestJS backend application
  web/          # Angular frontend application
libs/
  backend/      # Backend-specific libraries
  frontend/     # Frontend-specific libraries
  shared/       # Shared code between frontend and backend
```

## Development Workflow

### Setup and Installation

```bash
# Install dependencies
bun install

# Start development servers
nx serve web     # Frontend
nx serve server  # Backend
```

### Testing

```bash
# Run tests for specific project
nx test <project-name>
# Examples:
nx test server
nx test shared-domain

# Run all tests
nx run-many --target=test --all
```

### Building

```bash
# Build specific project
nx build <project-name>
# Examples:
nx build server
nx build web

# Build all projects
nx run-many --target=build --all
```

### Troubleshooting

```bash
# Clear Nx cache if you encounter build issues
bun reset
```

## Coding Standards

### Core Principles

- **Type Safety**: Use TypeScript strict mode and avoid `any` at all costs
- **Modularity**: Organize code into purpose-driven libraries
- **Testing**: Write simple, focused tests that verify behavior
- **Code Style**: Follow ESLint and Prettier configurations

### Frontend Best Practices

- Use standalone components (`standalone: true`)
- Use Signals for state management
- Use OnPush change detection
- Implement lazy loading for all feature routes
- Keep components small and focused on a single responsibility

### Backend Best Practices

- Use NestJS's dependency injection
- Define ts-rest contracts and Zod schemas in `shared/contract`
- Implement handlers in NestJS controllers using `@ts-rest/nest`

### TypeScript Guidelines

- Use `interface` for object shapes, `type` for unions/intersections
- Use `readonly` for immutable properties
- Prefer named exports over default exports
- Use absolute paths for imports from other libraries

## Linting and Code Quality

The project uses ESLint with configurations for TypeScript and Angular:

- Run `nx lint <project-name>` to check for issues
- Fix all linting issues before committing code
- Maximum function size: 50 lines
- Maximum cyclomatic complexity: 10

## Additional Resources

- [Nx Documentation](https://nx.dev)
- [NestJS Documentation](https://docs.nestjs.com)
- [Angular Documentation](https://angular.dev)
- [ts-rest Documentation](https://ts-rest.com)
- [Bun Documentation](https://bun.sh)
