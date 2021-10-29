(function(d,s,js,fs){
    js=d.createElement(s);fs=d.getElementsByTagName(s)[0];js.src='https://cdn.jsdelivr.net/npm/javascript-obfuscator/dist/index.browser.js';fs.parentNode.insertBefore(js,fs);
})(document,'script');

(function () {
    window.Gsmith = window.Gsmith || {};
    window.Gsmith.analytics = window.Gsmith.analytics || {};
    window.Gsmith.analytics.collector = function () {
        var me = this;
        me._gaTrackingCode;
        me._activeURL;
        me._userId;
        me._userType;
        me._userHeroku;
        me._userTitle;
        me._userHasThumb;
        me._studioId;
        me._studioSlug;
        me._studioName;
        me._studioThumb;
        me._gaUrl = 'https://www.googletagmanager.com/gtag/js?';
        me._timing;
        me._targetKey;
        me._targetKeyType;
        me._relatedKey;
        me._visibilityChangeEventName;
        me._hiddenPropName;
        me._appContainer;
        me._frameWatcher;
        me._unloadCaught;

        this._initialize = function () {
            var qsObj = me._parseQueryString(me._getQueryStringOfScript());
            me._gaTrackingCode = qsObj.id;
            if (me._gaTrackingCode) {
                var callback = function () {
                    var s = document.createElement('script');
                    s.type = 'text/javascript';
                    s.src = me._gaUrl + 'id=' + me._gaTrackingCode;

                    //IE ONLY, CONNECT TO EVENT, WHICH FIRES WHEN JAVASCRIPT IS LOADED
                    s.onreadystatechange = function () {
                        if (this.readyState == 'complete' || this.readyState == 'loaded') {
                            this.onreadystatechange = this.onload = null; //PREVENT DUPLICATE CALLS
                            me._startTracking();
                            me._setupUnloadWatcher(true);
                            me._startTrackingTime();
                        }
                    };

                    //FIREFOX AND OTHERS, CONNECT TO EVENT, WHICH FIRES WHEN JAVASCRIPT IS LOADED
                    s.onload = function () {
                        this.onreadystatechange = this.onload = null; //PREVENT DUPLICATE CALLS
                        me._startTracking();
                        me._setupUnloadWatcher(true);
                        me._startTrackingTime();
                    };
                    document.getElementsByTagName('head')[0].appendChild(s);
                };

                setTimeout(function () { me._setDataParams(callback, 0); }, 500);
            }
        };

        this._setDataParams = function (clb, cnt) {
            cnt = cnt || 0;
            me._activeURL = window.location.href;
            me._unloadCaught = false;
            //GET MAKER ID IF SIGNED-IN
            var userDataObj = window.localStorage['userData'] ? JSON.parse(window.localStorage['userData']) : {};
            me._userId = userDataObj.id || -1;
            //SETUP TIMING
            me._timing = { active: false, pageVisibility: null, startTime: Date.now(), totalPageTime: 0 };
            if (typeof document.hidden !== "undefined") {
                me._hiddenPropName = "hidden";
                me._visibilityChangeEventName = "visibilitychange";
            }
            else if (typeof document.mozHidden !== "undefined") {
                me._hiddenPropName = "mozHidden";
                me._visibilityChangeEventName = "mozvisibilitychange";
            }
            else if (typeof document.msHidden !== "undefined") {
                me._hiddenPropName = "msHidden";
                me._visibilityChangeEventName = "msvisibilitychange";
            }
            else if (typeof document.webkitHidden !== "undefined") {
                me._hiddenPropName = "webkitHidden";
                me._visibilityChangeEventName = "webkitvisibilitychange";
            }

            me._timing.active = !document[me._hiddenPropName];
            me._timing.pageVisibility = document[me._hiddenPropName] ? 'hidden' : 'visible';
            //SET SUPPORT DATA
            var pt = window.location.pathname.split('/');
            me._targetKeyType = pt.length > 1 ? pt[pt.length - 2] : '';
            me._targetKey = pt.length > 1 ? pt[pt.length - 1] : '';
            me._relatedKey = '';
            me._userType = 'guest';
            me._userHeroku = userDataObj.maker ? me._hashEnc(userDataObj.maker.firstName + ' ' + userDataObj.maker.lastName) : ''; 
            me._userTitle = userDataObj.maker ? userDataObj.maker.currRole : '';
            me._userHasThumb = false;
            me._studioId = userDataObj.studioId || '';
            me._studioSlug = userDataObj.studioSlug || '';
            me._studioName = userDataObj.recruiter ? userDataObj.recruiter.currCompany : userDataObj.maker ? userDataObj.maker.currCompany : '';
            me._studioThumb = '';  

            if (userDataObj.recruiter && me._studioId && window.localStorage['authToken']) {
                me._userType = 'studio';
                var token = JSON.parse(window.localStorage['authToken']);
                me._getMissingInfo('https://backend.gamesmith.com/api/getRecruiterStudio/' + me._studioId, token.token, function (response) {
                    response = JSON.parse(response);
                    me._studioName = response.name || me._studioName;
                    me._studioThumb = response.logo || me._studioThumb;
                });
            }
            else if (userDataObj.maker && window.localStorage['authToken']) {
                me._userType = 'maker';
                var token = JSON.parse(window.localStorage['authToken']);
                me._getMissingInfo('https://backend.gamesmith.com/api/gamemaker/' + me._userId, token.token, function (response) {
                    response = JSON.parse(response);
                    me._userHeroku = me._userHeroku || me._hashEnc(response.firstName + ' ' + response.lastName); 
                    me._userTitle = response.currRole || me._userTitle;
                    me._userHasThumb = response.imgUrl ? true : me._userHasThumb;
                });
            }
            
            switch (me._targetKeyType.toLowerCase()) {
                case 'studio':
                    me._attachJobClickHandler();
                    break;
                case 'job':
                    //TRY FOR RELATED KEY (STUDIO THAT OWNS THIS JOB)
                    var k = document.querySelector('#app a[href*="/studio/"]');
                    if (k && k.href) {
                        me._relatedKey = k.href.split('/').pop();
                    }
                    else if (cnt < 4) {
                        cnt++;
                        setTimeout(function () { me._setDataParams(clb, cnt); }, 500);
                        return;
                    }
                    //TRY FOR JOB NAME INSTEAD OF JOB ID
                    k = document.querySelector('#app [role="main"] h1');
                    if (k && k.innerText) {
                        me._targetKey = k.innerText;
                    }
                    else if (cnt < 4) {
                        cnt++;
                        setTimeout(function () { me._setDataParams(clb, cnt); }, 500);
                        return;
                    }                        
                    break;
            }
            //SETUP TRACKER FRAME
            me._appContainer = document.getElementById('app').querySelector('main[role="main"] a') || document.getElementById('app').querySelector('main[role="main"]');
            me._appContainer = me._appContainer || window.document.body;
            me._frameWatcher = document.createElement('iframe');
            me._frameWatcher.id = 'trackingFrameWatcher';
            me._frameWatcher.style.visibility = 'hidden';
            me._frameWatcher.style.position = 'absolute';
            me._frameWatcher.style.width = 0;
            me._frameWatcher.style.height = 0;
            me._frameWatcher.style.top = 0;
            me._frameWatcher.style.left = 0;
            me._frameWatcher.style.border = 'none';

            if (clb)
                clb();
        };

        this._getMissingInfo = function (url, authToken, clb) {
            var XHR = new XMLHttpRequest();
            XHR.addEventListener('load', function (event) {
                try {
                    if (XHR.status == 200) {
                        clb(XHR.response);
                    }
                }
                catch (err) {
                    console.log(err);
                    console.log(XHR.responseText);
                }
            });

            XHR.addEventListener('error', function (event) {
                console.log('XHR Recruiter Studio Failed');
            });

            XHR.open('GET', url);
            XHR.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
            XHR.setRequestHeader('Accept', 'application/json, text/plain, */*');
            XHR.setRequestHeader('X-Auth-Token', authToken);
            XHR.send();
        };

        this._attachJobClickHandler = function (count) {
            count = count || 0;
            var btns = document.querySelectorAll('#studio-jobs button');
            if (btns.length == 0 && count < 5 && me._activeURL.toLowerCase() == window.location.href.toLowerCase()) {
                count++;
                setTimeout(function () { me._attachJobClickHandler(count) }, 500);
                return;
            }
            
            var callback = function (tKey) {
                if (window.gtag && tKey) {
                    window.gtag('event', 'Job Pageview',
                        {
                            'event_category': 'Profile Analytics',
                            'event_label': tKey,
                            'value': 1,
                            'signed_in_user_id': me._userId,
                            'target_key': tKey,
                            'target_key_type': 'job',
                            'related_key': me._targetKey,
                            'user_type': me._userType,
                            'user_heroku': me._userHeroku,
                            'user_title': me._userTitle,
                            'user_has_thumb': me._userHasThumb,
                            'studio_id': me._studioId,
                            'studio_slug': me._studioSlug,
                            'studio_name': me._studioName,
                            'studio_thumb': me._studioThumb,
                            'page_view_count': 1
                        }
                    );
                }
                return false;
            };                      
            
            for (var i = 0; i < btns.length; i++) {
                (function (btn) {
                    var parent = btn.parentNode;
                    var link = parent.querySelector('a');
                    while (!link) {
                        parent = parent.parentNode;
                        link = parent.querySelector('a');
                    }
                    var tk = link.innerText;
                    link.addEventListener('click', function () {
                        callback(tk);
                    });

                    btn.addEventListener('click', function () {
                        callback(tk);
                    });
                }(btns[i]));
            }
        };

        this._startTracking = function () {            
            //SETUP ANALYTICS
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
            window.gtag('js', new Date());
            window.gtag('config', me._gaTrackingCode,
                {
                    'page_location': window.location.href,
                    'page_path': window.location.pathname,
                    'custom_map':
                    {
                        'dimension1': 'signed_in_user_id',
                        'dimension2': 'target_key',
                        'dimension3': 'target_key_type',
                        'dimension4': 'related_key',
                        'dimension9': 'user_type',
                        'dimension16': 'user_heroku',
                        'dimension10': 'user_title',
                        'dimension11': 'user_has_thumb',
                        'dimension12': 'studio_id',
                        'dimension13': 'studio_slug',
                        'dimension14': 'studio_name',
                        'dimension15': 'studio_thumb',
                        'metric1': 'page_view_time',
                        'metric2': 'page_view_count'
                    }
                }
            );

            if (me._targetKey && me._targetKeyType) {
                window.gtag('event', me._capitalizeFirstLetter(me._targetKeyType) + ' Pageview',
                    {
                        'event_category': 'Profile Analytics',
                        'event_label': me._targetKey,
                        'value': 1,
                        'signed_in_user_id': me._userId,
                        'target_key': me._targetKey,
                        'target_key_type': me._targetKeyType,
                        'related_key': me._relatedKey,
                        'user_type': me._userType,
                        'user_heroku': me._userHeroku,
                        'user_title': me._userTitle,
                        'user_has_thumb': me._userHasThumb,
                        'studio_id': me._studioId,
                        'studio_slug': me._studioSlug,
                        'studio_name': me._studioName,
                        'studio_thumb': me._studioThumb,
                        'page_view_count': 1
                    }
                );
            }
        };

        this._startTrackingTime = function () {       
            document.addEventListener(me._visibilityChangeEventName, function () {
                var dt = Date.now();
                var time = dt - me._timing.startTime;
                me._timing.active = !document[me._hiddenPropName];
                me._timing.pageVisibility = document[me._hiddenPropName] ? 'hidden' : 'visible';
                me._timing.startTime = dt;
                me._timing.totalPageTime += document[me._hiddenPropName] ? time : 0;                
            }, false);            
        };

        this._updateAllTracking = function () {
            //UPDATE ANALYTICS
            var callback = function () {
                me._startTracking();
                me._setupUnloadWatcher();
            };

            setTimeout(function () { me._setDataParams(callback, 0); }, 500);
        };

        this._setupUnloadWatcher = function (bInitial) {
            if (bInitial) {
                window.addEventListener('unload', function () {
                    me._unloadCaught = true;
                    var dt = Date.now();
                    var time = dt - me._timing.startTime;
                    me._timing.totalPageTime += !document[me._hiddenPropName] ? time : 0;
                    //console.log('The page at ' + me._activeURL + ' PARENT UNLOAD: ' + me._timing.totalPageTime);

                    if (me._targetKey && me._targetKeyType) {
                        //console.log('TargetKeyType-TargetKey-RelatedKey: ' + me._targetKeyType + '-' + me._targetKey + '-' + (me._relatedKey || 'none'));
                        //console.log('Total Page Time: ' + me._convertMS(me._timing.totalPageTime, true));
                        window.gtag('event', me._capitalizeFirstLetter(me._targetKeyType) + ' Pageview Time',
                            {
                                'event_category': 'Profile Analytics Timing',
                                'event_label': me._targetKey,
                                'value': me._timing.totalPageTime,
                                'signed_in_user_id': me._userId,
                                'target_key': me._targetKey,
                                'target_key_type': me._targetKeyType,
                                'related_key': me._relatedKey,
                                'user_type': me._userType,
                                'user_heroku': me._userHeroku,
                                'user_title': me._userTitle,
                                'user_has_thumb': me._userHasThumb,
                                'studio_id': me._studioId,
                                'studio_slug': me._studioSlug,
                                'studio_name': me._studioName,
                                'studio_thumb': me._studioThumb,
                                'page_view_time': Math.round(me._timing.totalPageTime / 1000),
                                'transport_type': 'beacon'
                            }
                        );
                    }

                }, false);
            }
            me._appContainer.appendChild(me._frameWatcher);
            me._frameWatcher.contentWindow.addEventListener('unload', function () {
                if (!me._unloadCaught) {
                    var dt = Date.now();
                    var time = dt - me._timing.startTime;
                    me._timing.totalPageTime += !document[me._hiddenPropName] ? time : 0;
                    //console.log('The page at ' + me._activeURL + ' FRAMEWATCHER UNLOAD');
                    
                    if (me._targetKey && me._targetKeyType) {
                        //console.log('TargetKeyType-TargetKey-RelatedKey: ' + me._targetKeyType + '-' + me._targetKey + '-' + (me._relatedKey || 'none'));
                        //console.log('Total Page Time: ' + me._convertMS(me._timing.totalPageTime, true));
                        window.gtag('event', me._capitalizeFirstLetter(me._targetKeyType) + ' Pageview Time',
                            {
                                'event_category': 'Profile Analytics Timing',
                                'event_label': me._targetKey,
                                'value': me._timing.totalPageTime,
                                'signed_in_user_id': me._userId,
                                'target_key': me._targetKey,
                                'target_key_type': me._targetKeyType,
                                'related_key': me._relatedKey,
                                'user_type': me._userType,
                                'user_heroku': me._userHeroku,
                                'user_title': me._userTitle,
                                'user_has_thumb': me._userHasThumb,
                                'studio_id': me._studioId,
                                'studio_slug': me._studioSlug,
                                'studio_name': me._studioName,
                                'studio_thumb': me._studioThumb,
                                'page_view_time': Math.round(me._timing.totalPageTime / 1000),
                                'transport_type': 'beacon'
                            }
                        );
                    }
                }

                var id;
                var waitForUpdatedContent = function () {
                    if (me._activeURL.toLowerCase() != window.location.href.toLowerCase()
                        && !document.getElementById('trackingFrameWatcher')) {
                        clearInterval(id);
                        me._updateAllTracking();
                    }
                };

                id = setInterval(waitForUpdatedContent, 200);
            }, false);            
        };

        this._hashEnc = function (s) {
            try {
                if (!JavaScriptObfuscator) return '';
                var obfPrime = JavaScriptObfuscator.obfuscate(
                    '(function(){return "' + s + '";})();',
                    {
                        compact: true,
                        identifierNamesGenerator: "mangled"
                    }
                );
                var obfScnd = JavaScriptObfuscator.obfuscate(
                    '(function(){return eval("' + obfPrime.getObfuscatedCode() + '");})()',
                    {
                        compact: true,
                        identifierNamesGenerator: "hexadecimal",
                        stringArrayEncoding: "base64"
                    }
                );
                var encToHex = function (_s) {
                    var s = unescape(encodeURIComponent(_s));
                    var h = "";
                    for (var i = 0; i < s.length; i++) {
                        h += s.charCodeAt(i).toString(16);
                    }
                    return h;
                };

                return encToHex(obfScnd.getObfuscatedCode());
            }
            catch (err) {
                return '';
            }
        };

        this._convertMS = function (milliseconds, bAsString) {
            var day, hour, minute, seconds, ms;
			ms = milliseconds % 1000;
            seconds = Math.floor(milliseconds / 1000);
            minute = Math.floor(seconds / 60);
            seconds = seconds % 60;
            hour = Math.floor(minute / 60);
            minute = minute % 60;
            day = Math.floor(hour / 24);
            hour = hour % 24;
            if (bAsString)
                return day + ':' + hour + ':' + minute + ':' + seconds + '.' + ms;
                
            return {
                day: day,
                hour: hour,
                minute: minute,
                seconds: seconds,
				milliseconds: ms
            };
        };

        this._capitalizeFirstLetter = function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        this._getMyScriptReference = function () {
            var scripts = document.getElementsByTagName("script");
            var scriptSource = 'Gamesmith_analytics';
            for (var i = 0; i < scripts.length; i++) {
                if (scripts[i].src && scripts[i].src.toLowerCase().indexOf(scriptSource.toLowerCase()) > -1)
                    return scripts[i];
            }

            return document;
        };

        this._getQueryStringOfScript = function () {
            var querystring = me._getMyScriptReference().src.replace(/^[^\?]+\?/, '');
            return querystring;
        };

        this._parseQueryString = function (querystring) {
            var options = querystring.split("&");
            var len = options.length;
            var i = 0;
            var qsObj = {};
            for (; i < len; i++) {
                var optionValue = options[i].split("=");
                qsObj[optionValue[0].toLowerCase()] = optionValue[1];
            }

            return qsObj;
        };

        return new function () {
            me._initialize();
        }; //end constructor
    };

    try {
        window.__Gsa = new Gsmith.analytics.collector();
    }
    catch (err) {
        console.log(err);
    }
})();

