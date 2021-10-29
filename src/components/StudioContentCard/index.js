/*
 * Studio Content card
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import ImageZoom from "../UI/ImageZoom";
import s from "./styles.module.scss";
var YoutubeVideo = require("react-youtube-video");
class StudioContentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  zoomIn = () => {
    this.setState({
      isOpen: true,
    });
  };

  zoomOut = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const { isOpen } = this.state;
    const { contentUrl, isVideo, isImage } = this.props;
    return (
      <div className={s.studioContentContainer}>
        {isVideo && <YoutubeVideo url={contentUrl} showinfo="1" />}
        {isImage && (
          <div>
            <img src={contentUrl} className={s.imageRes} />
            <p className={` fa fa-search`} onClick={() => this.zoomIn()}></p>
          </div>
        )}
        {isOpen && <ImageZoom imgUrl={contentUrl} zoomOut={this.zoomOut} />}
      </div>
    );
  }
}

StudioContentCard.propTypes = {
  contentId: PropTypes.number,
  contentUrl: PropTypes.string,
  isVideo: PropTypes.bool,
  isImage: PropTypes.bool,
};

export default StudioContentCard;
