# Node.js app for Realtime notifications with **socket.io**

## Prerequisites (Ubuntu 14.04)

* `apt-get install -y build-essential curl`
* `curl -sL https://deb.nodesource.com/setup | sudo bash -`
* `sudo apt-get install -y nodejs`

## Project Setup

* `git clone https://nitinione@bitbucket.org/nitinione/notifications_demo.git`
* `cd notifications_demo`
* `npm install`
* `npm start` (Will start the server at port 3000)

## How to test (for Web)

* Go to `http://localhost:3000`
* Open browser's console and see the log messages.
* Hit this curl command to send more notifications to the client -
  `curl -v -H "Content-type: application/json" -H "x-access-token: very_secret_token" -X POST http://localhost:3000/broadcast -d '{"username":"Your Name", "news":"Say something here..."}'`
* Again check the browser's console for new messages.

## License

This project rocks under MIT
