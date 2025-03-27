import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PeerConnection from "../components/PeerConnection";

function VideoCall() {
  const { peerId } = useParams();

  useEffect(() => {
    console.log(`Connecting to peer: ${peerId}`);
  }, [peerId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h2 className="text-2xl font-bold mb-4">📹 Video Call</h2>
      <PeerConnection peerId={peerId} />
    </div>
  );
}

export default VideoCall;
