import React, {useState} from 'react';
import {Card, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {NavLink} from "react-router-dom";
import LoginWithGoogle from "./LoginWithGoogle";
import LoginWithFacebook from "./LoginWithFacebook";
import {FormattedMessage} from "react-intl";

const FormAuth = ({title, handleClick, route, currentLocale, IsLogin}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div>
      <h2 className='m-auto align-items-center'>{title}</h2>
      <Form className='d-flex flex-column justify-content-center'>
        {
          !IsLogin
            ? <Form.Control
              className='mt-2'
              placeholder='Enter your name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
            : null
        }
        <Form.Control
          className='mt-2'
          placeholder='Enter your email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Form.Control
          className='mt-2'
          placeholder='Enter your password'
          value={pass}
          onChange={e => setPass(e.target.value)}
          type='password'
        />
        <Button variant={"outline-primary"} className='mt-2' onClick={() => handleClick(email, pass, name, currentLocale)}>{title}</Button>
        <div className='d-flex justify-content-center mt-2'>
          {
            IsLogin
              ? <div><FormattedMessage id='no_ac'/><NavLink to={route}><FormattedMessage id='sign_up'/></NavLink></div>
              : <div><FormattedMessage id='have_acc'/><NavLink to={route}><FormattedMessage id='sign_in'/></NavLink></div>
          }
        </div>
        <Card className='d-flex flex-column justify-content-center align-items-center mb-2 mt-2'>
          <div style={{fontSize: 20}}><FormattedMessage id='log_in_usign'/></div>
          <div className='d-flex'>
            <LoginWithGoogle/>
            <LoginWithFacebook/>
          </div>
        </Card>
      </Form>
    </div>
  );
};

export {FormAuth};