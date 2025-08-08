# 🌍 GeoLocal Chat

A simple geolocalized real-time chat application built with **Node.js**, **Socket.IO**, **Redis**, and browser-based **Geolocation**.

Users are automatically placed into chat rooms based on their approximate latitude and longitude. Each room corresponds to a geographic region, allowing localized conversations.


## Features

- Location-based chat rooms
- Real-time messaging using WebSockets
- Redis pub/sub for message distribution
- Mobile-friendly UI
- Simple and elegant frontend with chat bubbles
- Context-aware messages based on coordinates


## Tech Stack

- **Backend**: Node.js, Socket.IO, Redis
- **Frontend**: HTML5, CSS3, jQuery
- **Location API**: HTML5 Geolocation API


## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/geolocal-chat.git
   cd geolocal-chat
   ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Make sure Redis is installed and running**

    ```bash
    # Install Redis (if not already installed)
    sudo apt-get install redis-server

    # Start Redis
    redis-server
    ```

4. **Start the server**

    ```bash
    node server.js
    ```

5. **Visit in your browser**

    ```js
    http://localhost:8000
    ```

## How It Works

- When a user loads the page, the browser asks for their location.
- Latitude and longitude are rounded and used as a chat room ID (e.g. `419,125`).
- All users within the same location area share a chat room.
- Messages are sent using Socket.IO and distributed with Redis pub/sub.
- The UI updates in real time, with messages styled as "me" or "other" depending on the sender.

## Project Structure

```php
.
├── index.html        # Frontend HTML/JS/CSS
├── server.js         # Node.js server with Socket.IO + Redis
├── package.json      # Node.js dependencies
```

## Known Issues

- Global `room` variable may cause cross-client interference (improvement in progress).
- No message sanitization (XSS protection is recommended).
- Creates a Redis client per user — may be inefficient at scale.

## To Do

- [ ] Replace Redis per-client subscriptions with Socket.IO native rooms
- [ ] Sanitize incoming/outgoing message content
- [ ] Enhance mobile responsiveness and auto-scroll

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT License. See LICENSE file for more info.

## Author

Nicola Scotti di Uccio


