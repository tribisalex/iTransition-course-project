import React from 'react';
import {Container} from "react-bootstrap";
import {FormattedMessage} from "react-intl";

const Footer = () => {
  return (
    <Container>
      <footer className='d-flex flex-column justify-content-center align-items-center p-2'>
        <div><FormattedMessage id='foot'/></div>
        <div><FormattedMessage id='foote'/></div>
      </footer>
    </Container>
  );
};

export default Footer;