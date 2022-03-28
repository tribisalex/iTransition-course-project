import React from 'react';
import {Card, Container} from "react-bootstrap";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useDispatch} from "react-redux";
import {setUser} from "../store/slices/userSlice";
import {FormAuth} from "../components/FormAuth";
import {HOMEPAGE_ROUTE, REGISTER_ROUTE} from "../utils/const";
import {useNavigate} from "react-router-dom";
import {setCurrentLocale, setUserMy} from "../store/state/users/actions";
import {FormattedMessage} from "react-intl";

const LoginPage = ({currentLocale}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then(({user}) => {
      dispatch(setUser({
        email: user.email,
        id: user.uid,
        token: user.accesstoken,
      }));
      navigate(HOMEPAGE_ROUTE);
      dispatch(setUserMy({user, role: user.role}))
      localStorage.setItem('isAuth', true);
    })
    .catch(() => alert('Invalid user'))
  }

  return (
    <Container className='d-flex justify-content-center align-items-center'
               style={{height: window.innerHeight - 130}}>
      <Card style={{width: 600}} className="p-5">
        <FormAuth
          IsLogin={true}
          title=<FormattedMessage id='sign_in'/>
          handleClick={handleLogin}
          route={REGISTER_ROUTE}
        />
      </Card>
    </Container>
  );
};

export default LoginPage;