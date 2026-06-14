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

const res1 = await fetch("http://localhost:8000/me", { credentials: "include" });
// const res2 = await fetch("http://localhost:8000/conversation", { credentials: "include" });
const data1 = await res1.json();
// const data2 = await res2.json();
const conv_id = localStorage.getItem("conv_id"); 
const socket = io("http://localhost:8000/", {   // ✅ no await
  auth: {
    username: data1.username,
    conv_id: conv_id
  },
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);
//   socket.emit("message", "hlo baddie me on msg hu");  // ✅ emit after connect
});

socket.on("connect_error", (err) => {
  console.error("Connection failed:", err.message);
});

export default socket;