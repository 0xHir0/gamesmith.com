/*
 * Studio Basic Plan
 */

import React from "react";
import PropTypes from "prop-types";
import Button from "components/UI/Button";
import { toUpper, startCase } from "lodash";

import s from "./styles.module.scss";

const StudioBasicPlan = ({ studioId, onSubmitUpgradeStudioRequest }) => {
  return (
    <div className={s.root}>
      <div>
        <h4>Global view is only available with a Studio account.</h4>
      </div>
      <div className={s.basic}>
        <h4>
          Upgrade to Gamesmith Studio and go from searching to hire in less
          time.
        </h4>
        <div className="rounded-list">
          <ol>
            <li>
              Find the right candidate the 1st time.
              <p>
                Expand your search beyond your personal connections and have
                access to top global game talent.
              </p>
            </li>

            <li>
              Let the candidate find you!
              <p>
                Unlock the power of your brand and drive candidates to your
                personal branded studio page. Drive candidates to your roles.
              </p>
            </li>

            <li>
              Filter filter filter......
              <p>
                Use gamesmith's powerful filters to locate the exact candidate
                you need!
              </p>
            </li>

            <li>
              Studio Alert...
              <p>
                Gain access to a true global candidate view. Any maker at any
                time can alert all game studios instantly, that they are
                available.
              </p>
            </li>

            <li>
              Save Time.
              <p>
                Build, track and manage candidates you want to hire now or in
                the future.
              </p>
            </li>
          </ol>
          <Button
            text="UPGRADE TO STUDIO"
            onClick={() => onSubmitUpgradeStudioRequest(studioId)}
          />
        </div>
      </div>
    </div>
  );
};

StudioBasicPlan.propTypes = {
  onSubmitUpgradeStudioRequest: PropTypes.func,
  studioId: PropTypes.number,
};

export default StudioBasicPlan;
