console.log("test")(function () {
  window.Gsmith = window.Gsmith || {};
  window.Gsmith.analytics = window.Gsmith.analytics || {};
  window.Gsmith.analytics.visualizer = function () {
    var me = this;
    me._gaTrackingCode;
    me._gaViewId;
    me._signedToken;
    me._userAuthToken;
    me._container;
    me._now;
    me._then;
    me._userId;
    me._studio;
    me._reportViewType;
    me._reportsInitialized;
    me._activeXHR;
    me._userDataToFetch;
    me._replaceWords = [
      "studios",
      "studio",
      "games",
      "entertainment",
      "productions",
      "talent",
      "pictures",
      "inc",
      "inc.",
      "management",
      "animations",
      "interactive",
    ];
    me._baseResources = [
      {
        attrs: [
          { name: "type", value: "text/javascript" },
          {
            name: "src",
            value: "https://apis.google.com/js/client:platform.js",
          },
        ],
        type: "script",
      },
      {
        attrs: [
          { name: "type", value: "text/javascript" },
          {
            name: "src",
            value:
              "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js",
          },
        ],
        type: "script",
        callback: function () {
          window.moment = moment;
        },
      },
      {
        attrs: [
          { name: "type", value: "text/javascript" },
          {
            name: "src",
            value:
              "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js",
          },
        ],
        type: "script",
      },
      {
        attrs: [
          { name: "type", value: "text/javascript" },
          { name: "src", value: "Chart.bundle.js" },
        ],
        type: "script",
      },
    ];
    me._resources = [
      {
        attrs: [
          { name: "type", value: "text/javascript" },
          { name: "src", value: "daterangepicker.min.js" },
        ],
        type: "script",
      },
      {
        attrs: [
          { name: "type", value: "text/javascript" },
          { name: "src", value: "chartjs-plugin-via-datalabels.js" },
        ],
        type: "script",
      },
      {
        attrs: [
          { name: "rel", value: "stylesheet" },
          { name: "href", value: "daterangepicker.css" },
        ],
        type: "link",
      },
      {
        attrs: [
          { name: "rel", value: "stylesheet" },
          {
            name: "href",
            value:
              "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.css",
          },
        ],
        type: "link",
      },
    ];

    this._initialize = function () {
      me._setDataParams();

      var clb = function () {
        //ADD CLIENT LIBRARIES FOR CHARTS.JS, JQUERY, MOMENT, ANY NEEDED EMBED API COMPONENTS, CSS LIBRARIES (CHARTS AND CUSTOM)
        me._addResources(function () {
          //CREATE REPORTS UI
          //me._createUIReports();
          //me._gst(me._getReports);
          me._gst(me._createUIReports);
        }, false);
      };
      me._addResources(clb, true);
    };

    this._setDataParams = function () {
      var qsObj = me._parseQueryString(me._getQueryStringOfScript());
      var userDataObj = window.localStorage["userData"]
        ? JSON.parse(window.localStorage["userData"])
        : {};
      var authTokenDataObj = window.localStorage["authToken"]
        ? JSON.parse(window.localStorage["authToken"])
        : {};
      me._gaTrackingCode = qsObj.id;
      me._gaViewId = qsObj.view;
      me._userId = qsObj.user || userDataObj.id;
      me._userId =
        me._parseQueryString(window.location.search.replace("?", "")).user ||
        me._userId;
      me._studio = qsObj.studio || userDataObj.studioSlug;
      me._studio =
        me._parseQueryString(window.location.search.replace("?", "")).studio ||
        me._studio;
      me._reportViewType = me._studio ? "studio" : "maker";
      me._activeXHR = 0;
      me._signedToken = qsObj.token;
      me._userAuthToken = qsObj.userAuth || authTokenDataObj.token;
      me._userAuthToken =
        me._parseQueryString(window.location.search.replace("?", ""))
          .userauth || me._userAuthToken;
      me._userDataToFetch = {};
      console.log("path:", me._getMyScriptHostnamePath());
      me._resources.push({
        attrs: [
          { name: "type", value: "text/javascript" },
          {
            name: "src",
            value: me._getMyScriptHostnamePath() + "/jsrsasign-all-min.js",
          },
        ],
        type: "script",
      });
      //            if (window.location.href.toLowerCase().indexOf('gamesmith.com') == -1) {
      me._resources.push({
        attrs: [
          { name: "rel", value: "stylesheet" },
          { name: "href", value: me._getMyScriptHostnamePath() + "/main2.css" },
        ],
        type: "link",
      });
      //            }
    };

    this._addResources = function (doneCallback, isBase) {
      var resources = isBase ? me._baseResources : me._resources;
      for (var i = 0; i < resources.length; i++) {
        var resource = resources[i] || {};
        if (resource.type && resource.attrs) {
          var el = document.createElement(resource.type);
          var fs =
            document.getElementsByTagName(resource.type)[0] ||
            me._getMyScriptReference();
          for (var a = 0; a < resource.attrs.length; a++) {
            var atr = resource.attrs[a];
            el.setAttribute(atr.name, atr.value);
          }

          el.onload = function (evt) {
            var elm =
              evt.target.getAttribute("src") || evt.target.getAttribute("href");
            elm = elm || "";
            for (r = 0; r < resources.length; r++) {
              var jsonRes = JSON.stringify(resources[r]);
              if (jsonRes.toLowerCase().indexOf(elm.toLowerCase()) > -1) {
                if (resources[r].callback) resources[r].callback();
                resources[r] = null;
                break;
              }
            }

            for (var r = 0; r < resources.length; r++) {
              if (resources[r]) return;
            }
            if (doneCallback) doneCallback();
          };
          fs.parentNode.insertBefore(el, fs);
        }
      }
    };

    this._createUIReports = function () {
      var html;
      switch (me._reportViewType) {
        case "maker":
          html =
            '<main class="Site-main"><div class="Content"><div class="u-lg-hidden"><div class="Titles Titles--hero"><h3 class="Titles-main">My Gamesmith Profile Statistics</h3>' +
            "<p>Welcome to your stats and analytics dashboard! Here you'll see all your game maker page stats " +
            '<span class="analytics-dateranger"></span></p>' +
            "</div></div></div>" +
            '<div class="analytics-container">' +
            '<div class="Chartjs maker"><p><span class="uniqueViewerCountMaker">0</span> makers viewed your profile <span class="totalViewCountMaker">0</span> times <span class="analytics-dateranger"></span>' +
            '<span class="percentChangeMaker"></span></p><div class="Chartjs-figure" id="chart-1-container"></div></div> ' +
            '<div class="Chartjs maker"><p><span class="uniqueViewerCountStudio">0</span> studios viewed your profile <span class="totalViewCountStudio">0</span> times <span class="analytics-dateranger"></span>' +
            '<span class="percentChangeStudio"></span></p><div class="Chartjs-figure" id="chart-2-container"></div></div>' +
            "</div>" +
            '<div class="analytics-container">' +
            '<div class="gridTableContainer"><div class="gridHeader">Makers who viewed your profile <span class="analytics-dateranger"></span></div><div class="gridReveal"><div id="grid-1-container" class="gridTable"></div></div>' +
            '<div class="gridFooter">Show more &#9660</div></div>' +
            '<div class="gridTableContainer"><div class="gridHeader">Studios who viewed your profile <span class="analytics-dateranger"></span></div><div class="gridReveal"><div id="grid-2-container" class="gridTable"></div></div>' +
            '<div class="gridFooter">Show more &#9660</div></div>' +
            "</div></main>";
          break;
        case "studio":
          html =
            '<main class="Site-main"><div class="Content"><div class="u-lg-hidden"><div class="Titles Titles--hero"><h3 class="Titles-main">Stats and Analytics</h3>' +
            "<p>Welcome to your stats and analytics dashboard! Here you'll see all your studio page stats like:<br>visits, average time spent, views and much more " +
            '<span class="analytics-dateranger"></span></p>' +
            "</div></div></div>" +
            '<div class="analytics-container">' +
            '<div class="chartsContainer"><h4>Performance <span class="analytics-dateranger"></span></h4>' +
            "<p>Average Time on Page</p>" +
            '<div class="Chartjs-studio"><div class="Chartjs-figure-studio" id="chart-1-container"></div></div>' +
            "<p>Total Page Views</p>" +
            '<div class="Chartjs-studio"><div class="Chartjs-figure-studio" id="chart-2-container"></div></div>' +
            "</div>" +
            '<div class="summaryDataContainer">' +
            '<div class="summaryDataContainerRow">' +
            '<div class="summaryData">' +
            '<h4>Studio Views<br><span class="analytics-dateranger"></span></h4>' +
            '<p>Total Page Views: <span class="totalPageVisits"></span></p>' +
            '<p>Total Time: <span class="totalTimeSpent"></span></p>' +
            "</div>" +
            '<div class="summaryData">' +
            '<h4>Job Postings<br><span class="analytics-dateranger"></span></h4>' +
            '<p>Total Job Postings Views: <span class="totalJobPostViews"></span></p>' +
            '<p>Total Time: <span class="totalTimeSpentJobPost"></span></p>' +
            "</div>" +
            "</div>" +
            '<div class="summaryDataContainerRow nestedChart">' +
            '<p><span class="uniqueViewerCountMaker">0</span> viewed your page <span class="totalViewCountMaker">0</span> times <span class="analytics-dateranger"></span>' +
            '<span class="percentChangeMaker"></span></p>' +
            '<div class="Chartjs-studio">' +
            '<div class="Chartjs-figure" id="chart-3-container"></div>' +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div class="analytics-container">' +
            '<div class="gridTableContainer">' +
            '<div class="gridHeader">Who viewed your job postings <span class="analytics-dateranger"></span></div>' +
            '<div class="gridReveal"><div id="grid-1-container" class="gridTable"></div></div>' +
            '<div class="gridFooter">Show more &#9660</div>' +
            "</div>" +
            '<div class="gridTableContainer">' +
            '<div class="gridHeader">Who viewed your page <span class="analytics-dateranger"></span></div>' +
            '<div class="gridReveal"><div id="grid-2-container" class="gridTable"></div></div>' +
            '<div class="gridFooter">Show more &#9660</div>' +
            "</div>" +
            "</div></main>";
          break;
      }

      $("#mainUIContainer").html(html);
      me._initializeDatePicker();
    };

    this._initializeDatePicker = function () {
      $(".analytics-dateranger").daterangepicker({
        autoApply: true,
        ranges: {
          Today: [moment(), moment()],
          Yesterday: [
            moment().subtract(1, "days"),
            moment().subtract(1, "days"),
          ],
          "Past 7 days": [moment().subtract(6, "days"), moment()],
          "This month": [moment().startOf("month"), moment().endOf("month")],
          "Past 30 days": [moment().subtract(29, "days"), moment()],
          "Past 90 days": [moment().subtract(89, "days"), moment()],
        },
        alwaysShowCalendars: true,
        startDate: moment().subtract(6, "days"),
        endDate: moment(),
        opens: "center",
        autoUpdateInput: false,
      });

      var applyDaterange = function (ev, picker) {
        var start = picker.startDate;
        var end = picker.endDate;
        if (start.isSame(moment(), "day") && end.isSame(moment(), "day"))
          $(".analytics-dateranger").html("for today");
        else if (
          start.isSame(moment().subtract(1, "days"), "day") &&
          end.isSame(moment().subtract(1, "days"), "day")
        )
          $(".analytics-dateranger").html("for yesterday");
        else if (
          start.isSame(moment().subtract(6, "days"), "day") &&
          end.isSame(moment(), "day")
        )
          $(".analytics-dateranger").html("in the past 7 days");
        else if (
          start.isSame(moment().startOf("month"), "day") &&
          end.isSame(moment().endOf("month"), "day")
        )
          $(".analytics-dateranger").html("for the month");
        else if (
          start.isSame(moment().subtract(29, "days"), "day") &&
          end.isSame(moment(), "day")
        )
          $(".analytics-dateranger").html("in the past 30 days");
        else if (
          start.isSame(moment().subtract(89, "days"), "day") &&
          end.isSame(moment(), "day")
        )
          $(".analytics-dateranger").html("in the past 90 days");
        else
          $(".analytics-dateranger").html(
            "for " +
              start.format("MMM D, YYYY") +
              " - " +
              end.format("MMM D, YYYY")
          );
        me._then = start;
        me._now = end;
        me._getReports();
      };

      $(".analytics-dateranger").on("apply.daterangepicker", applyDaterange);
      $(".analytics-dateranger").data("daterangepicker").clickApply();
    };

    this._queryReport = function (_reportRequests, _dataReceivedClb) {
      if (_reportRequests.length > 0) {
        (function (reportRequests, dataReceivedClb) {
          var clb = function (response) {
            if (response.status == 401) {
              me._gst(function () {
                me._queryReport(reportRequests, dataReceivedClb);
              });
            } else dataReceivedClb(response);
          };
          gapi.client
            .request({
              path: "/v4/reports:batchGet?access_token=" + me._signedToken,
              root: "https://analyticsreporting.googleapis.com/",
              method: "POST",
              body: {
                reportRequests: reportRequests,
              },
            })
            .then(clb, console.error.bind(console));
        })(_reportRequests, _dataReceivedClb);
      } else _dataReceivedClb(null);
    };

    this._getReports = function () {
      if (!me._reportsInitialized) {
        //SET CHART GLOBALS
        Chart.plugins.unregister(ChartDataLabels);
        Chart.defaults.global.elements.point.radius = 5;
        Chart.defaults.global.elements.point.borderColor =
          "rgba(236, 224, 5, 1)";
        Chart.defaults.global.elements.point.backgroundColor =
          "rgba(48, 50, 55, 1)";
        Chart.defaults.global.elements.point.borderWidth = 0.5;
        Chart.defaults.global.elements.line.tension = 0.1;
        Chart.defaults.global.elements.line.borderColor =
          "rgba(236, 224, 5, 1)";
        Chart.defaults.global.elements.line.backgroundColor =
          "rgba(236, 224, 5, .5)";
        Chart.defaults.global.legend.display = false;
        //OVERRIDE FOR ROUNDED BORDERS OF BAR CHART
        Chart.elements.Rectangle.prototype.draw = me._barChartDraw;
        me._reportsInitialized = true;
      }
      //HANDLE DATE RANGE
      var now = me._now.format("YYYY-MM-DD");
      var then = me._then.day(0).format("YYYY-MM-DD");
      //RESET GRIDS
      $(".gridTable").empty();
      if (me._reportViewType == "maker") {
        //REQUEST FOR NUMBER OF VIEWERS AND WHO
        var reqMaker = {
          viewId: me._gaViewId,
          dateRanges: [{ startDate: then, endDate: now }],
          filtersExpression:
            "ga:eventAction==Maker Pageview;ga:dimension9==maker;ga:dimension2==" +
            me._userId,
          metrics: [
            {
              expression: "ga:metric2",
            },
          ],
          dimensions: [
            {
              name: "ga:dateHourMinute",
            },
          ],
          pivots: [
            {
              dimensions: [
                {
                  name: "ga:dimension1",
                },
              ],
              metrics: [
                {
                  expression: "ga:metric2",
                },
              ],
            },
          ],
        };

        var renderReportMaker = function (data) {
          //TRANSLATE DATA FOR MAKER VIEWS
          var headers = data
            ? data.result.reports[0].columnHeader.metricHeader.pivotHeaders[0]
                .pivotHeaderEntries || []
            : [];
          var uniqViewerCount = headers.length;
          var totalViewCount = data
            ? data.result.reports[0].data.totals[0].values[0] || 0
            : 0;
          $(".uniqueViewerCountMaker").html(uniqViewerCount);
          $(".totalViewCountMaker").html(totalViewCount);
          var rows = data ? data.result.reports[0].data.rows : [];
          var chartData =
            uniqViewerCount > 0 ? translateGADataToChartData(rows) : [];
          var change = rows ? me._calculateWeekDifferencePct(rows) : 0;
          $(".percentChangeMaker").html(
            '<span class="' +
              (change < 0 ? 'red">' : 'green">+') +
              change +
              '% <span class="smaller">since last week</span></span>'
          );
          //NUMBER OF VIEWS CHART
          var ctx = me._makeChartCanvas("chart-1-container");
          var chartOptions = {
            type: "line",
            data: {
              datasets: [
                {
                  label: "Pageviews",
                  data: chartData,
                  borderWidth: 2,
                },
              ],
            },
            options: {
              scales: {
                xAxes: [
                  {
                    type: "time",
                    time: {
                      unit: "day",
                      tooltipFormat: "MMM Do YYYY",
                    },
                    ticks: {
                      min: moment().subtract(90, "day"),
                      max: moment(),
                      fontColor: "rgba(195, 195, 195, 1)",
                      fontSize: 12,
                      autoSkip: false,
                      maxRotation: 0,
                      minRotation: 0,
                      maxTicksLimit: 7,
                    },
                    gridLines: {
                      display: false,
                      zeroLineColor: "rgba(0, 0, 0, 0)",
                      zeroLineWidth: 0,
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      fontColor: "rgba(195, 195, 195, 1)",
                      fontSize: 12,
                      min: 0,
                      maxTicksLimit: 5,
                      padding: 10,
                    },
                    gridLines: {
                      color: "rgba(156, 156, 158, 1)",
                      zeroLineWidth: 1,
                      zeroLineColor: "rgba(156, 156, 158, 1)",
                      drawTicks: false,
                    },
                  },
                ],
              },
              layout: {
                padding: {
                  bottom: 12,
                },
              },
            },
          };
          var myLineChart = new Chart(ctx, chartOptions);

          //WHICH VIEWERS GRID
          var $whichMakers = $("#grid-1-container");
          var gridData =
            uniqViewerCount > 0 ? translateGADataToGridData(rows, headers) : {};
          var $drow = $('<div class="gridRow"></div>');
          $whichMakers.append($drow);
          var index = 0;
          for (var gd = 0; gd < gridData.length; gd++) {
            var t = moment(gridData[gd].lastVisit, "YYYYMMDDhhmm");
            t = t.fromNow();
            var prop = gridData[gd].userId;
            if (!me._userDataToFetch[prop])
              me._userDataToFetch[prop] = { found: false, data: {} };
            var html =
              '<div class="gridCell gridCell_' +
              prop +
              '">' +
              '<a href="https://www.gamesmith.com/maker/' +
              prop +
              '"><img class="thumb img_' +
              prop +
              '" />' +
              '<span class="name_' +
              prop +
              '"></span>' +
              '<span class="title_' +
              prop +
              '"></span>' +
              '<span class="time_' +
              prop +
              '">' +
              t +
              "</span></div>";
            var $dt = $(html);
            $drow.append($dt);
            index++;
            if (index % 4 == 0) {
              $drow = $('<div class="gridRow"></div>');
              $whichMakers.append($drow);
            }
          }
          me._queryReport([reqStudio], renderReportStudio);
        };

        //REQUEST FOR NUMBER OF STUDIOS AND WHO
        var reqStudio = {
          viewId: me._gaViewId,
          dateRanges: [{ startDate: then, endDate: now }],
          filtersExpression:
            "ga:eventAction==Maker Pageview;ga:dimension9==studio;ga:dimension2==" +
            me._userId,
          metrics: [
            {
              expression: "ga:metric2",
            },
          ],
          dimensions: [
            {
              name: "ga:dateHourMinute",
            },
          ],
          pivots: [
            {
              dimensions: [
                {
                  name: "ga:dimension1",
                },
              ],
              metrics: [
                {
                  expression: "ga:metric2",
                },
              ],
            },
          ],
        };

        var renderReportStudio = function (data) {
          //TRANSLATE DATA FOR MAKER VIEWS
          var headers = data
            ? data.result.reports[0].columnHeader.metricHeader.pivotHeaders[0]
                .pivotHeaderEntries || []
            : [];
          var uniqViewerCount = headers.length;
          var totalViewCount = data
            ? data.result.reports[0].data.totals[0].values[0] || 0
            : 0;
          $(".uniqueViewerCountStudio").html(uniqViewerCount);
          $(".totalViewCountStudio").html(totalViewCount);
          var rows = data ? data.result.reports[0].data.rows : [];
          var chartData =
            uniqViewerCount > 0 ? translateGADataToChartData(rows) : [];
          var change = rows ? me._calculateWeekDifferencePct(rows) : 0;
          $(".percentChangeStudio").html(
            '<span class="' +
              (change < 0 ? 'red">' : 'green">+') +
              change +
              '% <span class="smaller">since last week</span></span>'
          );
          //NUMBER OF VIEWS CHART
          var ctx = me._makeChartCanvas("chart-2-container");
          var chartOptions = {
            type: "line",
            data: {
              datasets: [
                {
                  label: "Pageviews",
                  data: chartData,
                  borderWidth: 2,
                },
              ],
            },
            options: {
              scales: {
                xAxes: [
                  {
                    type: "time",
                    time: {
                      unit: "day",
                      tooltipFormat: "MMM Do YYYY",
                    },
                    ticks: {
                      min: moment().subtract(90, "day"),
                      max: moment(),
                      fontColor: "rgba(195, 195, 195, 1)",
                      fontSize: 12,
                      autoSkip: false,
                      maxRotation: 0,
                      minRotation: 0,
                      maxTicksLimit: 7,
                    },
                    gridLines: {
                      display: false,
                      zeroLineColor: "rgba(0, 0, 0, 0)",
                      zeroLineWidth: 0,
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      fontColor: "rgba(195, 195, 195, 1)",
                      fontSize: 12,
                      min: 0,
                      maxTicksLimit: 5,
                      padding: 10,
                    },
                    gridLines: {
                      color: "rgba(156, 156, 158, 1)",
                      zeroLineWidth: 1,
                      zeroLineColor: "rgba(156, 156, 158, 1)",
                      drawTicks: false,
                    },
                  },
                ],
              },
              layout: {
                padding: {
                  bottom: 12,
                },
              },
            },
          };
          var myLineChart = new Chart(ctx, chartOptions);

          //WHICH STUDIOS GRID
          var $whichStudios = $("#grid-2-container");
          var gridData =
            uniqViewerCount > 0 ? translateGADataToGridData(rows, headers) : {};
          var $drow = $('<div class="gridRow"></div>');
          $whichStudios.append($drow);
          var index = 0;
          for (var gd = 0; gd < gridData.length; gd++) {
            var t = moment(gridData[gd].lastVisit, "YYYYMMDDhhmm");
            t = t.fromNow();
            var prop = gridData[gd].userId;
            if (!me._userDataToFetch[prop])
              me._userDataToFetch[prop] = { found: false, data: {} };
            var html =
              '<div class="gridCell gridCell_' +
              prop +
              '">' +
              '<a href="https://www.gamesmith.com/maker/' +
              prop +
              '"><img class="thumb img_' +
              prop +
              '" />' +
              '<span class="name_' +
              prop +
              '"></span>' +
              '<span class="title_' +
              prop +
              '"></span>' +
              '<span class="time_' +
              prop +
              '">' +
              t +
              "</span></div>";
            var $dt = $(html);
            $drow.append($dt);
            index++;
            if (index % 4 == 0) {
              $drow = $('<div class="gridRow"></div>');
              $whichStudios.append($drow);
            }
          }

          var addDataReq = me._buildAddDataRequest(reqStudio);
          me._queryReport(addDataReq, me._setMissingData);
        };
        me._queryReport([reqMaker], renderReportMaker);

        //ATTACH VIEW MORE HANDLER
        $(".gridFooter").click(me._handleGridExpand);
      }

      if (me._reportViewType == "studio") {
        /***************************** */
        //STUDIO PAGE VIEWS AND TIME
        var reqStudioData = {
          viewId: me._gaViewId,
          dateRanges: [{ startDate: then, endDate: now }],
          metrics: [
            {
              expression: "ga:metric1/ga:metric2*1000",
              formattingType: "FLOAT",
              alias: "Average_Time_Per_Page_View",
            },
            {
              expression: "ga:metric1*1000",
              formattingType: "INTEGER",
              alias: "Total_Time_On_Page",
            },
            {
              expression: "ga:metric2",
              formattingType: "INTEGER",
              alias: "Total_Page_Views",
            },
            {
              expression: "(ga:eventValue-ga:metric2)/1000",
              formattingType: "INTEGER",
              alias: "Total_Time_On_Page_By_Event_Value",
            },
            {
              expression:
                "((ga:eventValue-ga:metric2)/1000)/(ga:eventValue-ga:metric1)",
              formattingType: "FLOAT",
              alias: "Average_Time_Per_Page_View_By_Event_Value",
            },
          ],
          dimensions: [
            {
              name: "ga:dimension2",
            },
          ],
          orderBys: [
            {
              fieldName: "Average_Time_Per_Page_View",
              sortOrder: "ASCENDING",
            },
          ],
          filtersExpression: "ga:eventAction=@Studio Pageview", //;ga:dimension1!=-1"
        };
        var renderReportStudioTime = function (data) {
          //TRANSLATE DATA FOR STUDIO PAGEVIEW TIME
          var rows = data ? data.result.reports[0].data.rows || [] : [];
          var chartData = translateGADataToChartDataStudio(rows, 0);
          //LIMIT TO TOP 20
          var data =
            chartData.data.length > 19
              ? chartData.data.slice(chartData.data.length - 20)
              : chartData.data;
          var labels =
            chartData.labels.length > 19
              ? chartData.labels.slice(chartData.labels.length - 20)
              : chartData.labels;
          //MAKE SURE THIS STUDIO IS SHOWN
          if (
            chartData.data.length > 19 &&
            chartData.studioIndex &&
            chartData.studioIndex < chartData.data.length - 20
          ) {
            data.unshift(chartData.data[chartData.studioIndex]);
            labels.unshift(chartData.labels[chartData.studioIndex]);
            chartData.studioIndex = 0;
          } else if (chartData.data.length > 19 && chartData.studioIndex) {
            chartData.studioIndex -= chartData.data.length - 20;
          }
          //SETUP STUDIO COLOR AND FIGURE CHART WIDTH FOR SCROLL
          var colors = [];
          var chartScrollWidth = 0;
          for (var i = 0; i < data.length; i++) {
            colors.push(
              chartData.studioIndex == i
                ? "rgba(255, 221, 0, 1)"
                : "rgba(195, 195, 195, 1)"
            );
            chartScrollWidth += 70;
          }
          $("#chart-1-container").width(chartScrollWidth);

          /************************/
          //STUDIO PAGEVIEW TIME CHART
          var ctx = me._makeChartCanvas("chart-1-container");
          var chartOptions = {
            type: "bar",
            data: {
              labels: labels,
              datasets: [
                {
                  label: "Avg Time Viewed",
                  data: data,
                  backgroundColor: colors,
                  borderWidth: 0,
                  barPercentage: 0.25,
                },
              ],
            },
            plugins: [ChartDataLabels],
            options: {
              plugins: {
                // Change options for ALL labels of THIS CHART
                datalabels: {
                  color: function (context) {
                    return context.dataIndex == chartData.studioIndex
                      ? "rgba(255, 221, 0, 1)"
                      : "rgba(195, 195, 195, 1)";
                  },
                  anchor: "start",
                  textAlign: "center",
                  offset: -30,
                  font: {
                    size: 11,
                  },
                  rotation: -30,
                  formatter: function (val, context) {
                    var values = context.chart.data.labels;
                    var value = values[context.dataIndex];
                    var index = context.dataIndex;
                    return [
                      me._replaceArray(value, me._replaceWords, ""),
                      moment(values.length - index, "DD").format("Do"),
                    ];
                  },
                },
              },
              scales: {
                xAxes: [
                  {
                    ticks: {
                      fontSize: 11,
                      padding: 30,
                      maxRotation: 30,
                      minRotation: 0,
                      callback: function (value, index, values) {
                        return [" ", " "];
                      },
                    },
                    gridLines: {
                      display: false,
                      zeroLineColor: "rgba(0, 0, 0, 0)",
                      zeroLineWidth: 0,
                    },
                  },
                ],
                yAxes: [
                  {
                    type: "linear",
                    ticks: {
                      fontColor: "rgba(195, 195, 195, 1)",
                      fontSize: 11,
                      min: 0,
                      maxTicksLimit: 5,
                      //autoSkip: false,
                      //source: 'data',
                      padding: 3,
                      callback: function (value, index, values) {
                        return index % Math.round(values.length / 4) == 0
                          ? Math.round(moment.duration(value).asMinutes()) +
                              " mins"
                          : "";
                      },
                    },
                    gridLines: {
                      color: "rgba(156, 156, 158, 1)",
                      zeroLineWidth: 1,
                      zeroLineColor: "rgba(156, 156, 158, 1)",
                      drawTicks: false,
                      borderDash: [8, 5],
                    },
                  },
                ],
              },
              layout: {
                padding: {
                  left: 10,
                  right: 10,
                  top: 15,
                  bottom: 0,
                },
              },
              tooltips: {
                callbacks: {
                  title: function (tooltipItem, data) {
                    return data.labels[tooltipItem[0].index];
                  },
                  label: function (tooltipItem, data) {
                    return (
                      "Avg Time Viewed: " +
                      Math.round(
                        moment.duration(tooltipItem.yLabel).asMinutes()
                      ) +
                      " mins"
                    );
                  },
                },
              },
            },
          };
          var myBarChart = new Chart(ctx, chartOptions);
        };

        var renderReportStudioVisits = function (data) {
          //TRANSLATE DATA FOR STUDIO PAGE VIEWS
          var rows = data ? data.result.reports[0].data.rows || [] : [];
          var chartData = translateGADataToChartDataStudio(rows, 2);
          //LIMIT TO TOP 20
          var data =
            chartData.data.length > 19
              ? chartData.data.slice(chartData.data.length - 20)
              : chartData.data;
          var labels =
            chartData.labels.length > 19
              ? chartData.labels.slice(chartData.labels.length - 20)
              : chartData.labels;
          //MAKE SURE THIS STUDIO IS SHOWN
          if (
            chartData.data.length > 19 &&
            chartData.studioIndex &&
            chartData.studioIndex < chartData.data.length - 20
          ) {
            data.unshift(chartData.data[chartData.studioIndex]);
            labels.unshift(chartData.labels[chartData.studioIndex]);
            chartData.studioIndex = 0;
          } else if (chartData.data.length > 19 && chartData.studioIndex) {
            chartData.studioIndex -= chartData.data.length - 20;
          }
          //SETUP STUDIO COLOR AND FIGURE CHART WIDTH FOR SCROLL
          var colors = [];
          var chartScrollWidth = 0;
          for (var i = 0; i < data.length; i++) {
            colors.push(
              chartData.studioIndex == i
                ? "rgba(255, 221, 0, 1)"
                : "rgba(195, 195, 195, 1)"
            );
            chartScrollWidth += 70;
          }
          $("#chart-2-container").width(chartScrollWidth);

          /************************/
          //STUDIO PAGEVIEWS CHART
          var ctx = me._makeChartCanvas("chart-2-container");
          var chartOptions = {
            type: "bar",
            data: {
              labels: labels,
              datasets: [
                {
                  label: "Page Visits",
                  data: data,
                  backgroundColor: colors,
                  borderWidth: 0,
                  barPercentage: 0.25,
                },
              ],
            },
            plugins: [ChartDataLabels],
            options: {
              plugins: {
                // Change options for ALL labels of THIS CHART
                datalabels: {
                  color: function (context) {
                    return context.dataIndex == chartData.studioIndex
                      ? "rgba(255, 221, 0, 1)"
                      : "rgba(195, 195, 195, 1)";
                  },
                  anchor: "start",
                  textAlign: "center",
                  offset: -30,
                  font: {
                    size: 11,
                  },
                  rotation: -30,
                  formatter: function (val, context) {
                    var values = context.chart.data.labels;
                    var value = values[context.dataIndex];
                    var index = context.dataIndex;
                    return [
                      me._replaceArray(value, me._replaceWords, ""),
                      moment(values.length - index, "DD").format("Do"),
                    ];
                  },
                },
              },
              scales: {
                xAxes: [
                  {
                    ticks: {
                      fontSize: 11,
                      padding: 30,
                      maxRotation: 30,
                      minRotation: 0,
                      callback: function (value, index, values) {
                        return [" ", " "];
                      },
                    },
                    gridLines: {
                      display: false,
                      zeroLineColor: "rgba(0, 0, 0, 0)",
                      zeroLineWidth: 0,
                    },
                  },
                ],
                yAxes: [
                  {
                    type: "linear",
                    ticks: {
                      fontColor: "rgba(195, 195, 195, 1)",
                      fontSize: 11,
                      min: 0,
                      maxTicksLimit: 5,
                      //autoSkip: false,
                      //source: 'data',
                      padding: 5,
                      callback: function (value, index, values) {
                        return value + " views";
                      },
                    },
                    gridLines: {
                      color: "rgba(156, 156, 158, 1)",
                      zeroLineWidth: 1,
                      zeroLineColor: "rgba(156, 156, 158, 1)",
                      drawTicks: false,
                      borderDash: [8, 5],
                    },
                  },
                ],
              },
              layout: {
                padding: {
                  left: 10,
                  right: 10,
                  top: 15,
                  bottom: 0,
                },
              },
              tooltips: {
                callbacks: {
                  title: function (tooltipItem, data) {
                    return data.labels[tooltipItem[0].index];
                  },
                  label: function (tooltipItem, data) {
                    return (
                      data.labels[tooltipItem.index],
                      "Page Views: " + tooltipItem.yLabel
                    );
                  },
                },
              },
            },
          };
          var myBarChart = new Chart(ctx, chartOptions);

          /************************/
          //SET STUDIO PAGE VIEWS TABLE
          chartData = translateGADataToChartDataStudio(rows, 2);
          $(".totalPageVisits").html(
            chartData.data[chartData.studioIndex] || 0
          );
          //TOTAL TIME SPENT ON PAGE
          chartData = translateGADataToChartDataStudio(rows, 1);
          $(".totalTimeSpent").html(
            Math.round(
              moment
                .duration(chartData.data[chartData.studioIndex] || 0)
                .asMinutes()
            ) + " mins"
          );
        };

        me._queryReport([reqStudioData], function (data) {
          renderReportStudioTime(data);
          renderReportStudioVisits(data);
        });

        /***************************** */
        //JOB VIEWS AND TIME
        var reqJobData = {
          viewId: me._gaViewId,
          dateRanges: [{ startDate: then, endDate: now }],
          metrics: [
            {
              expression: "ga:metric1/ga:metric2*1000",
              formattingType: "FLOAT",
              alias: "Average_Time_Per_Page_View",
            },
            {
              expression: "ga:metric1*1000",
              formattingType: "INTEGER",
              alias: "Total_Time_On_Page",
            },
            {
              expression: "ga:metric2",
              formattingType: "INTEGER",
              alias: "Total_Page_Views",
            },
          ],
          dimensions: [
            {
              name: "ga:dimension4",
            },
          ],
          orderBys: [
            {
              fieldName: "Total_Page_Views",
              sortOrder: "ASCENDING",
            },
          ],
          filtersExpression:
            "ga:eventAction=@Job Pageview;ga:dimension4==" + me._studio,
        };

        var renderJobData = function (data) {
          var rows = data ? data.result.reports[0].data.rows || [] : [];
          /************************/
          //SET JOB TOTAL VIEWS TABLE
          var chartData = translateGADataToChartDataStudio(rows, 2);
          $(".totalJobPostViews").html(
            chartData.data[chartData.studioIndex] || 0
          );
          //TOTAL TIME SPENT ON JOB VIEWS TABLE
          chartData = translateGADataToChartDataStudio(rows, 1);
          $(".totalTimeSpentJobPost").html(
            Math.round(
              moment
                .duration(chartData.data[chartData.studioIndex] || 0)
                .asMinutes()
            ) + " mins"
          );
        };
        me._queryReport([reqJobData], renderJobData);

        /***************************** */
        //STUDIO PAGE VIEWERS
        var reqStudioPageViewerData = {
          //REQUEST FOR NUMBER OF VIEWERS AND WHO
          viewId: me._gaViewId,
          dateRanges: [{ startDate: then, endDate: now }],
          includeEmptyRows: true,
          filtersExpression:
            "ga:eventAction==Studio Pageview;ga:dimension2==" + me._studio,
          metrics: [
            {
              expression: "ga:metric2",
              alias: "Total_Page_Views_By_User",
              formattingType: "INTEGER",
            },
          ],
          dimensions: [
            {
              name: "ga:dateHourMinute",
            },
          ],
          pivots: [
            {
              dimensions: [
                {
                  name: "ga:dimension1",
                },
              ],
              metrics: [
                {
                  expression: "ga:metric2",
                },
              ],
            },
          ],
        };

        var renderStudioPageViewerData = function (data) {
          //TRANSLATE DATA FOR MAKER VIEWS
          var headers = data
            ? data.result.reports[0].columnHeader.metricHeader.pivotHeaders[0]
                .pivotHeaderEntries || []
            : [];
          var uniqViewerCount = headers.length;
          var totalViewCount = data
            ? data.result.reports[0].data.totals[0].values[0] || 0
            : [];
          $(".uniqueViewerCountMaker").html(uniqViewerCount);
          $(".totalViewCountMaker").html(totalViewCount);
          var rows = data ? data.result.reports[0].data.rows : [];
          var chartData =
            uniqViewerCount > 0 ? translateGADataToChartData(rows) : [];
          var change = rows ? me._calculateWeekDifferencePct(rows) : 0;
          $(".percentChangeMaker").html(
            '<span class="' +
              (change < 0 ? 'red">' : 'green">+') +
              change +
              '% <span class="smaller">since last week</span></span>'
          );
          //NUMBER OF VIEWS CHART
          var ctx = me._makeChartCanvas("chart-3-container");
          var chartOptions = {
            type: "line",
            data: {
              datasets: [
                {
                  label: "Page Views",
                  data: chartData,
                  borderWidth: 2,
                },
              ],
            },
            options: {
              scales: {
                xAxes: [
                  {
                    type: "time",
                    time: {
                      unit: "day",
                      tooltipFormat: "MMM Do YYYY",
                    },
                    ticks: {
                      min: moment().subtract(90, "day"),
                      max: moment(),
                      fontColor: "rgba(195, 195, 195, 1)",
                      fontSize: 12,
                      autoSkip: false,
                      maxRotation: 0,
                      minRotation: 0,
                      maxTicksLimit: 7,
                    },
                    gridLines: {
                      display: false,
                      zeroLineColor: "rgba(0, 0, 0, 0)",
                      zeroLineWidth: 0,
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      fontColor: "rgba(195, 195, 195, 1)",
                      fontSize: 12,
                      min: 0,
                      maxTicksLimit: 5,
                      padding: 10,
                    },
                    gridLines: {
                      color: "rgba(156, 156, 158, 1)",
                      zeroLineWidth: 1,
                      zeroLineColor: "rgba(156, 156, 158, 1)",
                      drawTicks: false,
                    },
                  },
                ],
              },
              layout: {
                padding: {
                  bottom: 12,
                },
              },
            },
          };
          var myLineChart = new Chart(ctx, chartOptions);

          //WHICH VIEWERS GRID
          var $whichMakers = $("#grid-2-container");
          var gridData =
            uniqViewerCount > 0 ? translateGADataToGridData(rows, headers) : {};
          var $drow = $('<div class="gridRow"></div>');
          $whichMakers.append($drow);
          var index = 0;
          for (var gd = 0; gd < gridData.length; gd++) {
            var t = moment(gridData[gd].lastVisit, "YYYYMMDDhhmm");
            t = t.fromNow();
            var prop = gridData[gd].userId;
            if (!me._userDataToFetch[prop])
              me._userDataToFetch[prop] = { found: false, data: {} };
            var html =
              '<div class="gridCell gridCell_' +
              prop +
              '">' +
              '<a href="https://www.gamesmith.com/maker/' +
              prop +
              '"><img class="thumb img_' +
              prop +
              '" />' +
              '<span class="name_' +
              prop +
              '"></span>' +
              '<span class="title_' +
              prop +
              '"></span>' +
              '<span class="time_' +
              prop +
              '">' +
              t +
              "</span></a></div>";
            var $dt = $(html);
            $drow.append($dt);
            index++;
            if (index % 4 == 0) {
              $drow = $('<div class="gridRow"></div>');
              $whichMakers.append($drow);
            }
          }
          me._queryReport([reqStudioJobViewerData], renderStudioJobViewerData);
        };

        /***************************** */
        //STUDIO JOB VIEWERS
        var reqStudioJobViewerData = {
          //REQUEST FOR NUMBER OF VIEWERS AND WHO
          viewId: me._gaViewId,
          dateRanges: [{ startDate: then, endDate: now }],
          includeEmptyRows: true,
          filtersExpression:
            "ga:eventAction==Job Pageview;ga:dimension4==" + me._studio,
          metrics: [
            {
              expression: "ga:metric2",
              alias: "Total_Page_Views_By_User",
              formattingType: "INTEGER",
            },
          ],
          dimensions: [
            {
              name: "ga:dateHourMinute",
            },
          ],
          pivots: [
            {
              dimensions: [
                {
                  name: "ga:dimension1",
                },
              ],
              metrics: [
                {
                  expression: "ga:metric2",
                },
              ],
            },
          ],
        };

        var renderStudioJobViewerData = function (data) {
          //TRANSLATE DATA FOR MAKER VIEWS
          var headers = data
            ? data.result.reports[0].columnHeader.metricHeader.pivotHeaders[0]
                .pivotHeaderEntries || []
            : [];
          var uniqViewerCount = headers.length;
          var rows = data ? data.result.reports[0].data.rows : [];
          //WHICH VIEWERS GRID
          //var userIds = [];
          var $whichMakers = $("#grid-1-container");
          var gridData =
            uniqViewerCount > 0 ? translateGADataToGridData(rows, headers) : {};
          var $drow = $('<div class="gridRow"></div>');
          $whichMakers.append($drow);
          var index = 0;
          for (var gd = 0; gd < gridData.length; gd++) {
            var t = moment(gridData[gd].lastVisit, "YYYYMMDDhhmm");
            t = t.fromNow();
            var prop = gridData[gd].userId;
            //userIds.push(prop);
            if (!me._userDataToFetch[prop])
              me._userDataToFetch[prop] = { found: false, data: {} };
            var html =
              '<div class="gridCell gridCell_' +
              prop +
              '">' +
              '<a href="https://www.gamesmith.com/maker/' +
              prop +
              '"><img class="thumb img_' +
              prop +
              '" />' +
              '<span class="name_' +
              prop +
              '"></span>' +
              '<span class="title_' +
              prop +
              '"></span>' +
              '<span class="time_' +
              prop +
              '">' +
              t +
              "</span></div>";
            var $dt = $(html);
            $drow.append($dt);
            index++;
            if (index % 4 == 0) {
              $drow = $('<div class="gridRow"></div>');
              $whichMakers.append($drow);
            }
          }
          var addDataReq = me._buildAddDataRequest(reqStudioPageViewerData);
          me._queryReport(addDataReq, me._setMissingData);
        };
        me._queryReport([reqStudioPageViewerData], renderStudioPageViewerData);

        //ATTACH VIEW MORE HANDLER
        $(".gridFooter").click(me._handleGridExpand);
      }

      var translateGADataToChartData = function (rows) {
        var chartData = [];
        var dateAggregateObj = {};
        for (var i = 0; i < rows.length; i++) {
          var dt = rows[i].dimensions[0].slice(0, 8);
          var value = parseInt(rows[i].metrics[0].values[0]);
          if (!dateAggregateObj[dt]) dateAggregateObj[dt] = value;
          else dateAggregateObj[dt] += value;
        }
        for (var d in dateAggregateObj)
          chartData.push({ x: moment(d, "YYYYMMDD"), y: dateAggregateObj[d] });
        return chartData;
      };

      var translateGADataToGridData = function (rows, headers) {
        var dataAgg = [];
        for (var i = rows.length - 1; i > -1; i--) {
          var values = rows[i].metrics[0].pivotValueRegions[0].values;
          var uid;
          for (var h = 0; h < values.length; h++) {
            if (
              values[h] &&
              !isNaN(parseInt(values[h])) &&
              parseInt(values[h]) > 0
            ) {
              uid = headers[h].dimensionValues[0];
              if (!me._findObjectInArray(dataAgg, "userId", uid))
                dataAgg.push({
                  userId: uid,
                  value: parseInt(values[h]),
                  lastVisit: rows[i].dimensions[0],
                });
              else
                me._findObjectInArray(dataAgg, "userId", uid).value += parseInt(
                  values[h]
                );
            }
          }
        }
        return dataAgg;
      };

      var translateGADataToChartDataStudio = function (rows, metricValueIndex) {
        var chartData = { data: [], labels: [], studioIndex: null };
        rows.sort(function (a, b) {
          if (!a.metrics || !a.metrics[0] || !b.metrics || !b.metrics[0])
            return 0;
          return (
            a.metrics[0].values[metricValueIndex] -
            b.metrics[0].values[metricValueIndex]
          );
        });
        for (var i = 0; i < rows.length; i++) {
          chartData.data.push(
            parseFloat(rows[i].metrics[0].values[metricValueIndex])
          );
          chartData.labels.push(me._formatSlug(rows[i].dimensions[0]));
          if (rows[i].dimensions[0].toLowerCase() == me._studio.toLowerCase())
            chartData.studioIndex = i;
        }
        return chartData;
      };
    };

    this._buildAddDataRequest = function (orgReq) {
      var userIds = $.map(me._userDataToFetch, function (value, key) {
        if (!value.found) return key;
      });
      var req = {
        viewId: me._gaViewId,
        dateRanges: orgReq.dateRanges,
        metrics: [
          {
            expression: "ga:metric2",
          },
        ],
        dimensions: [
          {
            name: "ga:dimension1",
          },
          {
            name: "ga:dimension16",
          },
          {
            name: "ga:dimension10",
          },
          {
            name: "ga:dimension11",
          },
        ],
        dimensionFilterClauses: [
          {
            filters: [
              {
                dimensionName: "ga:dimension1",
                operator: "IN_LIST",
                expressions: userIds,
              },
            ],
          },
        ],
      };

      var req2 = {
        viewId: me._gaViewId,
        dateRanges: orgReq.dateRanges,
        metrics: [
          {
            expression: "ga:metric2",
          },
        ],
        dimensions: [
          {
            name: "ga:dimension1",
          },
          {
            name: "ga:dimension14",
          },
          {
            name: "ga:dimension15",
          },
        ],
        dimensionFilterClauses: [
          {
            filters: [
              {
                dimensionName: "ga:dimension1",
                operator: "IN_LIST",
                expressions: userIds,
              },
            ],
          },
        ],
      };

      return userIds.length > 0 ? [req, req2] : [];
    };

    this._replaceArray = function (replaceString, find, replace) {
      var regex;
      for (var i = 0; i < find.length; i++) {
        regex = new RegExp(find[i] + "$", "gi");
        replaceString = replaceString.replace(regex, replace);
      }

      return replaceString.length > 17
        ? replaceString.substr(0, 14) + "..."
        : replaceString;
    };

    this._hashDec = function (ss) {
      var decFromHex = function (h) {
        h = h.toString();
        var s = "";
        for (var i = 0; i < h.length && h.substr(i, 2) != "00"; i += 2) {
          s += String.fromCharCode(parseInt(h.substr(i, 2), 16));
        }
        return decodeURIComponent(escape(s));
      };
      var val = eval(decFromHex(ss));
      return val.replace(/\\x([0-9A-Fa-f]{2})/g, function () {
        return String.fromCharCode(parseInt(arguments[1], 16));
      });
    };

    this._setMissingData = function (data) {
      var found = data
        ? (data.result.reports[0].data.rows || []).concat(
            data.result.reports[1].data.rows || []
          )
        : [];
      for (var r = 0; r < found.length; r++) {
        var userData = found[r].dimensions;
        var userToFetch = me._userDataToFetch[userData[0]];
        if (
          userData.length == 4 &&
          (!userToFetch.found ||
            (!userToFetch.data.thumb && userData[3] != "0"))
        ) {
          userToFetch.data["name"] = me._hashDec(userData[1]);
          userToFetch.data["title"] = userData[2];
          userToFetch.data["thumb"] =
            userData[3] == 
              ? false
              : "https://gamesmith-profile-pic.s3.amazonaws.com/" + userData[0];
          userToFetch.found = true;
        } else if (!userToFetch.found && userData.length == 3) {
          userToFetch.data["name"] = userData[1];
          userToFetch.data["title"] = "Studio Profile";
          userToFetch.data["thumb"] = userData[2];
          userToFetch.found = true;
        }
      }

      me._getMissingData();
    };

    this._updateMissingFields = function () {
      for (var p in me._userDataToFetch) {
        if (p == "-1") {
          $(".name_" + p).html("Guest Viewers");
          $(".title_" + p).html("Unregistered");
          $("img.thumb.img_" + p).replaceWith(
            '<div class="thumbText img_' + p + '">G+</div>'
          );
        } else if (me._userDataToFetch[p].found) {
          $(".name_" + p).html(me._userDataToFetch[p].data.name);
          $(".title_" + p).html(me._userDataToFetch[p].data.title);
          if (!me._userDataToFetch[p].data.thumb) {
            $("img.thumb.img_" + p).replaceWith(
              '<div class="thumbText img_' +
                p +
                '">' +
                me._userDataToFetch[p].data.name.slice(0, 1) +
                (me._userDataToFetch[p].data.name.indexOf(" ") > 0
                  ? me._userDataToFetch[p].data.name.split(" ")[1].slice(0, 1)
                  : "") +
                "</div>"
            );
          } else {
            $("img.thumb.img_" + p).attr(
              "src",
              me._userDataToFetch[p].data.thumb
            );
          }
        } else {
          $(".gridCell_" + p).addClass("delete");
        }
      }

      //BEAUTIFY GRIDS WITH MISSING DATA
      $(".gridTable").each(function () {
        var $this = $(this);
        var countDelete = $this.find(".delete").length;
        $this.find(".delete").remove();
        var $cells = $this.find(".gridCell").clone(true);
        $this.empty();
        if (countDelete > 0)
          $cells.push(
            $(
              '<div class="gridCell"><div class="thumbText">' +
                countDelete +
                "+</div><span>" +
                countDelete +
                " more viewer" +
                (countDelete > 1 ? "s" : "") +
                "</span></div>"
            )
          );
        var $drow = $('<div class="gridRow"></div>');
        $this.append($drow);
        var index = 0;
        for (var gd = 0; gd < $cells.length; gd++) {
          $drow.append($cells[gd]);
          index++;
          if (index % 4 == 0) {
            $drow = $('<div class="gridRow"></div>');
            $this.append($drow);
          }
        }
      });
    };

    this._getMissingData = function () {
      var XHR = new XMLHttpRequest();
      XHR.addEventListener("load", function (event) {
        try {
          if (XHR.status == 200) {
            var response = JSON.parse(XHR.response);
            for (var ro = 0; ro < response.length; ro++) {
              var id = response[ro].id;
              if (
                me._userDataToFetch[id] &&
                (!me._userDataToFetch[id].found ||
                  !me._userDataToFetch[id].data.thumb)
              ) {
                var role = response[ro].curr_role || "n/a";
                var name;
                var hasThumb = "0";
                if (response[ro].profile) {
                  name =
                    (response[ro].profile.first_name || "") +
                    " " +
                    (response[ro].profile.last_name || "");
                  name = name == " " ? "n/a" : name;
                  hasThumb = response[ro].profile.img_url ? "1" : "0";
                }
                name = name || "n/a";
                me._userDataToFetch[id].data.name = name;
                me._userDataToFetch[id].data.title = role;
                me._userDataToFetch[id].data.thumb =
                  hasThumb == "0"
                    ? false
                    : "https://gamesmith-profile-pic.s3.amazonaws.com/" + id;
                me._userDataToFetch[id].found = true;
              }
            }
          }
        } catch (err) {
          console.log(err);
          console.log(XHR.responseText);
        } finally {
          me._updateMissingFields();
        }
      });

      // We define what will happen in case of error
      XHR.addEventListener("error", function (event) {
        console.log("Oops! Something went wrong.");
        me._updateMissingFields();
      });

      var userIds = $.map(me._userDataToFetch, function (value, key) {
        if (!value.found) return key;
      });
      XHR.open(
        "GET",
        "https://api-prod.gamesmith.com/reshufl_search/by_term?term=" +
          userIds.join("||")
      );
      XHR.setRequestHeader("Content-Type", "application/json;charset=utf-8");
      XHR.setRequestHeader("Accept", "application/json, text/plain, */*");
      XHR.send();
    };

    this._barChartDraw = function () {
      var ctx = this._chart.ctx;
      var vm = this._view;
      var left, right, top, bottom, signX, signY, borderSkipped, radius;
      var borderWidth = vm.borderWidth;
      //SET RADIUS HERE
      //IF RADIUS IS LARGE ENOUGH TO CAUSE DRAWING ERRORS A MAX RADIUS IS IMPOSED
      var cornerRadius = 4;

      if (!vm.horizontal) {
        //BAR
        left = vm.x - vm.width / 6;
        right = vm.x + vm.width / 6;
        top = vm.y;
        bottom = vm.base;
        signX = 1;
        signY = bottom > top ? 1 : -1;
        borderSkipped = vm.borderSkipped || "bottom";
      } else {
        //HORIZONTAL BAR
        left = vm.base;
        right = vm.x;
        top = vm.y - vm.height / 2;
        bottom = vm.y + vm.height / 2;
        signX = right > left ? 1 : -1;
        signY = 1;
        borderSkipped = vm.borderSkipped || "left";
      }

      //CANVAS DOESN'T ALLOW US TO STROKE INSIDE THE WIDTH SO WE CAN
      //ADJUST THE SIZES TO FIT IF WE'RE SETTING A STROKE ON THE LINE
      if (borderWidth) {
        //BORDERWIDTH SHOLD BE LESS THAN BAR WIDTH AND BAR HEIGHT.
        var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
        borderWidth = borderWidth > barSize ? barSize : borderWidth;
        var halfStroke = borderWidth / 2;
        //ADJUST BORDERWIDTH WHEN BAR TOP POSITION IS NEAR VM.BASE(ZERO).
        var borderLeft =
          left + (borderSkipped !== "left" ? halfStroke * signX : 0);
        var borderRight =
          right + (borderSkipped !== "right" ? -halfStroke * signX : 0);
        var borderTop =
          top + (borderSkipped !== "top" ? halfStroke * signY : 0);
        var borderBottom =
          bottom + (borderSkipped !== "bottom" ? -halfStroke * signY : 0);
        //NOT BECOME A VERTICAL LINE?
        if (borderLeft !== borderRight) {
          top = borderTop;
          bottom = borderBottom;
        }
        //NOT BECOME A HORIZONTAL LINE?
        if (borderTop !== borderBottom) {
          left = borderLeft;
          right = borderRight;
        }
      }

      ctx.beginPath();
      ctx.fillStyle = vm.backgroundColor;
      ctx.strokeStyle = vm.borderColor;
      ctx.lineWidth = borderWidth;

      //CORNER POINTS, FROM BOTTOM-LEFT TO BOTTOM-RIGHT CLOCKWISE
      //| 1 2 |
      //| 0 3 |
      var corners = [
        [left, bottom],
        [left, top],
        [right, top],
        [right, bottom],
      ];

      //FIND FIRST (STARTING) CORNER WITH FALLBACK TO 'bottom'
      var borders = ["bottom", "left", "top", "right"];
      var startCorner = borders.indexOf(borderSkipped, 0);
      if (startCorner === -1) {
        startCorner = 0;
      }

      function cornerAt(index) {
        return corners[(startCorner + index) % 4];
      }

      //DRAW RECTANGLE FROM 'startCorner'
      var corner = cornerAt(0);
      ctx.moveTo(corner[0], corner[1]);

      for (var i = 1; i < 4; i++) {
        corner = cornerAt(i);
        nextCornerId = i + 1;
        if (nextCornerId == 4) {
          nextCornerId = 0;
        }

        nextCorner = cornerAt(nextCornerId);

        width = corners[2][0] - corners[1][0];
        height = corners[0][1] - corners[1][1];
        x = corners[1][0];
        y = corners[1][1];

        var radius = cornerRadius;

        //FIX RADIUS BEING TOO LARGE
        if (radius > height / 2) {
          radius = height / 2;
        }
        if (radius > width / 2) {
          radius = width / 2;
        }

        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(
          x + width,
          y + height,
          x + width - radius,
          y + height
        );
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
      }

      ctx.fill();
      if (borderWidth) {
        ctx.stroke();
      }
    };

    this._formatSlug = function (slug) {
      var studio = $.trim(slug.replace(/-/g, " "));
      studio = studio.toLowerCase().split(" ");
      for (var s = 0; s < studio.length; s++) {
        studio[s] = studio[s].charAt(0).toUpperCase() + studio[s].substring(1);
      }

      return studio.join(" ");
    };

    this._makeChartCanvas = function (id) {
      var container = document.getElementById(id);
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");

      container.innerHTML = "";
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      container.appendChild(canvas);

      return ctx;
    };

    this._makeGridTable = function (id) {
      var container = document.getElementById(id);
      var grid = document.createElement("div");
      grid.innerHTML = "";
      grid.setAttribute("class", "gridTable");
      container.appendChild(grid);

      return grid;
    };

    /* INTERNAL HELPERS */

    this._handleGridExpand = function () {
      var $this = $(this);
      var $gridReveal = $this.siblings(".gridReveal").first();
      var $gridContainer = $gridReveal.find(".gridTable").first();
      if (!me._originalGridHeight)
        me._originalGridHeight = $gridReveal.height();
      if (me._originalGridHeight == $gridReveal.height()) {
        $gridReveal.height($gridContainer.height());
        $this.html("Show less &#9650");
      } else {
        $gridReveal.height(me._originalGridHeight);
        $this.html("Show more &#9660");
      }
    };

    this._findObjectInArray = function (objArray, key, value) {
      for (var oi = 0; oi < objArray.length; oi++) {
        var objA = objArray[oi];
        if (objA[key] && objA[key] == value) return objA;
      }
      return false;
    };

    this._calculateWeekDifferencePct = function (rows) {
      var currWeek = moment().subtract(7, "day");
      var prevWeek = moment().subtract(14, "day");
      var countCurrWeek = 0;
      var countPrevWeek = 0;
      for (var r = 0; r < rows.length; r++) {
        var dt = rows[r].dimensions[0];
        var value = parseInt(rows[r].metrics[0].values[0]);
        dt = moment(dt, "YYYYMMDDhhmmss");
        if (dt.isAfter(currWeek)) countCurrWeek += value;
        else if (dt.isBetween(prevWeek, currWeek)) countPrevWeek += value;
      }
      return countPrevWeek
        ? Math.round(((countCurrWeek - countPrevWeek) / countPrevWeek) * 100)
        : 100;
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
        return day + ":" + hour + ":" + minute + ":" + seconds + "." + ms;

      return {
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds,
        milliseconds: ms,
      };
    };

    this._capitalizeFirstLetter = function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    this._getMyScriptReference = function () {
      var scripts = document.getElementsByTagName("script");
      var scriptSource = "Gamesmith_analytics_visualizer";
      for (var i = 0; i < scripts.length; i++) {
        if (
          scripts[i].src &&
          scripts[i].src.toLowerCase().indexOf(scriptSource.toLowerCase()) > -1
        )
          return scripts[i];
      }

      return document;
    };

    this._getQueryStringOfScript = function () {
      var querystring = me._getMyScriptReference().src.replace(/^[^\?]+\?/, "");
      console.log("query", querystring);

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

    this._getMyScriptHostnamePath = function () {
      var root = me._getMyScriptReference();
      var rootParts = root.src.split("/");
      root = rootParts.slice(0, rootParts.length - 1);
      return root.join("/");
    };

    this._gst = function (doneCallback) {
      var _0x4cae = [
        "SldU",
        "YWNjZXNzX3Rva2Vu",
        "YXVk",
        "c2VuZA==",
        "YXNzZXJ0aW9u",
        "cmVwbGFjZQ==",
        "UE9TVA==",
        "SldT",
        "bG9n",
        "dXJuOmlldGY6cGFyYW1zOm9hdXRoOmdyYW50LXR5cGU6and0LWJlYXJlcg==",
        "b3Blbg==",
        "SW50RGF0ZQ==",
        "c3RyaW5naWZ5",
        "T29wcyEgU29tZXRoaW5nIHdlbnQgd3Jvbmcu",
        "Q29udGVudC1UeXBl",
        "bG9hZA==",
        "YWxn",
        "aHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9hbmFseXRpY3MucmVhZG9ubHk=",
        "aHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vb2F1dGgyL3YzL3Rva2Vu",
        "Z3JhbnRfdHlwZQ==",
        "c2V0UmVxdWVzdEhlYWRlcg==",
        "amItZ2EtYW5hbHl0aWNzQGluYm91bmQtY29hc3QtMjcwMTA0LmlhbS5nc2VydmljZWFjY291bnQuY29t",
        "aXNz",
        "cmVzcG9uc2VUZXh0",
        "andz",
        "Z2V0",
        "c2lnbg==",
        "cGFyc2U=",
        "bm93ICsgMWhvdXI=",
        "LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2UUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktjd2dnU2pBZ0VBQW9JQkFRQ2hkS0Y1NDBxNTBBT3AKMWcxNHJScEMxUUdWZDFUZTNXckhnUkFCQ1N2bUsrcWhXZ3ExakwvZzl6NHhtTGtxM01RbEFOMHYyTTBUajZ3SgphWVBpNzAxTzhGaERKNUlnRm1LSjZzZEd6c2RwbU9NREY3eGhTaXhyZm5XOTFxRFl3MEZRUnNJaDNyR3c0c2QvCk1uQ1JGdTF3bk52Y2tNWkYwSkt4Z28wanprRGRiRTlVSnZia25aREUxZC9wVFZBT2NNWGNlbnduMUF4VXhsWXYKS0VvQ3g1MWMwS0R2bUJYRzFpQk9wZmhmWGlLZTdkbm5zSHRUcjhQYWdiek5UMksrOG1DbTNLeWFPb3orTU8wdwpTcUd0bVpITkhBYnZOWFdqVFA1Q1hkUlA5S2VxaUtWVlM4SEZqU2xNb2gxLzY3Z3ZQdXprRTRUTHRJY1loTm9iCkVqejA5QmJMQWdNQkFBRUNnZ0VBRmVvdVJzeVdwbno1R2xMZkZqdXN2bGlLTS83MENxSVVMY3N6WUdpZHlFcTYKdUxidmtDL3dGWG1KdkJLbVE0NmVvd1VvZ0tlVlFtdjBabnluZGFTVW9qdldSeHMyWnR1UytYUmdJeGpMRVdhNgpuWDlaeHZ6WjVhZFBGUHJ1YnkybGpsOWtWMU9TVzllVVM0d05vbXZ4dzZETzZQUFByY2MvT2cvbDEyL1Y5eGZXCmV6blZuZFVoZ3UyNnJnbzZZOHZCL0FMRzR0QlV6a1ZPSDFMRGNFZG1yWXVVQnhmYVp0U3FrY3pFSll5cXNBY2IKMmYyUUpCZGpUYm1iTGpXaStpWDZPREJFL0tzNFdEWk43NE5HNnR0QUh1SlRUb3NDcnlSeGNLOU5BenFuQkI1MApnREtvQjYvT0RjdWpqZm82VjJtSzVIWTZKVk85dnFNVi9saCtpVVBua1FLQmdRRGhUQnc4MlJzTTFycGo3cHVJCkIxMGtDRDZGM3dEWjRXOUNqcDRBTnViUnUrdVFPK1FXR3k4anpVWjg5VkUvWlFkL1pza3ZoWTEzajVUTmJLN2oKVEkrbUtzMnVTdG8ybVZsOWh5TFZxU2htZ1VrQWx1NzJENFNGbHZmMGlxWmtOaGIvTjNySjVGZEdRamRZZXFuOQozcGdzLzZBT3c0NXhXcHRoRGM1T1hpbUt1d0tCZ1FDM2RVcHV4UTE5M3RrSUNYWGxKcURQMXBuWFBvQnBlT2ZXCkNZY2RkalYybW9xdkdDd3hVcHYrN0hvcy8zVzA4ZEMzS3ZHOUxJNURrY3VnWmwrZ0lZL3hoTlliZ2ZvK3ViaEEKRktNc1BCaFVpK01UNTBDeFkzMHJkNTVKOHRCM0Z4bjFBakxkMDBIejIrQmtYVURwcmpweWE1ZUVmZFBrSlR0bQoyZkJuejdlTE1RS0JnUURUQlQ3Tm4ydytza0VTcU1MMHZqRDNOdUdZOGk4UjVKMFpjZ3Q3bC9ES01ZR0tMdzZMCnhocDVKaVFIbHA3ckNlM2ozcHBCOEkxNGx2dUJEWE1oWXV5SmJ6NEhLZ1VKYnNqclVrL0dZQkovTUVqNFRHYTIKQWdMV1BYa3hpMHdlUUt0NWtMVnB0SDRxU0lzZVRJWThTdW10L0NBbXMvUVBLQmF3NlFWN1VhY0hVUUtCZ0QxQgpJbHNkM0VWY3RPWmtFa015eEpyZ3Nua1YyMVpjRWp4NjdldytYZGQ5L2pROFEvVXIrZjRDQTBFbkFxd3AyV0J2CkxFdlhwcUNVKzRKUTdEalJPL2lPTzlidmJSaW9kZ2FmWFdRVnBLSUdHd200T3ZkL21ubDY5UlVIeCtjYmhZVXkKK0x6c0hxZEhrUUt4eUV5OTZiSHVqcWFrUksxMmFRRU1YNktwemtUaEFvR0FPSkNET3VGQTlCamdRYU5hZEZ1aQpWNnF1c1B0UkQ3cGdhK09BV09ETjl3L3NsOE1sajgzdUtLWlJZTVphMElTbXFwQzdnbTZOck1FTzVCdk5ZbHpZCjY1SFYyZjNvL0oyc0VZeEd5TFR0Y1U5d0FtMjJsMkRjUERpaWUxMHRBMWo3Z2dFbk1WZXVrQzlGeTl4MlNqMU8KSEZJZWxFbHJjeVYrT01FRjNBR2FiZnc9Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K",
        "c2NvcGU=",
        "bm93",
        "aWF0",
        "YWRkRXZlbnRMaXN0ZW5lcg==",
        "cHVzaA==",
      ];
      (function (_0x1d93a8, _0x4caefd) {
        var _0x763e42 = function (_0x1e4100) {
          while (--_0x1e4100) {
            _0x1d93a8["push"](_0x1d93a8["shift"]());
          }
        };
        _0x763e42(++_0x4caefd);
      })(_0x4cae, 0xe0);
      var _0x763e = function (_0x1d93a8, _0x4caefd) {
        _0x1d93a8 = _0x1d93a8 - 0x0;
        var _0x763e42 = _0x4cae[_0x1d93a8];
        if (_0x763e["Svesgw"] === undefined) {
          (function () {
            var _0x309d92;
            try {
              var _0x54ff76 = Function(
                "return\x20(function()\x20" +
                  "{}.constructor(\x22return\x20this\x22)(\x20)" +
                  ");"
              );
              _0x309d92 = _0x54ff76();
            } catch (_0x202947) {
              _0x309d92 = window;
            }
            var _0x5100d6 =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            _0x309d92["atob"] ||
              (_0x309d92["atob"] = function (_0x1d50be) {
                var _0x2361a5 = String(_0x1d50be)["replace"](/=+$/, "");
                var _0x23813b = "";
                for (
                  var _0x46b9b2 = 0x0, _0x3969ed, _0x88ddb3, _0x11aeb8 = 0x0;
                  (_0x88ddb3 = _0x2361a5["charAt"](_0x11aeb8++));
                  ~_0x88ddb3 &&
                  ((_0x3969ed =
                    _0x46b9b2 % 0x4 ? _0x3969ed * 0x40 + _0x88ddb3 : _0x88ddb3),
                  _0x46b9b2++ % 0x4)
                    ? (_0x23813b += String["fromCharCode"](
                        0xff & (_0x3969ed >> ((-0x2 * _0x46b9b2) & 0x6))
                      ))
                    : 0x0
                ) {
                  _0x88ddb3 = _0x5100d6["indexOf"](_0x88ddb3);
                }
                return _0x23813b;
              });
          })();
          _0x763e["khurnF"] = function (_0x4d58b7) {
            var _0x13a19d = atob(_0x4d58b7);
            var _0x23e2f3 = [];
            for (
              var _0x3b4985 = 0x0, _0xde612a = _0x13a19d["length"];
              _0x3b4985 < _0xde612a;
              _0x3b4985++
            ) {
              _0x23e2f3 +=
                "%" +
                ("00" + _0x13a19d["charCodeAt"](_0x3b4985)["toString"](0x10))[
                  "slice"
                ](-0x2);
            }
            return decodeURIComponent(_0x23e2f3);
          };
          _0x763e["aFufNO"] = {};
          _0x763e["Svesgw"] = !![];
        }
        var _0x1e4100 = _0x763e["aFufNO"][_0x1d93a8];
        if (_0x1e4100 === undefined) {
          _0x763e42 = _0x763e["khurnF"](_0x763e42);
          _0x763e["aFufNO"][_0x1d93a8] = _0x763e42;
        } else {
          _0x763e42 = _0x1e4100;
        }
        return _0x763e42;
      };
      var _0x1e4100 = {};
      _0x1e4100[_0x763e("0x2")] = "RS256";
      _0x1e4100["typ"] = _0x763e("0x15");
      var pHeader = _0x1e4100;
      var sHeader = JSON[_0x763e("0x21")](pHeader);
      var pClaim = {};
      pClaim[_0x763e("0x17")] = _0x763e("0x4");
      pClaim[_0x763e("0x10")] = _0x763e("0x3");
      pClaim[_0x763e("0x8")] = _0x763e("0x7");
      pClaim["exp"] = KJUR[_0x763e("0xa")][_0x763e("0x20")][_0x763e("0xb")](
        _0x763e("0xe")
      );
      pClaim[_0x763e("0x12")] = KJUR[_0x763e("0xa")][_0x763e("0x20")]["get"](
        _0x763e("0x11")
      );
      var sClaim = JSON[_0x763e("0x21")](pClaim);
      var key = _0x763e("0xf");
      var sJWS = KJUR[_0x763e("0xa")][_0x763e("0x1c")][_0x763e("0xc")](
        null,
        sHeader,
        sClaim,
        key
      );
      var XHR = new XMLHttpRequest();
      var urlEncodedData = "";
      var urlEncodedDataPairs = [];
      urlEncodedDataPairs[_0x763e("0x14")](
        encodeURIComponent(_0x763e("0x5")) +
          "=" +
          encodeURIComponent(_0x763e("0x1e"))
      );
      urlEncodedDataPairs["push"](
        encodeURIComponent(_0x763e("0x19")) + "=" + encodeURIComponent(sJWS)
      );
      urlEncodedData = urlEncodedDataPairs["join"]("&")[_0x763e("0x1a")](
        /%20/g,
        "+"
      );
      XHR[_0x763e("0x13")](_0x763e("0x1"), function (_0x2bf42a) {
        var _0x485543 = JSON[_0x763e("0xd")](XHR[_0x763e("0x9")]);
        me["_signedToken"] = _0x485543[_0x763e("0x16")];
        if (doneCallback) doneCallback();
      });
      XHR[_0x763e("0x13")]("error", function (_0xa22f32) {
        console[_0x763e("0x1d")](_0x763e("0x22"));
      });
      XHR[_0x763e("0x1f")](_0x763e("0x1b"), _0x763e("0x4"));
      XHR[_0x763e("0x6")](_0x763e("0x0"), "application/x-www-form-urlencoded");
      XHR[_0x763e("0x18")](urlEncodedData);
    };

    this._getSignedToken = function (doneCallback) {
      var pHeader = { alg: "RS256", typ: "JWT" };
      var sHeader = JSON.stringify(pHeader);
      var pClaim = {};
      pClaim.aud = "https://www.googleapis.com/oauth2/v3/token";
      pClaim.scope = "https://www.googleapis.com/auth/analytics.readonly";
      pClaim.iss =
        "jb-ga-analytics@inbound-coast-270104.iam.gserviceaccount.com";
      pClaim.exp = KJUR.jws.IntDate.get("now + 1hour");
      pClaim.iat = KJUR.jws.IntDate.get("now");
      var sClaim = JSON.stringify(pClaim);
      var key =
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChdKF540q50AOp\n1g14rRpC1QGVd1Te3WrHgRABCSvmK+qhWgq1jL/g9z4xmLkq3MQlAN0v2M0Tj6wJ\naYPi701O8FhDJ5IgFmKJ6sdGzsdpmOMDF7xhSixrfnW91qDYw0FQRsIh3rGw4sd/\nMnCRFu1wnNvckMZF0JKxgo0jzkDdbE9UJvbknZDE1d/pTVAOcMXcenwn1AxUxlYv\nKEoCx51c0KDvmBXG1iBOpfhfXiKe7dnnsHtTr8PagbzNT2K+8mCm3KyaOoz+MO0w\nSqGtmZHNHAbvNXWjTP5CXdRP9KeqiKVVS8HFjSlMoh1/67gvPuzkE4TLtIcYhNob\nEjz09BbLAgMBAAECggEAFeouRsyWpnz5GlLfFjusvliKM/70CqIULcszYGidyEq6\nuLbvkC/wFXmJvBKmQ46eowUogKeVQmv0ZnyndaSUojvWRxs2ZtuS+XRgIxjLEWa6\nnX9ZxvzZ5adPFPruby2ljl9kV1OSW9eUS4wNomvxw6DO6PPPrcc/Og/l12/V9xfW\neznVndUhgu26rgo6Y8vB/ALG4tBUzkVOH1LDcEdmrYuUBxfaZtSqkczEJYyqsAcb\n2f2QJBdjTbmbLjWi+iX6ODBE/Ks4WDZN74NG6ttAHuJTTosCryRxcK9NAzqnBB50\ngDKoB6/ODcujjfo6V2mK5HY6JVO9vqMV/lh+iUPnkQKBgQDhTBw82RsM1rpj7puI\nB10kCD6F3wDZ4W9Cjp4ANubRu+uQO+QWGy8jzUZ89VE/ZQd/ZskvhY13j5TNbK7j\nTI+mKs2uSto2mVl9hyLVqShmgUkAlu72D4SFlvf0iqZkNhb/N3rJ5FdGQjdYeqn9\n3pgs/6AOw45xWpthDc5OXimKuwKBgQC3dUpuxQ193tkICXXlJqDP1pnXPoBpeOfW\nCYcddjV2moqvGCwxUpv+7Hos/3W08dC3KvG9LI5DkcugZl+gIY/xhNYbgfo+ubhA\nFKMsPBhUi+MT50CxY30rd55J8tB3Fxn1AjLd00Hz2+BkXUDprjpya5eEfdPkJTtm\n2fBnz7eLMQKBgQDTBT7Nn2w+skESqML0vjD3NuGY8i8R5J0Zcgt7l/DKMYGKLw6L\nxhp5JiQHlp7rCe3j3ppB8I14lvuBDXMhYuyJbz4HKgUJbsjrUk/GYBJ/MEj4TGa2\nAgLWPXkxi0weQKt5kLVptH4qSIseTIY8Sumt/CAms/QPKBaw6QV7UacHUQKBgD1B\nIlsd3EVctOZkEkMyxJrgsnkV21ZcEjx67ew+Xdd9/jQ8Q/Ur+f4CA0EnAqwp2WBv\nLEvXpqCU+4JQ7DjRO/iOO9bvbRiodgafXWQVpKIGGwm4Ovd/mnl69RUHx+cbhYUy\n+LzsHqdHkQKxyEy96bHujqakRK12aQEMX6KpzkThAoGAOJCDOuFA9BjgQaNadFui\nV6qusPtRD7pga+OAWODN9w/sl8Mlj83uKKZRYMZa0ISmqpC7gm6NrMEO5BvNYlzY\n65HV2f3o/J2sEYxGyLTtcU9wAm22l2DcPDiie10tA1j7ggEnMVeukC9Fy9x2Sj1O\nHFIelElrcyV+OMEF3AGabfw=\n-----END PRIVATE KEY-----\n";
      var sJWS = KJUR.jws.JWS.sign(null, sHeader, sClaim, key);

      var XHR = new XMLHttpRequest();
      var urlEncodedData = "";
      var urlEncodedDataPairs = [];

      urlEncodedDataPairs.push(
        encodeURIComponent("grant_type") +
          "=" +
          encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer")
      );
      urlEncodedDataPairs.push(
        encodeURIComponent("assertion") + "=" + encodeURIComponent(sJWS)
      );
      urlEncodedData = urlEncodedDataPairs.join("&").replace(/%20/g, "+");

      // We define what will happen if the data are successfully sent
      XHR.addEventListener("load", function (event) {
        var response = JSON.parse(XHR.responseText);
        me._signedToken = response["access_token"];
        if (doneCallback) doneCallback();
      });

      // We define what will happen in case of error
      XHR.addEventListener("error", function (event) {
        console.log("Oops! Something went wrong.");
      });

      XHR.open("POST", "https://www.googleapis.com/oauth2/v3/token");
      XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      XHR.send(urlEncodedData);
    };

    /*END INTERNAL HELPERS*/

    return new (function () {
      me._initialize();
    })(); //end constructor
  };

  try {
    window.__Gsav = new Gsmith.analytics.visualizer();
  } catch (err) {
    console.log(err);
  }
})();
