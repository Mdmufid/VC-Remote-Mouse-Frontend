import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

function PeerConnection({ peerId }) {
  const myVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const [myPeerId, setMyPeerId] = useState("");

  useEffect(() => {
    const peer = new Peer({
      host: "vc-remote-mouse-backend.onrender.com",
      path: "/peerjs",
      secure: true,
    });

    peerRef.current = peer;

    peer.on("open", (id) => {
      setMyPeerId(id);
      console.log("My Peer ID:", id);
    });

    // Handle incoming calls
    peer.on("call", (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          myVideoRef.current.srcObject = stream;
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
          });
        })
        .catch((err) => console.error("Error accessing media devices.", err));
    });

    return () => peer.destroy();
  }, []);

  // Function to call another peer
  const callPeer = () => {
    if (!peerId) {
      alert("Enter a valid Peer ID");
      return;
    }

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        myVideoRef.current.srcObject = stream;
        const call = peerRef.current.call(peerId, stream);
        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
        });
      })
      .catch((err) => console.error("Error accessing media devices.", err));
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold">Your Video</h3>
      <video ref={myVideoRef} autoPlay className="w-64 h-48 bg-black rounded-md mt-4" />

      <h3 className="text-lg font-semibold mt-4">Remote Video</h3>
      <video ref={remoteVideoRef} autoPlay className="w-64 h-48 bg-black rounded-md mt-4" />

      <p className="mt-4 font-medium">Your Peer ID: <span className="text-blue-500">{myPeerId}</span></p>

      <button onClick={callPeer} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">Call</button>
    </div>
  );
}

export default PeerConnection;
