import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/home'
import VideoCall from "./components/VideoCall";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/call/:peerId" element={<VideoCall />} />
      </Routes>
    </Router>
  );
}

export default App;
