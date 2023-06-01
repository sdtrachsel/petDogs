import React from "react";
import './Dog.css'
import favFilled from '../../assets/fav-filled.png'
import favOutline from '../../assets/fav-outline.png'

const Dog = ({dog, updateDogFavorite}) => {

  return (
    <section className="dog-card">
      <img className="dog-image" src={dog.imageUrl} alt={dog.breed}  />
      {<img className="fav-icon" src={dog.favorite? favFilled : favOutline } onClick={() => updateDogFavorite(dog.id)} /> }
    </section>
  );
}

export default Dog;