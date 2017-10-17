import { combineReducers } from 'redux'
import { SET_RECIPES, FAVORITE_RECIPE, DELETE_RECIPE } from '../actions'
import { bake_cookie, read_cookie } from 'sfcookies'

function recipes(state = [], action) {
  switch (action.type) {
    case SET_RECIPES:
      return action.items
    default:
      return state
  }
}

function favoriteRecipes(state = [], action) {
  state = read_cookie('favoriteRecipesList');
  let favoriteRecipesList = []
  switch (action.type) {
    case FAVORITE_RECIPE:
      favoriteRecipesList = [...state, action.recipe]
      let newCookie = bake_cookie('favoriteRecipesList', favoriteRecipesList)
      console.log(newCookie);
      return favoriteRecipesList
    case DELETE_RECIPE:
      favoriteRecipesList = state.filter(recipe => {
        return recipe.title !== action.recipe.title
      })
      bake_cookie('favoriteRecipesList', favoriteRecipesList)
      return favoriteRecipesList
    default:
      return state
  }
}

const rootReducer = combineReducers({ recipes, favoriteRecipes })

export default rootReducer
