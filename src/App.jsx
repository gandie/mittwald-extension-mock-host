import { useState, useRef, useEffect } from "react";
import { RemoteReceiver } from "@mittwald/flow-remote-core";
import { RemoteRenderer } from "@mittwald/flow-remote-react-renderer";
import "@mittwald/flow-react-components/all.css";

// Prepare the bridge instance
const receiver = new RemoteReceiver();

const DEFAULT_EXTENSION_URL = "http://localhost:3000";

function App() {
  useEffect(() => {
    window.addEventListener("message", (e) => {
      console.log("[HOST] received postMessage", e);
    });
  }, []);

  const [extensionUrl, setExtensionUrl] = useState(DEFAULT_EXTENSION_URL);
  const iframeRef = useRef<HTMLIFrameElement>(null);


  return (
    <div style={{ padding: 24 }}>
      <h1>mittwald Extension Mock Host</h1>
      <label>
        Extension URL:&nbsp;
        <input
          type="text"
          value={extensionUrl}
          onChange={(e) => setExtensionUrl(e.target.value)}
          style={{ width: 340 }}
        />
      </label>
      <button
        onClick={() => setExtensionUrl(DEFAULT_EXTENSION_URL)}
        style={{ marginLeft: 8 }}
      >
        Reset to Default
      </button>
      <div style={{
        marginTop: 20,
        border: "1px solid #ccc",
        background: "#f7f7f7",
        minHeight: 600,
      }}>
        {/* Host renders an iframe that loads the extension */}
        <RemoteRenderer
          src={extensionUrl}
          extBridgeImplementation={{
            getConfig: async () => ({
              extensionId: "ext-id",
              extensionInstanceId: "exti-id",
              sessionId: "session-id",
              userId: "user-id",
              appInstallationId: "appi-id",
              customerId: "customer-id",
              projectId: "project-id",
            }),
            getSessionToken: async () => "session-token",
          }
        }
        />
      </div>
    </div>
  );
}

export default App;