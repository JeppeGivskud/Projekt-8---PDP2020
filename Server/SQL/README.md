# Server.js
This is a simple Node.js server that connects to a MySQL database and provides endpoints to fetch data.

## Setup

Before running the server, make sure you have Node.js and MySQL installed on your machine.

## Running the Server

To start the server, navigate to the project directory in your terminal and run:

```bash
node server.js
```

## Endpoints

### `GET /getData`

This endpoint fetches all data from the `Habits` table in the database. The data is returned as a JSON object where each key is a `currentDate` and the value is the corresponding row from the database.

Example response:

```json
{
    "2024-05-08T22:00:00.000Z": {
        "habitName": "Running",
        "target": 5,
        "routine": "Morning",
        "currentDate": "2024-05-08T22:00:00.000Z"
    },
    "2024-05-09T22:00:00.000Z": {
        "habitName": "Reading",
        "target": 30,
        "routine": "Evening",
        "currentDate": "2024-05-09T22:00:00.000Z"
    }
}
```

### `GET /getDate`

This endpoint fetches the current date from the MySQL server. The date is returned as a string in the format "YYYY-MM-DDTHH:mm:ss.sssZ".

Example response:

```json
[
    {
        "CURRENT_DATE": "2024-05-08T22:00:00.000Z"
    }
]
```

### `GET /getTarget`

This endpoint fetches the target for a specific habit from the `Habits` table in the database. The habit name is passed as a query parameter. The target is returned as a JSON object.

Example request:

```http
GET /getTarget?habitName=Running
```

Example response:

```json
{
    "target": 5
}
```

### `GET /getRoutine`

This endpoint fetches the routine for a specific habit from the `Habits` table in the database. The habit name is passed as a query parameter. The routine is returned as a JSON object.

Example request:

```http
GET /getRoutine?habitName=Running
```

Example response:

```json
{
    "routine": "Morning"
}
```

### `POST /newHabitRow`

This endpoint creates a new row in the `Habits` table in the database. The habit name, target, and routine are passed in the request body as JSON.

Example request:

```http
POST /newHabitRow
Content-Type: application/json

{
    "habitName": "Running",
    "target": 5,
    "routine": "Morning"
}
```

The server responds with a status code of 200 if the row is successfully created. If there's an error, the server responds with a status code of 500 and an error message.

## Database Connection

The server connects to the MySQL database at startup. If the connection is successful, it logs "MySQL Connected..." to the console. If the connection fails, it throws an error.