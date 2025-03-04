import React, { useState, useEffect } from "react";
import axios from "axios";
import ThreeScene from "./components/ThreeScene";

const App = () => {
  const [models, setModels] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/models")
      .then(res => setModels(res.data))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div>
      <h1>3D Model Viewer</h1>
      <input
        type="text"
        placeholder="Search models..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {models
          .filter(model => model.name.toLowerCase().includes(search.toLowerCase()))
          .map(model => (
            <li key={model.id} onClick={() => setSelectedModel(model.url)}>
              {model.name}
            </li>
          ))}
      </ul>
      {selectedModel && <ThreeScene modelUrl={selectedModel} />}
    </div>
  );
};

export default App;
