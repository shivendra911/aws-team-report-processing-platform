# AWS Team Report Processing Platform

A robust backend REST API built with TypeScript/Node.js, Express, and PostgreSQL designed to efficiently manage teams, employees, and process reporting structures.

## 🚀 Features

- **Employee Management:** Manage complete employee lifecycle and directories.
- **Team Management:** Create and organize employees into structural teams.
- **Report Processing:** Generate, process, and manage analytical team reports.
- **Scalable Architecture:** Structured with routing and controllers for maintainability.
- **Relational Database Management:** Integrated with PostgreSQL for robust data persistence.

## 🛠️ Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (via `pg` client)
- **Configuration:** `dotenv` for environment variable management.

## 📂 Project Structure

```
.
├── controllers/          # Request handlers and business logic
│   ├── employeeController.js
│   ├── reportController.js
│   └── teamController.js
├── routes/               # API route definitions
│   ├── employees.js
│   ├── reports.js
│   └── teams.js
├── db.js                 # PostgreSQL connection pool and configuration
├── server.js             # Express application entry point
└── package.json          # Dependencies and scripts metadata
```

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- Node.js (v18+ recommended)
- PostgreSQL (v12+ recommended)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shivendra911/aws-team-report-processing-platform.git
   cd aws-team-report-processing-platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add your database credentials and port preferences:
   ```env
   # Server Configuration
   PORT=3000

   # Database Configuration
   PGUSER=your_db_user
   PGHOST=localhost
   PGPASSWORD=your_db_password
   PGDATABASE=your_db_name
   PGPORT=5432
   ```

4. **Start the Application:**
   ```bash
   node server.js
   ```
   *The server will start running on the port configured in your environment variables.*

## 📡 API Overview

The core API is split into the following modular routers:
- `api/employees` - Endpoints for discovering and managing employee data.
- `api/teams` - Endpoints for organizing functional and cross-functional teams.
- `api/reports` - Endpoints for generating and processing team-specific reports.

## 📝 License

This project is licensed under the ISC License.
