import React, { useContext } from 'react'
import { AuthContext } from '../../components/authContext'
import "./index.scss"

const Register = () => {

  const { user, registerInfo, updateRegisterInfo, registerUser, RegisterLoading } = useContext(AuthContext)
  return (
    <section className='register'>
      <div className='container'>
        <div className='card'>
          <div className='aur'>
            <img src='https://media-hosting.imagekit.io//0d26f74ae4214d55/de570kz-5a6c1240-830d-4fae-8544-9099ba6a0467.png?Expires=1834580737&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=V5sd75ssiNOUPkXl7em0LSgz-2GDFEBkb2xkcwpiTV4QByoNUXM2gRkeZDO0rJ-ZW~SoD3-BexUVlIeL9XEvz7515FZ0Jmzuw-gXjGQusureFtHX14ZXfr8NR-waD2Ci3arIq3tCmMnuiWlMIu~bd85wlofM9QurQr~6-z1Czsp-ezT15ZWfmNnRahyUcqCnPy6hfJj6pPUITHlN8XRyogn-Lv-CjicqJRvcNvJD~Z7uvmx2-qCHxv~ZnZbCud9aE3LAfNgZqKL78ZlzevZlDzSIFLYV2SSDv-ofygy7zV-76uPA6lV7GO9gPmbg7bzcf2zSWlr0iNzv9xLLKiMpJg__' />
          </div>
          <div className='par'>
            <h3>REGESTRATION</h3>
            <form onSubmit={registerUser}

            >

              <div class="input-container inp">
                <input id="firstname" class="input" type="text" placeholder=" " onSubmit={(e) => updateRegisterInfo({ ...registerInfo, name: e.target.value })} />
                <div class="cut"></div>
                <label for="firstname" class="placeholder">name</label>
              </div>

              <div class="input-container inp">
                <input id="password" class="input" type="password" placeholder=" " onSubmit={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })} />
                <div class="cut"></div>
                <label for="password" class="placeholder">Password</label>
              </div>

              <div class="input-container inp">
                <input id="email" class="input" type="email" placeholder=" " onSubmit={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })} />
                <div class="cut"></div>
                <label for="email" class="placeholder">email</label>
              </div>


              <button type="submit" >{RegisterLoading ? "Creating account" : "REGISTER"}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register