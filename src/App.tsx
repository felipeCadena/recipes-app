import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import MealDetails from './pages/MealDetails';
import DrinkDetails from './pages/DrinkDetails';
import MealInProgress from './pages/MealInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import Layout from './components/Layout';
import Welcome from './pages/welcome';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Welcome /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/meals/:id" element={ <MealDetails /> } />
      <Route path="/drinks/:id" element={ <DrinkDetails /> } />
      <Route path="/" element={ <Layout /> }>
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/meals/:id/in-progress" element={ <MealInProgress /> } />
        <Route
          path="/drinks/:id/in-progress"
          element={ <DrinkInProgress /> }
        />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      </Route>
    </Routes>
  );
}

export default App;
