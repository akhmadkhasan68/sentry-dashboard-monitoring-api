# Sentry Dashboard Monitoring API

A robust API service for monitoring issues and generating interactive dashboards from Sentry data. This project seamlessly integrates with the Sentry API to provide comprehensive monitoring capabilities.

## 🚀 Features

- Real-time issue monitoring from Sentry
- Interactive dashboard generation
- Custom API endpoints for data retrieval
- Caching system for improved performance
- Database persistence for historical data

## 🛠 Tech Stack

- Node.js LTS
- TypeScript
- Express.js
- Sequelize ORM
- MySQL Database
- Redis Cache

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js LTS version
- MySQL Server
- Redis Server
- Git

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following configurations:

```env
APP_PORT=3000
APP_ENV=development

SENTRY_API_AUTH_TOKEN=YOUR_SENTRY_AUTH_TOKEN
SENTRY_API_BASE_URL=https://sentry.io/api/

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=sentry_dashboard
DB_DIALECT=mysql
```

## 🔧 Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/sentry-dashboard-monitoring-api.git
cd sentry-dashboard-monitoring-api
```

2. Install dependencies
```bash
npm install
```

3. Set up the database
```bash
# Create database
npm run db:create

# Run migrations
npm run db:migrate
```

4. Build the project
```bash
npm run build
```

5. Start the development server
```bash
npm run dev
```

The API will be available at `http://localhost:3000` (or your configured APP_PORT).

## 🏃‍♂️ Running in Production

For production deployment:

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 📝 API Documentation

API documentation will be available at `/api-docs` endpoint after starting the server.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Akhmad Khasan Abdullah

## 🙏 Acknowledgments

- Sentry Team for their excellent API
- Contributors and maintainers
