import React from "react";
import './Dog.css'
import favoritedIcon from '../../assests/favorited-icon.png'
import notFavoriteIcon from '../../assests/unfavorite-icon.png'

class Dog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      breed: this.props.breed,
      imageUrl: this.props.imageUrl,
      favorite: false
    };
  }

  render(){
  
  const {dog} = this.props
 
 
    return (
      <section className="dog-card">
        <img src={dog.imageUrl} alt={dog.breed} className="dog-image" />
        {dog.favorite? <img src={favoritedIcon} onClick={() => this.props.updateDogFavorite(dog.id)}/> :
                              <img src={notFavoriteIcon} onClick={() => this.props.updateDogFavorite(dog.id)}/> }
      </section>
    );
    }
}

export default Dog;