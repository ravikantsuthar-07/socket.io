import authModel from '../models/authModel.js';

let liveUsers = {};

export const handleSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("joinRoom", async ({email }) => {
      socket.join("live_users");
      liveUsers[socket.id] = { email, socketId: socket.id };

      await authModel.findOneAndUpdate({ email }, { socketId: socket.id }, { upsert: true });

      io.to("live_users").emit("updateUsers", Object.values(liveUsers));
    });

    socket.on("disconnect", async () => {
      console.log(`User disconnected: ${socket.id}`);
      delete liveUsers[socket.id];

      await authModel.findOneAndUpdate({ socketId: socket.id }, { socketId: null });

      io.to("live_users").emit("updateUsers", Object.values(liveUsers));
    });
  });
};