
var MCK_CONTEXTPATH ;
var MCK_STATICPATH ;
$.get("https://apps.applozic.com/sidebox.app", function (data, text) {
  var regex = /((http(s)?(\:\/\/))+(www\.)?([\w\-\.\/])*(\.[a-zA-Z]{2,3}\/?))[^\s\b\n|]*[^.,;:\?\!\@\^\$ -]\/resources\/[(0-9)]+/

  window.applozic = window.applozic || {};
  MCK_CONTEXTPATH = 'https://apps.applozic.com:443';
  MCK_STATICPATH = `https://apps.applozic.com/resources/${data.match(regex)[0].match(/\d+/)[0]}`;
  let MCK_ONINIT = '';
  window.applozic.PRODUCT_ID = '' ? '' : 'applozic-chat';
// $.getScript(MCK_STATICPATH + '/sidebox/js/app/mck-app.js');
  const options = applozic._globals;
  if (typeof options !== 'undefined') {
    MCK_ONINIT = options.onInit;
  }
  window.addEventListener('error', (e) => {
    if (typeof (e.target.src) !== 'undefined' && e.target.src.indexOf('sidebox') !== -1 && typeof MCK_ONINIT === 'function') {
      console.log('Plugin loading error. Refresh page.');
      MCK_ONINIT('error');
    }
  }, true);
  const imported = document.createElement('script');
  imported.src = '/applozic/mck-app.js';
  document.head.appendChild(imported);

})


