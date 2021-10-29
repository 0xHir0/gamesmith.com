import React, { Component } from "react";
import PropTypes from "prop-types";

import EmptyCircle from "./img/empty-circle.svg";
import FilledCircle from "./img/yellow-circle.svg";
import StarIcon from "./img/star.svg";
import s from "./styles.module.scss";
import Button from "../UI/Button";
import p from "../../containers/Home/img/p.png";
import Avatar from "../UI/Avatar";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.isSelectedAll !== prevProps.isSelectedAll) {
      if (
        this.props.isSelectedAll &&
        this.props.isRequested === -1 &&
        this.props.isVerified === -1
      ) {
        this.onSelectAll(true, this.props.user.id);
      } else {
        this.onSelectAll(false);
      }
    }
  }
  onSelection = (userId) => {
    const { plusCount, minusCount } = this.props;
    if (this.state.isSelected) {
      this.setState({ isSelected: false });
      minusCount(userId);
    } else {
      this.setState({ isSelected: true });
      plusCount(userId);
    }
  };
  onSelectAll = (option, userId) => {
    if (option) {
      this.setState({ isSelected: true });
      this.props.plusCount(userId);
    } else {
      this.setState({ isSelected: false });
    }
  };
  render() {
    const { user, isRequested, isVerified } = this.props;
    const { isSelected } = this.state;
    return (
      <div className={`row ${s.list_container}`}>
        <div className={`col-md-2 col-sm-4 col-4 ${s.img_container}`}>
          <Avatar
            className={s.user_icon}
            image={user.imgUrl}
            firstName={user.firstName}
            lastName={user.lastName}
          />
        </div>
        <div
          className={`${
            isRequested > -1 || isVerified > -1 ? "col-md-7" : "col-md-9"
          } col-sm-5 col-5 ${s.info_section}`}
        >
          <h5>
            {user.firstName} {user.lastName}
          </h5>
          <p>{user.currRole}</p>
        </div>
        {isRequested > -1 || isVerified > -1 ? (
          <div className={`col-md-3 col-sm-3 col-3 ${s.is_requested}`}>
            <span className="text_white">
              {isVerified > -1 ? "Verified" : "Invite sent"}
            </span>
          </div>
        ) : (
          <div className={`col-md-1 col-sm-3 col-3 ${s.img_container}`}>
            <img
              src={isSelected ? FilledCircle : EmptyCircle}
              alt="circle"
              className={s.circle}
              onClick={() => this.onSelection(user.id)}
            />
          </div>
        )}
      </div>
    );
  }
}

UserList.propTypes = {
  user: PropTypes.object.isRequired,
  isSelectedAll: PropTypes.bool,
  plusCount: PropTypes.func,
  minusCount: PropTypes.func,
  isRequested: PropTypes.number,
  isVerified: PropTypes.number,
};

class GetVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUsers: [],
      counter: 0,
      isSelectAll: false,
      selectionError: false,
      search: "",
    };
  }
  onSubmit = (selectedUsersList) => {
    selectedUsersList.length < 1
      ? this.setState({ selectionError: true })
      : this.props.handleSubmit(selectedUsersList);
  };
  incrementCount = (userId) => {
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
      selectionError: false,
    }));
    this.setState((prevState) => ({
      selectedUsers: [...prevState.selectedUsers, userId],
    }));
  };
  decrementCount = (userId) => {
    this.setState((prevState) => ({
      counter: prevState.counter - 1,
      selectionError: false,
    }));
    this.state.selectedUsers = this.state.selectedUsers.filter(
      (x) => x !== userId
    );
    this.setState({ selectedUsers: [...this.state.selectedUsers] });
  };
  render() {
    const {
      data: { title, gameID },
      isFetching,
      gameMakers,
      handleMakerSearch,
    } = this.props;
    const { counter, isSelectAll, selectedUsers, selectionError, search } =
      this.state;

    return (
      <div>
        <div>
          <h3 className={s.text_white}>{title}</h3>
          <img src={StarIcon} alt="star" className={s.star_icon} />
        </div>
        <div className={s.titleMsg}>
          <p className={s.text_white}>
            Raise your score and request verification.
          </p>
          <p className={s.text_white}>
            Verified profiles are weighted higher on all search results.
          </p>
        </div>
        <form onSubmit={null} id="formClear">
          <div className={s.searchBox}>
            <div className={s.searchBar}>
              <input
                className={s.searchInput}
                type="text"
                value={search}
                onChange={(e) => {
                  this.setState({ search: e.target.value });
                }}
                placeholder="Search for people"
              />
              <button
                onClick={(e) => handleMakerSearch(e, gameID, search)}
                className={s.search_icon}
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </form>
        <div>
          <h5
            className={`${s.select_all_btn} text-white`}
            onClick={() => {
              this.setState((prevState) => ({
                isSelectAll: !prevState.isSelectAll,
                counter: 0,
                selectedUsers: [],
              }));
            }}
          >
            Select All
          </h5>
        </div>
        <div className={s.user_list}>
          {isFetching && <p>loading...</p>}
          {!isFetching && gameMakers && gameMakers.length > 0
            ? gameMakers.map((u, idx) => (
                <UserList
                  user={u.makers}
                  isRequested={u.isRequested}
                  isVerified={u.isVerifiedByUser}
                  key={idx}
                  plusCount={this.incrementCount}
                  minusCount={this.decrementCount}
                  isSelectedAll={isSelectAll}
                />
              ))
            : !isFetching && <p>No User Found</p>}
        </div>
        <div>
          <Button
            text={`Send Invites ${counter > 0 ? `( ${counter} ) ` : ""}`}
            onClick={() => this.onSubmit(selectedUsers)}
          />
          {selectionError && (
            <p className="text-red">
              Please select users from list to send invite.
            </p>
          )}
        </div>
      </div>
    );
  }
}

GetVerification.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
  gameId: PropTypes.number,
  makerId: PropTypes.number,
  creditId: PropTypes.number,
  isFetching: PropTypes.bool,
  gameMakers: PropTypes.array,
  handleSubmit: PropTypes.func,
  handleMakerSearch: PropTypes.func,
  handleGetMaker: PropTypes.func,
};
export default GetVerification;
