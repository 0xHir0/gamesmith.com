import React from "react";
import s from "./styles.module.scss";
import envelope from "./img/envelope.png";
import phone from "./img/phone.png";
import question from "./img/question.png";

const StudioContact = ({ contactEmail, websiteLink }) => (
  <section>
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.items}>
          <h3>Let's get in touch!</h3>
          <div className={s.content}>
            <img src={envelope} alt={"Envelope"} className={s.icon} />
            <p className={s.info}>{contactEmail ? contactEmail : ""}</p>
          </div>
          <div className={s.content}>
            <img src={phone} alt={"Phone"} className={s.icon} />
            <p className={s.info}> 2109596230</p>
          </div>
          <div className={s.content}>
            <img src={question} alt={"Question"} className={s.icon} />
            <p className={s.info}>
              <a href={websiteLink ? websiteLink : ""}>Visit our Help Center</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default StudioContact;
