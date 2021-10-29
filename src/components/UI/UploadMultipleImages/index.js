/*
 * Upload Multiple Images component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import uploadcare from "uploadcare-widget";
import s from "./styles.module.scss";

class UploadMultipleImages extends Component {
  onChangeFiles = (studioContent) => {
    const { dimension, license } = this.props;
    uploadcare
      .openDialog(null, {
        imagesOnly: true,
        multiple: true,
      })
      .done(function (file) {
        file.promise().done(function (fileInfo) {
          for (var i = 0; i < fileInfo.count; i++) {
            studioContent.addField({
              id: -1,
              contentUrl: fileInfo.cdnUrl + "nth/" + i + "/",
              isImage: true,
              isVideo: false,
            });
          }
        });
      });
  };
  render() {
    const { studioContent, toggleTab, onOpenUpgradePrompt, license } =
      this.props;
    return (
      <div className={s.outer}>
        <p>Feed images should be atleast 320 pixels wide.</p>
        <div>
          <a
            className={s.btnUpload}
            onClick={
              license === "basic"
                ? () => onOpenUpgradePrompt(toggleTab, "plan")
                : () => this.onChangeFiles(studioContent)
            }
          >
            Upload Images
          </a>
        </div>
      </div>
    );
  }
}

UploadMultipleImages.propTypes = {
  studioContent: PropTypes.array,
  className: PropTypes.string,
  dimension: PropTypes.string,
  label: PropTypes.string,
  placholder: PropTypes.string,
  onChangeFiles: PropTypes.func,
};

export default UploadMultipleImages;
