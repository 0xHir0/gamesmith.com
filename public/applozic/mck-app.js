let $original;
let oModal = '';
if (typeof jQuery !== 'undefined') {
  $original = jQuery.noConflict(true);
  $ = $original;
  jQuery = $original;
  if (typeof $.fn.modal === 'function') {
    oModal = $.fn.modal.noConflict(true);
    $.fn.modal = oModal;
    jQuery.fn.modal = oModal;
  }
}
const applozicSideBox = new ApplozicSidebox();
applozicSideBox.load();
function ApplozicSidebox() {
  const googleApiKey = (typeof applozic._globals !== 'undefined' && applozic._globals.googleApiKey) ? (applozic._globals.googleApiKey) : 'AIzaSyDKfWHzu9X7Z2hByeW4RRFJrD9SizOzZt4';
  const mck_style_loader = [{
    name: 'mck-combined', url: `${MCK_STATICPATH}/lib/css/mck-combined.min.css`,
  }, {
    name: 'mck-sidebox', url: '/applozic/mck-sidebox.css',
  }, {
    name: 'km-login-model', url: `${MCK_STATICPATH}/sidebox/css/app/km-login-model.css`,
  }];
  const mck_script_loader1 = [ /* {
            "name": "jquery-template", "url": MCK_STATICPATH + "/sidebox/js/app/applozic.jquery.js"
    }, {
            "name": "mck-common", "url": MCK_STATICPATH + "/sidebox/js/app/applozic.chat.min.js"
    },*/ {
      name: 'widget', url: `${MCK_STATICPATH}/lib/js/mck-ui-widget.min.js`,
    }, {
      name: 'plugins', url: `${MCK_STATICPATH}/lib/js/mck-ui-plugins.min.js`,
    }, {
      name: 'socket', url: `${MCK_STATICPATH}/lib/js/mqttws31.js`,
    }, {
      name: 'maps', url: `https://maps.google.com/maps/api/js?key=${googleApiKey}&libraries=places`,
    }, {
      name: 'emojis', url: `${MCK_STATICPATH}/lib/js/mck-emojis.min.js`,
    }, {
      name: 'video_howler', url: 'https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.2/howler.min.js',
    }, /* {
            "name": "video_ringtone", "url": MCK_STATICPATH + "/sidebox/js/app/mck-ringtone-service.js"
    },*/ {
      name: 'aes', url: `${MCK_STATICPATH}/lib/js/aes.js`,
    }, {
      name: 'cookie', url: `${MCK_STATICPATH}/lib/js/js.cookie.js`,
    }];
  const mck_script_loader2 = [{
    name: 'locationpicker', url: `${MCK_STATICPATH}/lib/js/locationpicker.jquery.min.js`,
  }];
  const mck_videocall = [{
    name: 'video_twilio', url: `${MCK_STATICPATH}/sidebox/js/app/twilio-video.js`,
  }];
  this.load = function () {
    try {
      const head = document.getElementsByTagName('head')[0];
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `${MCK_STATICPATH}/lib/js/jquery-2.2.2.min.js`;
      if (script.readyState) { // IE
        script.onreadystatechange = function () {
          if (script.readyState === 'loaded' || script.readyState === 'complete') {
            script.onreadystatechange = null;
            mckinitPlugin();
          }
        };
      } else { // Others
        script.onload = function () {
          mckinitPlugin();
        };
      }
      head.appendChild(script);
    } catch (e) {
      console.log('Plugin loading error. Refresh page.');
      if (typeof MCK_ONINIT === 'function') {
        MCK_ONINIT('error');
      }
      return false;
    }
  };
  function mckinitPlugin() {
    if (!$original && typeof jQuery !== 'undefined') {
      $original = jQuery.noConflict(true);
      $ = $original;
      jQuery = $original;
      if (typeof $.fn.modal === 'function') {
        oModal = $.fn.modal.noConflict(true);
        $.fn.modal = oModal;
        jQuery.fn.modal = oModal;
      }
    }
    try {
      $.each(mck_style_loader, (i, data) => {
        mckLoadStyle(data.url);
      });
      $.ajax({
        url: `${MCK_STATICPATH}/sidebox/template/mck-sidebox.html`, crossDomain: true, success(data) {
          data = data.replace(/MCK_STATICPATH/g, MCK_STATICPATH);
          $('body').append(data);
          mckInitPluginScript();
        },
      });
    } catch (e) {
      console.log('Plugin loading error. Refresh page.');
      if (typeof MCK_ONINIT === 'function') {
        MCK_ONINIT('error');
      }
      return false;
    }
  }
  function mckLoadStyle(url) {
    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('link');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.href = url;
    head.appendChild(style);
  }
  function mckLoadScript(url, callback) {
    try {
      const body = document.getElementsByTagName('body')[0];
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      if (callback) {
        if (script.readyState) { // IE
          script.onreadystatechange = function () {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
              script.onreadystatechange = null;
              callback();
            }
          };
        } else { // Others
          script.onload = function () {
            callback();
          };
        }
      }
      body.appendChild(script);
    } catch (e) {
      console.log('Plugin loading error. Refresh page.');
      console.log(e);
      if (typeof MCK_ONINIT === 'function') {
        MCK_ONINIT('error');
      }
      return false;
    }
  }
  function mckInitPluginScript() {
    try {
      $.each(mck_script_loader1, (i, data) => {
        if (data.name === 'cookie') {
          try {
            var options = applozic._globals;
            if (typeof options !== 'undefined' && options.locShare === true) {
              mckLoadScript(data.url, mckLoadScript2);
            } else {
              mckLoadScript(data.url, mckLoadAppScript);
            }
          } catch (e) {
            mckLoadScript(data.url, mckLoadAppScript);
          }
        }
        else if (data.name === 'video_howler') {
          try {
            var options = applozic._globals;
            if (typeof options !== 'undefined' && !options.howlerScriptLoaded) {
              mckLoadScript(data.url);
            }
          } catch (e) {
            mckLoadScript(data.url, mckLoadAppScript);
          }
        }
        else if (data.name === 'maps') {
          try {
            var options = applozic._globals;
            if (typeof options !== 'undefined') {
              if (options.googleMapScriptLoaded) {
                return true;
              }
              if (options.googleApiKey) {
                const url = `${data.url}&key=${options.googleApiKey}`;
                mckLoadScript(url);
              }
            } else {
              mckLoadScript(data.url);
            }
          } catch (e) {
            mckLoadScript(data.url);
          }
        } else {
          mckLoadScript(data.url);
        }
      });
      if (typeof applozic._globals !== 'undefined' && applozic._globals.video === true) {
        $.each(mck_videocall, (i, data) => {
          mckLoadScript(data.url);
        });
      }
    } catch (e) {
      console.log('Plugin loading error. Refresh page.');
      if (typeof MCK_ONINIT === 'function') {
        MCK_ONINIT('error');
      }
      return false;
    }
  }
  function mckLoadScript2() {
    try {
      $.each(mck_script_loader2, (i, data) => {
        if (data.name === 'locationpicker') {
          mckLoadScript(data.url, mckLoadAppScript);
        }
      });
    } catch (e) {
      console.log('Plugin loading error. Refresh page.');
      if (typeof MCK_ONINIT === 'function') {
        MCK_ONINIT('error');
      }
      return false;
    }
  }
  function mckLoadAppScript() {
    try {
      const body = document.getElementsByTagName('body')[0];
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `${MCK_STATICPATH}/sidebox/js/app/applozic.plugin-1.0.js`;
      if (script.readyState) { // IE
        script.onreadystatechange = function () {
          if (script.readyState === 'loaded' || script.readyState === 'complete') {
            script.onreadystatechange = null;
            mckInitSidebox();
          }
        };
      } else { // Others
        script.onload = function () {
          mckInitSidebox();
        };
      }
      body.appendChild(script);
    } catch (e) {
      console.log('Plugin loading error. Refresh page.');
      if (typeof MCK_ONINIT === 'function') {
        MCK_ONINIT('error');
      }
      return false;
    }
  }
  
  function rendered() {
    setTimeout(() => {
      if(document.querySelector('#dltOnCallback'))
      {
        document.querySelector('#dltOnCallback').remove();
      }
      //start change imgs
      var getNames = document.querySelector('#mck-contact-list').getElementsByTagName('li');
      if (getNames.length > 0) {
        for (var ix = 0; ix < getNames.length; ix++) {
          console.log( getNames[ix].querySelector('a').getAttribute("data-mck-id"))
          if(document.querySelectorAll('#mck-contact-list .blk-lg-3')[ix].closest('a').getAttribute('data-isgroup') == "false")
             document.querySelectorAll('#mck-contact-list .blk-lg-3')[ix].innerHTML = "<img onerror='this.src=`data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=`' src='" + 'https://gamesmith-profile-pic.s3.amazonaws.com/' + getNames[ix].querySelector('a').getAttribute("data-mck-id") + "'/>";
        }
      }
      //end change imgs
      var chatClickElement = document.querySelectorAll('#mck-contact-list li')
      for (var iv = 0; iv < chatClickElement.length; iv++) {
        chatClickElement[iv].addEventListener("click", renderInternalImage);
      }
    }, 200);
  }
  function clickOnGoToProfile() {
    document.querySelector('#dltOnCallback').click()
  }
  function renderInternalImage(e) {
    if(document.querySelector('#dltOnCallback'))
    document.querySelector('#dltOnCallback').remove();
    var appendedx = document.createElement('div');
    var themessages = document.querySelectorAll('.mck-message-inner div');
    var whoisthis = '';
    var isgroup = false;
    e.path.forEach(function (item) {
      if (item.id !== undefined) {
        if (item.id.includes('li-user')) {
          whoisthis = item.id.replace('li-user-', '')
        }


      if (item.className.includes('li-clientgroupid-')) {
        let str = document.querySelector("#li-group-42377688").className.replace('li-clientgroupid-', '')
        let index = str.indexOf(' ', str.indexOf(' ') + 1)
        if (index >= 0)
          var secondChunk = str.substr(index + 1);
        whoisthis = (secondChunk.replace(/[0-9]/g, '').toLowerCase())
        isgroup = true;
      }
      }
    })


      if (themessages.length > 0) {
        if(!isgroup)
        appendedx.innerHTML = '<a title="Go to profile" href="/maker/' + whoisthis + '" id="dltOnCallback" class="blk-lg-3" style="margin-right: 10px;"><img src="https://gamesmith-profile-pic.s3.amazonaws.com/' + whoisthis + '" style="height:40px;max-width:40px; border-radius: 100px;"></a>';
        else
        appendedx.innerHTML = '<a title="Go to profile" href="/studio/' + whoisthis + '" id="dltOnCallback" class="blk-lg-3" style="margin-right: 10px;"><img style="height:40px;max-width:40px; border-radius: 100px;"></a>';

        document.querySelector("#mck-tab-individual > div").appendChild(appendedx)
  
        var themessages = document.querySelectorAll('.mck-message-inner div');
        if (themessages.length > 0) {
          console.log(themessages[0].getAttribute('data-contact'))
        }
  
        var divToMakeClickable = document.querySelector('#dltOnCallback').parentElement.parentElement.parentElement.querySelector('.mck-box-title');
        divToMakeClickable.style.cursor = "pointer"
        divToMakeClickable.addEventListener("click", clickOnGoToProfile);
      }
  }

  function mckInitSidebox() {
 

    try {
      const options = applozic._globals;
      if (typeof options !== 'undefined') {
        options.ojq = $original;
        options.obsm = oModal;

        $applozic.fn.applozic(options);

        var callBackChecker = setInterval(reCheck, 200); 

      function reCheck() {
          if(document.getElementById("mck-sidebox-launcher")) {
          document.getElementById("mck-sidebox-launcher").addEventListener("click", rendered);
          document.getElementsByClassName("mck-conversation-tab-link")[0].addEventListener("click", rendered);
          document.getElementsByClassName("mck-conversation-tab-link")[1].addEventListener("click", rendered);
          clearInterval(callBackChecker);
      }
}

      }
    } catch (e) {
      console.log(e);
      console.log('Plugin loading error. Refresh page.');
      if (typeof MCK_ONINIT === 'function') {
        MCK_ONINIT('error');
      }
      return false;
    }
  }
  function getRandomId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++)
      { text += possible.charAt(Math.floor(Math.random() * possible.length)); }
    return text;
  }
}
