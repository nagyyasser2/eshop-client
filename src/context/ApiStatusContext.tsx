import { createContext, useContext, useEffect, useState } from "react";

interface ApiStatusContextType {
  isApiHealthy: boolean;
  setApiHealthy: (healthy: boolean) => void;
}

const ApiStatusContext = createContext<ApiStatusContextType | undefined>(
  undefined
);

interface ApiStatusProviderProps {
  children: any;
}

export const ApiStatusProvider = ({ children }: ApiStatusProviderProps) => {
  const [isApiHealthy, setApiHealthy] = useState(true);

  useEffect(() => {
    const handleApiDown = () => {
      setApiHealthy(false);
    };

    window.addEventListener("api:down", handleApiDown);

    return () => {
      window.removeEventListener("api:down", handleApiDown);
    };
  }, []);

  return (
    <ApiStatusContext.Provider value={{ isApiHealthy, setApiHealthy }}>
      {children}
    </ApiStatusContext.Provider>
  );
};

export const useApiStatus = () => {
  const context = useContext(ApiStatusContext);
  if (!context) {
    throw new Error("useApiStatus must be used within an ApiStatusProvider");
  }
  return context;
};
