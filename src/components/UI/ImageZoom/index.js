/*
 * Image Zoom component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import Lightbox from "react-image-lightbox";
import s from "./styles.module.scss";

class ImageZoom extends Component {
  render() {
    const { imgUrl, zoomOut } = this.props;
    return (
      <div id="studio-image-zoomer">
        <Lightbox mainSrc={imgUrl} onCloseRequest={zoomOut} />
      </div>
    );
  }
}

ImageZoom.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  zoomOut: PropTypes.func.isRequired,
};

export default ImageZoom;
