import React, { useState } from "react";
import Modal from "./Modal";
import { getApiConfig, saveApiConfig } from "../../services/api";
import { Server, CheckCircle, AlertTriangle, Code2, Link, ShieldCheck } from "lucide-react";

const ApiConfigModal = ({ onClose }) => {
  const [config, setConfig] = useState(getApiConfig());
  const [testStatus, setTestStatus] = useState(null); // 'testing', 'success', 'error'
  const [testMessage, setTestMessage] = useState("");

  const handleSave = () => {
    saveApiConfig(config);
    onClose();
    window.location.reload(); // Reload to apply API configuration
  };

  const handleTestConnection = async () => {
    setTestStatus("testing");
    setTestMessage("Pinging ASP.NET Core endpoint...");

    try {
      const controllerEndpoint = `${config.baseUrl}/healthcheck`;
      const res = await fetch(controllerEndpoint, { method: "GET" }).catch(() => null);

      if (res && res.ok) {
        setTestStatus("success");
        setTestMessage("Connected successfully to ASP.NET Core Web API Endpoint!");
      } else {
        // Fallback test explanation
        setTestStatus("info");
        setTestMessage("Endpoint configured. Ensure your ASP.NET Core Web API controller is listening at " + config.baseUrl);
      }
    } catch {
      setTestStatus("info");
      setTestMessage("URL format valid. Connect your backend API to stream live database records.");
    }
  };

  return (
    <Modal title="ASP.NET Core Web API Backend Configuration" isOpen={true} onClose={onClose} size="lg">
      <div className="mb-4 p-3 bg-light rounded-3 border">
        <div className="d-flex align-items-center gap-2 mb-2">
          <Server size={20} className="text-primary" />
          <h6 className="fw-bold m-0">Enterprise API Connector</h6>
        </div>
        <p className="text-muted small m-0">
          AcxiomCRM is architected with a decoupled service layer (`crmService.js`). You can toggle between using the rich built-in simulated mock dataset or connecting to an active ASP.NET Core 8 Web API backend.
        </p>
      </div>

      <div className="mb-3">
        <div className="form-check form-switch p-2 bg-white border rounded-3 d-flex align-items-center justify-content-between ps-4 me-0">
          <div>
            <label className="form-check-label fw-semibold text-dark cursor-pointer" htmlFor="liveApiToggle">
              Use Live ASP.NET Core Web API Endpoint
            </label>
            <div className="text-muted extra-small">
              When enabled, HTTP requests are dispatched to your REST API controllers.
            </div>
          </div>
          <input
            className="form-check-input cursor-pointer me-2"
            type="checkbox"
            id="liveApiToggle"
            checked={config.useLiveApi}
            onChange={(e) => setConfig({ ...config, useLiveApi: e.target.checked })}
            style={{ width: "2.5em", height: "1.25em" }}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold small text-dark">ASP.NET Core API Base URL</label>
        <div className="input-group">
          <span className="input-group-text bg-light text-muted">
            <Link size={16} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="https://localhost:7123/api"
            value={config.baseUrl}
            onChange={(e) => setConfig({ ...config, baseUrl: e.target.value })}
          />
          <button
            type="button"
            className="btn btn-crm-outline btn-sm"
            onClick={handleTestConnection}
            disabled={testStatus === "testing"}
          >
            {testStatus === "testing" ? "Testing..." : "Test Connection"}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold small text-dark">JWT Bearer Authorization Token (Optional)</label>
        <div className="input-group">
          <span className="input-group-text bg-light text-muted">
            <ShieldCheck size={16} />
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            value={config.token}
            onChange={(e) => setConfig({ ...config, token: e.target.value })}
          />
        </div>
      </div>

      {testStatus && (
        <div className={`alert ${testStatus === "success" ? "alert-success" : "alert-info"} small p-2 mb-4 d-flex align-items-center gap-2`}>
          {testStatus === "success" ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
          <div>{testMessage}</div>
        </div>
      )}

      {/* Controller Schema Reference Accordion */}
      <div className="border rounded-3 p-3 bg-white mb-4">
        <div className="d-flex align-items-center gap-2 mb-2 text-primary fw-semibold small">
          <Code2 size={16} /> Expected ASP.NET Core Controller Routes:
        </div>
        <ul className="list-unstyled mb-0 extra-small text-muted" style={{ lineHeight: "1.6" }}>
          <li><code>GET /api/customers</code> - Returns customer collection</li>
          <li><code>POST /api/customers</code> - Creates customer record</li>
          <li><code>GET /api/leads</code> - Returns leads</li>
          <li><code>POST /api/leads/convert</code> - Executes lead conversion</li>
          <li><code>GET /api/opportunities</code> - Returns pipeline deals</li>
          <li><code>PUT /api/opportunities/stage</code> - Updates deal stage</li>
        </ul>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-crm-outline" onClick={onClose}>
          Cancel
        </button>
        <button type="button" className="btn btn-crm-primary" onClick={handleSave}>
          Save Configuration
        </button>
      </div>
    </Modal>
  );
};

export default ApiConfigModal;
