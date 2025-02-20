import React, { useContext } from 'react'
import { AuthContext } from '../../components/authContext'
import "./index.scss"
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Register = () => {
  const { registerInfo, updateRegisterInfo, registerUser, registerLoading } = useContext(AuthContext)

  return (
    <section className='register'>
      <div className='container'>

        <div className='alll'>
          <div className='pic'>

          </div>
          <div className='card'>
            {/* <div className='aur'>
            <img src='https://media-hosting.imagekit.io//0d26f74ae4214d55/de570kz-5a6c1240-830d-4fae-8544-9099ba6a0467.png?Expires=1834580737&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=V5sd75ssiNOUPkXl7em0LSgz-2GDFEBkb2xkcwpiTV4QByoNUXM2gRkeZDO0rJ-ZW~SoD3-BexUVlIeL9XEvz7515FZ0Jmzuw-gXjGQusureFtHX14ZXfr8NR-waD2Ci3arIq3tCmMnuiWlMIu~bd85wlofM9QurQr~6-z1Czsp-ezT15ZWfmNnRahyUcqCnPy6hfJj6pPUITHlN8XRyogn-Lv-CjicqJRvcNvJD~Z7uvmx2-qCHxv~ZnZbCud9aE3LAfNgZqKL78ZlzevZlDzSIFLYV2SSDv-ofygy7zV-76uPA6lV7GO9gPmbg7bzcf2zSWlr0iNzv9xLLKiMpJg__' />
          </div> */}
            <div className='par'>
              <div className='pa'>
                <h3>REGISTRATION</h3>
                <p>/</p>
                <Link className='log' to={"/login"}>Login</Link>
              </div>

              <form onSubmit={registerUser}>
                <div className="input-container inp">
                  <input
                    id="firstname"
                    className="input"
                    type="text"
                    placeholder=" "
                    value={registerInfo.name}
                    onChange={(e) => updateRegisterInfo({ ...registerInfo, name: e.target.value })}
                  />
                  <div className="cut"></div>
                  <label htmlFor="firstname" className="placeholder">Name</label>
                </div>

                <div className="input-container inp">
                  <input
                    id="password"
                    className="input"
                    type="password"
                    placeholder=" "
                    value={registerInfo.password}
                    onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })}
                  />
                  <div className="cut"></div>
                  <label htmlFor="password" className="placeholder">Password</label>
                </div>

                <div className="input-container inp">
                  <input
                    id="email"
                    className="input"
                    type="email"
                    placeholder=" "
                    value={registerInfo.email}
                    onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })}
                  />
                  <div className="cut"></div>
                  <label htmlFor="email" className="placeholder">Email</label>
                </div>

                <div className='agree'>
                  <input type="checkbox" id='check' />
                  <label htmlFor='check'>I am 18 years old and I have read and accept the Terms and Conditions and Privacy Policy</label>
                </div>

                <button type="submit" className="but" disabled={registerLoading}>
                  {registerLoading ? "Creating account..." : "REGISTER"}
                </button>

                <div className='social'>
                  <h3>Our social network</h3>
                  <div className='icons'>
                    <a href='https://www.facebook.com/login/'><FaFacebook /></a>
                    <a href='https://x.com/'><FaTwitter /></a>
                    <a href='https://www.instagram.com/'><FaInstagram /></a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
