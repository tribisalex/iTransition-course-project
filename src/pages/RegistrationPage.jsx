import React from 'react';
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {useDispatch} from "react-redux";
import {setUser} from "../store/slices/userSlice";
import {FormAuth} from "../components/FormAuth";
import {Card, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {HOMEPAGE_ROUTE, LOGIN_ROUTE} from "../utils/const";
import {doc, setDoc} from "firebase/firestore";
import {addUser} from "../store/state/users/actions";
import {db} from "../firebase";
import {FormattedMessage} from 'react-intl';

const RegistrationPage = ({currentLocale}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (email, password, name, currentLocale) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then(({user}) => {
      const userId = user.uid;
      dispatch(setUser({
        email: user.email,
        id: user.uid,
        token: user.accesstoken,
      }));
      handleAddUser(email, name, userId, currentLocale);
      navigate(HOMEPAGE_ROUTE);
    })
    .catch((error) => {
      alert('A user with this email exists')
    })
  }

  const handleAddUser = async (email, name, id, currentLocale) => {
    const user = await setDoc(doc(db, "users", id), {
      id: id,
      displayname: name,
      email: email,
      locale: currentLocale,
      theme: '',
      role: 'user',
      rateReview: []
    });
    dispatch(addUser({
      id: user.uid,
      daisplayname: name,
      email: email,
      locale: currentLocale,
      theme: '',
      role: 'user',
      rateReview: []
    }));
  };

  return (
    <Container className='d-flex justify-content-center align-items-center'
               style={{height: window.innerHeight - 65}}>
      <Card style={{width: 600}} className="p-5">
        <FormAuth
          title=<FormattedMessage id='registration'/>
        handleClick={handleRegister}
        route={LOGIN_ROUTE}
        currentLocale={currentLocale}
        />
      </Card>
    </Container>
  );
};
export default RegistrationPage;