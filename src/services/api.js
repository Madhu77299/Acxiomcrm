// AcxiomCRM API Client Abstraction
// Designed for seamless transition to ASP.NET Core Web API

const API_CONFIG_KEY = "acxiom_api_config";

export const getApiConfig = () => {
  const saved = localStorage.getItem(API_CONFIG_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // Fallback
    }
  }
  return {
    useLiveApi: false, // Default to Mock Data service
    baseUrl: "https://localhost:7123/api", // ASP.NET Core Web API default port
    token: ""
  };
};

export const saveApiConfig = (config) => {
  localStorage.setItem(API_CONFIG_KEY, JSON.stringify(config));
};

// Helper to simulate asynchronous server network response when using mock data
export const simulateDelay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

// HTTP Request Wrapper supporting both simulated local mock execution and live ASP.NET Core Web API calls
export const httpClient = async (endpoint, options = {}) => {
  const config = getApiConfig();

  if (config.useLiveApi) {
    const url = `${config.baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...(config.token ? { Authorization: `Bearer ${config.token}` } : {}),
      ...options.headers
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || `API Error: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.error("ASP.NET Core API Error:", err);
      throw err;
    }
  }

  // Fallback / Default simulated response
  await simulateDelay();
  return null;
};
