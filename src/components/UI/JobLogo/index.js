/*
 * UploadPhoto component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import Button from "components/UI/Button";

import s from "./styles.module.scss";

class JobLogo extends Component {
  state = {
    files: [],
  };

  render() {
    const { files } = this.state;
    const { imgUrl } = this.props;
    return (
      <div className={s.root}>
        <div className="col-sm-12">
          <Dropzone
            ref={(c) => {
              this.dropzone = c;
            }}
            className={s.avatar}
            multiple={false}
            accept="image/*"
            onDrop={(newFiles) => {
              this.setState({ files: newFiles });
              imgUrl.onChange(newFiles[0]);
            }}
          >
            {imgUrl.value && (
              <img
                src={imgUrl.value.preview ? imgUrl.value.preview : imgUrl.value}
                alt="logo"
              />
            )}
            <p>
              <i className={`fa fa-upload ${s.margin}`} aria-hidden="true"></i>
              Click here to upload job logo
            </p>
          </Dropzone>
        </div>
      </div>
    );
  }
}

JobLogo.propTypes = {
  imgUrl: PropTypes.object,
};

export default JobLogo;
