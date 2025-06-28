# Calm Mail

![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/gnuheike/5e5f0185a79b23d8609188502a8ce8af/raw/coverage-badge.json)

![Calm Mail](https://gnuheike.top/clouds.jpg)

CalmMail is a lightweight, cross-platform email client application that provides essential email functionality across
desktop and mobile devices. The application focuses on simplicity, reliability, and seamless synchronization while
maintaining a consistent user experience across all platforms.

## Features

### Email Management

- **Inbox Management**: View, read, and organize incoming emails
- **Email Composition**: Create, edit, and send emails with basic formatting
- **Draft System**: Save work-in-progress emails for later completion
- **Email Organization**: Move emails between inbox, sent, and trash folders
- **Read Status**: Mark emails as read/unread for better tracking

### Account Management

- **Multi-Account Support**: Add and manage multiple email accounts (IMAP/POP3)
- **Authentication**: Secure login with standard email protocols
- **Account Settings**: Configure and modify email account parameters

### Synchronization

- **Cross-Device Sync**: Keep emails synchronized across all devices
- **Offline Mode**: Basic offline functionality with sync when connected
- **Real-time Updates**: Automatic email fetching and status updates

### User Interface

- **Responsive Design**: Optimized layouts for desktop, tablet, and mobile
- **Dark/Light Themes**: User preference-based theming
- **Intuitive Navigation**: Simple folder structure and email threading

## Technical Architecture

CalmMail is built using an Nx monorepo structure with the following components:

### Project Structure

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

### Technology Stack

- **Frontend**: Angular 20 + Ionic 8
- **Desktop**: Electron 36
- **Mobile**: Capacitor 7
- **Backend**: NestJS 11 (Clean Architecture + DDD)
- **Monorepo**: Nx Workspace 21
- **Storage**: @ionic/storage-angular
- **API Communication**: ts-rest for type-safe API communication

### Architecture Highlights

- **Clean Architecture**: Separation of concerns with domain-driven design
- **Cross-Platform**: Single codebase for web, desktop, and mobile
- **Offline-First**: Local storage with synchronization capabilities
- **Type Safety**: End-to-end type safety from database to UI

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Bun package manager (recommended)
- Nx CLI (`npm install -g nx` or `bun install -g nx`)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/calm-mail.git
cd calm-mail
```

2. Install dependencies:

```sh
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

3. Build the project:

```sh
# Build all projects
nx run-many --target=build --all --parallel
```

### Running the Application

#### Development Mode

To run the web application in development mode:

```sh
# Using npm scripts
npm run web:serve

# Or using nx directly
nx serve web
```

To run the server in development mode:

```sh
# Using npm scripts
npm run server:serve

# Or using nx directly
nx serve server
```

#### Production Build

To create a production build:

```sh
nx build web --configuration=production
nx build server --configuration=production
```

### Testing

Run all tests:

```sh
# Run all tests with coverage
npm run ci:test

# Generate merged coverage report
npm run ci:test-coverage-merge
npm run ci:generate-coverage-report
```

### Troubleshooting

If you encounter build issues:

```sh
# Reset Nx cache
npm run reset
# or
bun reset
```

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
