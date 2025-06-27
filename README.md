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
- **Email Organization**: Move emails between inbox, sent, and trash foldersResponse
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
├── shared/
│   ├── contract/         # Contract between frontend and backend
│   └── domain/           # Domain models and business logic
├── frontend/
│   └── platform/         # Platform-specific frontend code
```

### Technology Stack

- **Frontend**: Angular + Ionic
- **Desktop**: Electron
- **Mobile**: Capacitor
- **Backend**: NestJS (Clean Architecture + DDD)
- **Monorepo**: Nx Workspace
- **Database**: IndexedDB (client) + PostgreSQL (server)
- **API Communication**: tRPC for type-safe API communication

### Architecture Highlights

- **Clean Architecture**: Separation of concerns with domain-driven design
- **Cross-Platform**: Single codebase for web, desktop, and mobile
- **Offline-First**: Local storage with synchronization capabilities
- **Type Safety**: End-to-end type safety from database to UI

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or Bun package manager
- PostgreSQL (for server-side storage)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/calm-mail.git
cd calm-mail
```

2. Install dependencies:

```sh
npm install
# or if using Bun
bun install
```

3. Build the project:

```sh
npm run build-all
# or
nx run-many --target=build --all
```

### Running the Application

#### Development Mode

To run the web application in development mode:

```sh
npm run serve
# or
nx serve web
```

To run the server in development mode:

```sh
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
npm run test-all
# or
nx run-many --target=test --all
```

## Development Status

CalmMail is currently in Phase 1 (MVP) with the following focus:

- Basic email reading and sending
- Single account support
- Desktop-first development
- Local storage implementation

Future phases will include:

- Multi-platform support (mobile apps)
- Multi-account management
- Cross-device synchronization
- Enhanced features (advanced search, filtering, etc.)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
