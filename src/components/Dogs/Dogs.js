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
    const { dogs, favoriteDogs } = this.state;
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

  create

  componentDidMount = () => {
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

        this.setState({ dogs: dogInfos })
      })
      .catch(error => {
        console.error('API error:', error);
      });
  }

  changeFavoriteView =()=>{
    this.setState((prevState) => ({showFavorites: !prevState.showFavorites }))
  }

  render() {
    const { dogs, favoriteDogs} = this.state
    const dogCards = dogs.map(dog => <Dog key={dog.id} dog={dog} updateDogFavorite={this.updateDogFavorite} />)
    const favDogCards = favoriteDogs.map(dog => <Dog key={dog.id} dog={dog} updateDogFavorite={this.updateDogFavorite} />)

    if (this.state.dogs.length < 0) {
      return <h2>Loading...</h2>
    }
    return (
      <>
      <div>
        <button onClick={this.changeFavoriteView}>Favorites</button>
      </div>
      <section className="dogs-container">
        {this.state.showFavorites? favDogCards: dogCards}
      </section>
      </>
    )
  }
}

export default Dogs;