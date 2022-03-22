import {
  ADDREVIEWPAGE_ROUTE, CATEGORIES_ROUTE,
  HOMEPAGE_ROUTE,
  LOGIN_ROUTE,
  MYPAGE_ROUTE,
  REGISTER_ROUTE,
  REVIEW_ROUTE
} from "../utils/const";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ReviewPage from "../pages/ReviewPage";
import MyPage from "../pages/MyPage";
import AddReviewPage from "../pages/AddReviewPage";
import CategoriesPage from "../pages/CategoriesPage";
import AddReviewPage1 from "../pages/AddReviewPage1";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Element: LoginPage
  },
  {
    path: REGISTER_ROUTE,
    Element: RegistrationPage
  },
  {
    path: HOMEPAGE_ROUTE,
    Element: HomePage
  },
  {
    path: REVIEW_ROUTE,
    Element: ReviewPage
  }
]

export const privateRoutes = [
  {
    path: MYPAGE_ROUTE,
    Element: MyPage
  },
  {
    path: CATEGORIES_ROUTE,
    Element: CategoriesPage
  },
  {
    path: ADDREVIEWPAGE_ROUTE,
    Element: AddReviewPage1
  },
]