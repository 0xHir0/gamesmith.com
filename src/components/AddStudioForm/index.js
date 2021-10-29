import React from "react";
import PropTypes from "prop-types";

import { reduxForm } from "redux-form";

import Input from "components/UI/Input";
import Button from "components/UI/Button";
import StudioTags from "components/UI/StudioTags";
import GameTags from "components/UI/GameTags";
import EmployeeCountTags from "components/UI/EmployeeCountTags";
import StudioLogo from "components/UI/StudioLogo";
import UploadMultipleImages from "components/UI/UploadMultipleImages";
import { openUpgradePrompt } from "../../containers/Modals/actions";
import { connect } from "react-redux";
import validate from "./validation";

import s from "./styles.module.scss";

export const fields = [
  "id",
  "name",
  "location",
  "email",
  "description",
  "websiteLink",
  "platforms[].id",
  "employeeCountId",
  "logo",
  "heroUrl",
  "bannerUrl",
  "games[].id",
  "games[].name",
  "games[].description",
  "games[].imageUrl",
  "games[].platforms[].id",
  "videos[].id",
  "videos[].contentUrl",
  "videos[].isVideo",
  "videos[].isImage",
  "images[].id",
  "images[].contentUrl",
  "images[].isVideo",
  "images[].isImage",
];

class AddStudioForm extends React.Component {
  render() {
    const {
      fields: {
        id = -1,
        name,
        location,
        websiteLink,
        email,
        description,
        platforms,
        employeeCountId,
        logo,
        heroUrl,
        bannerUrl,
        games,
        videos,
        images,
      },
      removeStudioContent,
      removeStudioGame,
      addStudioGame,
      setPlatforms,
      handleSubmit,
      license,
      toggleTab,
      onOpenUpgradePrompt,
    } = this.props;
    return (
      <form className={s.setBackground} onSubmit={handleSubmit}>
        <section className={s.root}>
          <div className={s.heading}>
            <h3>About us</h3>
          </div>
          <div className={s.container}>
            <Input label="Studio Name" open {...name} />
            <Input label="Location" open {...location} />
            <Input label="Contact Email" open {...email} />
            <Input
              type="textarea"
              label="Studio Description"
              open
              {...description}
            />
            <div
              onClick={
                license === "basic"
                  ? () => onOpenUpgradePrompt(toggleTab, "plan")
                  : ""
              }
            >
              <Input label="Company Website" open {...websiteLink} />
              <StudioTags
                label="Platforms"
                platforms={platforms}
                setPlatforms={setPlatforms}
                toggleTab={toggleTab}
                onOpenUpgradePrompt={onOpenUpgradePrompt}
                license={license}
              />
              <EmployeeCountTags
                label="SIZE (NO OF EMPLOYEES)"
                employeeCountId={employeeCountId}
                toggleTab={toggleTab}
                onOpenUpgradePrompt={onOpenUpgradePrompt}
                license={license}
              />
              <div
                className="row"
                onClick={
                  license === "basic"
                    ? () => onOpenUpgradePrompt(toggleTab, "plan")
                    : ""
                }
              >
                {
                  <StudioLogo
                    className={s.avatar}
                    description="Logo should be SVG or PNG File with transparent background"
                    label="STUDIO LOGO"
                    imgUrl={logo}
                    dimension="300X300 minimum"
                    toggleTab={toggleTab}
                    onOpenUpgradePrompt={onOpenUpgradePrompt}
                    license={license}
                  />
                }
              </div>
              <div className="row">
                {
                  <StudioLogo
                    className={s.avatar2}
                    description="Image should be atleast 1280x800 pixels."
                    label="HERO IMAGE"
                    imgUrl={heroUrl}
                    dimension="1280X800 minimum"
                    toggleTab={toggleTab}
                    onOpenUpgradePrompt={onOpenUpgradePrompt}
                    license={license}
                  />
                }
              </div>
              <div className="row">
                {
                  <StudioLogo
                    className={s.avatar2}
                    description="Image should be atleast 1280x800 pixels."
                    label="INDEX PAGE IMAGE"
                    imgUrl={bannerUrl}
                    dimension="1280X800 minimum"
                    toggleTab={toggleTab}
                    onOpenUpgradePrompt={onOpenUpgradePrompt}
                    license={license}
                  />
                }
              </div>
            </div>
          </div>
        </section>
        <section className={s.root}>
          <div>
            <div className={s.heading}>
              <h3>Games</h3>
            </div>
            <div className={`${s.addGame}`}>
              <a
                className="fa-2x fa fa-plus-circle"
                onClick={
                  license === "basic"
                    ? () => onOpenUpgradePrompt(toggleTab, "plan")
                    : () => addStudioGame(games)
                }
              ></a>
            </div>
            <div className={s.container}>
              {!games.length && <div>No games</div>}
              {games.map((game, index) => (
                <div
                  key={index}
                  onClick={() =>
                    license === "basic"
                      ? onOpenUpgradePrompt(toggleTab, "plan")
                      : ""
                  }
                >
                  <Input type="text" open label="Game Name" {...game.name} />
                  <Input
                    type="textarea"
                    open
                    label="Description"
                    {...game.description}
                  />
                  <div className="row">
                    {
                      <StudioLogo
                        imgUrl={game.imageUrl}
                        description="Image should be atleast 1280x800 pixels."
                        label="GAME ART"
                        dimension="1280X800 minimum"
                        toggleTab={toggleTab}
                        onOpenUpgradePrompt={onOpenUpgradePrompt}
                        license={license}
                      />
                    }
                  </div>
                  <GameTags
                    label="Platforms"
                    platforms={game.platforms}
                    gameIndex={index}
                    setPlatforms={
                      license === "basic"
                        ? () => onOpenUpgradePrompt(toggleTab, "plan")
                        : setPlatforms
                    }
                  />
                  <a
                    onClick={() =>
                      removeStudioGame(games, index, game.id.value)
                    }
                  >
                    {" "}
                    Remove
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className={s.root}>
          <div>
            <div className={s.heading}>
              <h3>Images</h3>
            </div>
            <div className={s.container}>
              <UploadMultipleImages
                studioContent={images}
                dimension="320X500 minimum"
                toggleTab={toggleTab}
                onOpenUpgradePrompt={onOpenUpgradePrompt}
                license={license}
              />
              {images.map((content, index) => (
                <div key={index} className={`${s.contentImage} ${s.margin}`}>
                  <img
                    className={`${s.setImage}`}
                    src={content.contentUrl.value}
                  />
                  <a
                    className="fa fa-remove"
                    onClick={() => {
                      license === "basic"
                        ? onOpenUpgradePrompt(toggleTab, "plan")
                        : removeStudioContent(images, index, content.id.value);
                    }}
                  >
                    {" "}
                    Delete
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className={`${s.root} ${s.videosContainer}`}>
          <div>
            <div className={s.heading}>
              <h3>Videos</h3>
            </div>
            <div className={`${s.addVideo}`}>
              <a
                className="fa-2x fa fa-plus-circle"
                onClick={() => {
                  license === "basic"
                    ? onOpenUpgradePrompt(toggleTab, "plan")
                    : videos.addField({
                        id: -1,
                        isVideo: true,
                        isImage: false,
                      });
                }}
              ></a>
            </div>
            <div
              className={s.container}
              onClick={() => {
                if (license === "basic") onOpenUpgradePrompt(toggleTab, "plan");
              }}
            >
              {!videos.length && <div>No Video</div>}
              {videos.map((content, index) => (
                <div key={index} className={s.video}>
                  <Input
                    type="text"
                    open
                    label="Youtube Video"
                    {...content.contentUrl}
                  />
                  <div className={`${s.removeVideo}`}>
                    <a
                      className="fa-2x fa fa-remove"
                      onClick={() => {
                        removeStudioContent(videos, index, content.id.value);
                      }}
                    ></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className={s.root}>
          <div className={s.container}>
            <Button type="submit" text="SAVE CHANGES" key={"submit"} />
          </div>
        </section>
      </form>
    );
  }
}

AddStudioForm.propTypes = {
  fields: PropTypes.object.isRequired,
  studioContent: PropTypes.array,
  id: PropTypes.number,
  license: PropTypes.string,
  websiteLink: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  removeStudioContent: PropTypes.func.isRequired,
  removeStudioGame: PropTypes.func.isRequired,
  addStudioGame: PropTypes.func.isRequired,
  setPlatforms: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  toggleTab: PropTypes.func,
  onOpenUpgradePrompt: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOpenUpgradePrompt: (toggleTab, plan) => {
      dispatch(openUpgradePrompt(toggleTab, plan));
    },
  };
};

const decoratedComponent = connect(null, mapDispatchToProps)(AddStudioForm);

export default reduxForm({
  form: "AddStudioForm",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(decoratedComponent);
