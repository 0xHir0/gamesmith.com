/*
 * Modal component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

import s from "./styles.module.scss";

class ReactModal extends Component {
  state = {
    isOpen: false,
  };

  closeModal = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const {
      title,
      titleImage,
      imageStyle,
      isOpen,
      closeModal,
      children,
      className,
      crossClassname,
      image,
      note,
      modalName,
    } = this.props;
    return (
      <Modal
        isOpen={isOpen || this.state.isOpen}
        onRequestClose={closeModal || this.closeModal}
        shouldCloseOnOverlayClick={false}
        overlayClassName={s.overlay}
        className={
          modalName === "PlayVideo" ? s.root1 : `${s.root} ${className || ""}`
        }
      >
        {!modalName && (
          <button className={s.close} onClick={closeModal || this.closeModal}>
            <p style={{color: '#F8E81C', fontWeight: "bold", fontSize: '2.5rem', marginTop: '18px', marginRight:'5px'}}>×</p>
          </button>
        )}
        {modalName === "PlayVideo" && (
          <button className={s.close} onClick={closeModal || this.closeModal}>
            <p style={{color: '#F8E81C', fontWeight: "bold", fontSize: '1rem', marginTop: '18px', marginRight:'5px'}}>x</p>
          </button>
        )}
        {!!titleImage && <img className={s.titleImage} src={titleImage}></img>}
        {!!titleImage ? (
          <p className={s.titleParagraph}>{title}</p>
        ) : (
          <h2>{title}</h2>
        )}
        {image && (
          <img
            className={!!titleImage ? `${imageStyle}` : `${s.image}`}
            src={image}
          ></img>
        )}
        <div
          className={!!titleImage ? `${s.guideModalParagraph}` : `${s.content}`}
        >
          {children}
        </div>
        {!!note && (
          <p>
            <p className={s.note}>Note</p>
            <p className={s.note}>{note}</p>
          </p>
        )}
      </Modal>
    );
  }
}

ReactModal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string,
  imageStyle: PropTypes.string,
  image: PropTypes.string,
  titleImage: PropTypes.string,
  crossClassname: PropTypes.string,
  note: PropTypes.string,
};

export default ReactModal;
