import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  handleChangeType = event => {
    const type = event.target.value;
    this.setState({
      filters: { ...this.state.filters, type }
    });
  };

  handleFindPetsClick = () => {
    const animalAPI =
      this.state.filters.type === "all"
        ? "/api/pets"
        : `/api/pets?type=${this.state.filters.type}`;

    fetch(animalAPI).then(response =>
      response.json().then(data =>
        this.setState({
          pets: data
        })
      )
    );
  };

  handleAdoptPet = adoptedPetId => {
    const adoptedPets = this.state.pets.map(onePet => {
      if (onePet.id === adoptedPetId) {
        onePet.isAdopted = true;
      }
      return onePet;
    });

    this.setState({
      pets: adoptedPets
    });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.handleChangeType}
                onFindPetsClick={this.handleFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={this.handleAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
