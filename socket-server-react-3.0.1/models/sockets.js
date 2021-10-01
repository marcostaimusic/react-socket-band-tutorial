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
      console.log("client connected");

      socket.emit("bandList", this.bandList.getBands());

      socket.on("voting", (id) => {
        this.bandList.increaseVotes(id);
        this.io.emit("bandList", this.bandList.getBands());
      });

      socket.on("deleting", (id) => {
        this.bandList.removeBands(id);
        this.io.emit("bandList", this.bandList.getBands());
      });

      socket.on("changeName", ({ id, name }) => {
        this.bandList.changeBandName(id, name);
        this.io.emit("bandList", this.bandList.getBands());
      });

      socket.on("addingBand", ({ name }) => {
        this.bandList.addBand(name);
        this.io.emit("bandList", this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;
