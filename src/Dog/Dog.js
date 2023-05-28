import { render } from "@testing-library/react";
import React from "react";
import './Dog.css'
import favoritedIcon from '../assests/favorited-icon.png'
import notFavoriteIcon from '../assests/unfavorite-icon.png'

class Dog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      breed: this.props.breed,
      url: this.props.url,
      favorite: false
    }
  }


  render() {
    return (
      <section  className="dog-card">
        <img src={this.state.url} alt={this.state.breed} className="dog-image"/>
      </section>
    )
  }
}

export default Dog;