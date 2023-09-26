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
import { RecipeProvider } from './context/RecipesContext';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/meals/:id" element={ <MealDetails /> } />
      <Route path="/drinks/:id" element={ <DrinkDetails /> } />
      <Route path="/" element={ <Layout /> }>
        <Route path="/meals" element={ <>
            <RecipeProvider apiURL="https://www.themealdb.com/api/json/v1/1/search.php?s=" dataKey="meals">
              <Meals />
            </RecipeProvider>
          </> 
        } />
        <Route path="/drinks" element={  <>
            <RecipeProvider apiURL="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" dataKey="drinks">
              <Drinks />
            </RecipeProvider>
          </> 
         } />
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
