# AI Agent Onboarding: Project CalmMail

Welcome, Junie. This document is your primary guide for understanding and contributing to the CalmMail project. It
outlines the project's architecture, technologies, coding standards, and development workflow. Adherence to these
guidelines is crucial for maintaining a clean, scalable, and maintainable codebase.

## 1. Project Mission & High-Level Overview

**Your Role:** You are an expert AI software engineer. Your goal is to write clean, performant, and maintainable code
that aligns with the principles and patterns outlined below.

**Project CalmMail:** A lightweight, cross-platform email client application that provides essential email functionality across
desktop and mobile devices. The application focuses on simplicity, reliability, and seamless synchronization while
maintaining a consistent user experience across all platforms.

### Key Features

- **Email Management**: Inbox management, email composition, draft system, organization, read status tracking
- **Account Management**: Multi-account support (IMAP/POP3), secure authentication, account settings
- **Synchronization**: Cross-device sync, offline mode, real-time updates
- **User Interface**: Responsive design, dark/light themes, intuitive navigation

---

## 2. Architectural Philosophy

The project is built upon the principles of **Clean Architecture** and **Separation of Concerns (SoC)**. This means we
strictly separate different layers of the application to ensure that business logic is independent of frameworks and
external agencies (like databases or UIs).

The project follows **Clean Architecture** principles with clear separation of concerns:

1. **Domain Layer**: Core business logic and models with zero external dependencies
   - `libs/frontend/domain/` - Frontend domain models and business logic
   - `libs/backend/domain/` - Backend domain models
   - `libs/shared/domain/` - Shared domain models

2. **Application Layer**: Orchestrates data flow between layers
   - `libs/frontend/application/` - Application logic and state management
   - `libs/shared/contract/` - Contract between frontend and backend
   - `libs/permanent-storage/Application/` - Application layer for storage

3. **Infrastructure Layer**: External frameworks and libraries
   - `apps/web/` - Angular + Ionic web application
   - `apps/server/` - NestJS backend
   - `libs/frontend/adapter/` - Adapters for external services
   - `libs/permanent-storage/Infrastructure/` - Infrastructure implementation for storage

## 3. Technology Stack

| Area           | Technologies                                |
|----------------|---------------------------------------------|
| Monorepo       | Nx Workspace 21.2.1 with Bun                |
| Backend        | NestJS 11.1.3                               |
| Frontend       | Angular 20.0.4, Ionic 8.6.2                 |
| API            | ts-rest 3.52.1 with Zod 3.25.67 schemas     |
| Mobile         | Capacitor 7.4.0 (iOS/Android)               |
| Desktop        | Electron 36.5.0                             |
| Storage        | @ionic/storage-angular 4.0.0                |
| Testing        | Jest 29.7.0                                 |

## Project Structure

```
calm-mail/
├── apps/
│   ├── web/              # Web app (Angular + Ionic)
│   └── server/           # NestJS backend
├── libs/
│   ├── shared/
│   │   ├── contract/     # Contract between frontend and backend
│   │   └── domain/       # Domain models and business logic
│   ├── frontend/
│   │   ├── adapter/      # Adapters for external services
│   │   ├── application/  # Application logic and state management
│   │   ├── domain/       # Domain models and business logic
│   │   ├── shared/       # Shared utilities and components
│   │   └── ui/           # UI components
│   ├── backend/
│   │   ├── domain/       # Backend domain models
│   │   └── use-case-in-memory-adapter/ # In-memory adapters for use cases
│   └── permanent-storage/ # Persistent storage implementation
│       ├── Application/  # Application layer for storage
│       ├── Domain/       # Domain models for storage
│       └── Infrastructure/ # Infrastructure implementation for storage
```

## Development Workflow

### Prerequisites

- Node.js (v18 or later)
- Bun package manager (recommended)
- Nx CLI (`npm install -g nx` or `bun install -g nx`)

### Setup and Installation

```bash
# Clone the repository
git clone https://github.com/your-username/calm-mail.git
cd calm-mail

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

# Run all tests with coverage
npm run ci:test

# Generate merged coverage report
npm run ci:test-coverage-merge
npm run ci:generate-coverage-report
```

### Building

```bash
# Build specific project
nx build <project-name>
# Examples:
nx build server
nx build web

# Build all projects
nx run-many --target=build --all --parallel
```

### Troubleshooting

```bash
# Clear Nx cache if you encounter build issues
npm run reset
# or
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
- Maximum depth: 4
- Filename convention: kebab-case

## Development Status

CalmMail is currently in Phase 1 (MVP) with the following focus:

- Basic email reading and sending
- Single account support
- Web-first development

Future phases will include:

- Multi-platform support (mobile apps)
- Multi-account management
- Cross-device synchronization
- Enhanced features (advanced search, filtering, etc.)

## Additional Resources

- [Nx Documentation](https://nx.dev)
- [NestJS Documentation](https://docs.nestjs.com)
- [Angular Documentation](https://angular.dev)
- [ts-rest Documentation](https://ts-rest.com)
- [Bun Documentation](https://bun.sh)
- [Ionic Documentation](https://ionicframework.com/docs)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Electron Documentation](https://www.electronjs.org/docs)
