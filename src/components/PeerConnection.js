import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

function PeerConnection({ peerId }) {
  const myVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const [myPeerId, setMyPeerId] = useState("");

  useEffect(() => {
    // Initialize Peer only once
    if (!peerRef.current) {
      const peer = new Peer(undefined, {
        host: "vc-remote-mouse-backend.onrender.com",
        port: 443,
        path: "/peerjs/myapp", // ✅ FIX: Correct PeerJS path
        secure: true,
      });

      peerRef.current = peer;

      peer.on("open", (id) => {
        setMyPeerId(id);
        console.log("My Peer ID:", id);
      });

      peer.on("call", (call) => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((stream) => {
            myVideoRef.current.srcObject = stream;
            call.answer(stream);
            call.on("stream", (remoteStream) => {
              remoteVideoRef.current.srcObject = remoteStream;
            });
          })
          .catch((err) => console.error("Error accessing media devices:", err));
      });
    }
  }, []);

  useEffect(() => {
    if (peerId && peerRef.current) {
      console.log(`Calling peer: ${peerId}`);
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          myVideoRef.current.srcObject = stream;
          const call = peerRef.current.call(peerId, stream);
          call.on("stream", (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
          });
        })
        .catch((err) => console.error("Error accessing media devices:", err));
    }
  }, [peerId]);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold">Your Video (ID: {myPeerId})</h3>
      <video ref={myVideoRef} autoPlay className="w-64 h-48 bg-black rounded-md mt-4" />
      <h3 className="text-lg font-semibold mt-4">Remote Video</h3>
      <video ref={remoteVideoRef} autoPlay className="w-64 h-48 bg-black rounded-md mt-4" />
    </div>
  );
}

export default PeerConnection;
