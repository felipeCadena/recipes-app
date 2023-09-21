import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Header from './components/Header';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import MealDetails from './pages/MealDetails';
import DrinkDetails from './pages/DrinkDetails';
import MealInProgress from './pages/MealInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import { RecipeProvider } from './context/RecipesContext';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route
        path="/meals"
        element={
          <>
            <Header />
            <RecipeProvider apiURL="https://www.themealdb.com/api/json/v1/1/search.php?s=" dataKey="meals">
              <Meals />
            </RecipeProvider>
          </>
        }
      />
      <Route
        path="/drinks"
        element={
          <>
            <Header />
            <RecipeProvider apiURL="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" dataKey="drinks">
              <Drinks />
            </RecipeProvider>
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
            <Header />
            <Profile />
          </>
        }
      />
      <Route
        path="/done-recipes"
        element={
          <>
            <Header />
            <DoneRecipes />
          </>
        }
      />
      <Route
        path="/favorite-recipes"
        element={
          <>
            <Header />
            <FavoriteRecipes />
          </>
        }
      />
    </Routes>
  );
}

export default App;
