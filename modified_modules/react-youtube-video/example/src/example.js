var React = require('react');
var ReactDOM = require('react-dom');
var YoutubeVideo = require('react-youtube-video');

var App = React.createClass({
	render () {
		return (
			<div>
				<YoutubeVideo />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
