/*
 * QA card
 */

import React, { Component, cloneElement } from "react";
import PropTypes from "prop-types";
import plus from "./img/plus.png";
import minus from "./img/minus.png";
import s from "./styles.module.scss";

class QuestionAnswerCard extends Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false,
    };
  }

  toggleView() {
    this.setState({
      showAnswer: !this.state.showAnswer,
    });
  }

  render() {
    const {
      question,
      answer,
      answerPart1,
      answerPart2,
      isEmail = false,
    } = this.props;

    return (
      <div className={s.root}>
        <div
          className={
            this.state.showAnswer
              ? `${s.content} ${s.contentAnswer}`
              : s.content
          }
        >
          <div className={this.state.showAnswer ? s.questionans : s.question}>
            <a onClick={() => this.toggleView()} className={s.link_left}>
              <img
                src={this.state.showAnswer ? minus : plus}
                className={s.leftimg}
                alt={"plus minus"}
              />
              {question}
            </a>
          </div>
          {this.state.showAnswer && (
            <div className={s.answer}>
              {!isEmail ? (
                <p className={s.answer_margin}>{answer}</p>
              ) : (
                <div className={s.support_email}>
                  <p className={s.answer_margin}>
                    {answerPart1}
                    <a href="mailto:support@gamesmith.com">
                      support@gamesmith.com
                    </a>
                    {answerPart2}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

QuestionAnswerCard.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string,
  answerPart1: PropTypes.string,
  answerPart2: PropTypes.string,
  isEmail: PropTypes.bool,
};

export default QuestionAnswerCard;
