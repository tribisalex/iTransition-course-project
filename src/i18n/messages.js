import { LOCALES } from './locales'
import {FormattedMessage} from "react-intl";
import React from "react";

export const messages = {
  [LOCALES.ENGLISH]: {
    sign_in: 'Sign in',
    sign_out: 'Sign out',
    sign_up: 'Sign up',
    registration: 'Register',
    have_acc: 'Have an account?',
    no_ac: 'No account?',
    ent_name: 'Enter your name',
    log_in_usign: 'Log in using',
    foot: 'Developed as part of a course project',
    foote: 'specifically for iTransition, 2022',
    my_page: 'My page',
    add_review: 'Add review',
    add_category: 'Add category',
    name_review: 'Название обзора',
    date: 'Date',
    category: 'Category',
    edit: 'Edit',
    del: 'Delete',
    View: 'Viewing',
    release_the_files: 'Release the files to download them',
    edit_review: 'Edit review',
    Add_new_review: 'Add review',
    select_a_file: 'Select a file',
    drag_it: 'or drag it here to upload them',
    upload_completed: 'Upload completed',
    upload: 'Upload',



    learn_to: `Hello, let's learn how to use React-Intl`,
    price_display:
      'How {n, number, ::currency/USD} is displayed in your selected language',
    number_display:
      'This is how {n, number} is formatted in the selected locale',
    start_today: 'Start Today: {d, date}',
    // меню
    about_project: 'About the project',
    contact_us: 'Contact us'
  },
  [LOCALES.RUSSIAN]: {
    sign_in: 'Войти',
    sign_out: 'Выйти',
    sign_up: 'Зарегистрироваться',
    registration: 'Регистрация',
    have_acc: 'Есть аккаунт?',
    no_ac: 'Нет аккаунта?',
    ent_name: 'Введите свое имя',
    log_in_usign: 'Войти, используя:',
    foot: 'Разработано в рамках курсового проекта',
    foote: 'специально для iTransition, 2022',
    my_page: 'Моя страница',
    add_review: 'Добавить обзор',
    add_category: 'Добавить категорию',
    name_review: 'Название обзора',
    date: 'Дата',
    category: 'Категория',
    edit: 'Изменить',
    del: 'Удалить',
    View: 'Просмотр',
    release_the_files: 'Отпустите файлы, чтобы загрузить их',
    edit_review: 'Изменить обзор',
    Add_new_review: 'Добавить обзор',
    select_a_file: 'Выберите файл',
    drag_it: 'или перетяните его для загрузки здесь',
    upload_completed: 'Загрузка выполнена',
    upload: 'Загрузить',




    learn_to: 'Привет, научимся использовать React-Intl',
    price_display:
      'Как {n, number, ::currency/RUB} отображается на выбранном языке',
    number_display:
      'Вот как {n, number} форматируется на основе выбранной локации',
    start_today: 'Начни сегодня: {d, date}',
    // меню
    about_project: 'О проекте',
    contact_us: 'Свяжитесь с нами'
  }
}