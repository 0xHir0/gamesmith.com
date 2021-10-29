'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var createReactClass = require('create-react-class');
var React = require('react');

var YoutubeVideo = createReactClass({
	displayName: 'YoutubeVideo',

	getVideoUrl: function getVideoUrl(url) {
		var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
		if (videoid != null) {
			return videoid[1];
		} else {
			return false;
		}
	},

	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement('iframe', { width: this.props.width, height: this.props.height,
				src: 'https://www.youtube.com/embed/' + this.getVideoUrl(this.props.url) + '?\n\t\t\t\t\t\t\t\t\trel=' + this.props.rel + '&amp;\n\t\t\t\t\t\t\t\t\tshowinfo=' + this.props.showinfo + '&amp;\n\t\t\t\t\t\t\t\t\tstart=' + this.props.start + '&amp;\n\t\t\t\t\t\t\t\t\tfc=' + this.props.fs + '&amp;\n\t\t\t\t\t\t\t\t\tautoplay=' + this.props.autoplay + '&amp;\n\t\t\t\t\t\t\t\t\tcolor=' + this.props.color + '&amp;\n\t\t\t\t\t\t\t\t\tcontrols=' + this.props.controls + '&amp;\n\t\t\t\t\t\t\t\t\tdisablekb=' + this.props.disablekb + '&amp;\n\t\t\t\t\t\t\t\t\tiv_load_policy=' + this.props.iv_load_policy + '&amp;\n\t\t\t\t\t\t\t\t\tloop=' + this.props.loop + '&amp;\n\t\t\t\t\t\t\t\t\tmodestbranding=' + this.props.modestbranding + '&amp;\n\t\t\t\t\t\t\t\t\tplaysinline=' + this.props.playsinline + '&amp;\n\n\t\t\t\t\t\t\t\t',
				frameBorder: this.props.border })
		);
	}
});

YoutubeVideo.defaultProps = {
	url: 'https://www.youtube.com/watch?v=PPqd4r7iHWg',
	border: 0,
	fs: 0,
	rel: 0,
	showinfo: 0,
	start: 0,
	autoplay: 0,
	color: 'red',
	controls: 1,
	disablekb: 0,
	iv_load_policy: 1,
	loop: 0,
	modestbranding: 0,
	playsinline: 0,
	width: 580,
	height: 315
};

exports['default'] = YoutubeVideo;
module.exports = exports['default'];