import React, { Component } from "react";
import PropTypes from "prop-types";
import { Editor } from "@tinymce/tinymce-react";
import s from "./styles.module.scss";

class RichText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.value,
    };
  }

  renderValue(val) {
    this.setState({
      description: val.target.getContent(),
    });
    return val.target.getContent();
  }
  render() {
    const { name, label, value, onChange, onBlur, touched, error, page } =
      this.props;
    return (
      <div className={s.root}>
        {label && <label>{label}</label>}
        {page && page === "job" ? (
          <Editor
            id="addJobRichText"
            initialValue={this.state.description}
            content={this.state.description}
            init={{
              selector: "#addJobRichText",
              menubar: false,
              plugins: "lists",
              toolbar: false,
              // toolbar: 'bold italic | alignleft aligncenter alignright | numlist bullist',
              statusbar: false,
              content_style:
                "#tinymce {background-color: #262626; color: #C3C3C3; font-size:16px; line-height:1;}",
            }}
            onChange={(val) => onChange(this.renderValue(val))}
          />
        ) : (
          <Editor
            id="addJobRichText"
            initialValue={this.state.description}
            content={this.state.description}
            init={{
              selector: "#addJobRichText",
              menubar: false,
              plugins: "lists",
              toolbar:
                "bold italic | alignleft aligncenter alignright | numlist bullist",
              statusbar: false,
              content_style:
                "#tinymce {background-color: #262626; color: white; font-size:16px; line-height:1;}",
            }}
            onChange={(val) => onChange(this.renderValue(val))}
          />
        )}
        {touched && error && <span className={s.error}>{error}</span>}
      </div>
    );
  }
}

RichText.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};
export default RichText;
