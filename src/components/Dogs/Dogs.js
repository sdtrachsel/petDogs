import React from "react";
import './Dogs.css'
import { getDogs } from "../../apiCalls";
import Dog from "../Dog/Dog";

class Dogs extends React.Component {
  constructor() {
    super()
    this.state = {
      dogs: [],
      favoriteDogs: [],
      showFavorites: false
    }
  }

  updateFavoriteDogs = (dogId) => {
    const { dogs } = this.state;
    const dog = dogs.find((dog) => dog.id === dogId);

    if (dog.favorite) {
      this.setState((prevState) => ({
        favoriteDogs: [...prevState.favoriteDogs, dog],
      }));
    } else {
      this.setState((prevState) => ({
        favoriteDogs: prevState.favoriteDogs.filter(
          (favoriteDog) => favoriteDog.id !== dog.id
        ),
      }));
    }
  };

  updateDogFavorite = (dogId) => {
    const { dogs } = this.state;
    const updatedDogs = dogs.map((dog) => {
      if (dog.id === dogId) {
        return {
          ...dog,
          favorite: !dog.favorite,
        };
      }
      return dog;
    });

    this.setState({ dogs: updatedDogs }, () => {
      this.updateFavoriteDogs(dogId);
    });
  };


  componentDidMount = () => {
    this.getTheDogs()
  }

  changeFavoriteView = () => {
    this.setState((prevState) => ({ showFavorites: !prevState.showFavorites }))
  }

  getTheDogs = () => {
    getDogs()
      .then(data => {
        const dogInfos = data.message.map((url, index) => {
          const dog = {}
          dog.id = Date.now() + index
          dog.imageUrl = url
          dog.breed = url.match(/\/breeds\/([^/]+)/)[1]
          dog.favorite = false
          return dog
        })

        this.setState((prevState) => ({ dogs: [...dogInfos, ...prevState.dogs] }))
      })
      .catch(error => {
        console.error('GET error:', error);
      });
  }

  render() {
    const { dogs, favoriteDogs, showFavorites } = this.state
    const dogCards = dogs.map(dog => <Dog key={dog.id} dog={dog} updateDogFavorite={this.updateDogFavorite} />)
    const favDogCards = favoriteDogs.map(dog => <Dog key={dog.id} dog={dog} updateDogFavorite={this.updateDogFavorite} />)

    return (
      <>
        <div className="button-wrapper">
          {!showFavorites && <button onClick={this.getTheDogs}>Get More Dogs</button>}
          <button onClick={this.changeFavoriteView}>{showFavorites ? "Home" : "See Favorites"}</button>
        </div>
        <section className="dogs-container">
          {showFavorites ? favDogCards : dogCards}
        </section>
        {!dogs.length && <h2>Loading...</h2>}
      </>
    )
  }
}

export default Dogs;