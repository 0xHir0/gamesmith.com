/*
 * Send Job To Friend form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import Recaptcha from "react-recaptcha";
import validate from "./validation";
import Button from "components/UI/Button";
import Input from "components/UI/Input";
import RichText from "components/UI/RichText";

import s from "./styles.module.scss";

export const fields = ["email", "subject", "content", "name"];

class SendJobToFriendForm extends React.Component {
  state = {
    jobDescription: this.props.jobUrlText,
    richtextValue: this.props.jobUrlText,
  };
  handleChange(e) {
    this.setState({
      jobDescription: e.target.value,
    });
  }
  onChangeRichText(e) {
    this.setState({
      richtextValue: e,
    });
  }
  render() {
    const {
      fields: { email, subject, name },
      handleSubmit,
      jobTitle,
      jobUrlText,
      jobUrl,
      verifyCallback,
      isVerified,
    } = this.props;
    const {
      fields: { content },
    } = this.props;
    content.value = jobUrlText;

    return (
      <form className={s.root} onSubmit={handleSubmit}>
        <Input label="To" open {...email} />
        <Input label="Your Name" open {...name} />
        <Input label="Subject" open {...subject} value={jobTitle} />
        <RichText
          onChange={(e) => this.onChangeRichText(e)}
          value={this.state.richtextValue}
          page={"job"}
        />
        <div className={s.reCaptcha}>
          <Recaptcha
            sitekey="6LdMkJUUAAAAAINk_TmaiJrjT_2ry_xIlGgGDdQg"
            render="explicit"
            verifyCallback={verifyCallback}
            theme="dark"
          />
          {isVerified ? <p>Please verify that you are human</p> : ""}
        </div>
        <Button type="submit" text="Send" />
      </form>
    );
  }
}
// let SendJobToFriendForm = ({ fields: { email, subject, from, body }, handleSubmit, jobTitle, jobUrlText, jobUrl }) => (
//   <form className={s.root} onSubmit={handleSubmit}>
//     <Input label="To" open {...email} />
//     <Input label="Subject" open {...subject} value={jobTitle}/>
//     <Input type="textarea" value={jobUrlText}/>
//     {/*<div style={{ width: '100%', height: 'auto', border: '1px solid white', padding:'1rem', color: 'white', textAlign: 'left'}}>*/}
//       {/*Just saw this awesome job, and I thought I would share it with you! <br/> <strong>Check it out here: ${jobUrl}  </strong> <br/>*/}
//     {/*</div>*/}
//     <Button type="submit" text="Send" />
//   </form>
// );

SendJobToFriendForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  verifyCallback: PropTypes.func.isRequired,
  isVerified: PropTypes.bool,
};

export default SendJobToFriendForm = reduxForm({
  form: "sendjobtofriend",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(SendJobToFriendForm);
