'use strict';

exports.__esModule = true;
var PropTypes = require('prop-types')
var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ScrollBehavior = require('scroll-behavior/lib/ScrollBehavior');

var _ScrollBehavior2 = _interopRequireDefault(_ScrollBehavior);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  shouldUpdateScroll: PropTypes.func,
  routerProps: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

var childContextTypes = {
  scrollBehavior: PropTypes.object.isRequired
};

var ScrollBehaviorContext = function (_React$Component) {
  _inherits(ScrollBehaviorContext, _React$Component);

  function ScrollBehaviorContext(props, context) {
    _classCallCheck(this, ScrollBehaviorContext);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _initialiseProps.call(_this);

    var routerProps = props.routerProps;


    _this.scrollBehavior = new _ScrollBehavior2.default(routerProps.router, function () {
      return _this.props.routerProps.location;
    }, _this.shouldUpdateScroll);

    _this.scrollBehavior.updateScroll(null, routerProps);
    return _this;
  }

  ScrollBehaviorContext.prototype.getChildContext = function getChildContext() {
    return {
      scrollBehavior: this
    };
  };

  ScrollBehaviorContext.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var routerProps = this.props.routerProps;

    var prevRouterProps = prevProps.routerProps;

    if (routerProps.location === prevRouterProps.location) {
      return;
    }

    this.scrollBehavior.updateScroll(prevRouterProps, routerProps);
  };

  ScrollBehaviorContext.prototype.componentWillUnmount = function componentWillUnmount() {
    this.scrollBehavior.stop();
  };

  ScrollBehaviorContext.prototype.render = function render() {
    return this.props.children;
  };

  return ScrollBehaviorContext;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.shouldUpdateScroll = function (prevRouterProps, routerProps) {
    var shouldUpdateScroll = _this2.props.shouldUpdateScroll;

    if (!shouldUpdateScroll) {
      return true;
    }

    // Hack to allow accessing scrollBehavior.readPosition().
    return shouldUpdateScroll.call(_this2.scrollBehavior, prevRouterProps, routerProps);
  };

  this.registerElement = function (key, element, shouldUpdateScroll) {
    _this2.scrollBehavior.registerElement(key, element, shouldUpdateScroll, _this2.props.routerProps);
  };

  this.unregisterElement = function (key) {
    _this2.scrollBehavior.unregisterElement(key);
  };
};

ScrollBehaviorContext.propTypes = propTypes;
ScrollBehaviorContext.childContextTypes = childContextTypes;

exports.default = ScrollBehaviorContext;
module.exports = exports['default'];