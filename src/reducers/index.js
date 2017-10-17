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
  switch (action.type) {
    case FAVORITE_RECIPE:
      return [...state, action.recipe]
    case DELETE_RECIPE:
      return state.filter(recipe => {
        return recipe.title !== action.recipe.title
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({ recipes, favoriteRecipes })

export default rootReducer
