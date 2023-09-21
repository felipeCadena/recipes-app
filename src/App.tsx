import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route
        path="/meals"
        element={
          <>
            <Header />
            <Meals />
          </>
        }
      />
      <Route
        path="/drinks"
        element={
          <>
            <Header />
            <Drinks />
          </>
        }
      />
      <Route path="/meals/:id-da-receita" element={ <MealDetails /> } />
      <Route path="/drinks/:id-da-receita" element={ <DrinkDetails /> } />
      <Route path="/meals/:id-da-receita/in-progress" element={ <MealInProgress /> } />
      <Route path="/drinks/:id-da-receita/in-progress" element={ <DrinkInProgress /> } />
      <Route
        path="/profile"
        element={
          <>
            <Header showSearchIcon={ false } pageTitle="Profile" />
            <Profile />
          </>
        }
      />
      <Route
        path="/done-recipes"
        element={
          <>
            <Header showSearchIcon={ false } pageTitle="Done Recipes" />
            <DoneRecipes />
          </>
        }
      />
      <Route
        path="/favorite-recipes"
        element={
          <>
            <Header showSearchIcon={ false } pageTitle="Favorite Recipes" />
            <FavoriteRecipes />
          </>
        }
      />
    </Routes>
  );
}

export default App;
