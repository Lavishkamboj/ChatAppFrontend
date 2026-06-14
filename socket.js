// import { io } from "socket.io-client";


// const res1 = await fetch("http://localhost:8000/me", { credentials: "include" });
// const res2 = await fetch("http://localhost:8000/conversation", { credentials: "include" });
// const data1 = await res1.json();
// const data2=await res2.json();

// const socket = await io("http://localhost:8000/", {
//   auth: {
//     username: data1.username,
//     conv_id:data2.conv_id
//   },
// });
//  socket.emit('message',"hlo baddie me on msg hu")
// export default socket;

import { io } from "socket.io-client";

const res1 = await fetch("https://chatappbackend-prhttps://chat-app-backend-five-murex.vercel.app/oduction-40a2.up.railway.app/me", { credentials: "include" });
// const res2 = await fetch("http://localhost:8000/conversation", { credentials: "include" });
const data1 = await res1.json();
// const data2 = await res2.json();
const conv_id = localStorage.getItem("conv_id"); 
const socket = io("https://chatappbackend-production-40a2.up.railway.app/", {   //  no await
  auth: {
    username: data1.username,
    conv_id: conv_id
  },
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);
//   socket.emit("message", "hlo baddie me on msg hu");  //  emit after connect
});

socket.emit("join_private_room", {
  myId: data1.username,      // logged-in user's ID
  otherId: 202    // the person they're chatting with
});

socket.on("connect_error", (err) => {
  console.error("Connection failed:", err.message);
});

export default socket;
