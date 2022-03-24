import React, {useState} from 'react';
import {Container, Form, Nav, Navbar} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {NavLink, useNavigate} from "react-router-dom";
import logo from '../assets/img/Logo.png'
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {useAuth} from "../hooks/use-auth";
import {HOMEPAGE_ROUTE, LOGIN_ROUTE, MYPAGE_ROUTE} from "../utils/const";
import {removeUser} from "../store/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import { LOCALES } from '../i18n/locales'
import {FormattedMessage} from "react-intl";

const NavBar = ({ currentLocale, handleChangeCurrentLocale }) => {
  const languages = [
    { name: 'En', code: LOCALES.ENGLISH },
    { name: 'Рус', code: LOCALES.RUSSIAN }
  ];

  const {isAuth, email} = useAuth();
  const {user} = useSelector(state => state.userMy.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const signOut = () => {
    dispatch(removeUser());

    navigate(HOMEPAGE_ROUTE);
  }

  return (
    <Navbar bg='primary' variant='dark'>
      <Container className='d-flex justify-content-center align-items-center'>
        <Nav className='d-flex justify-content-between align-items-center' style={{width: '100%'}}>
          <NavLink to={HOMEPAGE_ROUTE}><img src={logo} style={{width: 60}} alt={logo}/></NavLink>
          <div className='d-flex'>
            <NavLink to={MYPAGE_ROUTE} style={{textDecoration: "none", color: 'white'}} className='p-2'>{email}</NavLink>
            <ButtonGroup aria-label="Basic example">
              {isAuth
                ?<Button variant={'outline-light'} onClick={signOut}><FormattedMessage id='sign_out'/></Button>
                :<Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}><FormattedMessage id='sign_in'/></Button>
              }
            </ButtonGroup>
            <Form>
            <Form.Select onChange={handleChangeCurrentLocale} value={currentLocale} className='ms-2' style={{width: 80}}>{languages.map(({ name, code }) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </Form.Select>
            </Form>
        </div>

        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;