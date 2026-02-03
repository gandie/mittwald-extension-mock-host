import { useState } from "react";

const DEFAULT_EXTENSION_URL = "http://localhost:3000";

function App() {
  const [extensionUrl, setExtensionUrl] = useState(DEFAULT_EXTENSION_URL);

  return (
    <div style={{ padding: 24 }}>
      <h1>mittwald Extension Mock Host</h1>
      <div style={{ marginBottom: 12 }}>
        <label>
          Extension URL:&nbsp;
          <input
            type="text"
            value={extensionUrl}
            onChange={(e) => setExtensionUrl(e.target.value)}
            style={{ width: 300 }}
          />
        </label>
        <button
          onClick={() => setExtensionUrl(DEFAULT_EXTENSION_URL)}
          style={{ marginLeft: 8 }}
        >
          Reset to Default
        </button>
      </div>
      <div
        style={{
          width: "100%",
          border: "1px solid #ccc",
          minHeight: 600,
          background: "#f7f7f7",
        }}
      >
        <iframe
          src={extensionUrl}
          title="Extension"
          style={{
            width: "100%",
            height: "600px",
            border: "none",
            background: "#fff",
          }}
        />
      </div>
    </div>
  );
}

export default App;