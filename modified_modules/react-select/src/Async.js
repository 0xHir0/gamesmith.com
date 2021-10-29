import React, { Component, PropTypes } from "react";
import Select from "./Select";
import stripDiacritics from "./utils/stripDiacritics";

const propTypes = {
  autoload: PropTypes.bool.isRequired, // automatically call the `loadOptions` prop on-mount; defaults to true
  cache: PropTypes.any, // object to use to cache results; set to null/false to disable caching
  children: PropTypes.func.isRequired, // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
  ignoreAccents: PropTypes.bool, // strip diacritics when filtering; defaults to true
  ignoreCase: PropTypes.bool, // perform case-insensitive filtering; defaults to true
  loadingPlaceholder: PropTypes.string.isRequired, // replaces the placeholder while options are loading
  loadOptions: PropTypes.func.isRequired, // callback to load options asynchronously; (inputValue: string, callback: Function): ?Promise
  options: PropTypes.array.isRequired, // array of options
  placeholder: PropTypes.oneOfType([
    // field placeholder, displayed when there's no value (shared with Select)
    PropTypes.string,
    PropTypes.node,
  ]),
  searchPromptText: PropTypes.oneOfType([
    // label to prompt for search input
    PropTypes.string,
    PropTypes.node,
  ]),
};

const defaultProps = {
  autoload: true,
  cache: {},
  children: defaultChildren,
  ignoreAccents: true,
  ignoreCase: true,
  loadingPlaceholder: "Loading...",
  options: [],
  searchPromptText: "Type to search",
};

export default class Async extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoading: false,
      options: props.options,
    };

    this._onInputChange = this._onInputChange.bind(this);
  }

  componentDidMount() {
    const { autoload } = this.props;

    if (autoload) {
      this.loadOptions("");
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const propertiesToSync = ["options"];
    propertiesToSync.forEach((prop) => {
      if (this.props[prop] !== nextProps[prop]) {
        this.setState({
          [prop]: nextProps[prop],
        });
      }
    });
  }

  loadOptions(inputValue) {
    const { cache, loadOptions } = this.props;

    if (cache && cache.hasOwnProperty(inputValue)) {
      this.setState({
        options: cache[inputValue],
      });

      return;
    }

    const callback = (error, data) => {
      if (callback === this._callback) {
        this._callback = null;

        const options = (data && data.options) || [];

        if (cache) {
          cache[inputValue] = options;
        }

        this.setState({
          isLoading: false,
          options,
        });
      }
    };

    // Ignore all but the most recent request
    this._callback = callback;

    const promise = loadOptions(inputValue, callback);
    if (promise) {
      promise.then(
        (data) => callback(null, data),
        (error) => callback(error)
      );
    }

    if (this._callback && !this.state.isLoading) {
      this.setState({
        isLoading: true,
      });
    }

    return inputValue;
  }

  _onInputChange(inputValue) {
    const { ignoreAccents, ignoreCase } = this.props;

    if (ignoreAccents) {
      inputValue = stripDiacritics(inputValue);
    }

    if (ignoreCase) {
      inputValue = inputValue.toLowerCase();
    }

    return this.loadOptions(inputValue);
  }

  render() {
    const { children, loadingPlaceholder, placeholder, searchPromptText } =
      this.props;
    const { isLoading, options } = this.state;

    const props = {
      noResultsText: isLoading ? loadingPlaceholder : searchPromptText,
      placeholder: isLoading ? loadingPlaceholder : placeholder,
      options: isLoading ? [] : options,
    };

    return children({
      ...this.props,
      ...props,
      isLoading,
      onInputChange: this._onInputChange,
    });
  }
}

Async.propTypes = propTypes;
Async.defaultProps = defaultProps;

function defaultChildren(props) {
  return <Select {...props} />;
}
