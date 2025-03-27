import React, { useEffect, useRef } from "react";
import Peer from "peerjs";

function PeerConnection({ peerId }) {
  const myVideoRef = useRef(null);
  const peerRef = useRef(null);

  useEffect(() => {
    const peer = new Peer();
    peerRef.current = peer;

    peer.on("open", (id) => {
      console.log("My Peer ID:", id);
    });

    peer.on("call", (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          myVideoRef.current.srcObject = stream;
          call.answer(stream);
        })
        .catch((err) => console.error("Error accessing media devices.", err));
    });

    return () => peer.destroy();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold">Your Video</h3>
      <video ref={myVideoRef} autoPlay className="w-64 h-48 bg-black rounded-md mt-4" />
    </div>
  );
}

export default PeerConnection;
