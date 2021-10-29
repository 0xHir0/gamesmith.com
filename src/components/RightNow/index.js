/*
 * RightNow component
 */

import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

// import alonzo from './img/alonzo.jpg';
// import esteban from './img/esteban.jpg';
// import david from './img/david.jpg';
// import james from './img/james.jpg';
// import jennifer from './img/jennifer.jpg';
// import jonathan from './img/jonathan.jpg';

import Giordano from "./img/Giordano.jpg";
import McDonagh from "./img/McDonagh.jpg";
import Nick from "./img/Nick.jpg";
import Pascal from "./img/Pascal.jpg";
import Temple from "./img/Temple.jpg";
import Curtis from "./img/Curtis.jpg";
import Collins from "./img/Collins.jpg";
import Hamilton from "./img/Hamilton.jpg";
import Johnston from "./img/Johnston.jpg";
import Michael from "./img/Michael.png";
import Gerard from "./img/Gerard.jpg";
import Ahroni from "./img/Ahroni.jpg";

import s from "./styles.module.scss";

const RightNow = ({ title, description }) => {
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    className: s.slider,
    speed: 1000,
    swipe: false,
    dragging: false,
    centerMode: true,
    autoplay: true,
    slidesToScroll: 1,
    initialSlide: 1,
    responsive: [
      { breakpoint: 544, settings: { slidesToShow: 1, autoplaySpeed: 6000 } },
      { breakpoint: 992, settings: { slidesToShow: 2, autoplaySpeed: 5000 } },
      { breakpoint: 10000, settings: { slidesToShow: 3, autoplaySpeed: 4000 } },
    ],
  };

  return (
    <section className={s.root}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <Slider {...settings}>
        <div className={s.user}>
          <div>
            <img src={Giordano} alt="" />
            <h2>Giordano Bruno Contestabile</h2>
            <h3>
              <i className="icon-briefcase"></i>CEO/ Investor
            </h3>
            <h4>Bloglovin</h4>
          </div>
        </div>
        <div className={s.user}>
          <div>
            <img src={McDonagh} alt="" />
            <h2>Joe McDonagh</h2>
            <h3>
              <i className="icon-briefcase"></i>VP, Studio at Playdots
            </h3>
            <h4>Dots</h4>
          </div>
        </div>
        <div className={s.user}>
          <div>
            <img src={Nick} alt="" />
            <h2>Nick Thomas</h2>
            <h3>
              <i className="icon-briefcase"></i>Vice President of Content
              Publishing
            </h3>
            <h4>Hatch Entertainment</h4>
          </div>
        </div>
        <div className={s.user}>
          <div>
            <img src={Pascal} alt="" />
            <h2>Pascal Zuta</h2>
            <h3>
              <i className="icon-briefcase"></i>CEO / Entrepreneur
            </h3>
            <h4>Gyant </h4>
          </div>
        </div>
        <div className={s.user}>
          <div>
            <img src={Temple} alt="" />
            <h2>Nick Temple</h2>
            <h3>
              <i className="icon-briefcase"></i>Engineering Manager
            </h3>
            <h4>Kixeye</h4>
          </div>
        </div>
        <div className={s.user}>
          <div>
            <img src={Curtis} alt="" />
            <h2>Matt Curtis</h2>
            <h3>
              <i className="icon-briefcase"></i>Senor Director, Product Manager
            </h3>
            <h4>Kabam</h4>
          </div>
        </div>
        <div className={s.user}>
          <div>
            <img src={Collins} alt="" />
            <h2>Chris Collins</h2>
            <h3>
              <i className="icon-briefcase"></i>Director of Product
            </h3>
            <h4>High Fidelity</h4>
          </div>
        </div>
        <div className={s.user}>
          <div>
            <img src={Hamilton} alt="" />
            <h2>Hamilton Hitchings</h2>
            <h3>
              <i className="icon-briefcase"></i>CEO / Founder
            </h3>
            <h4>iMagical</h4>
          </div>
        </div>
        <div className={s.user}>
          <div>
            <img src={Johnston} alt="" />
            <h2>Matthew Lee Johnston</h2>
            <h3>
              <i className="icon-briefcase"></i>Audio Innovation Director
            </h3>
            <h4>Microsoft</h4>
          </div>
        </div>
        <div className={s.user}>
          <div>
            <img src={Michael} alt="" />
            <h2>Michael Carpenter</h2>
            <h3>
              <i className="icon-briefcase"></i>CEO at Ruby Seven Studios, Inc.
            </h3>
          </div>
        </div>
        <div className={s.user}>
          <div>
            <img src={Gerard} alt="" />
            <h2>Gerard Cunningham</h2>
            <h3>
              <i className="icon-briefcase"></i>CEO / Founder
            </h3>
            <h4>Winistry, Inc.</h4>
          </div>
        </div>
        <div className={s.user}>
          <div>
            <img src={Ahroni} alt="" />
            <h2>Ben Ahroni</h2>
            <h3>
              <i className="icon-briefcase"></i>Co-founder & CEO
            </h3>
            <h4>MeeWow Games</h4>
          </div>
        </div>
      </Slider>
    </section>
  );
};

RightNow.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default RightNow;
