# 🧼 Clean Architecture Todo API

> A scalable, testable and maintainable **Task Management API** built with Node.js, TypeScript, Express and Clean Architecture principles.

---

## 📐 Architecture

This project strictly follows the [Clean Architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html) principles to separate concerns and enable scalability, testability, and clear responsibilities across the layers:

```
Domain → Application → Infrastructure → Interface
```

### 🗂️ Layers Overview

- **Domain**: Contains business rules, entity models, and repository contracts.
- **Application**: Encapsulates use cases and DTOs.
- **Infrastructure**: Implementation details (e.g., in-memory DB or MongoDB).
- **Interface**: HTTP layer with controllers, adapters, errors, Swagger docs, and routes.

### 📊 Architecture Diagram

![Clean Architecture Diagram](./docs/architecture-diagram.png)

---

## 🚀 Features

- ✅ Create, read, update, complete and delete tasks
- 💡 Clean Architecture and SOLID principles
- 🔍 Swagger UI (OpenAPI 3) integration
- 🧪 Unit tests with Jest
- 🧹 Code quality with ESLint + Prettier + Husky + Lint-staged
- 🧪 In-memory MongoDB for test isolation
- 📁 Type-safe and scalable folder structure

---

## 🔧 Tech Stack

| Layer         | Technologies                                |
|---------------|---------------------------------------------|
| Runtime       | Node.js, Express                            |
| Language      | TypeScript                                  |
| Container     | InversifyJS (IoC / Dependency Injection)    |
| Testing       | Jest, mongodb-memory-server                 |
| Documentation | Swagger (swagger-jsdoc, swagger-ui-express)|
| Quality       | ESLint, Prettier, Husky, Commitlint         |
| Dev Tools     | ts-node-dev, tsc-alias, tsconfig-paths      |

---

## 📦 Getting Started

### 🔨 Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- Git

### ⚙️ Installation

```bash
git clone https://github.com/your-username/clean-architecture-todo.git
cd clean-architecture-todo
npm install
```

### 🛠️ Environment Variables

This project uses [`dotenv-flow`](https://www.npmjs.com/package/dotenv-flow) to manage environment-specific configuration files.

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB connection string (replace with your actual connection URI)
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/tasklin?retryWrites=true&w=majority

# Application port
PORT=3000

# Environment (development, production)
NODE_ENV=development
```

> ℹ️ When NODE_ENV is set to development, the system uses an in-memory database to simplify testing and local development. You can further customize environment-specific settings using `.env.local`, `.env.production`, or `.env.test` files.

### ▶️ Run the API

```bash
# Start development server
npm run dev
```

### 📚 Access API Docs

Once the server is running, open:  
[http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

---

## 🧼 Code Quality

```bash
# Lint check
npm run lint

# Auto fix lint issues
npm run lint:fix

# Format code
npm run format
```

> 🪝 Pre-push hooks are automatically handled via `husky` + `lint-staged` for linting, formatting and tests.

---

## 📁 Folder Structure

```
src/
├── application/           # Use cases & DTOs
├── core/                  # Constants, types, and dependency bindings
├── domain/                # Entities and interfaces (pure business logic)
├── infrastructure/        # DB implementations (e.g., InMemory, Mongo)
├── interface/             # HTTP layer: routes, controllers, docs
├── interface/http/docs/   # Swagger documentation
└── interface/http/errors/ # Standardized error classes
```

---

## 📄 API Endpoints

| Method | Endpoint                | Description             |
|--------|-------------------------|-------------------------|
| POST   | `/tasks`                | Create a new task       |
| GET    | `/tasks/{id}`           | Get task by ID          |
| PATCH  | `/tasks/{id}/complete`  | Mark task as complete   |
| DELETE | `/tasks/{id}`           | Delete a task           |
| GET    | `/tasks`                | List all tasks          |

All errors follow a standard format with HTTP status code, message, and optional details.

---

## 📃 License

This project is licensed under the **ISC License**.

---

## 🙋 About the Author

**Victor Santos**  
[LinkedIn](https://www.linkedin.com/in/victor-oliveira-santos-b10bb81ab/) · [Email](mailto:victorevh@gmail.com)

---

> Built with ❤️ and Clean Code.