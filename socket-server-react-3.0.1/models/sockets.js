const BandList = require("./band-list");

class Sockets {
  constructor(io) {
    this.io = io;

    this.bandList = new BandList();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      // console.log("client connected");

      socket.emit("bandList", this.bandList.getBands());
    });
  }
}

module.exports = Sockets;
