const waWidgetAddStyleToHead = function (widgetStyle, plan) {
    var whatsappCss =
      ".wa__btn_popup .wa__btn_popup_icon, .wa__popup_content_item .wa__cs_img_wrap { display: block; } .wa__popup_content .nta-wa-gdpr { color: #6d6d6d; }";
    // Add icon size
    whatsappCss += `.wa__btn_popup .wa__btn_popup_icon { height: ${widgetStyle.iconSize}px; width: ${widgetStyle.iconSize}px;}`;
    whatsappCss += `.wa__btn_popup .wa__btn_popup_icon:before { background-size: ${Math.round(
      widgetStyle.iconSize * 0.54
    )}px auto; -webkit-background-size: ${Math.round(
      widgetStyle.iconSize * 0.54
    )}px auto;}`;
  
    if (window.Shopify.shop === "kenzdeal.myshopify.com") {
      whatsappCss +=
        ".wa__btn_popup .wa__btn_popup_txt {font-size: 1.6rem;font-weight: 600;}";
    }
  
    if (window.Shopify.shop === "tatyanaaceeva.myshopify.com") {
      whatsappCss +=
        ".wa__btn_popup .wa__btn_popup_icon {display: none !important;}";
    }
  
    if (window.Shopify.shop === "box-liquid.myshopify.com") {
      if (widgetStyle.title === "" && widgetStyle.description === "") {
        whatsappCss += ".wa__popup_chat_box .wa__popup_heading {display: none;}";
      }
    }
  
    if (window.Shopify.shop === "takeanalytics.myshopify.com") {
      whatsappCss += ".wa__btn_popup, .wa__popup_chat_box {z-index: 0;}";
    }
    if(window.Shopify.designMode && plan === 'free') {
      whatsappCss += ".wa__popup_tooltiptext {left: 18%; margin-left: 0}";
    }
    if(!window.Shopify.designMode && window.Shopify.theme.name === 'Dawn') {
      whatsappCss += ".wa__popup_tooltiptext {font-size: 11px;}";
    }
    if(window.Shopify.shop === 'mmmatcha-4f9e.myshopify.com') {
      whatsappCss += ".wa__btn_popup, .wa__popup_chat_box {font-family: 'Montserrat' !important;}";
    }
    if(window.Shopify.shop === 'formula-beauty-next.myshopify.com') {
      whatsappCss += ".wa__btn_popup, .wa__popup_chat_box {font-family: var(--typeBasePrimary),var(--typeBaseFallback) !important;}";
    }
  
    var whatsappHead = document.head || document.getElementsByTagName("head")[0];
    var whatsappStyle = document.createElement("style");
    whatsappHead.appendChild(whatsappStyle);
  
    whatsappStyle.type = "text/css";
    if (whatsappStyle.styleSheet) {
      // This is required for IE8 and below.
      whatsappStyle.styleSheet.cssText = whatsappCss;
    } else {
      whatsappStyle.appendChild(document.createTextNode(whatsappCss));
    }
  };
  const waWidgetMobileCheck = function () {
    var check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    if (check === false) {
      var waWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
      if (waWidth < 500) check = true;
    }
    return check;
  };
  const waWidgetGetCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  const waWidgetCheckGDPR = function (isShowGDPR) {
    if (isShowGDPR === "OFF") {
      return "";
    }
    if (waWidgetGetCookie("nta-wa-gdpr") == "accept") {
      return "";
    }
    return "1";
  };
  const waWidgetCheckTranslations = function (translations, field) {
    let waLocale = window.Shopify.locale;
    if (waLocale === "zh-TW" && window.Shopify.shop !== "computercenrtre.myshopify.com") {
      waLocale = "zh";
    }
    if (
      waLocale !== "en" &&
      translations.enabled &&
      translations.enabled === true &&
      translations[waLocale] &&
      translations[waLocale][field]
    ) {
      return true;
    }
    return false;
  };
  const waWidgetTranslationText = function (field) {
    let waLocale = window.Shopify.locale;
    if (waLocale === "zh-TW" && window.Shopify.shop !== "computercenrtre.myshopify.com") {
      waLocale = "zh";
    }
    return window.seedgrow_wa_data.translations[waLocale][field];
  };
  const waWidgetCheckShowInPage = function (settingDisplay) {
    if(window.Shopify.shop !== "magicleaf-stevia.myshopify.com") {
      if (settingDisplay.displayCondition === "show_all_page") {
        return true;
      }
      const waCurrentPathName = window.location.pathname;
      let waLocale = window.Shopify.locale;
      if (waLocale === "zh-TW" && window.Shopify.shop !== "computercenrtre.myshopify.com") {
        waLocale = "zh";
      }
      var currentPage = "";
      if( waCurrentPathName === "/" ||
        waCurrentPathName === `/${waLocale}` ||
        waCurrentPathName === `/${waLocale}/`  
      ) {
        currentPage = "homepage";
      } else if (
        waCurrentPathName.indexOf("/products") === 0 ||
        (waCurrentPathName.indexOf("/collections") === 0 &&
          waCurrentPathName.indexOf("/products/") > 10) ||
        waCurrentPathName.indexOf(`/${waLocale}/products`) === 0 ||
        (waCurrentPathName.indexOf(`/${waLocale}/collections`) === 0 &&
          waCurrentPathName.indexOf("/products/") > 10)
      ) {
        currentPage = "products";
      } else if (
        waCurrentPathName.indexOf("/collections") === 0 ||
        waCurrentPathName.indexOf(`/${waLocale}/collections`) === 0
      ) {
        currentPage = "collections";
      } else if (
        waCurrentPathName.indexOf("/cart") === 0 ||
        waCurrentPathName.indexOf(`/${waLocale}/cart`) === 0
      ) {
        currentPage = "cart";
      } else if (
        waCurrentPathName.indexOf("/pages/") === 0 ||
        waCurrentPathName.indexOf(`/${waLocale}/pages/`) === 0
      ) {
        if(waCurrentPathName.indexOf("/pages/") === 0) {
          currentPage = waCurrentPathName.substr(7);
        } else {
          currentPage = waCurrentPathName.substr(8 + waLocale.length);
        }
      } else if (
        waCurrentPathName.indexOf("/blogs/") === 0 ||
        waCurrentPathName.indexOf(`/${waLocale}/blogs/`) === 0
      ) {
          currentPage = "blogs";
      }
      if (currentPage !== "") {
        if (settingDisplay.displayCondition === "include_pages") {
          return settingDisplay.includePages.includes(currentPage);
        } else if (settingDisplay.displayCondition === "exclude_pages") {
          return !settingDisplay.excludePages.includes(currentPage);
        }
      } else {
        return true;
      }
    } else {
      if(window.location.pathname === "/products/himalayan-stevia-leaf-drops-30-ml-natural-sweetener-made-from-100-pure-stevia-leaf-extract") {
        return true;
      }
      return false;
    }
  };
  
  const waWidgetUrlSet = function(account, settings) {
    let href = ""
    let predefinedText = account.predefinedText
  
    predefinedText = predefinedText.replace(/\[njwa_page_title\]/gi, encodeURIComponent(document.title))
    predefinedText = predefinedText.replace(/\[njwa_page_url\]/gi, window.location.href)
    predefinedText = predefinedText.replaceAll(/\n/gi, '%0A')
    if (account.number.indexOf("chat.whatsapp.com") !== -1) {
      href += account.number;
    } else {
      if(account.number.indexOf("wa.me") !== -1) {
        href += account.number;
        href += account.predefinedText ? ('?text=' + predefinedText) : "";
        return href;
      }
      let url = settings.urlSettings[waWidgetMobileCheck() ? 'onMobile' : 'onDesktop']
      if ( !url ) url = 'api'
      if ( url === 'protocol' ) {
        return 'whatsapp://send?phone=' + account.number.replace(/[^0-9]/gi, "") + ( account.predefinedText ? '&text=' + predefinedText : '')
      }
      else {
        href += ('https://' + url + '.whatsapp.com/send?phone=')
        href += account.number.replace(/[^0-9]/gi, "");
        href += account.predefinedText ? ('&text=' + predefinedText) : ""
      }
    }
  
    return href
  }
  
  const waWidgetRenderHtml = function () {
    let seedgrowWaData = {};
    let appLink = document.getElementById("wa");
    let waLocale = window.Shopify.locale;
    if (waLocale === "zh-TW" && window.Shopify.shop !== "computercenrtre.myshopify.com") {
      waLocale = "zh";
    }
    if(window.location.pathname.indexOf("/password") !== 0 && window.location.pathname.indexOf(`/${waLocale}/password`) !== 0) {
      if(window.seedgrow_wa_data) {
        seedgrowWaData = window.seedgrow_wa_data;
      } else if(window.seedgrow_whatsapp_data) {
        seedgrowWaData = window.seedgrow_whatsapp_data;
      } else {
        seedgrowWaData = {
          accounts: [
            {
              accountId: "demo-12345",
              accountName: "This is Demo Account",
              avatar: "",
              dayOffsText: "I will be back soon",
              daysOfWeekWorking: {
                sunday: {
                  isWorkingOnDay: "OFF",
                  workHours: [
                    {
                      startTime: "08:00",
                      endTime: "17:30",
                    },
                  ],
                },
                monday: {
                  isWorkingOnDay: "OFF",
                  workHours: [
                    {
                      startTime: "08:00",
                      endTime: "17:30",
                    },
                  ],
                },
                tuesday: {
                  isWorkingOnDay: "OFF",
                  workHours: [
                    {
                      startTime: "08:00",
                      endTime: "17:30",
                    },
                  ],
                },
                wednesday: {
                  isWorkingOnDay: "OFF",
                  workHours: [
                    {
                      startTime: "08:00",
                      endTime: "17:30",
                    },
                  ],
                },
                thursday: {
                  isWorkingOnDay: "ON",
                  workHours: [
                    {
                      startTime: "20:00",
                      endTime: "17:30",
                    },
                  ],
                },
                friday: {
                  isWorkingOnDay: "OFF",
                  workHours: [
                    {
                      startTime: "08:00",
                      endTime: "17:30",
                    },
                  ],
                },
                saturday: {
                  isWorkingOnDay: "OFF",
                  workHours: [
                    {
                      startTime: "08:00",
                      endTime: "17:30",
                    },
                  ],
                },
              },
              isAlwaysAvailable: "ON",
              number: "",
              predefinedText: "",
              showButton: true,
              showWidget: true,
              title: `Please <a href="https://${appLink.getAttribute("data-shop-domain")}/admin/apps/whatsapp-chat-12/?&tab=widget">select your agents</a> to display here`,
              willBeBackText: "I will be back soon",
            }
          ],
          buttonInfo: {},
          options: {
            "analytics": {
                "enabledFacebook": "OFF",
                "enabledGoogleGA4": "OFF",
                "enabledGoogle": "OFF"
            },
            "display": {
                "displayCondition": "exclude_pages",
                "excludePages": [],
                "includePages": [],
                "showOnDesktop": "ON",
                "showOnMobile": "ON",
                "time_symbols": "h:m"
            },
            "styles": {
              isShowPoweredBy : 'OFF'
            }
          },
          translations: {
            enabled: false
          },
          urlSettings: {
            onDesktop: 'api', 
            onMobile: 'api', 
            openInNewTab: 'ON'
          },
          timezone: "+07:00",
          defaultAvatarUrl: 'https://whatsapp-u.seedgrow.net/images/whatsapp_logo.svg',
          defaultAvatarSVG: '<svg width="48px" height="48px" class="nta-whatsapp-default-avatar" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="height:48px;width:48px;enable-background:new 0 0 512 512;" xml:space="preserve"><path style="fill:#EDEDED;" d="M0,512l35.31-128C12.359,344.276,0,300.138,0,254.234C0,114.759,114.759,0,255.117,0 S512,114.759,512,254.234S395.476,512,255.117,512c-44.138,0-86.51-14.124-124.469-35.31L0,512z"/> <path style="fill:#55CD6C;" d="M137.71,430.786l7.945,4.414c32.662,20.303,70.621,32.662,110.345,32.662 c115.641,0,211.862-96.221,211.862-213.628S371.641,44.138,255.117,44.138S44.138,137.71,44.138,254.234 c0,40.607,11.476,80.331,32.662,113.876l5.297,7.945l-20.303,74.152L137.71,430.786z"/> <path style="fill:#FEFEFE;" d="M187.145,135.945l-16.772-0.883c-5.297,0-10.593,1.766-14.124,5.297 c-7.945,7.062-21.186,20.303-24.717,37.959c-6.179,26.483,3.531,58.262,26.483,90.041s67.09,82.979,144.772,105.048 c24.717,7.062,44.138,2.648,60.028-7.062c12.359-7.945,20.303-20.303,22.952-33.545l2.648-12.359 c0.883-3.531-0.883-7.945-4.414-9.71l-55.614-25.6c-3.531-1.766-7.945-0.883-10.593,2.648l-22.069,28.248 c-1.766,1.766-4.414,2.648-7.062,1.766c-15.007-5.297-65.324-26.483-92.69-79.448c-0.883-2.648-0.883-5.297,0.883-7.062 l21.186-23.834c1.766-2.648,2.648-6.179,1.766-8.828l-25.6-57.379C193.324,138.593,190.676,135.945,187.145,135.945"/></svg>',
        }
      }
  
      seedgrowWaData.options.styles = window.seedgrow_widget_setting;
      if(window.Shopify.shop === "inart-studio.myshopify.com") {
        if(typeof seedgrowWaData.options.styles.btnPosition !== 'undefined' && waWidgetMobileCheck()) {
          seedgrowWaData.options.styles.btnPosition = "left";
        }
      }
      if(typeof seedgrowWaData.options.display.showPoweredIcon !== 'undefined') {
        if(typeof seedgrowWaData.options.styles !== 'undefined') {
          seedgrowWaData.options.styles.isShowPoweredBy = seedgrowWaData.options.display.showPoweredIcon;
        } else {
          seedgrowWaData.options.styles = {
            isShowPoweredBy : seedgrowWaData.options.display.showPoweredIcon
          }
        }
        
      } else {
        if(typeof seedgrowWaData.options.styles !== 'undefined') {
          seedgrowWaData.options.styles.isShowPoweredBy = 'OFF';
        } else {
          seedgrowWaData.options.styles = {
            isShowPoweredBy : 'OFF'
          }
        }
      }
  
      
      
      waWidgetAddStyleToHead(seedgrowWaData.options.styles, seedgrowWaData.plans);
      const waShowWidgetInPage = waWidgetCheckShowInPage(
        seedgrowWaData.options.display
      );
      if (waShowWidgetInPage) {
        if (seedgrowWaData.accounts) {
          let showWidgetAccount = [];
          seedgrowWaData.accounts.forEach((account, index) => {
            if(account.showWidget) {
              if(seedgrowWaData.plans === 'free') {
                showWidgetAccount.push(account);
              } else {
                if(seedgrowWaData.urlSettings.hideAccountWhenOffline === "ON" ) {
                  const status = njtWhatsApp.getBackTime(account, seedgrowWaData);
                  if(status === 'online') {
                    showWidgetAccount.push(account);
                  }
                } else {
                  showWidgetAccount.push(account);
                }
              }
            }
          });
          let widgetOption = seedgrowWaData.options;
          widgetOption.styles.btnLabel =
            waWidgetCheckTranslations(seedgrowWaData.translations, "widgetLabelText") === false
              ? widgetOption.styles.btnLabel
              : waWidgetTranslationText("widgetLabelText");
          widgetOption.styles.title =
            waWidgetCheckTranslations(seedgrowWaData.translations, "widgetText") === false
              ? widgetOption.styles.title
              : waWidgetTranslationText("widgetText");
          widgetOption.styles.responseText =
            waWidgetCheckTranslations(seedgrowWaData.translations, "widgetResponse") === false
              ? widgetOption.styles.responseText
              : waWidgetTranslationText("widgetResponse");
          widgetOption.styles.description =
            waWidgetCheckTranslations(seedgrowWaData.translations, "widgetDescription") === false
              ? widgetOption.styles.description
              : waWidgetTranslationText("widgetDescription");
          widgetOption.styles.gdprContent =
            waWidgetCheckTranslations(seedgrowWaData.translations, "widgetGDPRContent") === false
              ? widgetOption.styles.gdprContent
              : waWidgetTranslationText("widgetGDPRContent");
          widgetOption.styles.isShowBtnLabel =
            waWidgetMobileCheck() == true
              ? widgetOption.styles.isShowLabelOnMobile
              : widgetOption.styles.isShowLabelOnDesktop;
  
          widgetOption.display.showOnDesktop =
            waWidgetMobileCheck() == true && Shopify.designMode
              ? widgetOption.styles.isShowOnMobile
              : widgetOption.styles.isShowOnDesktop;
          widgetOption.display.showOnMobile = widgetOption.styles.isShowOnMobile;
  
          if (showWidgetAccount.length === 0 && Shopify.designMode) {
            showWidgetAccount.push({
              accountId: "demo-12345",
              accountName: "This is Demo Account",
              avatar: "",
              dayOffsText: "I will be back soon",
              daysOfWeekWorking: {
                sunday: {
                  isWorkingOnDay: "OFF",
                  workHours: [
                    {
                      startTime: "08:00",
                      endTime: "17:30",
                    },
                  ],
                },
                monday: {
                  isWorkingOnDay: "OFF",
                  workHours: [
                    {
                      startTime: "08:00",
                      endTime: "17:30",
                    },
                  ],
                },
                tuesday: {
                  isWorkingOnDay: "OFF",
                  workHours: [
                    {
                      startTime: "08:00",
                      endTime: "17:30",
                    },
                  ],
                },
                wednesday: {
                  isWorkingOnDay: "OFF",
                  workHours: [
                    {
                      startTime: "08:00",
                      endTime: "17:30",
                    },
                  ],
                },
                thursday: {
                  isWorkingOnDay: "ON",
                  workHours: [
                    {
                      startTime: "20:00",
                      endTime: "17:30",
                    },
                  ],
                },
                friday: {
                  isWorkingOnDay: "OFF",
                  workHours: [
                    {
                      startTime: "08:00",
                      endTime: "17:30",
                    },
                  ],
                },
                saturday: {
                  isWorkingOnDay: "OFF",
                  workHours: [
                    {
                      startTime: "08:00",
                      endTime: "17:30",
                    },
                  ],
                },
              },
              isAlwaysAvailable: "ON",
              number: "",
              predefinedText: "",
              showButton: true,
              showWidget: true,
              title: `Please <a href="https://${appLink.getAttribute("data-shop-domain")}/admin/apps/whatsapp-chat-12/?&tab=widget">select your agents</a> to display here`,
              willBeBackText: "I will be back soon",
            });
          }
          // Add widget popup
          if (showWidgetAccount.length > 0) {
            //Translate Prefilled Message start
            showWidgetAccount.forEach(account => {
              if(waWidgetCheckTranslations(seedgrowWaData.translations, account.accountId) === true) {
                let predefinedText = waWidgetTranslationText(account.accountId);
                predefinedText = predefinedText.replaceAll(
                  /\[sgwa_page_title\]/gi,
                  "[njwa_page_title]"
                );
                predefinedText = predefinedText.replaceAll(
                  /\[sgwa_page_url\]/gi,
                  "[njwa_page_url]"
                );
                predefinedText = predefinedText.replaceAll(/\'/gi, "%27");
                account.predefinedText = predefinedText;
              }
            });
            
            //Translate Prefilled Message end
            const seedgrowWaWidget = {
              accounts: showWidgetAccount,
              options: widgetOption,
              timezone: seedgrowWaData.timezone,
              gdprStatus: waWidgetCheckGDPR(
                seedgrowWaData.options.styles.isShowGDPR
              ),
              defaultAvatar: seedgrowWaData.defaultAvatarSVG,
              urlSettings: seedgrowWaData.urlSettings,
            };
            if(showWidgetAccount.length === 1 && seedgrowWaData.options.styles.useClickToChat) {    
              // Add Widget
              if (
                (waWidgetMobileCheck() == false && widgetOption.display.showOnDesktop == "ON") ||
                (waWidgetMobileCheck() == true && widgetOption.display.showOnMobile == "ON")
              ) {
  
                  let isShowBtnLabel =
                  widgetOption.styles.isShowBtnLabel === "OFF" ? "none" : "block";
                  let popupTextLeft = widgetOption.styles.btnPosition == "left" ? "100%" : "unset";
                  let popupTextRight = widgetOption.styles.btnPosition == "right" ? "100%" : "unset";
                  let popupTextLeftMargin = widgetOption.styles.btnPosition == "left" ? "7px" : "0px";
                  let popupTextRightMargin = widgetOption.styles.btnPosition == "right" ? "7px" : "0px";
                  let popupLeft = widgetOption.styles.btnPosition == "left" ? widgetOption.styles.btnLeftDistance + "px" : "unset";
                  let popupRight =
                  widgetOption.styles.btnPosition == "right" ? widgetOption.styles.btnRightDistance + "px" : "unset";
  
                  let href = waWidgetUrlSet(showWidgetAccount[0], seedgrowWaData);
  
                  let accountLinkClass = showWidgetAccount[0].isAlwaysAvailable === "ON" ? "wa__stt wa__stt_online" : "wa__stt wa__stt_offline";
  
                  let waPopup = document.getElementById("wa");
                  waPopup.innerHTML =
                    '<div id="wa_btn_popup" class="wa__btn_popup" style="left: ' +
                    popupLeft +
                    "; right: " +
                    popupRight +
                    "; bottom: " +
                    widgetOption.styles.btnBottomDistance +
                    'px;"><a class="'+accountLinkClass+'" target="_blank" href="'+href+'" rel="nofollow noopener noreferrer"><div class="wa__btn_popup_txt" style="display: ' +
                    isShowBtnLabel +
                    "; left: " +
                    popupTextLeft +
                    "; right: " +
                    popupTextRight +
                    "; margin-right: "+popupTextRightMargin+"; margin-left: "+popupTextLeftMargin+"; width: " +
                    widgetOption.styles.btnLabelWidth +
                    'px;"><span>' +
                    widgetOption.styles.btnLabel +
                    '</span></div><div id="wa_btn_popup_icon" class="wa__btn_popup_icon" style="display: block; background: ' +
                    widgetOption.styles.backgroundColor +
                    '"></div></a></div>';
                }
            } else {
              if (!window.hasOwnProperty('njtWhatsApp')) {
                waLoadJsFileAndCreateWidget("https://whatsapp-u.seedgrow.net/js/njt-whatsapp.js", seedgrowWaWidget, seedgrowWaData.plans, true);
              } else {
                if (document.getElementById("wa") !== null) {
                  njtWhatsApp.createWidget(
                    document.getElementById("wa"),
                    seedgrowWaWidget
                  );
                  if(Shopify.designMode && seedgrowWaData.plans === 'free' && seedgrowWaWidget.options.styles.isShowPoweredBy == 'ON') {
                    const contactDiv = document.createElement("div");
                    const linkContact = document.createElement("a");
                    const linkText = document.createTextNode("Contact us");
                    linkContact.appendChild(linkText);
                    linkContact.href = `https://${appLink.getAttribute("data-shop-domain")}/admin/apps/whatsapp-chat-12/?&tab=contact`;
                    linkContact.style.color = "#fff";
                    const textRemove = document.createTextNode(" to remove this label");
                    contactDiv.appendChild(linkContact);
                    contactDiv.appendChild(textRemove);
                    const element = document.querySelector('.wa__popup_tooltiptext');
                    element.appendChild(contactDiv);
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  
  const waLoadJsFileAndCreateWidget = function (FILE_URL, seedgrowWaWidget, plan, async = true) {
    let scriptEle = document.createElement("script");
    scriptEle.setAttribute("src", FILE_URL);
    scriptEle.setAttribute("type", "text/javascript");
    scriptEle.setAttribute("async", async);
    document.body.appendChild(scriptEle);
    // success event 
    scriptEle.addEventListener("load", () => {
      if (document.getElementById("wa") !== null) {
        njtWhatsApp.createWidget(
          document.getElementById("wa"),
          seedgrowWaWidget
        );
        if(Shopify.designMode && plan === 'free' && seedgrowWaWidget.options.styles.isShowPoweredBy == 'ON') {
          let appLink = document.getElementById("wa");
          const contactDiv = document.createElement("div");
          const linkContact = document.createElement("a");
          const linkText = document.createTextNode("contact us");
          linkContact.appendChild(linkText);
          linkContact.href = `https://${appLink.getAttribute("data-shop-domain")}/admin/apps/whatsapp-chat-12/?&tab=contact`;
          linkContact.style.color = "#fff";
          const textFirst = document.createTextNode("Please ");
          const textLast = document.createTextNode(" if you don't want to show this icon");
          contactDiv.appendChild(textFirst);
          contactDiv.appendChild(linkContact);
          contactDiv.appendChild(textLast);
          const element = document.querySelector('.wa__popup_tooltiptext');
          element.appendChild(contactDiv);
        }
      }
    });
     // error event
    scriptEle.addEventListener("error", (ev) => {
      console.log("Error on loading file", ev);
    });
  };

  document.addEventListener("DOMContentLoaded", function () {
    waWidgetRenderHtml();
  });
  
  window.addEventListener("resize", function (event) {
    if (Shopify.designMode) {
      document.getElementById("wa").innerHTML = "";
      waWidgetRenderHtml();
    }
  });
  