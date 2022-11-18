# Vidtreon Insta API

A REST+JSON API service

@TODO

## Quickstart

1. Install required packages:

   ```
   npm install
   ```

2. Copy `.env.development` to `.env` and edit it with your settings.

3. Create new migration based on the schema changes

   ```
   npx prisma migrate dev --name SPECIFY NAME
   ```

4. Build DB from scratch - Run migrations and seed the data

   ```
   npx prisma migrate reset --preview-feature
   ```

5. Seed the database data when DB already is up to date

   ```
   npx prisma db seed
   ```

6. Run the tests:

   ```
   npm run test
   ```

### Development shell

Development shell runs nodejs shell with the application object (`app`),
database models (`models`) and the configuration object (`config`)
already imported. To run the shell:

```
npm run shell
```

The shell supports toplevel async/await (ie. you can use async/await
directly in the shell if needed).

## Production

To run the app in production, run:

```
npm start
```

Logs will be sent to the standard output in JSON format.

## Background tasks with Bull

A simple task queue is built using `bull` and backed by Redis. Tasks are
defined and exported in `src/tasks.js`. Call proxies are created automatically
and tasks can be queued with:

```
import { tasks } from "./src/utils/queue.js";
const result = await tasks.someFunction(...);
```

To run the worker(s) that will execute the queued tasks, run:

```
npm run worker
```