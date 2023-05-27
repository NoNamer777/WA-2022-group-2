# Run database migrations to make sure all the required tables and data are present in the database
npm run server:run-migrations -- --env production --config ./database.json --migrations-path ./db/migrations

# Start the application
node main.js
