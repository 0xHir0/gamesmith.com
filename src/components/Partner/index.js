import React from "react";
import PropTypes from "prop-types";
import s from "./styles.module.scss";
import { size } from "lodash";
import Button from "components/UI/Button";

class Partner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      currentId: null,
    };
  }

  handleClick = (p, idx) => {
    this.setState({
      isClicked: !this.state.isClicked,
      currentId: idx,
    });
    this.props.onGetPartnerInfo(p);
  };
  render() {
    const { onGetPartnerInfo, partners, doc, onAddStudio } = this.props;

    return (
      <div>
        {doc.width < 500 ? (
          <div className={s.topHeader}>
            <h1>Ecosystem</h1>
          </div>
        ) : (
          ""
        )}
        <div className={s.top}>
          <div className={s.topdescription}>
            <p>
              BUSINESS DIRECTORY FOR INDEPENDENT COMPANIES WORKING WITHIN THE
              GAME INDUSTRY
            </p>
          </div>
          <div className={s.flexContainer}>
            <div className={s.row}>
              {doc.width > 500 ? (
                <div>
                  <ul>
                    {partners.map((p, idx) =>
                      p !== "Funding" && p === "studio" ? (
                        ""
                      ) : (
                        <li
                          className={` ${s.partnerlist} ${
                            this.state.currentId === idx && s.activeitem
                          }`}
                          onClick={() => this.handleClick(p, idx)}
                          key={idx}
                        >
                          {p}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ) : (
                <div className={s.slider}>
                  <ul>
                    {partners.map((p, idx) =>
                      p === "studio" ? (
                        ""
                      ) : (
                        <li
                          className={s.partnerlistsmall}
                          onClick={() => onGetPartnerInfo(p)}
                          key={idx}
                        >
                          {p}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {doc.width > 300 ? (
            <div className={s.bottomButton}>
              <Button
                text="Add Your company"
                className={s.addStudioBtn}
                onClick={() => onAddStudio("Company")}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
Partner.propTypes = {
  onGetPartnerInfo: PropTypes.func.isRequired,
  onAddStudio: PropTypes.func.isRequired,
  partners: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
};

export default Partner;
