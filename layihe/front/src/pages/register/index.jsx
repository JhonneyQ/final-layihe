import React, { useContext, useState } from 'react';
import { AuthContext } from '../../components/authContext';
import './index.scss';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Register = () => {
  const { registerInfo, updateRegisterInfo, registerUser, registerLoading } = useContext(AuthContext);
  const [agreeToTerms, setAgreeToTerms] = useState(false); // State for checkbox

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the checkbox
    if (!agreeToTerms) {
      alert('You must agree to the Terms and Conditions and Privacy Policy.');
      return;
    }

    // Call the registerUser function
    await registerUser(e);
  };

  return (
    <section className='register'>
      <div className='container'>
        <div className='alll'>
          <div className='pic'></div>
          <div className='card'>
            <div className='par'>
              <div className='pa'>
                <h3>REGISTRATION</h3>
                <p>/</p>
                <Link className='log' to={'/login'}>
                  Login
                </Link>
              </div>

              <form onSubmit={handleSubmit}>
                <div className='input-container inp'>
                  <input
                    id='name'
                    className='input'
                    type='text'
                    placeholder=' '
                    value={registerInfo.name}
                    onChange={(e) => updateRegisterInfo({ ...registerInfo, name: e.target.value })}
                  />
                  <div className='cut'></div>
                  <label htmlFor='name' className='placeholder'>
                    Name
                  </label>
                </div>

                <div className='input-container inp'>
                  <input
                    id='email'
                    className='input'
                    type='email'
                    placeholder=' '
                    value={registerInfo.email}
                    onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })}
                  />
                  <div className='cut'></div>
                  <label htmlFor='email' className='placeholder'>
                    Email
                  </label>
                </div>

                <div className='input-container inp'>
                  <input
                    id='password'
                    className='input'
                    type='password'
                    placeholder=' '
                    value={registerInfo.password}
                    onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })}
                  />
                  <div className='cut'></div>
                  <label htmlFor='password' className='placeholder'>
                    Password
                  </label>
                </div>

                <div className='agree'>
                  <input
                    type='checkbox'
                    id='check'
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                  />
                  <label htmlFor='check'>
                    I am 18 years old and I have read and accept the Terms and Conditions and Privacy Policy
                  </label>
                </div>

                <button type='submit' className='but' disabled={registerLoading}>
                  {registerLoading ? 'Creating account...' : 'REGISTER'}
                </button>

                <div className='social'>
                  <h3>Our social network</h3>
                  <div className='icons'>
                    <a href='https://www.facebook.com/login/'>
                      <FaFacebook />
                    </a>
                    <a href='https://x.com/'>
                      <FaTwitter />
                    </a>
                    <a href='https://www.instagram.com/'>
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

export default Register;