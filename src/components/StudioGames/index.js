import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import s from "./styles.module.scss";
import StudioGameCardNew from "../StudioGameCardNew";
import Button from "../UI/Button";
class StudioGames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };
  }
  render() {
    const { games } = this.props;
    return (
      <div className={s.root}>
        <h3>Game Credits</h3>
        {games && games.length > 0 ? (
          games.map(
            (i, j) =>
              j < 5 && (
                <StudioGameCardNew
                  imageUrl={i.imageUrl}
                  name={i.name}
                  releaseDate={"-"}
                  genres={"Genres"}
                />
              )
          )
        ) : (
          <h4 className={s.heading}>This studio has no games.</h4>
        )}
        {this.state.selected === false && games && games.length > 5 && (
          <Button
            text="Browse all Games"
            className={s.btn}
            onClick={() => this.setState({ selected: true })}
          />
        )}
        {this.state.selected === true && games && games.length > 5
          ? games.map(
              (i, j) =>
                j >= 5 && (
                  <StudioGameCardNew
                    imageUrl={i.imageUrl}
                    name={i.name}
                    releaseDate={"-"}
                    genres={"Genres"}
                  />
                )
            )
          : ""}
      </div>
    );
  }
}
StudioGames.propTypes = {
  games: PropTypes.object.isRequired,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(StudioGames);
