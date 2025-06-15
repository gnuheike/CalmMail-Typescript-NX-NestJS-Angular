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

### Architectural Layers Mapped to Project Structure:

* **Domain Layer (`shared/domain`)**
* **Purpose:** The core of the application. Contains enterprise-wide business logic and models (entities).
* **Contents:** Business models, use cases, and core business rules.
* **Key Rule:** This layer has **zero dependencies** on any other layer. It knows nothing about NestJS, Angular,
  databases, or the web.

* **Application Layer (`apps/server`, `apps/web`, `shared/contract`)**
* **Purpose:** Orchestrates the data flow between the Domain and Infrastructure layers. Contains application-specific
  business logic.
* **Contents:**
    * `shared/contract`: Defines the API surface (ts-rest contracts, Zod schemas). This is the public interface of our
      application logic.
    * `apps/server`: Implements the application logic, connecting use cases to web frameworks and databases.
    * `apps/web`: The client-side application that consumes the API.

* **Infrastructure Layer (`apps/server`, `apps/web`)**
* **Purpose:** Contains all external details and frameworks. This is where we interact with the outside world.
* **Contents:**
    * NestJS and Angular frameworks.
    * Database clients, email server communication libraries (`node-imap`, `nodemailer`).
    * UI components (Ionic).
    * External API clients (e.g., for AI processing).

---

## 3. Technology Stack

| Category           | Technology                                            |
|--------------------|-------------------------------------------------------|
| **Monorepo**       | Nx (with Bun as the package manager/runner)           |
| **Backend**        | NestJS                                                |
| **API Layer**      | ts-rest (for type-safe, end-to-end API communication) |
| **Frontend**       | Angular (v20+), Ionic (v8+)                           |
| **Cross-Platform** | Capacitor (iOS/Android), Electron (Desktop)           |
| **Type Safety**    | TypeScript (strict mode), Zod (for schema validation) |
| **Real-time**      | WebSockets via NestJS (`@nestjs/websockets`)          |
| **Testing**        | Jest                                                  |

---

## 4. Core Development Principles

These are the fundamental rules that apply across the entire codebase.

* **Type Safety is Paramount:** Use TypeScript and Zod to ensure type safety from the database to the UI. **Avoid `any`
  at all costs.** Use `unknown` for values whose type is genuinely unknown at compile time and perform runtime checks.
* **Modularity via Nx:** Organize code into purpose-driven libraries within the `shared` directory. This enforces
  boundaries, improves organization, and allows for targeted testing and building.
* **Simplicity in Testing:** Tests should be simple, focused, and avoid complex logic. They are meant to verify
  behavior, not to be a complex system in themselves.
* **Automated Code Style:** Adhere to the project's ESLint and Prettier configurations. The CI/CD pipeline will enforce
  these rules.

---

## 5. Backend Guidelines (NestJS & ts-rest)

* **Dependency Injection (DI):**
* Use NestJS's built-in DI container to manage services and dependencies.
* Services should be injectable and responsible for orchestrating use cases and interacting with infrastructure
  components.
* **ts-rest Integration:**
* **Definition:** Define ts-rest contracts and Zod schemas in `shared/contract`. This is the single source of truth for
  your API's shape.
* **Implementation:** Implement the handlers for these contracts within NestJS controllers in `apps/server`. Use
  `@ts-rest/nest` decorators to connect the contract to the NestJS application.
* **Handlers:** Use the `@TsRestHandler` decorator and `tsRestHandler` function to process requests and return
  responses.
* **External Communications:**
* **Email Servers:** Encapsulate IMAP (`node-imap`), SMTP (`nodemailer`), and parsing (`mailparser`) logic within
  dedicated NestJS services. These services are part of the Infrastructure Layer.
* **AI Services:** Communicate with external AI servers using standard HTTP clients (e.g., `axios`) or WebSocket
  libraries. Manage these clients as injectable NestJS providers.

---

## 6. Frontend Guidelines (Angular & Ionic)

### 6.1. General Best Practices

* **Standalone is Standard:** All new components, directives, and pipes **must** be `standalone: true`. NgModules are
  considered legacy.
* **Signals for State:** Use Signals as the primary tool for state management.
* **RxJS for Events:** Use RxJS for handling complex asynchronous events, such as user input, WebSocket messages, or
  multiple chained HTTP requests.
* **Performance First:**
* **Change Detection:** Always use `changeDetection: ChangeDetectionStrategy.OnPush`.
* **Lazy Loading:** Implement lazy loading for all feature routes to reduce the initial bundle size.
* **Image Optimization:** Use `NgOptimizedImage` for all static images.

### 6.2. Components

* **Responsibility:** Keep components small and focused on a single responsibility (SRP).
* **API:** Use the new `input()` and `output()` functions instead of `@Input()` and `@Output()` decorators for better
  type safety and conciseness.
* **Templates:** For small components (under ~20 lines of HTML), prefer inline templates. For larger components, use
  external template files.
* **Accessibility:** Always include meaningful accessibility attributes (ARIA roles, states, and properties).

### 6.3. State Management

* **Local State:** Use `signal()` for local component state.
* **Derived State:** Use `computed()` to derive values from other signals. This is highly efficient as it memoizes
  results.
* **Global State:** For complex, application-wide state, use a dedicated state management solution built on signals,
  such as NgRx Signals. Avoid using services as unstructured global state bags.

### 6.4. Services

* **Responsibility:** Design services around a single responsibility (e.g., `EmailApiService`, `AuthStateService`).
* **Injection:** Use `inject()` function within the constructor or for property initialization instead of
  `constructor(private service: Service)`. It's more flexible and readable.
* **Singleton Services:** Provide singleton services in the application root using `providedIn: 'root'`.

---

## 7. TypeScript Language Guidelines

### 7.1. Types & Interfaces

* **Strictness:** The `tsconfig.json` is configured for `strict` mode. Never disable it.
* **`any` vs. `unknown`:**
* Do not use `any`. It disables type checking.
* Use `unknown` when a type is not known. You must perform a type check before you can operate on a value of type
  `unknown`.
* **`interface` vs. `type`:**
* **Use `interface`** for defining the shape of objects, especially for public APIs that can be extended.
* **Use `type`** for creating aliases for union types, intersection types, tuples, or complex mapped types.
* **Immutability:** Use the `readonly` modifier for properties that should not be changed after initialization. Use
  `Readonly<T>` or `ReadonlyArray<T>` for collections.
* **Enums:** **Avoid creating new enums.** Instead, use string literal unions or `as const` objects, which are more
  type-safe and don't have the runtime footprint of enums.
* **Example:**
  `const STATUS = { OPEN: 'open', CLOSED: 'closed' } as const; type Status = typeof STATUS[keyof typeof STATUS];`

### 7.2. Code Structure

* **Exports:** Prefer named exports (`export const ...`) over default exports (`export default ...`) to ensure
  consistency in how modules are imported.
* **Imports:**
* Use `import type { ... }` when importing only types. This allows build tools to safely eliminate the import.
* Use absolute paths for imports from other Nx libraries (e.g., `@calm-mail/domain`).
* Use relative paths for imports within the same library.
* **Functions:** Prefer arrow functions for callbacks. Use `async/await` with `try/catch` blocks for asynchronous
  control flow over raw Promises and `.then/.catch`.

### 7.3. Naming Conventions

* **`camelCase`:** For variables, functions, and methods.
* **`PascalCase`:** For classes, interfaces, type aliases, and component selectors.
* **`UPPER_SNAKE_CASE`:** For constants and enum-like `as const` objects.
* **Private Members:** Avoid using an underscore prefix (`_privateField`). The `private` keyword is sufficient.

---

## 8. Development Workflow & Commands

1. **Install Dependencies:**
   ```bash
   bun install
   ```
2. **Run Tests for a specific library/app:**
   ```bash
   nx test <project-name>
   # Example: nx test server
   # Example: nx test shared-domain
   ```
3. **Clear Nx Cache (if you encounter build issues):**
   ```bash
   bun reset
   ```
4. **Build library/app**
   ```bash
   nx build <project-name>
   # Example: nx build server
   # Example: nx build shared-domain
   ```

---

## 9. Additional Resources

* **Nx:** [https://nx.dev](https://nx.dev)
* **NestJS:** [https://docs.nestjs.com](https://docs.nestjs.com)
* **ts-rest:** [https://ts-rest.com](https://ts-rest.com)
* **Bun:** [https://bun.sh](https://bun.sh)
* **Angular:** [https://angular.dev](https://angular.dev)

## 10. Folders structure

* We don't use src folders for libraries, all files are located in the library root
