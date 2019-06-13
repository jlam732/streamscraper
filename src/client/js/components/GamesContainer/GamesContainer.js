import React, { Component } from "react";
import api from "streamscraper/api";

class GamesContainer extends Component {
  async componentDidMount() {
    const { sport } = this.props;
    console.log(api);
    const games = await api.getGameLinks(
      `https://www.reddit.com/r/${sport}streams`
    );
    console.log(games);
  }

  render() {
    console.log(this.props);
    return <div>This is the games container</div>;
  }
}

export default GamesContainer;
