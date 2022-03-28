import {BrowserRouter} from 'react-router-dom';
import './App.css';
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
import Footer from "./components/Footer";
import { IntlProvider } from 'react-intl';
import { LOCALES } from '../src/i18n/locales'
import { messages } from '../src/i18n/messages'
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setCurrentLocaleState} from "./store/state/users/actions";

function App() {
  const [currentLocale, setCurrentLocale] = useState(getInitialLocale());
  const [isAuth, setIsAuth] = useState(detInitialIsAuth());
  const dispatch = useDispatch();
  // const currentLocale = useSelector(state => state.userMy.currentLocale);

  function getInitialLocale() {
    const savedLocale = localStorage.getItem('locale');
    return savedLocale || LOCALES.ENGLISH;
  }

  function detInitialIsAuth () {
    const savedIsAuth = localStorage.getItem('isAuth');
    return savedIsAuth || false
  }

  const handleTakeUser = ({ target: { value } }) => {
    // setCurrentLocale(value);
    localStorage.setItem('locale', value);
    setCurrentLocale(value);
    dispatch(setCurrentLocaleState(value));
  }

  const handleChangeCurrentLocale = ({ target: { value } }) => {
    localStorage.setItem('locale', value);
    setCurrentLocale(value);
    dispatch(setCurrentLocaleState(value));
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
