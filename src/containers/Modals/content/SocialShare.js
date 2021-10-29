/*
 * Social modal
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../../components/UI/Button";
import Modal from "components/UI/Modal";
import socialShareIcon from "../img/link.png";
import { SocialIcon } from "react-social-icons";
import s from "../styles.module.scss";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";

class SocialShare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };
  }
  copyToClipboard = () => {
    {
      console.log("yay");
    }
    const copyText = `https://www.gamesmith.com/maker/${this.props.data}/profile`;
    const elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = copyText;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    this.setState({ copied: !this.state.copied });
  };
  render() {
    const { className = "", isOpen, onCloseModal, data } = this.props;
    return (
      <Modal
        title="Share your profile"
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <div>
          <SocialIcon
            url={`https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.gamesmith.com%2Fmaker%2F${data}`}
            className={s.socialBtn}
          />
          <SocialIcon
            url={`https://web.whatsapp.com/send?text=Check my Gamesmith Profile%3A%3A%20http%3A%2F%2Fgamesmith.com%2Fmaker%2F${data}`}
            className={s.socialBtn}
          />
          <SocialIcon
            url={`https://twitter.com/intent/tweet?url=http%3A%2F%2Fgamesmith.com%2Fmaker%2F${data}&text=Check my Gamesmith Profile`}
            className={s.socialBtn}
          />
          <SocialIcon
            url={`https://www.linkedin.com/sharing/share-offsite/?url=http%3A%2F%2Fwww.gamesmith.com%2Fmaker%2F${data}`}
            className={s.socialBtn}
          />
          <Button
            text=""
            className={s.socialShare}
            icon={socialShareIcon}
            data-tip={"copied to clipboard"}
            data-event="click"
            data-delay-hide="2000"
            data-event-off="click"
          />
          <ReactTooltip
            place="top"
            type="light"
            effect="solid"
            afterShow={this.copyToClipboard}
          />
        </div>
      </Modal>
    );
  }
}
SocialShare.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  data: PropTypes.number,
};

export default connect((dispatch) => ({
  dispatch,
}))(SocialShare);
