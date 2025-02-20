import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false); // ✅ Fixed typo
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInfo, setLoginInfo] = useState({
    name: "",
    password: "",
  });
  const [loginLoading, setLoginLoading] = useState(false);

  const navigate = useNavigate(); // ✅ Initialize useNavigate

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setRegisterLoading(true);

      try {
        const res = await axios.post(
          `http://localhost:8080/api/user/register`,
          registerInfo
        );

        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);

        navigate("/login"); // ✅ Redirect to login page after successful registration
      } catch (error) {
        console.error("Registration error:", error.response?.data || error);
      } finally {
        setRegisterLoading(false);
      }
    },
    [registerInfo, navigate]
  );
  console.log(user);
  

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setLoginLoading(true);
  
      try {
        const res = await axios.post(
          `http://localhost:8080/api/user/login`,
          loginInfo
        );
  
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
  
        navigate("/"); // ✅ Redirects to home after successful login
      } catch (error) {
        console.error("Login error:", error.response?.data || error);
      } finally {
        setLoginLoading(false);
      }
    },
    [loginInfo, navigate]
  );
  

  const logoutUser = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // ✅ Redirect to login after logout
  }, [navigate]);
  
  

  return (
    <AuthContext.Provider
      value={{
        logoutUser,
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerLoading,
        loginLoading,
        setLoginInfo: updateLoginInfo, // ✅ Ensure function naming consistency
        loginInfo,
        updateLoginInfo,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
