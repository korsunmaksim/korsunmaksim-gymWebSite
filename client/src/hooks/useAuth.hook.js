import { useState, useCallback, useEffect } from "react";

const STORAGE_NAME = "UserInfo";

function useAuth() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const login = useCallback((jwtToken, id, role) => {
    setToken(jwtToken);
    setUserId(id);
    setUserRole(role);
    localStorage.setItem(
      STORAGE_NAME,
      JSON.stringify({ token: jwtToken, userId: id, userRole: role })
    );
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_NAME);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_NAME));
    if (data && data.token) {
      login(data.token, data.userId, data.userRole);
    }
  }, [login]);

  const isAuthenticated = !!token;
  return { login, logout, token, userId, userRole, isAuthenticated };
}

export default useAuth;
