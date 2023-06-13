# Create the database config for a sqlite database file
if ! [ -e ./database.json ]; then
    cat '{ "production": { "dialect": "sqlite", "storage": "data.db" } }' >  ./database.json
fi

# Run database migrations to make sure all the required tables and data are present in the database
npm run server:run-migrations -- --env production --config ./database.json --migrations-path ./db/migrations

# Start the application
node main.js
