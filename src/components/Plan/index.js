

import React from 'react';
import brandedImg from './img/diamond.png';
import studioImg from './img/gold.png';
import basicImg from './img/wood.png';

import s from './style.css';

const Plan = () => (
  <section >
    <div className={s.root}>
      <div className={`row ${s.planMargin}`}>
        <div className={`col-sm-3 ${s.customMargin}`}>
          <div>
            <img src={basicImg} alt="basic" width={170}/>
          </div>
        </div>
        <div className="col-sm-8">
          <div className={s.planHeading}>
            <h3 className={s.yellow}>Basic Plan</h3>
            <h5>Quick & easy single job post.</h5>
          </div>
          <div>
            <ul>
              <li>Receive vetted game professionals directly to your inbox.</li>
              <li>Post your job opening, track and manage applicants, hire your preferred candidates all in one place.</li>
              <li>Reach tens of thousands of vetted game professionals whilst our smart targeting puts your job
              listing in front of active and passive candidates with the right experience.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`row ${s.planMargin}`}>
        <div className={`col-sm-3 ${s.customMargin}`}>
          <div>
            <img src={brandedImg} alt="branded" width={170}/>
          </div>
        </div>
        <div className="col-sm-8">
            <div className={s.planHeading}>
              <h3 className={s.yellow}>Branded Plan</h3>
              <h5>Create your Studio page & increase your exposure.</h5>
            </div>
          <div>
            <ul>
              <li>Share your story.</li>
              <li>Present your adventure in the proper light.</li>
              <li>Your mission, vision, values, trailers and photos of team members will
              help you build a strong brand and market yourself to the industry elite.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`row ${s.planMargin}`}>
        <div className={`col-sm-3 ${s.customMargin}`}>
          <div>
            <img src={studioImg} alt="studio" width={170}/>
          </div>
        </div>
        <div className="col-sm-8">
            <div className={s.planHeading}>
              <h3 className={s.yellow}>Studio Plan</h3>
              <h5>Identify and connect with elite game professionals.</h5>
            </div>
          <div>
            <ul>
              <li>Use premium filters to identify and reach out to the best candidates.</li>
              <li>Search by platforms, industry awards, peer verifications, locations,
              languages, game titles etc</li>
              <li>Screen and message your candidates through the platform.</li>
              <li>Our dashboard helps you organize and identify your applications so you  never miss the right candidate.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </section>
);

export default Plan;