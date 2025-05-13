import React, { useContext } from "react";
import { AuthContext } from "../../components/authContext";
import "./index.scss";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const { loginLoading, loginInfo, updateLoginInfo, loginUser, handleLogin } =
    useContext(AuthContext);

  return (
    <section className="login">
      <div className="container">
        <div className="alll">
          <div className="pic"></div>
          <div className="card">
            <div className="par">
              <div className="pa">
                <Link className="log" to={"/register"}>Register</Link>
                <p>/</p>
                <h3>LOGIN</h3>


              </div>
              <form onSubmit={loginUser}>
                <div className="input-container inp">
                  <input
                    id="name"
                    className="input"
                    type="text"
                    placeholder=" "
                    value={loginInfo.name}
                    onChange={(e) =>
                      updateLoginInfo({ ...loginInfo, name: e.target.value })
                    }
                  />
                  <div className="cut"></div>
                  <label htmlFor="name" className="placeholder">
                    Name
                  </label>
                </div>

                <div className="input-container inp">
                  <input
                    id="password"
                    className="input"
                    type="password"
                    placeholder=" "
                    value={loginInfo.password}
                    onChange={(e) =>
                      updateLoginInfo({
                        ...loginInfo,
                        password: e.target.value,
                      })
                    }
                  />
                  <div className="cut"></div>
                  <label htmlFor="password" className="placeholder">
                    Password
                  </label>
                </div>
                <div className="input-container inp">
                  <input
                    id="email"
                    className="input"
                    type="email"
                    placeholder=" "
                    value={loginInfo.email}
                    onChange={(e) =>
                      updateLoginInfo({
                        ...loginInfo,
                        email: e.target.value,
                      })
                    }
                  />
                  <div className="cut"></div>
                  <label htmlFor="email" className="placeholder">
                    Email
                  </label>
                </div>

                <div className="agree">
                  <input type="checkbox" id="check" />
                  <label htmlFor="check">
                    I am 18 years old and I have read and accept the Terms and
                    Conditions and Privacy Policy
                  </label>
                </div>


                <button type="submit" className="but" disabled={loginLoading}>
                  {loginLoading ? "Logging in..." : "LOGIN"}
                </button>

                <div className="social">
                  <h3>Our social network</h3>
                  <div className="icons">
                    <a href="https://www.facebook.com/login/">
                      <FaFacebook />
                    </a>
                    <a href="https://x.com/">
                      <FaTwitter />
                    </a>
                    <a href="https://www.instagram.com/">
                      <FaInstagram />
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
