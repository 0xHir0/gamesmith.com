import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import Switch from 'react-switch';
import { slice } from 'lodash';
import { makerRequest, makerProfileRequest, creditRequest, verifyCreditRequest, unverifyCreditRequest, updateMakerSearchCountRequest, changeAvailaility, saveCvCdnUrl, educationRequest } from './actions';
import { connectRequest, getCompanyInfo, addApplozicCountRequest } from 'containers/App/actions';
import chatIcon from './img/chat.png';
import userIcon from './img/user.png';
import educationCard from './img/educationCard.jpg';
import {
  openMessaging,
  openInvite,
  openAddExp,
  openDeleteExp,
  openEditExp,
  openShare,
  openDispute,
  openSignIn,
  openMyCv,
  openDeleteCv,
  openOutOfClicks,
  openGetVerified,
} from 'containers/Modals/actions';
import { checkAuthToken, addUserToGroup, FRONTEND_URI } from 'utils';
import { getGameURLFromId } from '../../utils/hashingFunction';

import { selectMaker, selectMakerCredits, selectIsFetching, selectIsCvUploaded, selectIsCvDeleted } from './selectors';
import { selectUser, selectisPaidStudio, applozicMsgCount } from 'containers/App/selectors';
import { getRecruiterStudioRequest } from '../Recruiter/actions';


import Avatar from 'components/UI/Avatar';
import Button from 'components/UI/Button';
import GameDetailsCard from 'components/GameDetailsCard';
import EducationCard from 'components/EducationCard';
import languageIcon from '../../data/languageIcon.png';
import addGameIconColored from '../../data/icons/addgamenew.png';
import addGameNewIcon from '../../data/icons/addGameNEwIcon.png';
import editProfileIcon from '../../data/icons/edit.png';
import editNewProfileIcon from '../../data/icons/editNew.png';
import shareProfileIcon from '../../data/icons/share.png';
import shareNewProfileIcon from '../../data/icons/shareNew.png';
import demoreel from '../../data/icons/showcase icons/demoreel.png';
import instagram from '../../data/icons/showcase icons/instagram.png';
import portfolio from '../../data/icons/showcase icons/Portfolio.png';
import twitter from '../../data/icons/showcase icons/twitter.png';
import facebook from '../../data/icons/showcase icons/facebook.png';
import globe from '../../data/icons/showcase icons/global.png';
import linkedin from '../../data/icons/showcase icons/linkedin.png';
import snapchat from '../../data/icons/showcase icons/snapchat.png';
import vimeo from '../../data/icons/showcase icons/vimeo.png';
import youtube from '../../data/icons/showcase icons/youtube.png';
import twitch from '../../data/icons/showcase icons/twitch.png';
import cvIcon from '../../data/cvIcon.png';
import cvIconyellow from '../../data/cvIconyellow.png';
import cvDeleteIcon from './img/delete.png';
import cvDeleteYellowIcon from './img/deleteYellow.png';
import { filterAwards } from "../../utils"
import s from './styles.module.scss';
import { selectStudio } from '../Recruiter/selectors';
import makerWorkCategories from '../../data/makerWorkCategories';
import MetaTags from 'react-meta-tags';
import Helmet from 'react-helmet';
import ProfileCompleteness from 'components/ProfileCompleteness';
import { openExceedRecruiterSearchLimit } from '../Modals/actions';
import { getApplozicRecruiterRequest } from '../App/actions';
import ToggleSwitch from 'components/UI/ToogleSwitch';
import trophy from "../../data/icons/awards_icons/trophy.png"

class Maker extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false, isAvailable: false, isOnAddGame: false, isOnEditProfile: false, isOnShareProfile: false, cdnUrl: '', isCvDeleted: false, isOnCVButton: false, isOnDeleteCVButton: false };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    const { params: { makerID }, user, onGetMaker, onUpdateMakerSearchCount, maker } = this.props;
    onGetMaker(makerID === 'me' ? user.id : makerID, user, 'maker');
    if (makerID !== 'me') {
      onUpdateMakerSearchCount(makerID);
    }
    if (maker && maker.availability === 'available') {
      this.setState({ isAvailable: true });
    } else {
      this.setState({ isAvailable: false });
    }
  }
  componentDidMount() {
    const { checkApplozicCount } = this.props;
    checkApplozicCount();
    console.log(this.props.applozicMsgCount);
    if (this.props.user && this.props.user.maker && this.props.user.maker.availability === 'available') {
      this.setState({ isAvailable: true }); 
    }
    if (this.props.user && this.props.user.recruiter) {
      this.props.onGetCompanyInfo(this.props.user.recruiter.companyId);
    }
    localStorage.setItem('scroll', 'true');
  }
  componentWillUpdate(nextProps) {
    const { params: { makerID }, user, onGetMaker, onGetMakerProfile } = this.props;
    const nextID = nextProps.params.makerID;
    if (nextID !== makerID) {
      onGetMaker(nextID === 'me' ? user.id : nextID, user, 'maker');
    }
      !checkAuthToken() && onGetMakerProfile(makerID);
  }
  moreAbout = () => {
    this.about.classList.remove('preview');
  }

  moreSkills = () => {
    this.skills.classList.remove('preview');
  }

  moreAccomplishments = () => {
    this.accomplishments.classList.remove('preview');
  }

  getShowcaseIcon = (icon) => {
    switch (icon) {
      case 'demoreel':
        return demoreel;
      case 'portfolio':
        return portfolio;
      case 'instagram':
        return instagram;
      case 'facebook':
        return facebook;
      case 'twitter':
        return twitter;
      case 'site':
        return globe;
      case 'linkedin':
        return linkedin;
      case 'vimeo':
        return vimeo;
      case 'youtube':
        return youtube;
      case 'snapchat':
        return snapchat;
      case 'twitch':
        return twitch;
    }
  };
  handleClick = (url) => {
    if (!url.match(/^https?:\/\//i)) {
      url = `https://${url}`;
    }
    return window.open(url);
  }
  renderMoreCreditInfo = (creditId) => {
    const applicantButton = document.getElementById(`moreInfoBtn${creditId}`);
    applicantButton.innerText == 'MORE INFORMATION' ? applicantButton.innerHTML = 'HIDE INFORMATION' : applicantButton.innerHTML = 'MORE INFORMATION';
    document.getElementById(`creditId${creditId}`).classList.toggle('hidden');
  };
  handleChange() {
    this.setState({ isAvailable: !this.state.isAvailable });
    const makerId = this.props.user.maker.id;
    if (!this.state.isAvailable) {
      this.props.onChangeAvailaibility('available', makerId);
    } else {
      this.props.onChangeAvailaibility('not available', makerId);
    }
  }
  redirectToGamesPage() {
    window.location.replace('/games');
  }
  editProfile() {
    window.location.replace('/edit');
  }
  uploadCV() {
    const widget = uploadcare.SingleWidget('<input data-tabs="file">');
    widget.validators.push((info) => {
      if (info.name !== null) {
        if (((!/\.docx/i.test(info.name))) && (!/\.pdf/i.test(info.name))) {
          throw Error('PDF or Word document-only');
        }
      }
    });
    widget.openDialog(null).done(
      (file) => {
        file.promise().done(
          (fileInfo) => {
            this.props.onSaveCVUrl(fileInfo.cdnUrl, this.props.maker.id);
            this.setState({
              cdnUrl: fileInfo.cdnUrl,
            });
          });
      });
  }

  handleMouseEnterCVButton() {
    this.setState({ isOnCVButton: true });
  }
  handleMouseEnterDeleteCVButton() {
    this.setState({ isOnDeleteCVButton: true });
  }
  handleMouseLeaveCVButton() {
    this.setState({ isOnCVButton: false });
  }
  handleMouseLeaveDeleteCVButton() {
    this.setState({ isOnDeleteCVButton: false });
  }
  handleMouseEnterEditProfile() {
    this.setState({ isOnEditProfile: true });
  }
  handleMouseLeaveEditProfile() {
    this.setState({ isOnEditProfile: false });
  }
  handleMouseEnterShareProfile() {
    this.setState({ isOnShareProfile: true });
  }
  handleMouseLeaveShareProfile() {
    this.setState({ isOnShareProfile: false });
  }

  handleGameIconChange() {
    this.setState({ isOnAddGame: true });
  }
  handleOnMouseOutGame() {
    this.setState({ isOnAddGame: false });
  }

  deleteMakerCV(makerId) {
    this.props.onDeleteMyCv(makerId);
  }

  clickOnGoToProfile() {
    document.querySelector('#dltOnCallback').click();
  }

  showLimitMessage = (maker) => {
    const name = `${maker.firstName} ${maker.lastName}`;

    if (document.querySelector('#dltOnCallback'))
      { document.querySelector('#dltOnCallback').remove(); }

    const appendedx = document.createElement('div');
    const themessages = document.querySelectorAll('.mck-message-inner div');
    const whoisthis = maker.id;

    if (themessages.length > 0) {
      appendedx.innerHTML = `<a title="Go to profile" href="/maker/${whoisthis}" id="dltOnCallback" class="blk-lg-3" style="margin-right: 10px;"><img src="https://gamesmith-profile-pic.s3.amazonaws.com/${whoisthis}" style="max-width: 40px; min-height: 40px; max-height: 40px; min-width: 40px; border-radius: 100px"></a>`;
      document.querySelector('#mck-tab-individual > div').appendChild(appendedx);
      const themessages = document.querySelectorAll('.mck-message-inner div');
      if (themessages.length > 0) {
        console.log(themessages[0].getAttribute('data-contact'));
      }
      const divToMakeClickable = document.querySelector('#dltOnCallback').parentElement.parentElement.parentElement.querySelector('.mck-box-title');
      divToMakeClickable.style.cursor = 'pointer';
      divToMakeClickable.addEventListener('click', this.clickOnGoToProfile);
    }
    addUserToGroup(maker.id, name);
    return new Promise((resolve, reject) => {
      this.props.dispatch(addApplozicCountRequest(resolve, reject));
    }).then(() => {
      if (!this.props.applozicMsgCount) {
        document.getElementById('mck-sidebox').style.visibility = 'hidden';
        if(this.props.user.recruiter) {
          this.props.dispatch(openExceedRecruiterSearchLimit({ message: "Let's look at a plan that suits your business needs." }));
        } else {
          this.props.dispatch(openOutOfClicks());

        }
      }
    });
  }

  render() {
    const { params: { makerID }, isFetching,  win, user, maker, makerCredits, onMessage, onInvite, onAddExp, onSignIn, onConnect, onEditExp, onDeleteExp, onVerifyCredit, onUnverifyCredit,  onDispute, verify,viewMyCV, isCvUploaded,isCvDeleted, onDeleteMyCv, recStudio,isPaidStudio, onOpenGetVerified ,onShare } = this.props; // eslint-disable-line
    // redirect to recruiter page if needed
    const makerCvUrl = maker.additionalInfo && maker.additionalInfo[0] && maker.additionalInfo[0].moreInfo && maker.additionalInfo[0].moreInfo.convertedCvUrl ? maker.additionalInfo[0].moreInfo.convertedCvUrl : maker.additionalInfo && maker.additionalInfo[0] && maker.additionalInfo[0].moreInfo && maker.additionalInfo[0].moreInfo.cvUrl ?   maker.additionalInfo[0].moreInfo.cvUrl : null;
    const currUser = makerID === 'me';
    const m = maker || {};
    const u = user || {};
    const ismobile = window.innerWidth <= 1150;
    const verified = makerCredits && (makerCredits.reduce((score, credit) => score + credit.score, 0) > 0);
    const timesVerified = verified && (makerCredits.reduce((score, credit) => score + credit.score, 0));
    const totalVerfiedGames = timesVerified && makerCredits.reduce((score, credit) => credit.score > 0 ? score + 1 : score, 0);
    let imgUrl = null;
    if (m) {
      imgUrl = m.imgUrl;
    } else {
      ({}.hasOwnProperty.call(user, 'recruiter')) ? imgUrl = user.recruiter.logo : null;
      imgUrl = ({}.hasOwnProperty.call(u, 'recruiter')) ? user.recruiter.logo : null;
    }

    let history;
    let button;
    history = (
      <section className={s.history}>
        {(win.width > 767) &&
        <div>
          <div className={s.top}>
            <h1>Game History</h1>
            {/* {currUser && <Button text="Add Game" onClick={onAddExp}/>}*/}
          </div>

          {makerCredits && <div>
            <i className="fas fa-star" style={{fontSize: '13px', color: 'yellow', marginLeft: '5px', marginRight: 0}}></i> {' '}
          {totalVerfiedGames || 0}/{(makerCredits ? makerCredits.length : 0)} VERIFIED GAMES
          </div>}
        
          {makerID === 'me' && <Button text="Add Games" className={s.addGameButton} icon={this.state.isOnAddGame ? addGameIconColored : addGameNewIcon} onMouseEnter={() => this.handleGameIconChange()} onMouseLeave={() => this.handleOnMouseOutGame()} onClick={() => this.redirectToGamesPage()}/>}
          {!maker.isStudent ? 
          <div className={s.games}>
            {makerCredits && makerCredits.length > 0 ? (makerCredits.map((g, idx) => (
              <GameDetailsCard
                user={user}
                key={idx}
                awards={m.awards}
                gameID={g.game && g.game.id}
                makerID={m.id}
                makerName={`${m.firstName} ${m.lastName || ""}`}
                endDate={g.endDate}
                startDate={g.startDate}
                underNda={g.underNda}
                location={g.location}
                platforms={g.platforms}
                title={g.game && g.game.name}
                studio={g.company}
                onDeleteExp={onDeleteExp}
                onEditExp={onEditExp}
                userID={u.id}
                creditID={g.id}
                isRealUser={m.claimed}
                onInvite={onInvite}
                onVerifyCredit={onVerifyCredit}
                onUnverifyCredit={onUnverifyCredit}
                onDispute={onDispute}
                onSignIn={onSignIn}
                disputed={g.creditDispute && true}
                verified={g.verification}
                timesVerfied={g.score}
                width={win.width}
                imageSm={g.game ? getGameURLFromId(g.game.id.toString().replace(/^http:\/\//i, 'https://'), '550x520') : null}
                imageLg={g.game ? getGameURLFromId(g.game.id.toString().replace(/^http:\/\//i, 'https://'), '1500x400') : null}
                credit={g}
                renderMoreCreditInfo={this.renderMoreCreditInfo}
                makerSkills={m.skills}
                currRole={m.currRole}
                openGetVerified={onOpenGetVerified}
                />
            ))
            ) : (
            <h3 style={{ marginBottom: 30 }}>There are no games to display</h3>
            )}
          </div> : <div></div>}
        </div>}
        {maker.isStudent && <div style={{ display: 'block' }} className={s.games}>
          <EducationCard
            school={maker.school}
            major={maker.major}
            image={educationCard}/>
        </div>}
        <div className={s.games}>
          <div
            ref={(c) => { this.about = c; }}
            className={`${s.about} ${m.bio && m.bio.length > 240 ? 'preview' : ''}`}>
            <h3>About</h3>
            <p>{m.bio || (currUser ? 'Click the Edit Profile button above to add some details about yourself.' : 'Apparently, this maker prefers to keep an air of mystery about them.')}</p>
            <div className={s.more}>
              <a onClick={() => this.moreAbout()}>Read More</a>
            </div>
          </div>

          {makerID == 'me' &&
          <ProfileCompleteness customClass={s.about}  />
          }

          {m.skills && <div
            style={ismobile ? { display: 'none' } : {}}
            ref={(c) => { this.skills = c; }}
            className={`${s.about} ${m.skills.length > 240 ? 'preview' : ''}`}>
            <h3>Skills</h3>
            <p>{m.skills}</p>
            <div className={s.more}>
              <a onClick={() => this.moreSkills()}>Read More</a>
            </div>
          </div>}

          {m.accomplishments && <div
            style={ismobile ? { display: 'none' } : {}}
            ref={(c) => { this.accomplishments = c; }}
            className={`${s.about} ${m.accomplishments.length > 240 ? 'preview' : ''}`}>
            <h3>What I am up to</h3>
            <p>{m.accomplishments}</p>
            <div className={s.more}>
              <a onClick={() => this.moreAccomplishments()}>Read More</a>
            </div>
          </div>
          }
          {checkAuthToken() && (makerID === 'me' || (user.recruiter && user.recruiter.studioApproved)) && (m.additionalInfo && m.additionalInfo.length > 0 && makerCvUrl) &&
            <div style={ismobile ? { display: 'none' } : { display: 'block' }} className={s.info}>
              <h4>Resume/CV</h4>
              <p style={{ display: 'flex' }}>
                <iframe src={`${makerCvUrl}`} width="100%" height="1000px" style={{ border:'none'}}></iframe>
              </p>
            </div>
          }
        </div>
      </section>
    );
    if (user.maker) {
      if (currUser) {
        button = checkAuthToken() ?
          <div className={s.imposition} style={{ marginTop: '-20px', margin: 'auto' }}>
            <Button style={ismobile ? { background: '#FFDD00' } : { opacity: '1' }} className={s.editProfileButton} onClick={() => this.editProfile()} text="Edit Profile" icon={ismobile ? '' : this.state.isOnEditProfile ? editNewProfileIcon : editProfileIcon} onMouseEnter={() => this.handleMouseEnterEditProfile()} onMouseLeave={() => this.handleMouseLeaveEditProfile()} />
            <Button text="Share Profile" className={s.shareBtn} icon={ismobile ? '' : this.state.isOnShareProfile ? shareNewProfileIcon : shareProfileIcon} onClick={() => onShare(user.id)} onMouseEnter={() => this.handleMouseEnterShareProfile()} onMouseLeave={() => this.handleMouseLeaveShareProfile()}/>

          </div>
          :
          <div className={s.imposition} style={ismobile ? { display: 'none' } : {}}><Button onClick={() => onSignIn()} className={s.editProfileButton} text="Edit Profile" icon={!ismobile ? editProfileIcon : 'null'}/>
            <Button text="Share Profile" className={s.shareBtn} icon={ismobile ? '' : this.state.isOnShareProfile ? shareNewProfileIcon : shareProfileIcon} onClick={() => onShare(user.id)} onMouseEnter={() => this.handleMouseEnterShareProfile()} onMouseLeave={() => this.handleMouseLeaveShareProfile()}/>
          </div>;
      } else if (!m.claimed) {
        button = <div className={s.imposition} style={ismobile ? { display: 'none' } : {}}><Button icon={userIcon} className={s.button}text="Invite" color="transparent" disabled={m.additionalInfo && !m.additionalInfo[0].isSubscribe} onClick={() => checkAuthToken() ? onInvite(m.id) : onSignIn()} /></div>;
      } /*else if (m.connectPending) {
        button = <div className={s.imposition} style={ismobile ? { display: 'none' } : {}}><Button icon={userIcon} className={s.button} text="Pending" color="transparent" /></div>;
      } else {
        button = !maker.connected ? <div className={s.imposition} style={ismobile ? { display: 'none' } : {}}><Button icon={userIcon} className={s.button} text="Connect" color="transparent" onClick={() => checkAuthToken() ? onConnect({ id: m.id, page: 'maker' }) : onSignIn()} /></div> : '';
      }*/
    }

    const uncheckedIcon = (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          fontSize: 12,
          color: 'white',
          paddingRight: 2.5,
          paddingTop: 1,
        }}>
        Off
      </div>
    );
    const checkedIcon = (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          fontSize: 12,
          fontWeight: 400,
          color: 'black',
          paddingRight: 2.5,
          paddingLeft: 2.5,
          paddingTop: 1,
        }}>
        On
      </div>
    );
    let filteredAwards;
    let awardsWrapper;
    if (m.awards) {
      filteredAwards = filterAwards(m.awards)
      awardsWrapper =
        filteredAwards.length ? (
          <span className={`${s.awards}`}>
           <center>
            <img className={s.trophy} src={trophy} alt="icon" />
            {filteredAwards.length > 1 ? (
              <small>{filteredAwards.length} awards</small>
            ) : (
              <small> 1 award </small>
            )}
           </center>
          </span>) : (
          null
        )
    }
    return (
      <main role="main" className={s.root}>
        <MetaTags>
          <meta property="og:site_name" content="Gamesmith" />
          <meta property="og:title" content={`Gamesmith profile of ${m.firstName}`} />
          <meta property="og:url" content={`${decodeURIComponent(FRONTEND_URI + this.props.location.pathname)}`}  />
          <meta property="og:image" content={(decodeURIComponent(imgUrl))} />
          <meta property="og:description" content={m.currRole}/>
          <meta property="og:image:alt" content={`Gamesmith profile of ${m.firstName}`} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="@VcChurchill" />
        </MetaTags>

        <Helmet
          meta={[
            { name: 'description', content: 'Helmet application' },
            { property: 'og:type', content: 'article' },
          ]}/>
        {!isFetching ?
          <div className="row">
            <div className={s.profile}>
              <div className={s.user}>
                <Avatar className={ m.awards && m.awards.length > 0 ? s.avatarAward : s.avatar} image={imgUrl} firstName={m.firstName} lastName={m.lastName} isDisable/>
                {m.firstName && <h3>{`${m.firstName} ${m.lastName || ''}`}</h3>}
                {m.currRole && <h4>{m.currRole}</h4>}
                <div style={{display:"flex",justifyContent:"center"}}>
                  <div className={s.awardsContainer}>
                    {verified && <span
                      className={s.verified}
                      data-tooltip="Professionally verified by fellow game makers">Verified &#x2605; {timesVerified} Times</span>}
                    {awardsWrapper}
                  </div>
                </div>
                {m.additionalInfo && m.additionalInfo[0].isSubscribe}
                <div className={s.connectButtons}>
                  {button}
                  {user && user.id && makerID !== 'me' && this.props.studio.licenseType !== 'unlimited-jobs-post-pack' && <Button icon={chatIcon} onClick={() => this.showLimitMessage(this.props.maker)} className={`applozic-launcher ${s.buttonChat}`} text="Chat" data-mck-id={this.props.maker.id} data-mck-name={`${this.props.maker.firstName} ${this.props.maker.lastName}`}/>
                  }
                </div>
              </div>
             {user.recruiter && (maker.workCategories && maker.workCategories.length !== 0) &&
              <div className={s.info}>
                <h4 className={s.center}>Open To Opportunities</h4><br/>
                <div className={'row'}>
                  {makerWorkCategories.map((p, idx) => (
                    maker.workCategories && maker.workCategories.includes(p.id) && <div key={idx} className={`col-md-4 ${s.col}`}>
                      <label htmlFor={p.id}>
                        <img src={p.url} alt="icon" className={s.images}/>
                        <span className={s.font}>{p.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              }
              {makerID === 'me' && (maker.workCategories && maker.workCategories.length === 0) &&
              <div className={s.info}>
                <h4 className={s.center}>Open To Opportunities</h4><br/>
                <p >Click edit profile to select.</p>
              </div>
              }

              {makerID === 'me' && (maker.workCategories && maker.workCategories.length !== 0) && <div className={s.info}>
                <h4 className={s.center}>Open To Opportunities</h4><br/>
                <div className={'row'}>
                  {makerWorkCategories.map((p, idx) => (
                    maker.workCategories && maker.workCategories.includes(p.id) && <div key={idx} className={`col-md-4 ${s.col}`}>
                      <label htmlFor={p.id}>
                        <img src={p.url} alt="icon" className={s.images}/>
                        <span className={s.font}>{p.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              }


              {((m.additionalInfo && m.additionalInfo.length > 0) || m.currCompany || m.location) &&
              <div className={s.info}>
                <ul>
                  {m.additionalInfo[0].latestGameName && <li>
                    {/* <i className="icon-controller"></i> */}
                    <i className="fas fa-gamepad"></i>
                    <span>{m.additionalInfo[0].latestGameName}</span>
                  </li>}
                  {(m.additionalInfo[0].latestGameStudio) && <li>
                    {/* <i className="icon-briefcase"></i> */}
                    <i className="fas fa-briefcase"></i>
		              <span>{m.currCompany}</span>
                  </li>}
                  {m.location && <li>
                    {/* <i className="icon-pin"></i> */}
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{m.location}</span>
                  </li>}
                </ul>
              </div>
              }

              {
                (checkAuthToken() && (makerID === 'me' || user.recruiter && user.recruiter.studioApproved && isPaidStudio
                )) ?
                  <div style={ismobile ? { display: 'none' } : {}} className={s.info}>
                    <div className={s.cvBtnContainer}>
                      {
                        (!isCvUploaded && makerID === 'me' && !makerCvUrl) ?
                          <Button
                            text="Upload My CV" className={s.addCVBtn} icon={!this.state.isOnCVButton ? cvIcon : cvIconyellow}
                            onClick={() => this.uploadCV()} onMouseEnter={() => this.handleMouseEnterCVButton()} onMouseLeave={() => this.handleMouseLeaveCVButton()}/>
                          :
                          <div className={s.cvBtndiv}>
                            {
                              (!isCvDeleted && maker && makerCvUrl && !user.recruiter) && <Button
                                text="View CV" className={s.addCVBtn} icon={!this.state.isOnCVButton ? cvIcon : cvIconyellow}
                                onClick={() => viewMyCV(makerCvUrl)} onMouseEnter={() => this.handleMouseEnterCVButton()}
                                onMouseLeave={() => this.handleMouseLeaveCVButton()} />
                            }
                            {
                              (!isCvDeleted && maker && makerCvUrl && user.recruiter && isPaidStudio) && <Button
                                text="View CV" className={s.addCVBtn} icon={!this.state.isOnCVButton ? cvIcon : cvIconyellow}
                                onClick={() => viewMyCV(makerCvUrl)} onMouseEnter={() => this.handleMouseEnterCVButton()}
                                onMouseLeave={() => this.handleMouseLeaveCVButton()} />
                            }
                            { (makerID === 'me' && !isCvDeleted) &&
                            <Button
                              text="Delete CV"
                              icon={!this.state.isOnDeleteCVButton ? cvDeleteIcon : cvDeleteYellowIcon}
                              className={`${s.addCVBtn} ${s.addMargin}`}
                              onClick={() => this.deleteMakerCV(maker.id)}
                              onMouseLeave={() => this.handleMouseLeaveDeleteCVButton()}
                              onMouseEnter={() => this.handleMouseEnterDeleteCVButton()}/>}
                          </div>
                      }
                    </div>
                  </div> : ''
              }


              {(m.additionalInfo && m.additionalInfo.length > 0 && m.additionalInfo[0].language) &&
              <div style={ismobile ? { display: 'none' } : { display: 'block' }} className={s.info}>
                <h4>Languages</h4>
                <p style={{ display: 'flex' }}>
                  <img src={languageIcon} style={{ height: '1rem', width: '1rem', marginRight: '1rem' }}/>
                  {m.additionalInfo[0].language}
                </p>
              </div>
              }

              <div style={ismobile ? { display: 'none' } : { opacity: '1' }} className={s.info}>
                <div className={s.languageHeading}>
                  <h4>Showcase</h4>
                  {(m.additionalInfo && m.additionalInfo.length > 0 && m.additionalInfo[0].socialProfileLink.length > 0) ? m.additionalInfo[0].socialProfileLink.map((spl, idx) => (
                    <p key={idx} className={s.breakWord} style={{ display: 'flex' }}>
                      <img src={this.getShowcaseIcon(spl.icon)} style={{ height: '1rem', width: '1rem', marginRight: '1rem' }} alt="icon" />
                      <span className={s.socialProfilelink} onClick={() => this.handleClick(spl.url)} >{spl.url}</span></p>
                  )) : <p> No Showcase Links</p>}
                </div>
              </div>
              {makerID === 'me' && 
                <div style={{ opacity: '1' }} className={s.info}>
                  <div className={s.languageHeading}>
                    <h4>Awards</h4>
                    <p> Show Awards?</p>
                    <ToggleSwitch 
                      id="bafta" 
                      checked={this.checked} 
                      onChange={()=>this.setState({...this.state,checked:!this.state.checked})}
                    />
                  </div>
                </div>
              }
              {/*<div className={s.connections}>*/}
              {/*  <h3>Industry Connections</h3>*/}
              {/*  {m.connections && m.connections.length > 0 ? slice(m.connections, 0, 3).map((c, idx) => (*/}
              {/*      <div key={idx} className={s.connection}>*/}
              {/*        <Avatar className={s.img} linkTo={`/maker/${c.id}`} image={c.imgUrl} firstName={c.firstName} lastName={c.lastName}/>*/}
              {/*        <Link to={`/maker/${u.id == c.id ? 'me' : c.id}`}>*/}
              {/*          <div>*/}
              {/*            <h4>{`${c.firstName || ''} ${c.lastName || ''}`}</h4>*/}
              {/*            {c.currCompany && <h5>{c.currCompany}</h5>}*/}
              {/*          </div>*/}
              {/*        </Link>*/}
              {/*        {(makerID === 'me' || c.id !== user.id) && this.props.studio.licenseType !== 'unlimited-jobs-post-pack' &&*/}
              {/*        <Button*/}
              {/*          onClick={() => this.showLimitMessage()}*/}
              {/*          className={`applozic-launcher ${s.btn}`}*/}
              {/*          text="Chat"*/}
              {/*          data-mck-id={c.id}*/}
              {/*          data-mck-name={`${c.firstName} ${c.lastName}`}/>*/}
              {/*        }*/}
              {/*      </div>*/}
              {/*    )) :*/}
              {/*    <p>{currUser ? "You haven't connected with any other makers yet." : "This maker hasn't connected with any others yet. Why not send them a request?"}</p>}*/}
              {/*  <div className={s.all}>*/}
              {/*    <Link to={`/maker/${makerID}/connections`}>See All</Link>*/}
              {/*  </div>*/}
              {/*</div>*/}

              <div>
                <Link style={ismobile ? { display: 'none' } : { opacity: '1' }} to={`/maker/${makerID}/connections`} className={s.link}>Industry Connections</Link>
                <a href={`/maker/${makerID}/games`} style={ismobile ? { color: 'white', paddingLeft: '24px', fontSize: '15px' } : {}} className={s.link}>Game History</a>
              </div>
            </div>
            {history}

          </div>
          :
          isFetching &&
          <div className={s.center_loader}>
            <div style={{ display: 'inline-block' }}>
              <h3>Loading</h3>
              <div className="loader">
                <div/>
                <div/>
                <div/>
              </div>
            </div>
          </div>
        }
      </main>
    );
  }
}

Maker.propTypes = {
  params: PropTypes.object.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isSuperuser: PropTypes.bool.isRequired,
    maker: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    recruiter: PropTypes.object,
  }).isRequired,
  maker: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  makerCredits: PropTypes.array.isRequired,
  win: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  onGetMaker: PropTypes.func.isRequired,
  onUpdateMakerSearchCount: PropTypes.func.isRequired,
  onMessage: PropTypes.func.isRequired,
  onInvite: PropTypes.func.isRequired,
  onAddExp: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
  onDeleteExp: PropTypes.func.isRequired,
  onEditExp: PropTypes.func.isRequired,
  onVerifyCredit: PropTypes.func.isRequired,
  onUnverifyCredit: PropTypes.func.isRequired,
  onDispute: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onChangeAvailaibility: PropTypes.func.isRequired,
  viewMyCV: PropTypes.func.isRequired,
  onSaveCVUrl: PropTypes.func.isRequired,
  onDeleteMyCv: PropTypes.func.isRequired,
  onGetCompanyInfo: PropTypes.func.isRequired,
  addApplozicCount: PropTypes.func.isRequired,
  location: PropTypes.object,
  onShare: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({
    user: selectUser(),
    maker: selectMaker(),
    makerCredits: selectMakerCredits(),
    isFetching: selectIsFetching(),
    isCvUploaded: selectIsCvUploaded(),
    isCvDeleted: selectIsCvDeleted(),
    isPaidStudio: selectisPaidStudio(),
    applozicMsgCount: applozicMsgCount(),
    studio: selectStudio(),
  }),
  dispatch => ({
    dispatch,
    onGetMaker: (id, user) => dispatch(makerRequest(id, user)),
    onGetMakerProfile: (id) => dispatch(makerProfileRequest(id)),
    onUpdateMakerSearchCount: id => dispatch(updateMakerSearchCountRequest(id)),
    onMessage: (id, name) => dispatch(openMessaging(id, name)),
    onInvite: id => dispatch(openInvite(id)),
    onAddExp: () => dispatch(openAddExp()),
    onVerifyCredit: (decision, id, makerID) => dispatch(verifyCreditRequest(decision, id, makerID)),
    onUnverifyCredit: (creditId, makerID) => dispatch(unverifyCreditRequest(creditId, makerID)),
    onConnect: ({ id, page }) => dispatch(connectRequest({ id, page })),
    onDeleteExp: (gameID, title) => dispatch(openDeleteExp({ gameID, gameTitle: title, page: 'maker' })),
    onEditExp: credit => dispatch(openEditExp(credit)),
    onDispute: (creditId, makerID, title, studio, makerName) => dispatch(openDispute(creditId, makerID, title, studio, makerName)),
    onSignIn: () => dispatch(openSignIn()),
    onChangeAvailaibility: (str, makerId) => dispatch(changeAvailaility(str, makerId)),
    onSaveCVUrl: (cvCdnUrl, makerId) => dispatch(saveCvCdnUrl(cvCdnUrl, makerId)),
    viewMyCV: makerCvUrl => dispatch(openMyCv(makerCvUrl)),
    onDeleteMyCv: makerId => dispatch(openDeleteCv(makerId)),
    onGetCompanyInfo: companyId => dispatch(getCompanyInfo(companyId)),
    onStudioRequest: id => dispatch(getRecruiterStudioRequest(id)),
    onOpenGetVerified: data => dispatch(openGetVerified(data)),
    addApplozicCount: () => dispatch(addApplozicCountRequest()),
    onShare: id => dispatch(openShare(id)),
    checkApplozicCount: () => dispatch(getApplozicRecruiterRequest()),
  })
)(Maker);
