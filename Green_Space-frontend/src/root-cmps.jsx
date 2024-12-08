// const Router = ReactRouterDOM.HashRouter
// const { Route, Routes } = ReactRouterDOM
// const { Provider } = ReactRedux
import './assets/style/main.css'
import './assets/style-scss/styles.scss'

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AboutUs } from "./pages/about-us";
import { HomePage } from './pages/home-page';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppHeader } from './cmps/app-header';
import { AppFooter } from './cmps/app-footer';
import { PlantIndex } from './pages/plant-index';
import { PlantDetails } from './pages/plant-details';
import { PlantEdit } from './pages/plant-edit';
import { Dashboard } from './pages/dashboard';
import { UserDetails } from './pages/user-details';
import { Questionnaire } from './pages/questionnaire';


export function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<Questionnaire />} path="/questionnaire" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<PlantIndex />} path="/plant" />
              <Route element={<PlantEdit />} path="/plant/edit/:plantId" />
              <Route element={<PlantEdit />} path="/plant/edit" />
              <Route element={<PlantDetails />} path="/plant/:plantId" />
              <Route element={<Dashboard />} path="/dashboard" />
              <Route path="user/:id" element={<UserDetails />} />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  )
}


