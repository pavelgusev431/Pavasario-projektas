# TECHIN fullstack (PERN) project

User-driven online shop "Just Do It"

## Table of contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

1. Clone the repository:

```bash
 git clone https://github.com/pavelgusev431/Pavasario-projektas.git
```

2. Install dependencies:

```bash
 npm install
```

3. Install PostgreSQL on your local machine

4. Create a local postgresql database

5. Navigate to _server -> .env_ file and change the required fields to the ones you have configured:

```
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASS=your_database_password
```

## Usage

This is a fullstack project, meaning you will have to run both the client and the server.
First, navigate to the server directory:

```bash
cd server
```

And run the following command:

```bash
npm run start
```

Then in a separate terminal navigate to the client directory:

```bash
cd client
```

And run the same command:

```bash
npm run start
```

If there are no errors - you have configured everything correctly and the web-app is working.
Now you can open this url to see your started project online:
