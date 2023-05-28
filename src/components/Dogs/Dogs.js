import React from "react";
import './Dogs.css'
import { getDogs } from "../../apiCalls";
import Dog from "../../Dog/Dog";

class Dogs extends React.Component {
  constructor() {
    super()
    this.state = {
      dogs: [],
    }
  }

  componentDidMount = () => {
    getDogs()
      .then(data => {
        const dogInfos = data.message.map((url, index) => {
          const dog = {}
          dog.id = Date.now() + index
          dog.imageUrl = url
          dog.breed = url.match(/\/breeds\/([^/]+)/)[1]
          return dog
        })

        this.setState({ dogs: dogInfos })
      })
      .catch(error => {
        console.error('API error:', error);
      });
  }



  render() {
    const { dogs } = this.state
    const dogCards = dogs.map(dog => <Dog key={dog.id} id={dog.id} breed={dog.breed} url={dog.imageUrl} />)

    if (this.state.dogs.length < 0) {
      return <h2>Loading...</h2>
    }
    return (
      <section className="dogs-container">
        {dogCards}
      </section>
    )
  }
}

export default Dogs;