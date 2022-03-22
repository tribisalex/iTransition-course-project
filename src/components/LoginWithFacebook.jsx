import React from 'react';
import {FacebookAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import {useDispatch} from "react-redux";
import {HOMEPAGE_ROUTE} from "../utils/const";
import {useNavigate} from "react-router-dom";
import {setUser} from "../store/slices/userSlice";
import facebook from '../assets/img/facebook.png';

const LoginWithFacebook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const loginWithFacebook = () => {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
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
      const credential = FacebookAuthProvider.credentialFromError(error);
    });
    navigate(HOMEPAGE_ROUTE);
  }

  return (
    <div className='m-2' style={{cursor: "pointer"}} >
      <img src={facebook} onClick={loginWithFacebook} style={{width: 40, height: 40}} alt='facebook-logo'/>
    </div>
  );
};

export default LoginWithFacebook;