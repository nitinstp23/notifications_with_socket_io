# Node.js app for Realtime notifications with **socket.io**

## Prerequisites (Ubuntu 14.04)

* `sudo apt-get install -y build-essential curl`
* `sudo apt-get install -y npm`
* `sudo apt-get install -y nodejs`
* `npm install -g n`
* `n latest`
* Add this to your ~/.bashrc - `export PATH=$PATH:/usr/local/n/versions/0.12.0/bin/node`
* Reload current terminal session - `. ~/.bashrc`
* Run `node -v` (Should be v0.12.0)

## Project Setup

* `git clone git@bitbucket.org:nitinione/notifications_demo.git`
* `cd notifications_demo`
* `npm install`
* `npm start` (Will start the server at port 3000)

## How to test (for Web)

* Go to `http://localhost:3000`
* Open browser's console and see the log messages.
* Hit this curl command to send more notifications to the client -
  `curl -v -H "Content-type: application/json" -H "x-access-token: very_secret_token" -X POST http://localhost:3000/broadcast -d '{"username":"Your Name", "news":"Say something here..."}'`
* Again check the browser's console for new messages.

## Load testing (with **wrk**)

* git clone https://github.com/wg/wrk.git
* make
* sudo cp wrk /usr/local/bin
* wrk -d30s -t10 -c1000 http://localhost:3000
* top -c -p $(pgrep -d',' -f /usr/local/bin/node)

## License

This project rocks under MIT
