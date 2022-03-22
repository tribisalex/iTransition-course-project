import React from 'react';
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {useDispatch} from "react-redux";
import {HOMEPAGE_ROUTE} from "../utils/const";
import {useNavigate} from "react-router-dom";
import {setUser} from "../store/slices/userSlice";
import google from "../assets/img/google.png";

const LoginWithGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const loginWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then(({user}) => {
      dispatch(setUser({
        email: user.email,
        id: user.uid,
        token: user.accesstoken,
      }));
      navigate(HOMEPAGE_ROUTE);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
    navigate(HOMEPAGE_ROUTE);
  }

  return (
    <div className='m-2' style={{cursor: "pointer"}}>
      <img src={google} onClick={loginWithGoogle} style={{width: 40, height: 40}} alt='google-logo'/>
    </div>
  );
};

export default LoginWithGoogle;