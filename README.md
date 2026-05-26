# AWS Team Report Processing Platform

A robust backend REST API built with TypeScript/Node.js, Express, and PostgreSQL designed to efficiently manage teams, employees, and process reporting structures.

## 🚀 Features

- **Employee Management:** Manage complete employee lifecycle and directories.
- **Team Management:** Create and organize employees into structural teams.
- **Report Processing:** Generate, process, and manage analytical team reports.
- **AWS S3 Integration:** Secure, direct-to-S3 file uploads using Presigned URLs (supports dynamic file types like PDF, PNG, CSV, etc.).
- **Scalable Architecture:** Structured with routing and controllers for maintainability.
- **Relational Database Management:** Integrated with PostgreSQL for robust data persistence.

## 🛠️ Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (via `pg` client)
- **AWS SDK:** `@aws-sdk/client-s3` & `@aws-sdk/s3-request-presigner` for cloud storage.
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
   DB_USER=postgres
   DB_PASSWORD=your_super_secret_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=team_reports

   # AWS S3 Configuration
   AWS_REGION=eu-central-1
   AWS_ACCESS_KEY_ID=your_access_key_here
   AWS_SECRET_ACCESS_KEY=your_secret_key_here
   S3_BUCKET_NAME=team-report-storage-sp
   ```

4. **Database Setup:**
   Make sure you have a `reports` table in your PostgreSQL database to store report metadata:
   ```sql
   CREATE TABLE reports (
       id SERIAL PRIMARY KEY,
       team_id INT NOT NULL,
       uploaded_by INT NOT NULL,
       file_name VARCHAR(255) NOT NULL,
       s3_key VARCHAR(255) NOT NULL,
       status VARCHAR(50) NOT NULL,
       uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. **Start the Application:**
   ```bash
   node server.js
   ```
   *The server will start running on the port configured in your environment variables.*

## 📡 API Overview

The core API is split into the following modular routers:
- `/employees` - Endpoints for discovering and managing employee data.
- `/teams` - Endpoints for organizing functional and cross-functional teams.
- `/upload-report` (POST) - Generates an AWS S3 presigned URL for direct secure uploads of reports and logs the metadata into the database.

## 📝 License

This project is licensed under the ISC License.
