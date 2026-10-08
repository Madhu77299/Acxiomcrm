import React, { createContext, useContext, useState, useEffect } from "react";
import { initialUsers, initialRoles } from "../services/mockData";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("acxiom_v3_auth_user");
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return initialUsers[0]; // Default logged-in user: Ananya Sharma (Admin)
  });

  const [roles, setRoles] = useState(initialRoles);

  useEffect(() => {
    localStorage.setItem("acxiom_v3_auth_user", JSON.stringify(currentUser));
  }, [currentUser]);

  const login = (email, password) => {
    const user = initialUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      return { success: true, user };
    }
    // Fallback mock login for demo
    const demoUser = {
      id: `usr_${Date.now()}`,
      name: email.split("@")[0].replace(".", " ").replace(/\b\w/g, l => l.toUpperCase()),
      email,
      role: "Sales Rep",
      department: "Global Sales",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      status: "Active"
    };
    setCurrentUser(demoUser);
    return { success: true, user: demoUser };
  };

  const register = (name, email, role = "Sales Rep") => {
    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role,
      department: "Sales Organization",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      status: "Active",
      createdAt: new Date().toISOString()
    };
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    localStorage.removeItem("acxiom_auth_user");
    setCurrentUser(null);
  };

  const hasPermission = (moduleName, action = "view") => {
    if (!currentUser) return false;
    if (currentUser.role === "Admin") return true;
    const userRole = roles.find((r) => r.name === currentUser.role);
    if (!userRole || !userRole.permissions || !userRole.permissions[moduleName]) return false;
    return !!userRole.permissions[moduleName][action];
  };

  const switchUserRole = (newRole) => {
    const updated = { ...currentUser, role: newRole };
    setCurrentUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        register,
        logout,
        hasPermission,
        switchUserRole,
        roles
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
