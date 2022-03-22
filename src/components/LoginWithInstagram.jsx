import React from 'react';
import Button from "react-bootstrap/Button";


const LoginWithInstagram = () => {
  const credentials = {
    client: {
      id: '329821859085725', // Change this!
      secret: '71bf695e56cf131117387f68f7aee7f9', // Change this!
    },
    auth: {
      tokenHost: 'https://api.instagram.com',
      tokenPath: '/oauth/access_token'
    }
  };
  const oauth2 = require('simple-oauth2').create(credentials);

  app.get('/redirect', (req, res) => {
    // Generate a random state verification cookie.
    const state = req.cookies.state || crypto.randomBytes(20).toString('hex');
    // Allow unsecure cookies on localhost.
    const secureCookie = req.get('host').indexOf('localhost:') !== 0;
    res.cookie('state', state.toString(), {maxAge: 3600000, secure: secureCookie, httpOnly: true});
    const redirectUri = oauth2.authorizationCode.authorizeURL({
      redirect_uri: `${req.protocol}://${req.get('host')}/instagram-callback`,
      scope: 'basic',
      state: state
    });
    res.redirect(redirectUri);
  });


  function onSignInButtonClick() {
    window.open('/redirect', 'firebaseAuth', 'высота = 315, ширина = 400');
  };

  return (
    <>
      <Button variant={"outline-success"} className='mt-2' onClick={loginWithGoogle}>Log in using Instagram</Button>
    </>
  );
};

export default LoginWithInstagram;