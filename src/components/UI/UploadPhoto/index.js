/*
 * UploadPhoto component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";

import s from "./styles.module.scss";

class UploadPhoto extends Component {
  state = {
    files: [],
  };

  render() {
    const { files } = this.state;
    const { imgUrl, image, placeholder } = this.props;
    const ismobile = window.innerWidth <= 1150;

    return (
      <div className={s.root}>
        <Dropzone
          ref={(c) => {
            this.dropzone = c;
          }}
          className={s.avatar}
          multiple={false}
          accept="image/*"
          onDrop={(newFiles) => {
            this.setState({ files: newFiles });
            image.onChange(newFiles[0]);
          }}
        >
          {(image.value || files.length > 0 || imgUrl) && (
            <img
              src={
                image.value
                  ? image.value.preview
                  : files.length > 0
                  ? files[0].preview
                  : imgUrl
              }
              alt=""
            />
          )}
        </Dropzone>
        <button
          onClick={() => this.dropzone.open()}
          type="button"
          style={ismobile ? { height: "30px" } : { opacity: "1" }}
        >
          {placeholder ? placeholder : "Upload Photo"}
        </button>
      </div>
    );
  }
}

UploadPhoto.propTypes = {
  imgUrl: PropTypes.string,
  placeholder: PropTypes.string,
  image: PropTypes.object,
};

export default UploadPhoto;
