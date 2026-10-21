# API Dashboard

A lightweight user-record dashboard backed by an Express API. The browser interface displays user records, active and inactive totals, department count, and API connection status.

## Requirements

- Node.js
- npm

## Getting started

Install dependencies and start the server:

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The server listens on port `3000`.

## API

### `GET /api/data`

Returns the in-memory user records and their total count.

```bash
curl http://localhost:3000/api/data
```

Example response:

```json
{
  "success": true,
  "users": [
    {
      "id": 1,
      "name": "Olivia Chen",
      "email": "olivia.chen@example.com",
      "department": "Engineering",
      "role": "Manager",
      "status": "active",
      "joinedDate": "2023-02-14"
    }
  ],
  "count": 10
}
```

Each user has an `id`, `name`, `email`, `department`, `role`, `status` (`active` or `inactive`), and `joinedDate` (`YYYY-MM-DD`). The response contains all 10 sample users.

### `GET /api/health`

Returns the server status, process uptime in seconds, and current timestamp.

```bash
curl http://localhost:3000/api/health
```

## Project structure

```text
.
├── public/
│   ├── app.js       # Fetches API data and renders the dashboard
│   ├── index.html   # Dashboard page
│   └── style.css    # Dashboard styles
├── routes/
│   └── data.js      # Sample user data and API routes
├── package.json
└── server.js        # Express app and static-file server
```

## Data storage

User records are defined in `routes/data.js` and held in memory. There is no database or persistence layer; editing the sample records requires changing that file.
