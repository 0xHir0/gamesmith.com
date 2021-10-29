import React from "react";
import s from "./styles.module.scss";
import game from "./img/game.png";
import motionCapture from "./img/motion-capture.png";
import paint from "./img/paint.png";

const StudioServices = () => (
  <section>
    <div className={s.root}>
      <div className={s.heading}>
        <h3>Our Services</h3>
      </div>
      <div className={s.cards}>
        <div className={s.container}>
          <img src={game} alt={"Game Development"} />
          <p>Game Development</p>
        </div>
        <div className={s.container}>
          <img src={motionCapture} alt={"Motion Capture"} />
          <p>Motion Capture</p>
        </div>
        <div className={s.container}>
          <img src={paint} alt={"Art outsourcing"} />
          <p>Art outsourcing</p>
        </div>
      </div>
    </div>
  </section>
);

export default StudioServices;
