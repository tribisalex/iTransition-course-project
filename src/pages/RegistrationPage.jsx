import React from 'react';
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {useDispatch} from "react-redux";
import {setUser} from "../store/slices/userSlice";
import {FormAuth} from "../components/FormAuth";
import {Card, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {HOMEPAGE_ROUTE, LOGIN_ROUTE} from "../utils/const";
import {addDoc, collection} from "firebase/firestore";
import {addUser} from "../store/state/users/actions";
import {db} from "../firebase";
import {FormattedMessage} from "react-intl";

const RegistrationPage = ({currentLocale}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleRegister = async (email, password, name, currentLocale) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then(({user}) => {
      const userId = user.uid;
      console.log(userId)
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
    const usersCollectionRef = collection(db, `users`);
    const user = await addDoc(usersCollectionRef, {
      id: id,
      displayname: name,
      email: email,
      locale: currentLocale,
      theme: '',
    });
    dispatch(addUser({id: user.uid, daisplayname: name, locale: currentLocale, theme: ''}));
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