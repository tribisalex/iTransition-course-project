import {BrowserRouter} from 'react-router-dom';
import './App.css';
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
import Footer from "./components/Footer";
import { IntlProvider } from 'react-intl';
import { LOCALES } from '../src/i18n/locales'
import { messages } from '../src/i18n/messages'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentLocale} from "./store/state/users/actions";
import {getDocs} from "firebase/firestore";
import {setCategories} from "./store/state/category/actions";

function App() {
  // const [currentLocale, setCurrentLocale] = useState(getInitialLocale());
  const [isAuth, setIsAuth] = useState(detInitialIsAuth());
  const dispatch = useDispatch();
  const currentLocale = useSelector(state => state.userMy.currentLocale);
  // function getInitialLocale() {
  //   const savedLocale = localStorage.getItem('locale')
  //   return savedLocale || LOCALES.ENGLISH
  // }

  function detInitialIsAuth () {
    const savedIsAuth = localStorage.getItem('isAuth');
    return savedIsAuth || false
  }

  const handleChangeCurrentLocale = ({ target: { value } }) => {
    // setCurrentLocale(value);
    localStorage.setItem('locale', value);
    dispatch(setCurrentLocale(value));
  }

  return (
    <IntlProvider messages={messages[currentLocale]} locale={currentLocale} defaultLocale={LOCALES.ENGLISH}>
      <BrowserRouter>
        <NavBar currentLocale={currentLocale} handleChangeCurrentLocale={handleChangeCurrentLocale}/>
        <AppRouter currentLocale={currentLocale}/>
        <Footer/>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
