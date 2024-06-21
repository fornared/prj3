import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const LoginContext = createContext(null);

export function LoginProvider({ children }) {
  const [id, setId] = useState("");
  const [nickName, setNickName] = useState("");
  const [expired, setExpired] = useState(0);
  const [authority, setAuthority] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      return;
    }
    login(token);
  }, []);

  const isLoggedIn = () => {
    return id !== "";
  };

  const hasAccess = (param) => {
    return id === param;
  };

  const isAdmin = () => {
    return authority.includes("admin");
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    // Assuming token has decoded data. Adjust as necessary.
    const payload = JSON.parse(atob(token.split('.')[1]));
    setExpired(payload.exp);
    setId(payload.sub);
    setNickName(payload.nickName);
    setAuthority(payload.scope.split(" "));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setExpired(0);
    setId("");
    setNickName("");
    setAuthority([]);
  };

  const handleLogout = (navigate, toast) => {
    axios
      .post("/api/member/logout")
      .then(() => {
        toast({
          status: "success",
          description: "로그아웃 되었습니다.",
          position: "top",
        });
        logout();
        navigate("/");
      })
      .catch(() => {
        toast({
          status: "error",
          description: "로그아웃 중 오류가 발생했습니다.",
          position: "top",
        });
      });
  };

  return (
    <LoginContext.Provider
      value={{
        id,
        nickName,
        login,
        logout,
        isLoggedIn,
        hasAccess,
        isAdmin,
        handleLogout,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
