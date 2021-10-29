/*
 * Studio Game card
 */

import React from "react";
import PropTypes from "prop-types";
import { truncate } from "lodash";
import s from "./styles.module.scss";

const StudioGameCard = ({ name, description, imageUrl, doc }) => (
  <section
    className={`${s.full} ${s.game}`}
    style={{
      backgroundImage: `url(${imageUrl.replace(/^http:\/\//i, "https://")})`,
    }}
  >
    <div className={s.image}>
      <div>
        <h1>{name}</h1>
        {doc.width > 546 && <p>{truncate(description, { length: 100 })}</p>}
      </div>
    </div>
  </section>
);

StudioGameCard.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  description: PropTypes.string,
};

export default StudioGameCard;
