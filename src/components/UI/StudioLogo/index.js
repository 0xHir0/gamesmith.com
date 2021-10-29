/*
 * UploadPhoto component
 */
import React, { Component } from "react";
import PropTypes from "prop-types";

import uploadcare from "uploadcare-widget";
import s from "./styles.module.scss";

class StudioLogo extends Component {
  upload = (imgUrl) => {
    const { dimension, license } = this.props;
    license !== "basic" &&
      uploadcare
        .openDialog(null, {
          imagesOnly: true,
          crop: dimension,
        })
        .done((file) => {
          file.promise().done((fileInfo) => {
            imgUrl.onChange(fileInfo.cdnUrl);
          });
        });
  };
  render() {
    const {
      imgUrl,
      rootClassName,
      label,
      description,
      toggleTab,
      onOpenUpgradePrompt,
      license,
    } = this.props;
    return (
      <div className={`${s.root} ${rootClassName}`}>
        <div className={`"col-sm-12" ${s.container}`}>
          <p className={s.alighnLeft}>{label} </p>
          {imgUrl.value && (
            <img
              src={imgUrl.value.preview ? imgUrl.value.preview : imgUrl.value}
              className={s.setImage}
              alt="logo"
            />
          )}
          {description && imgUrl.value && (
            <p className={s.description}>{description}</p>
          )}
          <div>
            <a
              className={s.uploadLogo}
              onClick={
                license === "basic"
                  ? () => onOpenUpgradePrompt(toggleTab, "plan")
                  : () => this.upload(imgUrl)
              }
            >
              {imgUrl.value ? `CHANGE ${label}` : `UPLOAD ${label}`}
            </a>
            {/* <a className={s.uploadLogo} onClick={license === 'basic' ? () => onOpenUpgradePrompt(toggleTab, 'plan') : () => this.upload(imgUrl)}>{imgUrl.value ? "CHANGE "+label : "UPLOAD "+label}</a>*/}
            {description && !imgUrl.value && (
              <p className={s.description}>{description}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

StudioLogo.propTypes = {
  imgUrl: PropTypes.object,
  rootClassName: PropTypes.string,
  dimension: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  onOpenUpgradePrompt: PropTypes.func,
  license: PropTypes.string,
  toggleTab: PropTypes.func,
};

export default StudioLogo;
