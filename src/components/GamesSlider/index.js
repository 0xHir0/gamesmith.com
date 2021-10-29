/*
 * Games slider component
 */

import React from "react";
import Slider from "react-slick";
import Button from "components/UI/Button";

import { checkAuthToken } from "utils";

import s from "./styles.module.scss";
// slider images
import FH4 from "./img/FH4.jpg";
import Fortnite from "./img/Fortnite.jpg";
import Hitman2 from "./img/Hitman2.jpg";
import RDR2 from "./img/RDR2.jpg";
import TLOU2 from "./img/TLOU2.jpg";

// images for mobile screen
// import mFH4m from './img/mFH4m.png';
// import mFortnitem from './img/mFortnitem.png';
// import mHitman2m from './img/mHitman2m.png';
// import mRDR2m from './img/mRDR2m.png';
// import mTLOU2m from './img/mTLOU2m.png';

import warriorpeopele from "./img/warrior-people.jpg";
import carracing from "./img/car-racing.jpg";
import gamehitman from "./img/game-hit-man.jpg";
import hunterwoman from "./img/hunter-women.jpg";
import rider from "./img/men-hourse.jpg";

const GamesSlider = ({ doc, onApply }) => {
  const sliderSettings = {
    arrows: false,
    dots: false,
    infinite: true,
    className: s.full,
    speed: doc.width < 544 ? 4000 : 8000,
    swipe: false,
    dragging: false,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 7000,
    slidesToScroll: 1,
    initialSlide: 1,
    responsive: [
      { breakpoint: 544, settings: { slidesToShow: 1, autoplaySpeed: 7000 } },
    ],
  };

  return (
    <div>
      <div
        className={
          !checkAuthToken() ? s.center : `${s.center} ${s.centerSignIn}`
        }
      >
        <h1 className={s.slider_text}>
          Home of{doc && doc.width < 544 ? <br /> : " "}Game Professionals
        </h1>
        {!checkAuthToken() ? (
          <div className={s.bottom}>
            <Button onClick={onApply} text="apply" className={s.button} />
            <p className={s.companyInfo}>
              Gamesmith is a digital platform that allows game professionals to
              claim and take control of their game credits, allowing their work
              to be discovered across a community of peers, studios, and fans.
            </p>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <Slider {...sliderSettings}>
        <div className={s.content}>
          <img src={doc.width < 415 ? carracing : FH4} />
        </div>
        <div className={s.content}>
          <img src={doc.width < 415 ? warriorpeopele : Fortnite} />
        </div>
        <div className={s.content}>
          <img src={doc.width < 415 ? gamehitman : Hitman2} />
        </div>
        <div className={s.content}>
          <img src={doc.width < 415 ? rider : RDR2} />
        </div>
        <div className={s.content}>
          <img src={doc.width < 415 ? hunterwoman : TLOU2} />
        </div>
        {/*<div className={s.content}>*/}
        {/*<img src={doc.width < 415 ? mh1 : Hitman2} />*/}
        {/*</div>*/}
      </Slider>
    </div>
  );
};
export default GamesSlider;
