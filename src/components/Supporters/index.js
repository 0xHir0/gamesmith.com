/*
 * Supporters component
 */

import React from "react";
import Slider from "react-slick";
import tg from "./img/taggames.png";
import intervokelogo from "./img/intervokelogo.png";

import adshot from "./img/adshot.png";
import bs from "./img/blind-squirrel.png";
import genba from "./img/genba.png";
import hmw from "./img/halo-media-works.png";
import mg from "./img/maximum-games.png";
import ninja from "./img/ninja.png";
import obsidian from "./img/obsidian-entertainment.png";
import paradox from "./img/paradox.png";
import pollen from "./img/Pollen-vc.png";
import sti from "./img/STI.png";
import coldiron from "./img/coldiron .png";
import digitalextreme from "./img/digital-extremes.png";
import industry343 from "./img/343-industries.png";

// New Images

import bethesdaNew from "./img/bethesdaNew.png";
import bigpointNew from "./img/bigpointNew.png";
import funcomNew from "./img/Funcom-Logo-New.png";
import segaNew from "./img/segaNew.png";
import tripwire from "./img/tripwireNew.png";
import unbrokenNew from "./img/unbrokenNew.png";
import withinNew from "./img/withinNew.jpg";
import bandainamcoNew from "./img/newbandainamco.png";
import treyarchNew from "./img/treyarchnew.png";
import rebellionNew from "./img/rebellionNewe.png";

import s from "./styles.module.scss";

const Supporters = ({ page }) => {
  const sliderSettings = {
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
    <section className={page && page === "employers" ? s.root1 : s.root}>
      <div style={{ paddingBottom: "2rem" }}>
        <h4>TRUSTED BY THE GAME INDUSTRY</h4>
        <Slider {...sliderSettings}>
          <div className={s.supporter}>
            <div className={s.top_margin}>
              <img src={adshot} alt="Ad shot" width={180} height={200} />
            </div>
          </div>
          <div className={s.supporter}>
            <div className={s.top_margin}>
              <img src={bs} alt="Blind Squirrel" width={200} height={200} />
            </div>
          </div>
          <div className={s.supporter}>
            <div className={s.top_margin}>
              <img src={coldiron} alt="Coldiron" width={200} height={100} />
            </div>
          </div>
          <div className={s.supporter}>
            <div className={s.top_margin}>
              <img src={genba} alt="Genba" width={220} height={200} />
            </div>
          </div>
          <div className={s.supporter}>
            <div className={s.top_margin}>
              <img src={hmw} alt="Halo Media Works" width={230} height={100} />
            </div>
          </div>
          <div className={s.supporter}>
            <div className={s.top_margin}>
              <img
                src={intervokelogo}
                alt="Intervoke"
                width={200}
                height={200}
              />
            </div>
          </div>
          <div className={s.supporter}>
            <div className={s.top_margin}>
              <img src={mg} alt="Maximum Games" width={200} height={200} />
            </div>
          </div>
          <div className={s.supporter}>
            <div className={s.top_margin}>
              <img
                src={obsidian}
                alt="Obsidian Entertainment"
                width={200}
                height={100}
              />
            </div>
          </div>
          <div className={s.supporter}>
            <div className={s.top_margin}>
              <img src={tg} alt="Tag Games" width={150} height={100} />
            </div>
          </div>
          <div className={s.supporter}>
            <div>
              <img src={ninja} alt="Ninja" width={120} height={100} />
            </div>
          </div>
          <div className={s.supporter}>
            <div>
              <img src={paradox} alt="Paradox" width={120} height={100} />
            </div>
          </div>
          <div className={s.supporter}>
            <div className={s.top_margin}>
              <img src={pollen} alt="Pollen" width={200} height={100} />
            </div>
          </div>
          <div className={s.supporter}>
            <div>
              <img src={sti} alt="Sti" width={100} height={100} />
            </div>
          </div>
          <div className={s.supporter}>
            <div className={s.top_margin}>
              <img
                src={industry343}
                alt="industries"
                width={180}
                height={100}
              />
            </div>
          </div>
          <div className={s.supporter}>
            <div>
              <img
                src={digitalextreme}
                alt="digitalextreme"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className={s.supporter}>
            <div className={s.top_margin}>
              <img src={segaNew} alt="Sega" width={180} height={100} />
            </div>
          </div>
          <div className={s.supporter}>
            <div>
              <img src={unbrokenNew} alt="unbroken" width={100} height={100} />
            </div>
          </div>
          <div className={s.supporter}>
            <div className={s.top_margin}>
              <img src={tripwire} alt="tripwire" width={180} height={100} />
            </div>
          </div>
          <div className={s.supporter}>
            <div>
              <img
                src={rebellionNew}
                alt="rebellion"
                width={100}
                height={100}
              />
            </div>
          </div>
          {/* <div className={s.supporter}>*/}
          {/* <div>*/}
          {/* <img src={wbgmamesNew} alt="wbgames" width={100} height={100}/>*/}
          {/* </div>*/}
          {/* </div>*/}
          <div className={s.supporter}>
            <div>
              <img src={funcomNew} alt="funcom" width={100} height={100} />
            </div>
          </div>
          <div className={s.supporter}>
            <div>
              <img src={withinNew} alt="within" width={100} height={100} />
            </div>
          </div>
          <div className={s.supporter}>
            <div>
              <img src={bigpointNew} alt="bigpoint" width={100} height={100} />
            </div>
          </div>
          <div className={s.supporter}>
            <div>
              <img src={bandainamcoNew} alt="banadi" width={150} height={100} />
            </div>
          </div>
          <div className={s.supporter}>
            <div className={s.top_margin}>
              <img src={bethesdaNew} alt="bethesda" width={200} height={100} />
            </div>
          </div>
          <div className={s.supporter}>
            <div className={s.top_margin}>
              <img src={treyarchNew} alt="treyarch" width={200} height={100} />
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Supporters;
