import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false); // ✅ Fixed typo
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
    role:"user"
  });
  const [token, setToken] = useState(localStorage.getItem("user") || null)
  const [decodedToken, setDecodedToken] = useState(null)
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
        console.log("Registering user with:", registerInfo); // Debugging log
        
        const res = await axios.post(`http://localhost:8080/api/user/register`, registerInfo, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        console.log("Registration successful:", res.data); // Debugging log
  
        if (!res.data) {
          throw new Error("No response data received from the server.");
        }
  
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        // navigate("/login");
      } catch (error) {
        console.error("Registration error:", error.response?.data || error);
  
        // Show error message to the user
        alert(error.response?.data?.message || "Registration failed! Please try again.");
      } finally {
        setRegisterLoading(false);
      }
    },
    [registerInfo, navigate]
  );
  




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

        if(res.data.banned === true) return alert("you are banned")

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




  // console.log(user);


  





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
        token,

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
