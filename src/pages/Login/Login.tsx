import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../../utils/firebase';
import './Login.css';
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className='login'>
      <main className="login-top">
        <div className="login-preview">
        </div>
        <div>
          {/*  */}
          <div className='login-form-container'>
            <div className='logo'>
              <a href='*'>
                <img alt="Instagram" src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" />
              </a>
            </div>
            <form className='login-form'>
              <div className='login-form-top'>
                <input type="text" placeholder='Phone number, username, or email' />
                <input type="password" placeholder='Password' />
                <button type="submit" className='login-submit-btn'>Log In</button>
              </div>
            </form>
            <div className='horizontal-or'>
              <div className='horizontal-bar'></div>
              <div className="or">OR</div>
              <div className='horizontal-bar'></div>
            </div>
            <div className='facebook-login-container'>
              <button>
                <span className="facebook-login-icon"></span>
                <span className="facebook-login-text">Log in with Facebook</span>
              </button>
            </div>
            <a href='*' className='forgot-password-link'>Forgot password ?</a>
          </div>
          {/*  */}
          <div className='login-sign-up'>
            <span>Don't have an account? <a href='*'>Sign up</a></span>
          </div>
          {/*  */}
          <div className='login-download'>
            <p>Get the app.</p>
            <div >
              <a href='*' className='login-download-ios'>
                <img alt="ios" src='https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png' />
              </a>
              <a href='*' className='login-download-android'>
                <img alt="android" src='https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png' />
              </a>
            </div>
          </div>
        </div>
      </main>
      <footer className="login-bottom">

      </footer>
    </section>
  )
}
