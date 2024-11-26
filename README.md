This project is configured to run as dockerized solution

Just run following command:

docker-compose -p fullstack-assignment -f docker-compose.yml up -d --build

To run it locally you a MongoDB running on port 27017
Also you need to update ./backend/config/config.js file:
MONGODB_URI: 'mongodb://127.0.0.1:27017/fullstack'

And ./frontend/src/config.js
const host = 'localhost:5000';
