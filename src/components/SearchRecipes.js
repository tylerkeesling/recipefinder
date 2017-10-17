import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { setRecipes } from '../actions'
import { delete_cookie } from 'sfcookies'

class SearchRecipes extends Component {
  constructor() {
    super()

    this.state = {
      ingredients: '',
      dish: ''
    }
  }

  search() {
    let { ingredients, dish } = this.state
    const url = `https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?i=${ ingredients }&q=${ dish }`

    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      this.props.setRecipes(json.results)
    })
  }

  render() {
    return (
      <Form inline>
        <FormGroup>
          <ControlLabel>Ingredients</ControlLabel>
          {' '}
          <FormControl
            type='text'
            placeholder='chicken, garlic'
            onChange={ event => this.setState({ ingredients: event.target.value}) }
          />
        </FormGroup>
        {' '}
        <FormGroup>
          <ControlLabel>Dish</ControlLabel>
          {' '}
          <FormControl
            type='text'
            placeholder='adobo'
            onChange={ event => this.setState({ dish: event.target.value }) }
          />
        </FormGroup>
        {' '}
        <Button onClick={ () => this.search() }>Submit</Button>
        <Button onClick={ () => this.deleteCookie() }>Delete Cookie</Button>
      </Form>
    )
  }
}

export default connect(null, { setRecipes })(SearchRecipes)
