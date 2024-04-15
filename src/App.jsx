import { BrowserRouter, Routes, Route } from "react-router-dom";
import NowPlaying from "./components/NowPlaying";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NowPlaying />} />
        <Route path="/fake" element={<NowPlaying isFake={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
