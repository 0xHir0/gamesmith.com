/*
 * FAQ container
 */

import React from "react";
import QuestionAnswerCard from "components/QuestionAnswerCard";
import faqImg from "./img/faq.jpg";
import clipboard from "./img/clipboard.png";

import s from "./styles.module.scss";

const FAQs = () => (
  <main role="main" className={s.root}>
    <div className={s.root}>
      <div className={s.imgcontainer}>
        <img src={faqImg} alt={"some img"} />
      </div>
      <div className={`${s.top} ${s.rootbackgroundcolor} `}>
        <div className={s.heading}>
          <div className={`row ${s.marginbottom}`}>
            <img
              src={clipboard}
              className={s.subheader}
              alt={"clipboard img"}
            />
            <h2 className={s.header_text}>What is Gamesmith?</h2>
          </div>
          <div className={`${s.line} ${s.custommargin}`}></div>
          <h4 className={s.heading_content}>
            Gamesmith is the digital platform that allows verified game
            professionals to reclaim and control their public game credits,
            share their work across a community of peers, fans, and Studios
            looking for talent.
          </h4>
        </div>
        <QuestionAnswerCard
          question={"How do I add a game to my profile?"}
          answer={
            "Search for a game, click on the join team button, add your experience and you are done."
          }
        />
        <div className={`${s.line}`}></div>
        <QuestionAnswerCard
          question={"How can I add a game to the database?"}
          answer={
            "Head to the Games section and simply search for the game you want to add. If it does not appear, then you have the option of adding the game to the database and becoming the 1st member." +
            " Do not forget to invite the missing team members."
          }
        />
        <div className={`${s.line}`}></div>
        <QuestionAnswerCard
          question={"How does the verification score work?"}
          answer={
            "The higher your verification score, the higher you appear in the search results."
          }
        />
        <div className={s.line}></div>
        <QuestionAnswerCard
          question={"How do I get verified?"}
          answer={
            "Your industry peers verify your work. Gamesmith does not. Once you get accepted into Gamesmith," +
            " you automatically get verified for one game only."
          }
        />
        <div className={s.line}></div>

        <QuestionAnswerCard
          question={"Can I dispute someone's work?"}
          answer={
            "Visit the maker's profile you wish to dispute and click on the down pointing arrow, located at the right side of a maker's game card."
          }
        />
        <div className={s.line}></div>

        <QuestionAnswerCard
          question={"How can I merge profiles?"}
          answer={""}
          answerPart1={"Contact us at "}
          answerPart2={" and we'll sort you out."}
          isEmail
        />
        <div className={s.line}></div>

        <QuestionAnswerCard
          question={"How do I tell Studios I am available for work?"}
          answer={
            'Visit your profile, click on edit profile and then with just one click on the "Let Studios know you are open" ' +
            "option, Studios will know you are available for work."
          }
        />
        <div className={s.line}></div>

        <QuestionAnswerCard
          question={"Who can see my work availability?"}
          answer={
            "Your peers cannot see your availability, only Studios can see your availability."
          }
        />
        <div className={s.line}></div>

        <QuestionAnswerCard
          question={"How can I message another maker?"}
          answer={
            "You need to be connected with another maker in order to message them. Once you are connected to the maker, the message button " +
            "will appear in their profile and in search results."
          }
        />
        <div className={s.line}></div>

        <QuestionAnswerCard
          question={"Why is my Studio not listed under Studios?"}
          answer={"Ask your Studio to apply for an employer account."}
        />
        <div className={s.line}></div>

        <QuestionAnswerCard
          question={"How do I change my notification settings?"}
          answer={
            "Once signed-in, click on settings and change your communication preferences."
          }
        />
        <div className={s.line}></div>

        <QuestionAnswerCard
          question={"Who can see my profile?"}
          answer={
            "Gamesmith is a public site that allows peers, fans, and companies to search and identify the makers behind the games." +
            " Only Studios can see your work availability."
          }
        />
        <div className={s.line}></div>

        <QuestionAnswerCard
          question={"How do I delete my profile?"}
          answer={""}
          answerPart1={"Simply email "}
          answerPart2={"  and we will delete your profile."}
          isEmail
        />
        <div className={s.line}></div>
        <div className={s.faq_footer}>
          If we have not answered your question here feel free to email us at{" "}
          <a href="mailto:support@gamesmith.com">support@gamesmith.com</a>
          <br />
          FAQ: &copy;{new Date().getFullYear()} Gamesmith Inc.
        </div>
      </div>
    </div>
  </main>
);

export default FAQs;
