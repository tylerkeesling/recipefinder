import React, { Component } from 'react'
import { connect } from 'react-redux'
import { favoriteRecipe, deleteRecipe } from '../actions'

class RecipeItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      favorited: false
    }
  }

  toggleFavorite(recipe) {
    if (this.state.favorited) {
      this.props.deleteRecipe(recipe)
      this.setState({ favorited: false })
    } else {
      this.props.favoriteRecipe(recipe)
      this.setState({ favorited: true })
    }
  }

  render() {
    let { recipe } = this.props
    return (
      <div className='recipe-item'>
        {
          this.props.favoriteButton ?
            this.state.favorited ?
              <div
                className='star'
                onClick={ () => this.toggleFavorite(recipe) }
              >
                &#9733;
              </div>
            :
              <div
                className='star'
                onClick={ () => this.toggleFavorite(recipe) }
              >
                &#9734;
              </div>
          :
            <div></div>
        }
        <div className='recipe-text'>
          <a href={ recipe.href }>
            <h4>{ recipe.title }</h4>
          </a>
          <p>{ recipe.ingredients }</p>
        </div>
        <img
          src={ recipe.thumbnail }
          alt={ recipe.title }
          className='recipe-img'
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { favoriteRecipe, deleteRecipe })(RecipeItem)
