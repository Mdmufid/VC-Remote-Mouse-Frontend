import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";

function Home() {
  const [peerId, setPeerId] = useState("");
  const [myPeerId, setMyPeerId] = useState(""); // Store the generated Peer ID
  const navigate = useNavigate();

  useEffect(() => {
    const peer = new Peer();
    peer.on("open", (id) => {
      setMyPeerId(id); // Set the generated Peer ID
    });
  }, []);

  const handleConnect = () => {
    if (peerId.trim() === "") {
      alert("Please enter a Peer ID to connect!");
      return;
    }
    navigate(`/call/${peerId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">🔗 Video Call App</h1>
      
      <p className="mb-4 text-lg">📌 Your Peer ID: <strong className="text-green-400">{myPeerId || "Generating..."}</strong></p>
      
      <input
        type="text"
        placeholder="Enter Peer ID"
        value={peerId}
        onChange={(e) => setPeerId(e.target.value)}
        className="px-4 py-2 rounded-md border border-gray-400 text-black"
      />
      <button
        onClick={handleConnect}
        className="mt-4 px-6 py-2 bg-blue-500 rounded-md hover:bg-blue-700 transition"
      >
        Connect
      </button>
    </div>
  );
}

export default Home;
