var isABTestEnabled = true;
var promiseABVersion = "A";
var isInternational = 0;
var edd_displayed = "";
var edd_days=0;
var isPromiseViewed = false;
var globalAuthToken ="";
var globalSellerDetails="";
var globalCheckActiveDetails = "";
var trackingGAId = "G-XC7PYWS9EK";
var hideSovaURLs = ["gut-microbiome-test","guthealconsult","fix-acidity-gutheal21","gut-x-bloating","gut-x-constipation","gut-x-ibs","sova-gutheal","plug-the-flow-synbiotic-supplement-for-diarrhoea-ibs-relief","one-swift-motion-supplement-for-constipation-relief","metabolic-fuel-synbiotic-supplement","fat-loss-support"]
//'e9079bf2-366c-4316-b7e2-589f50326f94'
var widgetTypeMap = {
  edd : "promise-product-page",
  promise_feature : "promise-company-features"
}
var sellerEmail = document.currentScript.src
  .split("?")[1]
  .split("&")
  .reduce(
    (obj, pair) => ((obj[pair.split("=")[0]] = pair.split("=")[1]), obj),
    {}
  )["uuid"];

var isPreviewRequest = document.currentScript.src
  .split("?")[1]
  .split("&")
  .reduce(
    (obj, pair) => ((obj[pair.split("=")[0]] = pair.split("=")[1]), obj),
    {}
  )["preview"];

if (isPreviewRequest == 1) {
  isPreviewRequest = true;
} else {
  isPreviewRequest = false;
}
const promisePopUpContent = {
  delivery_guaranteed : { title:"Delivery Guaranteed",content:`We deliver most of our orders within the promised delivery days. In some cases, it can take more time than usual. Please sign up on <a href='http://my.shiprocket.in/' style='color: blue;text-decoration: underline;font-size: 14px;font-weight: 400;'>myShiprocket App</a> for any refund/return issue.`},
  secure_transactions : { title:"Secure Transactions",content:"Shiprocket approved safe and secure payment guaranteed."},
  refund_return :{ title:"{{X}} Days Easy Return & Refund",content: "Return/Exchange request for refunds are accepted only for unused products which have defects or in case of damages during delivery, missing or wrong product delivered. Return/Exchange request can be placed within {{X}} days of delivery from <a href='http://my.shiprocket.in/' style='color: blue;text-decoration: underline;font-size: 14px;font-weight: 400;'>myShiprocket App</a>"},
  easy_order_tracking : { title:"Easy Order Tracking",content:"You will receive a real time Whatsapp message on every order movement. You can also track your order or raise return/refund issue from <a href='http://my.shiprocket.in/' style='color: blue;text-decoration: underline;font-size: 14px;font-weight: 400;'>myShiprocket App</a>"},
  default: {
    title: "Shiprocket Verified Seller",
    content: `<div class="promise-flexbox" style="margin: 21px 0px;"><img src="https://remarkable-bonbon-adc3d3.netlify.app/tick-pointer.png" style="height: 15px;
    margin-right: 12px;"/> <div>{{happy_customers}} Happy Customers.</div></div>
   <div class="promise-flexbox" style="margin: 21px 0px;"><img src="https://remarkable-bonbon-adc3d3.netlify.app/tick-pointer.png" style="height: 15px;
    margin-right: 12px;"/> <div>{{successful_shipments}} Successful Shipments.</div></div>
   <div class="promise-flexbox" style="margin: 21px 0px;"><img src="https://remarkable-bonbon-adc3d3.netlify.app/tick-pointer.png" style="height: 15px;
    margin-right: 12px;"/> <div>{{years}} Years of Expertise.</div></div>`
  },
  five_star: {
    title: "Shiprocket Verified Seller",
    content: `<div class="promise-flexbox" style="margin: 21px 0px;"><img src="https://remarkable-bonbon-adc3d3.netlify.app/tick-pointer.png" style="height: 15px;
    margin-right: 12px;"/> <div>{{happy_customers}} Happy Customers.</div></div>
   <div class="promise-flexbox" style="margin: 21px 0px;"><img src="https://remarkable-bonbon-adc3d3.netlify.app/tick-pointer.png" style="height: 15px;
    margin-right: 12px;"/> <div>{{successful_shipments}} Successful Shipments.</div></div>
   <div class="promise-flexbox" style="margin: 21px 0px;"><img src="https://remarkable-bonbon-adc3d3.netlify.app/tick-pointer.png" style="height: 15px;
    margin-right: 12px;"/> <div>{{years}} Years of Expertise.</div></div>`
  }
}

if (localStorage.getItem("_p_version_theme__")) {
  promiseABVersion = localStorage.getItem("_p_version_theme__");
} else {
 
    let randomValue = isABTestEnabled === false ? 1 : Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    if (randomValue == 1) {
      promiseABVersion = "A";
      localStorage.setItem("_p_version_theme__", "A");
    }
    // } else if(randomValue >= 4 && randomValue <= 6) {
    //   promiseABVersion = "B";
    //   localStorage.setItem("_p_version_theme__", "B");
    // } else {
      else{
      promiseABVersion = "B";
      localStorage.setItem("_p_version_theme__", "B");
    }
}

function setLocalStorageItem(key, value) {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(key, value);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

if (!sellerEmail) sellerEmail = document.currentScript.src.split("?")[1];
//var promiseApiUrl = "https://sr-promise-qa-1.kartrocket.com";
var promiseApiUrl = "https://promise.shiprocket.in";
async function getPromiseClarityId() {
  const authToken = globalAuthToken ? globalAuthToken : 
    localStorage.getItem("_p_token") &&
    new Date().getTime() <
      JSON.parse(localStorage.getItem("_p_token"))?.expirationTime
      ? JSON.parse(localStorage.getItem("_p_token"))?.value
      : await getSellerAuthToken(sellerEmail);
      globalAuthToken = authToken;
  const sellerDetails = globalSellerDetails ? globalSellerDetails:
    localStorage.getItem("_p_buzz_info") &&
    new Date().getTime() <
      JSON.parse(localStorage.getItem("_p_buzz_info"))?.expirationTime
      ? JSON.parse(localStorage.getItem("_p_buzz_info"))?.value
      : await getPromiseSellerDetails(authToken);
      globalSellerDetails = sellerDetails;
  const clarityId = sellerDetails?.promise_company_stats?.clarity_id;
  return clarityId;
}
// getPromiseClarityId().then((data) => {
//   if (data) addPromiseClarityScript(data);
// }).then(()=>{
//   clarity("set", "ABtheme", promiseABVersion );
// })

function addPromiseClarityScript(clarityId) {
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", clarityId);
  
}

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
const scriptElement = document.createElement("script");
document.head.appendChild(scriptElement);
scriptElement.async = true;
scriptElement.src = "https://www.googletagmanager.com/gtag/js?id="+trackingGAId;

scriptElement.onload = () => {
  gtag("js", new Date());
  gtag("config", trackingGAId);
};
async function callGAEvent(eventName, eventData) {


 

  gtag("event", eventName, {
    ...eventData,
    send_to       : trackingGAId,
    cid           :  globalCheckActiveDetails?.data?.[0]?.cid,
    brand_name    :  globalCheckActiveDetails?.data?.[0]?.info?.brand_name,
    edd           : edd_displayed,
    version       : promiseABVersion,
    international : isInternational,
    edd_tat       : edd_days,
    theme         : promiseABVersion === "A" ? '2' : '1'
  });
}

function GaPromiseLogoClicked() {
  callGAEvent("Clicked on Promise logo", {});
}
function gaPromiseBannerClicked() {
  callGAEvent("Clicked on Promise Banner", {});
}
var promiseImgUrl =
  "https://kr-shipmultichannel-mum.s3.ap-south-1.amazonaws.com/promise/static/";

//var netlifyImgURl = "https://snazzy-dango-b155c3.netlify.app/"

function startWidgetInteraction() {
  return new Date().getTime();
}

function endWidgetInteraction(startTime) {
  const endTime = new Date().getTime();
  const timeSpent = endTime - startTime;
  callGAEvent( 'promise_widget_interaction', {
    time_spent: timeSpent
  });
  if(!isPromiseViewed){
  callGAEvent('Promise widget Viewed',{})
  isPromiseViewed = true;
  }
}


async function makeAPIRequest(url, token, method, body) {
  // to make api calls and if auth is expired or invalid, will generate the auth token again and will make the api call again
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(url, {
      method,
      headers,
      ...(body && { body }),
    });
    const data = await response.json();
    if (data?.errors[0]?.message === "Token Signature could not be verified.") {
      const newToken = await getSellerAuthToken(sellerEmail);
      return makeAPIRequest(url, newToken, method, body);
    }
    `    `;
    return data;
  } catch (error) {
    console.error("Error:", error);
    // Handle error as needed
  }
}

async function getSellerAuthToken(email) {
  const data = {
    uuid: email,
  };
  try{
  const response = await fetch(`${promiseApiUrl}/api/v1/shopify/seller/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const authData = await response.json();
  if (authData?.data[0]?.token) {
    const authDetails = {
      value: authData?.data[0]?.token,
      expirationTime: new Date().getTime() + 86400000,
    };
    await setLocalStorageItem("_p_token", JSON.stringify(authDetails));
  }

  return authData?.data[0]?.token;
}
catch(e){
  return undefined;
}
}
function getPromiseNumberOfDays(d_date){
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const inputDate = new Date(d_date);
  
 
  const timeDifferenceMs = inputDate - currentDate;
  const daysLeft = Math.ceil(timeDifferenceMs / (1000 * 60 * 60 * 24)) ;
  return daysLeft;
}
function getDateFourDaysLater() {
  const today = new Date();
  const futureDate = new Date(today.setDate(today.getDate() + 4));

  const options = { month: "short", day: "2-digit", year: "numeric" };
  const formattedDate = futureDate.toLocaleDateString("en-US", options);

  return formattedDate;
}
async function getServicibilityDetails(authToken, buyerPincode, companyId=0) {
  const data = {
    delivery_postcode: buyerPincode,
    cod: "0",
    weight: companyId === 1487945 ? "1.5" : "0.1", // Added check for Girveda
    sku : ShopifyAnalytics?.meta?.product?.variants[0]?.sku
  };
  
  const response = await Promise.race([
    makeAPIRequest(
      `${promiseApiUrl}/api/v1/shopify/seller/serviceability`,
      authToken,
      "POST",
      JSON.stringify(data)
    ),
    new Promise((resolve) => setTimeout(() => resolve("404"), 2000)),
  ]);
  if (response === "404") {
    const responseData = {
      data: [
        {
          data: {
            available_courier_companies: [
              {
                cod: 0,
                etd: getDateFourDaysLater(),
              },
            ],
          },
          postcode_info: { city: "" },
        },
      ],
    };
    return responseData;
  } else {
    return response;
  }
}
async function getPromiseSellerDetails(token) {
  const response = await makeAPIRequest(
    `${promiseApiUrl}/api/v1/shopify/seller/stats`,
    token,
    "GET",
    ""
  );
  const sellerDetails = response;
  if (sellerDetails?.data[0]) {
    const sellerData = {
      value: sellerDetails?.data[0],
      expirationTime: new Date().getTime() + 86400000,
    };
    await setLocalStorageItem(
      "_p_buzz_info",
      JSON.stringify(sellerData)
    );
  }
  return sellerDetails?.data[0];
}
async function getPromiseSystemIP() {
  const response = await Promise.race([
    fetch("https://pro.ip-api.com/json/?key=I1yEhXr3bbNUGGA"),
    new Promise((resolve) => setTimeout(() => resolve("404"), 3000)),
  ]);
  if (response === "404") {
    return false;
  } else {
    const ipInfo = await response.json();
    if (ipInfo.query === "14.194.36.134") ipInfo.zip = "122008";
    
    if (ipInfo.countryCode && ipInfo.countryCode!="IN"){
      isInternational=1;
      removePromiseWidgets();
    }
    return ipInfo;
  }
}
function removePromiseWidgets(){

  if(document.querySelectorAll(".promise-product-page")){
    const orderDetails = document.querySelectorAll(".promise-product-page");
    orderDetails.forEach((image) => {
      image.innerHTML = "";
    });
  
  }
  if (document.getElementById("promise-head-banner"))
    document.getElementById("promise-head-banner").innerHTML = "";
  
  }
async function getPromiseIPPincodeDetails(ip, token) {
  const response = await makeAPIRequest(
    `${promiseApiUrl}/api/v1/shopify/seller/user/location`,
    token,
    "POST",
    JSON.stringify({ ip })
  );
  const IPPincodeDetails = response;
  return IPPincodeDetails?.data[0]?.postcode;
}
function renderHeadJSCode() {
  const headJsCode = `<div class="promise-custom-header" >
  <img src="${promiseImgUrl}sr-promise.png" style="height:24px;vertical-align: baseline;" height="24" />
  <div style="font-size:11px; color: #2C1566;margin: 0px 11px; line-height: 13px;"> <img src="${promiseImgUrl}five-star.png" style="height:10px;vertical-align: baseline;"height="10"/><div>Complete Purchase Protection</div></div>
  <div onclick="openPromisePopup('banner')" style="font-size:12px; display: flex;margin-top: 7px;    cursor: pointer;"><div style="padding-bottom: 0px; color:#2C1566;
    border-bottom: 1px dashed #2C1566; white-space: nowrap;">Know more</div><img src="${promiseImgUrl}know-more.png" style="height: 12px;vertical-align: baseline;
    margin-left: 4px; margin-top:2px"/> </div>
    </div> `;
  if (document.getElementById("promise-head-banner") && promiseABVersion != "C")
    document.getElementById("promise-head-banner").innerHTML = headJsCode;
}
function applyStylesBasedOnWidth() {
  const myDiv = document.getElementById("promise-tag-box");
  if (myDiv) {
    const divWidth = myDiv.offsetWidth;
    const myClasses = document.getElementsByClassName("pro-tag-box-small");
    const myTextClasses = document.getElementsByClassName("pro-features-text");
    if (divWidth > 480) {
      //  document.getElementsByClassName("pro-web-text")[0].classList.add('text-17-px')
      for (let i = 0; i < myClasses.length; i++) {
        myClasses[i].classList.add("promise-width-large");
        myTextClasses[i].classList.add("mg-10-px");
      }
    } else {
      //  document.getElementsByClassName("pro-web-text")[0].classList.remove('text-17-px')
      for (let i = 0; i < myClasses.length; i++) {
        myClasses[i].classList.remove("promise-width-large");
        myTextClasses[i].classList.remove("mg-10-px");
      }
    }
  }
}

function moveToPromiseEDD(){
  callGAEvent("Clicked on Check EDD Sticky Icon",{})
  var element = document.getElementById("PromiseEddSection");
  var offset = window.innerHeight / 2 - element.getBoundingClientRect().height / 2;

  // Scroll to the element with the calculated offset
  element.scrollIntoView({ behavior: "smooth", block: "center" });
}
function renderPromisePageWithShimmer() {
  if(promiseABVersion === "A"){
  const PDPjsCode = `  <div class="promise-pdp-page" id="PromiseEddSection" style="    font-family: Arial, Helvetica, sans-serif !important;
  letter-spacing: 0px;
  line-height: 16px;
  margin-top: 10px;
  margin-bottom: 30px;
  text-transform: none;
  background: #fff;
  font-weight: 400;
  text-align: initial;color: #313652;${globalCheckActiveDetails?.data?.[0]?.placeholders?.widgets?.pdp?.length  &&  globalCheckActiveDetails?.data?.[0]?.placeholders?.widgets?.pdp.filter(item=> (item.type== 'edd'))[0].style}">
          <hr style="border: 1px solid #f7f7f7; margin: 0px;" />
          <div id="sr-icon">
          <div class="shine shimmer-lines"></div>
          </div>
          <div id="delivery-msg">
          <div class="shine shimmer-lines"></div>
          </div>


          <div id="enter-pincode">
          <div class="shine shimmer-lines"></div>
          </div>

          <hr style="border: 1px solid #f7f7f7; margin: 0px;margin-top:15px" />
      </div>`;
  let companyFeaturesJsCode = ` <div class="promise-flexbox promise-space-between" style="font-family: Arial, Helvetica, sans-serif !important;
  letter-spacing: 0px;
  line-height: 16px;
  margin-top: 10px;
  margin-bottom: 30px;
  text-transform: none;
  background: #fff;
  font-weight: 400;
  text-align: initial;
  color: #5968BE;${globalCheckActiveDetails?.data?.[0]?.placeholders?.widgets?.pdp?.length  &&  globalCheckActiveDetails?.data?.[0]?.placeholders?.widgets?.pdp.filter(item=> (item.type== 'promise_feature'))[0].style}">
          <div class="promise-center-align"  onclick="openPromisePopup('delivery_guaranteed')">
              <img src="https://remarkable-bonbon-adc3d3.netlify.app/new-icons/feature1.png" style="height: 34px;cursor: pointer;    display: inline;" />
              <div style="font-size: 10px;
          line-height: 12px;
          margin-top: 6px;max-width: 75px;cursor: pointer;">Delivery Guaranteed</div>
          </div>
          <div class="promise-center-align" onclick="openPromisePopup('secure_transactions')">
              <img src="https://remarkable-bonbon-adc3d3.netlify.app/new-icons/feature2.png" style="height: 34px;cursor: pointer;    display: inline;" />
              <div style="font-size: 10px;
          line-height: 12px;
          margin-top: 6px;max-width: 75px;cursor: pointer;">Secure Transactions</div>
          </div>
          ${globalCheckActiveDetails?.data?.[0]?.settings?.return?.max_days != '0'? `<div class="promise-center-align" onclick="openPromisePopup('refund_return')">
          <img src="https://remarkable-bonbon-adc3d3.netlify.app/new-icons/feature3.png" style="height: 34px;cursor: pointer;    display: inline;" />
          <div style="font-size: 10px;
      line-height: 12px;
      margin-top: 6px;max-width: 75px;cursor: pointer;">{{X}} Days Easy Return & Refund</div>
      </div>`: `<div class="promise-center-align" onclick="openPromisePopup('five_star')">
      <img src="https://remarkable-bonbon-adc3d3.netlify.app/new-icons/feature5.png" style="height: 34px;cursor: pointer;     display: inline;" />
      <div style="font-size: 10px;
  line-height: 12px;
  margin-top: 6px;max-width: 75px;cursor: pointer;">5 star rated</div>
  </div>`}
          
          <div class="promise-center-align" onclick="openPromisePopup('easy_order_tracking')">
              <img src="https://remarkable-bonbon-adc3d3.netlify.app/new-icons/feature4.png" style="height: 34px;cursor: pointer;    display: inline;" />
              <div style="font-size: 10px;
          line-height: 12px;
          margin-top: 6px;max-width: 75px;cursor: pointer;">Easy Order Tracking</div>
          </div>
      </div>`  
      companyFeaturesJsCode = companyFeaturesJsCode.replace("{{X}}", globalCheckActiveDetails?.data?.[0]?.settings?.return?.max_days)
  if (document.querySelectorAll(".promise-product-page") && promiseABVersion != "C") {
    const orderDetails = document.querySelectorAll(".promise-product-page");
    orderDetails.forEach((image) => {
      image.innerHTML = PDPjsCode;
    });
    // applyStylesBasedOnWidth();
    // window.addEventListener("resize", applyStylesBasedOnWidth);
  }
  if (document.querySelectorAll(".promise-company-featurese") && promiseABVersion != "C") {
    const orderDetails = document.querySelectorAll(".promise-company-features");
    orderDetails.forEach((image) => {
      image.innerHTML = companyFeaturesJsCode;
    });
    // applyStylesBasedOnWidth();
    // window.addEventListener("resize", applyStylesBasedOnWidth);
  }
}
else{
  const PDPjsCode = `     <div class="promise-pdp-page" style="font-family: Arial, Helvetica, sans-serif !important;  border-radius:10px;letter-spacing: 0px;
  line-height: 16px;margin-top:10px;margin-bottom:30px;text-transform:none;background:#fff;">
  <div id="promise-tag-box">
      <div class="pro-tag-box">
          <div style="margin-bottom: 20px" class="promise-flexbox promise-space-between center-align">
              <div class="promise-flexbox flex-end-align" style="cursor:pointer" onclick="openPromisePopup()">
                  <img style="height:27px;vertical-align: baseline;" src="${promiseImgUrl}sr-promise.png" height="27" />
                  <img src="${promiseImgUrl}info.png" style="margin:2px;height:11px;vertical-align: baseline;"
                       />
              </div>
              <div style="width: 180px;
      padding: 4px 25px 4px 9px;
      border-radius: 5px 0px 0px 5px;" class="pro-tag-text">  <div class="shine shimmer-lines"></div></div>
          </div>
          <div id="promise-edit-pincode">


                  <div style="line-height: 22px;" class="pro-tag-text"> <div class="shine shimmer-lines"></div>
                  <div class="shine shimmer-lines"></div>
          </div>
      </div>
  </div>
  </div>
  <div style="border: 1.5px solid rgba(118, 235, 143, 0.2);
  border-top: none;
  border-radius: 0px 0px 10px 10px;
  width: calc(100% - 2px);
  margin-left: 1px;
  margin-top: -7px;
  padding-top: 9px;">
  <div id="promise-company-features" class="promise-flexbox">
      <div style="width:30%;     margin-left: 2.5%;" class="pro-tag-box-small   ">
         
          <div  class="pro-tag-text pro-features-text"> <div class="shine shimmer-lines"></div> </div>
      </div>
      <div style="width:30%;     margin-left: 2.5%;" class="pro-tag-box-small  ">
        
          <div  class="pro-tag-text pro-features-text"> <div class="shine shimmer-lines"></div></div>
      </div>
      <div style="width:30%;     margin-left: 2.5%;" class="pro-tag-box-small  ">
       
          <div  class="pro-tag-text pro-features-text"> <div class="shine shimmer-lines"></div>
         </div>
      </div>
  </div>
  <div id="promise-seller-details" style="margin-top: 10px;"><div style="margin:0 10px;font-size: 16px;line-height: 18px; color:#2C1566">

      <div class="shine shimmer-lines"></div>
      <div class="shine shimmer-box"></div>
  </div></div>
 
 
</div>
  </div>`;
  if (document.querySelectorAll(".promise-product-page") && promiseABVersion != "C") {
    const orderDetails = document.querySelectorAll(".promise-product-page");
    orderDetails.forEach((image) => {
      image.innerHTML = PDPjsCode;
    });
    applyStylesBasedOnWidth();
    window.addEventListener("resize", applyStylesBasedOnWidth);
  }
}
}

function renderPromiseSellerDetails() {
  let constStatsHtml = ``;
  let companyStats = [
    ...globalCheckActiveDetails?.data?.[0]?.settings?.shopify?.custom_tags,
    {
      bold_text:globalCheckActiveDetails?.data?.[0]?.settings?.shopify?.expertise_years + " Years",
      normal_text:"of Expertise"
    },
    {
      bold_text:globalCheckActiveDetails?.data?.[0]?.settings?.shopify?.happy_customers + " Happy",
      normal_text:"Customers"
    },
    {
      bold_text: globalCheckActiveDetails?.data?.[0]?.settings?.shopify?.successful_shipments + " Successful",
      normal_text:"Shipments"
    }
  ]
  for (
    let i = 0;
    i < companyStats.length;
    i++
  ) {
    const html = ` <div style=" border: 1px solid #DFF0F5; border-radius:10px; width: 200px; height: 50px;    margin-right: 15px; padding: 5px 30px;
      white-space: nowrap;
      text-align: center;padding-top: 10px;">
              <div style="font-size: 14px;
color: #2C1566;
line-height: 16px;
font-weight: 600;">${companyStats[i].bold_text}</div>
              <div style="font-size: 12px ; color: #3B3B3B;
              line-height: 14px;">${companyStats[i].normal_text}</div>
          </div>`;
    constStatsHtml += html;


  }
  const sellerDetailsHTML = ` <div style="margin:0 2.5%;font-size: 16px;line-height: 18px; color:#2C1566">Why Shop from <span style="font-weight: 600;">${globalCheckActiveDetails?.data?.[0]?.info?.brand_name}</span>
      </div>
      <div class="promise-flexbox" style="margin:
    0 2.5%;    margin-right: 0px;">
          <img src="${promiseImgUrl}trusted.png" height="64px" style="margin: 10px 0px; height:64px;vertical-align: baseline;" />
          <div style="height: 60px;
      overflow-x: scroll;
      margin: 17px;margin-right: 0px; margin-bottom:10px;" class="promise-x-scroll promise-flexbox">${constStatsHtml}
             
          </div>
      </div>`;
  if (document.getElementById("promise-seller-details")  && promiseABVersion != "C")
    document.getElementById("promise-seller-details").innerHTML =
      sellerDetailsHTML;
  
  let constFeatureHtml = ``;
  let companyFeatures = [
    {
      bold:"Money back",
      normal:"guarantee",
      icon: "https://kr-shipmultichannel-mum.s3.ap-south-1.amazonaws.com/promise/static/money-back.png"
    },
    {
      bold:"Fraud-free",
      normal:"Payments",
      icon: "https://kr-shipmultichannel-mum.s3.ap-south-1.amazonaws.com/promise/static/fraud.png"
    },
    {
      bold: globalCheckActiveDetails?.data?.[0]?.settings?.return?.max_days != '0' ? globalCheckActiveDetails?.data?.[0]?.settings?.return?.max_days + " Days" : "No",
      normal:"Return & Refund",
      icon: globalCheckActiveDetails?.data?.[0]?.settings?.return?.max_days != '0' ? "https://kr-shipmultichannel-mum.s3.ap-south-1.amazonaws.com/promise/static/return.png" : "https://kr-shipmultichannel-mum.s3.ap-south-1.amazonaws.com/promise/static/no-return.png"
    }
  ]
  for (
    let i = 0;
    i < companyFeatures.length;
    i++
  ) {
    const html = ` <div style="width:30%;     margin-left: 2.5%;" class="pro-tag-box-small   ">
      <img style="height:22px;vertical-align: baseline;" src="${companyFeatures[i].icon}" height="22" />
      <div  class="pro-tag-text pro-features-text"><span
              style="font-weight: 600;">${companyFeatures[i].bold}</span> ${companyFeatures[i].normal}</div>
  </div>`;
    constFeatureHtml += html;
  }
  if (document.getElementById("promise-company-features") && promiseABVersion != "C")
    document.getElementById("promise-company-features").innerHTML =
      constFeatureHtml;

  applyStylesBasedOnWidth();
}
function renderOnlyServicableData(
  servicibilityDetails,
  buyerPincode
) {
  if(promiseABVersion === "A"){
  document.getElementById("enter-pincode").innerHTML = ` <div class="promise-flexbox" style="color:#5968BE;margin-top:13px;margin-bottom: 13px;"><img
  src="https://remarkable-bonbon-adc3d3.netlify.app/new-icons/location.png" style="height: 14px;
  margin-top: 1px;    margin-left: 8px;
  " />
  <div style="font-size:13px;margin-left: 6px; ">Deliver to ${
    servicibilityDetails?.data[0]?.postcode_info?.city
      .charAt(0)
      .toUpperCase() +
    servicibilityDetails?.data[0]?.postcode_info?.city.slice(1)
  } - ${buyerPincode}</div><img src="https://remarkable-bonbon-adc3d3.netlify.app/new-icons/edit-icon.png" style="height: 13px;
  margin-left: 6px;
  margin-top: 1px;cursor: pointer;" onclick="editPromisePincode()" />
  </div>`
  callGAEvent("EDD displayed", {
    delivery_pincode: buyerPincode,
    edd_presented:
      servicibilityDetails?.data[0]?.courier_response?.promise_edd,
  });
  document.getElementById("delivery-msg").innerHTML = ` <div class="promise-flexbox" style="margin-top:13px"><img src="https://remarkable-bonbon-adc3d3.netlify.app/new-icons/box-icon.png" style="
  height: 14px;
  margin-top: 1px;
  margin-right: 5px;
  " />
  <div class="promise-theme2-text" ">Get it by <span style="font-weight:600;float:inherit;">${getDayOfWeek(
    servicibilityDetails?.data[0]?.courier_response?.promise_edd
  )},
      
 
      ${
        servicibilityDetails?.data[0]?.courier_response?.promise_edd
      }</span> with </div><div class="promise-flexbox" style="cursor: pointer;" onclick="openPromisePopup('default')"><div class="circle-container">
      <img src="https://remarkable-bonbon-adc3d3.netlify.app/with-bg.svg" style="margin: 2px;height: 16px;margin-top: 0px;">
      <div class="circle-animation"></div>
      </div>
      <img src="https://remarkable-bonbon-adc3d3.netlify.app/sr-text.svg" style="height: 9px;margin-top: 5px;margin-left: 2px;">
      <img src="https://remarkable-bonbon-adc3d3.netlify.app/new-icons/info.png" style="
      height: 9px;
      margin-top: 5px;
      margin-left: 4px;
      ">
  </div>
  </div>`
  document.getElementById("sr-icon").innerHTML = null
    }
    else{
      const pincodeDataHTML = ` <div class="pro-tag-box">
  <div style="margin-bottom: 20px" class="promise-flexbox promise-space-between center-align">
      <div class="promise-flexbox flex-end-align" style="cursor:pointer" onclick="openPromisePopup()">
          <img style="height:27px;vertical-align: baseline;" src="${promiseImgUrl}sr-promise.png" height="27" />
          <img src="${promiseImgUrl}info.png" style="margin:2px;height:11px;vertical-align: baseline;" height="11px" />
      </div>
      ${
        servicibilityDetails?.data[0]?.courier_response?.cod_available && globalCheckActiveDetails?.data?.[0]?.settings?.shopify?.cod_option
          ? ` ${
            globalCheckActiveDetails?.data?.[0]?.cid === 2567782
                ? ` <div style="background: #313652; ;
          padding: 4px 25px 4px 9px;
          border-radius: 5px 0px 0px 5px;color:#FFFFFF;    font-size: 14px;
          white-space: nowrap;" class="pro-tag-text">`
                : `<div style="background: #d7d0fd ;
          padding: 4px 25px 4px 9px;
          border-radius: 5px 0px 0px 5px;font-size:14px;" class="pro-tag-text">`
            }<span style="font-weight: 600;">COD</span> available</div>`
          : ``
      }
  </div>
  <div>
  <div style="line-height: 20px;
word-spacing: 0.28px; margin-bottom: 18px; margin-right: 10px;" class="pro-tag-text pro-web-text"><span> <img
              src="${promiseImgUrl}del-date.png"
              style="margin-right:8px; height:12px;vertical-align: baseline;display:inline;" height="12" />Guaranteed delivery by
          <span style="font-weight: 600;">${getDayOfWeek(
            servicibilityDetails?.data[0]?.courier_response?.promise_edd
          )},
              
         
              ${
                servicibilityDetails?.data[0]?.courier_response?.promise_edd
              }</span></div>
     <div id="promise-edit-pincode">
  <div style="line-height: 22px;font-size: 14px;" class="pro-tag-text"><span> <img
              src="${promiseImgUrl}location-pin.png" style="margin-right:4px;margin-bottom:-2px;height:14px;vertical-align: baseline;display:inline;"
              height="14" /></span>Deliver in ${
                servicibilityDetails?.data[0]?.postcode_info?.city
                  .charAt(0)
                  .toUpperCase() +
                servicibilityDetails?.data[0]?.postcode_info?.city.slice(1)
              } ${buyerPincode} <a onclick="editPromisePincode()" style="text-decoration: underline;
              color: #5A1CBD;
              cursor: pointer;font-size: 14px;"> Edit
          pincode</a>
  </div>
  </div>
</div> 
</div>`;
  if (document.getElementById("promise-tag-box") && promiseABVersion != "C"){
    document.getElementById("promise-tag-box").innerHTML = pincodeDataHTML;
    callGAEvent("EDD displayed", {
      delivery_pincode: buyerPincode,
      edd_presented:
        servicibilityDetails?.data[0]?.courier_response?.promise_edd,
    });
  }
    } 
}
async function renderPromiseOverlay(authToken) {
  if(promiseABVersion === "A"){
  const popupJsCode = `   
<div class="promise-overlay-bg display-none">
<div class="promise-overlay-main">
<div class="promise-flexbox promise-space-between" style="margin-top: 5px;">
    <div style="font-size: 18px;
        line-height: 22px;
        font-weight: 600;
        color: #333333;" id="promise-popup-heading">Delivery Guaranteed</div>
    <div style="font-size: 15px;

color: #707070;cursor: pointer;" onclick="closePromisePopup()">X</div>

</div>

<div style="    margin-top: 14px;
font-size: 14px;
line-height: 21px;
color: #313652;
" id="promise-popup-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
    sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</div>
<hr style="border: 1px solid #f7f7f7; margin: 0px; margin-top:15px" />
<div class="promise-flexbox" style="margin-top:10px">
    <div style="font-size: 12px;
    line-height: 22px;
    color: #939393;
    margin-right: 10px;">Powered by</div><img src="https://remarkable-bonbon-adc3d3.netlify.app/new-icons/sr-icon.png" style="margin: 2px;
height: 16px;" />
</div>
</div>

</div>`;
const staticIcon = `  <div onclick="moveToPromiseEDD()" style="
position: fixed;
bottom: 75%;
right: 0;
height: 62px;
min-width: 67px;
z-index: 998;
padding: 4px;
text-align: center;
cursor: pointer;
line-height: 14px;
letter-spacing: 0px;
font-family: Arial, Helvetica, sans-serif;
border-radius: 49% 0 0 49%;
background: #2C304A;
box-sizing: border-box;

">
    <div>
    <img src="https://remarkable-bonbon-adc3d3.netlify.app/check_edd.png" style="height: 33px;
position: absolute;
z-index: 1;
top: 13px;
right: 21px;"/><div
    style="
    border-bottom: 4px solid #b9b2d4b3;
    border-top: 4px solid #c0d7c9cf;
    border-right: 4px solid #b9b2d4de;
    border-left: 4px solid #c0d7c9a6;
    height: 54px;
    border-radius: 50%;
    margin-right: 4px;
    width: 54px;
    background: white;
    box-sizing: border-box;
    animation: edd_pulse 2s linear infinite;
    position: absolute;
    top: 4px;"  >

    </div>
</div>
 </div>`
 let newElement = document.createElement('div');
        newElement.innerHTML = staticIcon;
  if (document.getElementById("promise-overlay") && promiseABVersion != "C" && /^\/(?:products|collections\/[^/]+\/products)\/[^/]+/.test(window.location.pathname)){
    document.getElementById("promise-overlay").innerHTML = popupJsCode;
    
    // Uncomment below line to enable EDD toggle 
    //document.getElementById("promise-overlay").insertAdjacentElement('afterend',newElement)
  }
  } else {
    const popupJsCode = `   
    <div class="overlay-bg display-none">
      <div>
          <div class="promise-overlay-cancel" onclick="closePromisePopup()">X</div>
          <div class="overlay-main">
    
              <div style=" 
          border-radius: 10px;
          
    
          overflow-x:hidden">
                  <div class="overlay-header"><img  style="height:50px;vertical-align: baseline;" src="${promiseImgUrl}sr-promise.png" height="50" /></div>
                  <div style="overflow-y: scroll;
                  height: 60vh;
                  overflow-x: hidden;
                  margin-top: 90px;
                  background: white;
                  padding-bottom: 39px;text-transform: none;">
                      <div
                          style="background: transparent linear-gradient(318deg, #d694611c 0%, #6346d81d 49%, #78d7e31b 100%) 0% 0% no-repeat padding-box;">
                          <div style="padding: 18px 28px 18px 39px;
                  font-size: 40px;
                  color: #5A1CBC;
                  line-height: 48px;">Shop confidently, <span style="font-weight: 600;">without any <br /> worries</span></div>
                          <div style="padding: 0px 28px 10px 39px;
                  color: #3B3B3B;
                  font-size: 18px;
                  line-height: 26px;">Get your <span style="font-weight: 600;">money back</span> in the unlikely <br /> event of non-delivery or a
                              damaged <br />product delivered to
                              you.</div>
                          <img src="${promiseImgUrl}lady-on-couch.png" height="250"
                              style="padding: 20px 28px 20px 39px; height:250px;vertical-align: baseline;" />
                      </div>
                      <div style="padding-left:28px;padding-right: 28px;">
                          <div class="promise-flexbox promise-space-between">
                              <div style="color:#2c1566;font-size: 32px;
                          padding: 50px 0px 20px 0px;
                          line-height: 46px;">Complete<span style="font-weight: 600;"> <span style="color:#5a1cbc">purchase protection</span></span>
                              </div>
                              <img src="${promiseImgUrl}hand.png" style="height: 180px;
                          padding: 50px 0px 0px 0px;
                          margin-right: -85px; height:180px;vertical-align: baseline;" />
                          </div>
                          <div style="color: #2c1566;
                      font-size: 24px;
                      line-height: 26px;">Safe payments, timely delivery, easy returns</div>
                          <div style="color: #6a6a6a;
                      font-size: 18px;
                      margin-top: 31px; line-height:28px;margin-bottom: 50px;"><span
                                  style="color:#5a1cbc"><span style="font-weight: 600;">Shiprocket Promise's</span></span> purchase
                              protection programme safeguards your
                              shopping experience by ensuring that
                              you get the highest-quality services and
                              quick help in case you face any problems.</div>
                          <hr style="border: 2px solid #f7f7f7;margin:0px;" />
                          <img src="${promiseImgUrl}money-filled.png" style="height: 72px;
                      margin-top: 20px;
                      margin-bottom: 24px;
                      vertical-align: baseline;" />
                          <div style="color: #5a1cbc;
                      font-size: 25px;
                      line-height:29px;
                      margin-bottom: 20px;">Money-back guarantee*</div>
                          <div style="color: #6a6a6a;
                      line-height: 24px;
                      margin-bottom: 10px;"> Get a <span style="font-weight: 600;">full refund</span> in case the delivered
                              order doesn't meet your expectations.</div>
                          <img src="${promiseImgUrl}fraud-filled.png" style="height: 72px;
                      margin-top: 20px;
                      margin-bottom: 24px;vertical-align: baseline;" />
                          <div style="color: #5a1cbc;
                      font-size: 25px;
                      line-height:29px;
                      margin-bottom: 20px;">Fraud-free <br />
                              payments protection</div>
                          <div style="color: #6a6a6a;
                      line-height: 24px;
                      margin-bottom: 10px;"> Pay safely through a secure gateway
                              with assured data privacy.</div>
                          <img src="${promiseImgUrl}return-filled.png" style="height: 72px;
                      margin-top: 20px;
                      margin-bottom: 24px; vertical-align: baseline;" />
                          <div style="color: #5a1cbc;
                      font-size: 25px;
                      line-height:29px;
                      margin-bottom: 20px;">Easy returns & refunds</div>
                          <div style="color: #6a6a6a;
                      line-height: 24px;
                      margin-bottom: 10px;">Raise your request effortlessly and
                              get a resolution within <span style="font-weight: 600;">48 hours.</span></div>
                          <img src="${promiseImgUrl}delivery.png" style="height: 72px;
                      margin-top: 20px;
                      margin-bottom: 24px; vertical-align: baseline;" />
                          <div style="color: #5a1cbc;
                      font-size: 25px;
                      line-height:29px;
                      margin-bottom: 20px;">On-time delivery</div>
                          <div style="color: #6a6a6a;
                      line-height: 24px;
                      margin-bottom: 10px;">Track orders with <span style="font-weight: 600;">myShiprocket</span> & get
                              exactly what you ordered well on time.</div>
                          <div style="background: transparent linear-gradient(326deg, hsla(26, 59%, 61%, 0.108) 0%,  hsla(252, 65%, 56%, 0.11) 49%, hsla(187, 66%, 68%, 0.11) 100%) 0% 0% no-repeat padding-box;
                      border: 1px solid #00000000;
                      border-radius: 10px;padding: 20px;margin-top: 80px;">
                              <div class="promise-flexbox promise-space-between">
                                  <div style="font-size: 40px;
                              color: #2C1566;
                              line-height: 48px;">What's eligible <br /> for the</div>
                                  <img class="mb-badge" src="${promiseImgUrl}mb-batch.png" />
    
                              </div>
                              <div style="font-size: 40px;
                          color: #5A1CBC;
                          line-height: 48px;font-weight: 600;    margin-bottom: 30px;">money-back guarantee</div>
                              <div class="promise-flexbox">
                                  <li style="color: #2c156661;
                              
                              font-size: 32px;
                              margin-left: 11px;"></li>
                                  <div style="color: #2C1566;font-size: 18px;line-height: 26px;margin-bottom: 18px">
                                      Your order didn't arrive or was
                                      lost during transit</div>
                              </div>
                              <div class="promise-flexbox">
                                  <li style="color: #2c156661;
                             
                              font-size: 32px;
                              margin-left: 11px;"></li>
                                  <div style="color: #2C1566;font-size: 18px;line-height: 26px;margin-bottom: 18px;">
                                      Your order isn't as described, or
                                      an item is missing</div>
                              </div>
                              <div class="promise-flexbox">
                                  <li style="color: #2c156661;
                              
                              font-size: 32px;
                              margin-left: 11px;"></li>
                                  <div
                                      style="    color: #2C1566;font-size: 18px;line-height: 26px;margin-bottom: 18px;">
                                      Your order didn't arrive in good
                                      condition</div>
                              </div>
    
                             
                          </div>
                          <div
                              style="background: transparent linear-gradient(325deg, hsl(123, 59%, 61%,0.11) 0%, hsl(178, 65%, 56%,0.11) 49%, hsl(81, 66%, 68%, 0.11) 100%) 0% 0% no-repeat padding-box; border-radius: 10px;padding: 20px;margin-top: 60px;">
                              <div style="font-size: 36px;
                          line-height: 43px;
                          color: #2C1566;
                          margin-bottom: 16px;
                          margin-top: 19px;">How to raise a
                                  support request on</div>
                              <img style= "vertical-align: baseline;height:41px"src="${promiseImgUrl}myShiprocketlogo.png" height="41" />
                              <div style="color: #6A6A6A;
                          margin-top: 30px;
                          margin-bottom: 20px;
                          font-size: 18px;
                          line-height: 29px;">If something goes wrong, all you have
                                  to do is follow these simple steps:</div>
                              <div style=" align-items: center;    margin-bottom: 20px;" class="promise-flexbox">
                                  <div style="    color: #B3CBC7;
                                  font-size: 44px;
                                  line-height: 48px;
                                  margin-right: 15px;margin-left: 20px;">1.</div>
                                  <div style="color: #2C1566;font-size: 18px;line-height: 26px; ">Open myShiprocket
                                      app</div>
                              </div>
                              <div style="align-items: center;    margin-bottom: 20px;" class="promise-flexbox">
                                  <div style="    color: #B3CBC7;
                                  font-size: 44px;
                                  line-height: 48px;
                                  margin-right: 15px;margin-left: 20px;">2.</div>
                                  <div style="color: #2C1566;font-size: 18px;line-height: 26px;">Go to order details
                                  </div>
                              </div>
                              <div style="    margin-bottom: 20px;" class="promise-flexbox">
                                  <div style="    color: #B3CBC7;
                                  font-size: 44px;
                                  line-height: 48px;
                                  margin-right: 15px;margin-left: 20px;">3.</div>
                                  <div style="    color: #2C1566;font-size: 18px;line-height: 26px;">Raise a ticket,
                                      and we'll
                                      respond within 48 hours</div>
                              </div>
    
    
                              <a style="    text-decoration: none;
                          font-size: 22px;
                          color: #735AE5;
                          margin-bottom: 20px;" href="https://my.shiprocket.in/">Download Now <img style="    height: 11px;
    margin-top: 10px;
    margin-left: 8px;vertical-align: baseline;" src="${promiseImgUrl}link-arrow.png" /></a>
                          </div>
                          <div  style="background: transparent linear-gradient(329deg, #6096D61c 0%, #477FD81c 49%, #76E3D21c 100%) 0% 0% no-repeat padding-box; border-radius: 10px;padding: 20px;margin-top: 60px;">
                              <div style="color:#2C1566;font-size: 40px; line-height: 48px;">Why shop with</div>
                              <div style="color:#5A1CBC;font-size: 40px; line-height: 48px; font-weight:600;margin-bottom: 30px;word-break: break-all;">${
                              globalCheckActiveDetails?.data?.[0]?.info?.brand_name
                              }</div>
                              ${
                                globalCheckActiveDetails?.data?.[0]?.info?.is_top_rated
                                  ? `<hr style="border: 3px solid white; border-radius: 3px;margin:0px;" />
                              <div  style="margin: 20px 0px;" class="promise-flexbox center-align">
                              <img style="vertical-align: baseline;height: 24px" src="${promiseImgUrl}top-seller.png" height="24" /><div style="margin-left: 7px;
                              font-size: 18px;
                              line-height: 23px;
                              letter-spacing: 0.36px;
                              color: #3C2772;">Shiprocketâ€™s top-rated seller</div></div> `
                                  : ``
                              }
                             
                              <hr style="border: 3px solid white; border-radius: 3px;margin:0px;" />
                              <div style="margin: 20px 0px;" class="promise-flexbox center-align">
                        <img style="vertical-align: baseline;height: 28px" src="${promiseImgUrl}nps-score.png" height="28" /><div style="margin-left: 7px;
                        font-size: 18px;
                        line-height: 23px;
                        letter-spacing: 0.36px;
                        color: #3C2772;">NPS scrore <span style="font-weight: 600;">${
                          globalCheckActiveDetails?.data?.[0]?.settings?.shopify?.nps_score
                        }</span></div></div>
                              <hr style="border: 3px solid white; border-radius: 3px;margin:0px;"/>
                              <div style="font-size: 36px;
                              font-weight: 600;
                              line-height: 26px;
                              color: #3C2772;
                              margin-top: 39px;">${
                                globalCheckActiveDetails?.data?.[0]?.settings?.shopify?.expertise_years
                              }</div>
                              <div style="font-size: 22px;
                              line-height: 26px;
                              color: #3C2772;
                              margin-top: 12px;">years in business</div>
                              <div style="font-size: 36px;
                              font-weight: 600;
                              line-height: 26px;
                              color: #3C2772;
                              margin-top: 39px;">${
                                globalCheckActiveDetails?.data?.[0]?.settings?.shopify?.successful_shipments
                              }</div>
                              <div style="font-size: 22px;
                              line-height: 26px;
                              color: #3C2772;
                              margin-top: 12px;">successful shipments</div>
                              <div style="font-size: 36px;
                              font-weight: 600;
                              line-height: 26px;
                              color: #3C2772;
                              margin-top: 39px;">${
                                globalCheckActiveDetails?.data?.[0]?.settings?.shopify?.happy_customers
                              }</div>
                              <div style="font-size: 22px;
                              line-height: 26px;
                              color: #3C2772;
                              margin-top: 12px; margin-bottom: 40px;">happy customers</div>
                              <a style="    text-decoration: none;
                              font-size: 22px;
                              color: #735AE5;
                              margin-bottom: 20px;" onclick="closePromisePopup()">Happy Shopping!<img style="    height: 11px;
      margin-top: 10px;
      margin-left: 8px;vertical-align: baseline" src="${promiseImgUrl}link-arrow.png" /></a>
                          </div>
    
                      
                  </div>
    
              </div>
          </div>
      </div>
    </div>`;
      if (document.getElementById("promise-overlay") && promiseABVersion != "C")
        document.getElementById("promise-overlay").innerHTML = popupJsCode;
  }
}
function renderOnlyCheckServiceData() {
  if(promiseABVersion=="A"){
      document.getElementById("enter-pincode").innerHTML = `   <div class="promise-flexbox" style="color:#5968BE;margin-top:13px;margin-bottom: 13px;"><img
  src="https://remarkable-bonbon-adc3d3.netlify.app/new-icons/location.png" style="height: 14px;
margin-top: 1px;    margin-left: 8px;
" />
<div style="font-size:13px;margin-left: 6px;" onclick="editPromisePincode()">Enter area Pincode
</div>
</div>`
  document.getElementById("delivery-msg").innerHTML = ` <div class="promise-flexbox" style="margin-top:13px"><img src="https://remarkable-bonbon-adc3d3.netlify.app/new-icons/box-icon.png" style="
                height: 14px;
                margin-top: 1px;
                margin-right: 5px;
            " />
                    <div style="font-size: 14px;">Check <span style="font-weight:600;float:inherit;">EDD</span> by entering pin-code
                        below</div>
                </div>`
  document.getElementById("sr-icon").innerHTML = `
  <div class="promise-flexbox" style="margin-top:13px;cursor: pointer;" onclick="openPromisePopup('default')"><div class="circle-container">
  <img src="https://remarkable-bonbon-adc3d3.netlify.app/with-bg.svg" style="margin: 2px;height: 16px;margin-top: 0px;">
  <div class="circle-animation"></div>
  </div>
  <img src="https://remarkable-bonbon-adc3d3.netlify.app/sr-text.svg" style="height: 9px;margin-top: 5px;margin-left: 2px;">
  <img src="https://remarkable-bonbon-adc3d3.netlify.app/new-icons/info.png" style="
  height: 9px;
  margin-top: 5px;
  margin-left: 4px;
  ">
  </div>`
  }
  else{
    const pincodeDataHTML = `     <div class="pro-tag-box">
  <div style="margin-bottom: 20px" class="promise-flexbox promise-space-between center-align">
      <div class="promise-flexbox flex-end-align" style="cursor:pointer" onclick="openPromisePopup()">
          <img style="height:27px; vertical-align: baseline;" src="${promiseImgUrl}sr-promise.png" height="27" />
          <img src="${promiseImgUrl}info.png" style="margin:2px;height:11px;vertical-align: baseline;"
              height="11px" />
      </div>
      <div style="background: #d7d0fd;
padding: 4px 25px 4px 9px;
border-radius: 5px 0px 0px 5px;font-size: 14px;" class="pro-tag-text"> Get delivery within <span style="font-weight: 600;">4-5 days</span></div>
  </div>
  <div id="promise-edit-pincode">


          <div style="line-height: 22px;margin-right: 10px;font-size: 14px;" class="pro-tag-text">Check expected delivery date <span> <img
      src="${promiseImgUrl}location-pin.png"
      style="margin-right:1px   ;  margin-bottom: -2px;height:14px;vertical-align: baseline;display:inline;" height="14" /></span><a
style="text-decoration: underline;
color: #5A1CBD;
cursor: pointer;font-size: 14px;" onclick="editPromisePincode()">Select area pincode</a></div>
  </div>
</div>`;
  if (document.getElementById("promise-tag-box")  && promiseABVersion != "C")
    document.getElementById("promise-tag-box").innerHTML = pincodeDataHTML;
  }
}
async function checkPromiseActiveStatus(email) {
 // return true;
  const savedValue = JSON.parse(localStorage.getItem("_p_active_status_"));

  if (!savedValue || new Date().getTime() >= savedValue?.expirationTime) {
    if (savedValue) {
      localStorage.removeItem("_p_active_status_");
    }
    const response = await fetch(
      `${promiseApiUrl}/api/v1/shopify/seller/account-status?uuid=${email}`,
      {
        method: "GET",
      }
    );
    const promiseActiveData = await response.json();
    if (promiseActiveData?.data[0]?.promise_status  || isPreviewRequest ) {
      const promiseData = {
        status: true,
        details: promiseActiveData,
        expirationTime: new Date().getTime() + 900000,
      };
      globalCheckActiveDetails = promiseActiveData;
      if(globalCheckActiveDetails?.data?.[0]?.settings?.shopify?.multitheme == '0'){
        if(globalCheckActiveDetails?.data?.[0]?.settings?.shopify?.theme === 'spotlight'){
          promiseABVersion = "A";
          localStorage.setItem("_p_version_theme__", "A");
        }
        else{
          promiseABVersion = "B";
          localStorage.setItem("_p_version_theme__", "B");
        }
      }
      localStorage.setItem(
        "_p_active_status_",
        JSON.stringify(promiseData)
      );
      return isPreviewRequest == true ? true : promiseActiveData?.data[0]?.promise_status;
    } else {
      return isPreviewRequest == true ? true : false;
    }
  } else if (new Date().getTime() < savedValue?.expirationTime) {
    globalCheckActiveDetails = savedValue?.details; 
    return true;
  } else {
    return isPreviewRequest == true ? true : false;
  }
}
function handlePromiseInputKeyPress(event) {
  if (event.key === "Enter") {
    applyPromisePincode();
    event.preventDefault();
  } else {
    document.getElementById("promise-enter-pincode-input").style.border =
      "1px solid gainsboro";
    document.getElementById("promise-input-error-msg").innerHTML = "";
  }
}
function handleCartFormSubmit(event) {
  //event.preventDefault();
  callGAEvent("Checkout Initiated", {});
}

function formSubmissionHandler(event) {
  localStorage.setItem("_p_atc_sub", 1);
  //event.preventDefault();
  const action = event.target.getAttribute("action");
  if (action === "/cart/add") {
    callGAEvent("Add to Cart", {});
    if (isABTestEnabled === true) {
      if(promiseABVersion=="A") {
        callGAEvent("Add to Cart A", {});
      } else if(promiseABVersion=="B"){
        callGAEvent("Add to Cart B", {});
      } else {
        callGAEvent("Add to Cart C", {});
      }  
    }
    
  } else if (action === "/cart/update") {
    callGAEvent("Update Cart", {});
  }
}
function gaAtcClickHandler(){
  callGAEvent("Add to Cart", {});
  if (isABTestEnabled === true) {
    if (promiseABVersion == "A"){
      callGAEvent("Add to Cart A", {});
    } else if(promiseABVersion == "B"){
      callGAEvent("Add to Cart B", {});
    } else {
      callGAEvent("Add to Cart C", {});
    }  
  }
}
function formClickingHandler(event) {
  //event.preventDefault();
  setTimeout(() => {
    if (localStorage.getItem("_p_atc_sub") !== 1) {
      callGAEvent("Add to Cart", {});
      if (isABTestEnabled === true) {
        if (promiseABVersion == "A"){
          callGAEvent("Add to Cart A", {});
        } else if(promiseABVersion == "B"){
          callGAEvent("Add to Cart B", {});
        } else {
          callGAEvent("Add to Cart C", {});
        }  
      }
    }
  }, 500);
}

async function addPromiseTagsOnSellerPage() {
  if (!document.getElementById("promise-overlay")) {
    const newElement = document.createElement("div");
    newElement.id = "promise-overlay";
    const bodyElement = document.body;
    bodyElement.insertBefore(newElement, bodyElement.firstChild);
  }
  setTimeout(async ()=>{
    const authToken = globalAuthToken ? globalAuthToken : 
    localStorage.getItem("_p_token") &&
    new Date().getTime() <
      JSON.parse(localStorage.getItem("_p_token"))?.expirationTime
      ? JSON.parse(localStorage.getItem("_p_token"))?.value
      : await getSellerAuthToken(sellerEmail);
  // const sellerDetails = globalSellerDetails ? globalSellerDetails :
  //   localStorage.getItem("_p_buzz_info") &&
  //   new Date().getTime() <
  //     JSON.parse(localStorage.getItem("_p_buzz_info"))?.expirationTime
  //     ? JSON.parse(localStorage.getItem("_p_buzz_info"))?.value
  //     : await getPromiseSellerDetails(authToken);
    let company_id =globalCheckActiveDetails?.data?.[0]?.cid ;
    if(company_id == 2896067 ){
      function onDivRendered(mutationsList, observer) {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            for (const node of mutation.addedNodes) {
              if (findTargetDiv(node)) {
                // The div with the specified id is added to the DOM
               document.getElementById("promise-notification-cart-edd").innerHTML= localStorage.getItem("_p_edd")?`<div style="color: #9b21f9;
               font-size: 13px;
               font-weight: 800;
           }">Delivery by ${localStorage.getItem("_p_edd")}</div>`:``
               
              }
            }
          }
        }
      }
      function findTargetDiv(element) {
        if (element.id === 'promise-notification-cart-edd') {
          return true;
        }
        for (const child of element.childNodes) {
          if (child.nodeType === Node.ELEMENT_NODE && findTargetDiv(child)) {
            return true;
          }
        }
        return false;
      }
      // Create a MutationObserver instance
      const observer = new MutationObserver(onDivRendered);
      // Configuration for the observer (observe changes to the body's child nodes)
      const config = { childList: true, subtree: true };
      observer.observe(document.body, config);
    }
     
  },500)
  const cartForms = document.querySelectorAll('form[action="/cart"]');

  // Add event listeners to each form
  cartForms.forEach((form) => {
    //   form.addEventListener('submit', handleCartFormSubmit);
  });
  const productPagePattern =
    /^\/(?:products|collections\/[^/]+\/products)\/[^/]+/;
  if (window.location.pathname.includes("/checkout")) {
    callGAEvent("Checkout Initiated", {});
  }
  if (window.location.pathname.includes("thank_you")) {
    callGAEvent("Order Created", {});
  }
  const gaAtcSelectors = globalCheckActiveDetails?.data?.[0]?.placeholders?.ga?.atc
  if(gaAtcSelectors && gaAtcSelectors?.length){
    for(let i = 0; i< gaAtcSelectors?.length ; i++){
      document.querySelectorAll(gaAtcSelectors[i]).forEach(item=> item.addEventListener('click',gaAtcClickHandler))
    }
  }else{
  const allForms = document.querySelectorAll("form");
  allForms.forEach(async (form) => {
     const action = form.getAttribute("action");
    if (action === "/cart/add" || action === "/cart/update") {
      form.addEventListener("submit", formSubmissionHandler, true);
      setTimeout(async ()=>{
        const authToken = globalAuthToken ? globalAuthToken : 
        localStorage.getItem("_p_token") &&
        new Date().getTime() <
          JSON.parse(localStorage.getItem("_p_token"))?.expirationTime
          ? JSON.parse(localStorage.getItem("_p_token"))?.value
          : await getSellerAuthToken(sellerEmail);
      // const sellerDetails = globalSellerDetails ? globalSellerDetails : 
      //   localStorage.getItem("_p_buzz_info") &&
      //   new Date().getTime() <
      //     JSON.parse(localStorage.getItem("_p_buzz_info"))?.expirationTime
      //     ? JSON.parse(localStorage.getItem("_p_buzz_info"))?.value
      //     : await getPromiseSellerDetails(authToken);
        let company_id =globalCheckActiveDetails?.data?.[0]?.cid ;
        if(company_id == 78476 || company_id == 127259 || company_id== 2937780 )
         form.addEventListener("click", formClickingHandler, true);
      },500)
     // form.addEventListener("click", formClickingHandler, true);
    }
  });
}
  // Check if the current URL matches the product page pattern
  if (productPagePattern.test(window.location.pathname)) {
    let sovaCustom = hideSovaURLs.filter((item)=>(window.location.pathname.includes(item))).length
  if(sellerEmail === "98aca214-d921-4246-a3cb-96d4b357e706" &&  sovaCustom >0 ){

  }  else{
    const toHideSelectors = globalCheckActiveDetails?.data?.[0]?.placeholders?.to_hide
    if(toHideSelectors && toHideSelectors?.length){
      for(let i = 0; i< toHideSelectors?.length ; i++){
        document.querySelector(toHideSelectors[i]).innerHTML=null;
      }
    }
    const promisePdpTags = document.querySelectorAll(".promise-product-page");
    if (promisePdpTags.length == 0) {
      const newElement = document.createElement("div");
      newElement.className = "promise-product-page";
      
      const newElement2 = document.createElement("div");
      newElement2.className = "promise-company-features";
      let placeholders = globalCheckActiveDetails?.data?.[0]?.placeholders?.widgets?.pdp
      if(placeholders && placeholders.length){
        for(let i= 0; i<placeholders.length ; i++){
        let newEl = document.createElement('div');
        newEl.className = widgetTypeMap[placeholders[i].type];
        let allFormTags = document.querySelectorAll(placeholders[i].selector);
        allFormTags[0].insertAdjacentElement(placeholders[i].position,newEl);
        }
      }
     else {
        const allFormTags = document.querySelectorAll('form[action="/cart/add"]');
        const filteredFormTags = Array.from(allFormTags).filter((form) => {
          return Array.from(form.elements).some(
            (element) => element.type === "submit"
          );
        });

        if (filteredFormTags.length) {
          filteredFormTags[0].insertAdjacentElement("afterend", newElement2);
          filteredFormTags[0].insertAdjacentElement("afterend", newElement);
        }
      }
    } else {
      const promiseCompanyFeatures = document.querySelectorAll(".promise-company-features")
      if (promiseCompanyFeatures.length == 0) {
        const newElement2 = document.createElement("div");
      newElement2.className = "promise-company-features";
      promisePdpTags[0].insertAdjacentElement('afterend',newElement2)
      }
    }
  }
  const widgetElements = document.querySelectorAll(".promise-product-page");
let interactionStartTime;
widgetElements.forEach((el)=> el.addEventListener('click', () => {
callGAEvent("Clicked on Promise Widget",{})
}));
widgetElements.forEach((el)=> el.addEventListener('touchstart', () => {
  interactionStartTime = startWidgetInteraction();
}));
widgetElements.forEach((el)=> el.addEventListener('touchend', () => {
  if (interactionStartTime) {
    endWidgetInteraction(interactionStartTime);
    interactionStartTime = null;
  }
}));
widgetElements.forEach((el)=> el.addEventListener('mouseenter', () => {
  interactionStartTime = startWidgetInteraction();
}));
widgetElements.forEach((el)=> el.addEventListener('mouseleave', () => {
  if (interactionStartTime) {
    endWidgetInteraction(interactionStartTime);
    interactionStartTime = null;
  }
}));
  }
}
async function setAuthAndStatsInLocal(){
  const authToken = globalAuthToken ? globalAuthToken :
      localStorage.getItem("_p_token") &&
      new Date().getTime() <
        JSON.parse(localStorage.getItem("_p_token"))?.expirationTime
        ? JSON.parse(localStorage.getItem("_p_token"))?.value
        : await getSellerAuthToken(sellerEmail);
  globalAuthToken = authToken;
  const sellerDetails = globalSellerDetails ? globalSellerDetails :
  localStorage.getItem("_p_buzz_info") &&
  new Date().getTime() <
    JSON.parse(localStorage.getItem("_p_buzz_info"))
      ?.expirationTime
    ? JSON.parse(localStorage.getItem("_p_buzz_info"))?.value
    : await getPromiseSellerDetails(authToken);
    globalSellerDetails = sellerDetails
}
document.addEventListener("DOMContentLoaded", async () => {
 // await setAuthAndStatsInLocal();
  const isPromiseActive = await checkPromiseActiveStatus(sellerEmail);
  if (isPromiseActive) {
    addPromiseClarityScript(globalCheckActiveDetails?.data?.[0]?.settings?.shopify?.clarity_code);
    clarity("set", "ABtheme", promiseABVersion );
    addPromiseTagsOnSellerPage();
    renderHeadJSCode();
    renderPromisePageWithShimmer();

    try {
      const tempAuth = JSON.parse(localStorage.getItem("_p_token"));
    } catch {
      localStorage.removeItem("_p_token");
    }
    const authToken = globalAuthToken ? globalAuthToken : 
      localStorage.getItem("_p_token") &&
      new Date().getTime() <
        JSON.parse(localStorage.getItem("_p_token"))?.expirationTime
        ? JSON.parse(localStorage.getItem("_p_token"))?.value
        : await getSellerAuthToken(sellerEmail);
    if(authToken){
        // const sellerDetails = globalSellerDetails ? globalSellerDetails :
        //   localStorage.getItem("_p_buzz_info") &&
        //   new Date().getTime() <
        //     JSON.parse(localStorage.getItem("_p_buzz_info"))
        //       ?.expirationTime
        //     ? JSON.parse(localStorage.getItem("_p_buzz_info"))?.value
        //     : await getPromiseSellerDetails(authToken);

        renderPromiseOverlay(authToken);

        const buyerPincode = localStorage.getItem("_p_pcode");
        if (buyerPincode) {
          const servicibilityDetails = await getServicibilityDetails(authToken, buyerPincode, globalCheckActiveDetails?.data?.[0]?.cid);
             
          if (
            servicibilityDetails?.data[0]?.courier_response?.promise_edd && servicibilityDetails?.data[0]?.courier_response?.promise_edd !== "NA"
          ) {
            edd_days = getPromiseNumberOfDays(servicibilityDetails?.data[0]?.courier_response?.promise_edd)
            edd_displayed = getDayOfWeek(
              servicibilityDetails?.data[0]?.courier_response?.promise_edd
            )+", "+ servicibilityDetails?.data[0]?.courier_response?.promise_edd
            renderOnlyServicableData(
              servicibilityDetails,
              buyerPincode
            );
           
            localStorage.setItem("_p_edd",getDayOfWeek(
              servicibilityDetails?.data[0]?.courier_response?.promise_edd
            )+", "+ servicibilityDetails?.data[0]?.courier_response?.promise_edd)
          } else {
           renderOnlyCheckServiceData();
          }

          if (globalCheckActiveDetails?.data?.[0]?.info?.brand_name) {
           if(promiseABVersion==="B")renderPromiseSellerDetails();
          }
        } else if (!buyerPincode) {
          // const sellerDetails =
          //   localStorage.getItem("_p_buzz_info") &&
          //   new Date().getTime() <
          //     JSON.parse(localStorage.getItem("_p_buzz_info"))
          //       ?.expirationTime
          //     ? JSON.parse(localStorage.getItem("_p_buzz_info"))?.value
          //     : await getPromiseSellerDetails(authToken);
          if (globalCheckActiveDetails?.data?.[0]?.info?.brand_name) {
            if(promiseABVersion==="B") renderPromiseSellerDetails();
          }
          const systemIPAddress = await getPromiseSystemIP();
          if (systemIPAddress?.query) {
            if (systemIPAddress?.zip && systemIPAddress?.countryCode =="IN") {
              localStorage.setItem("_p_pcode", systemIPAddress?.zip);
              const servicibilityDetails = await getServicibilityDetails(authToken, systemIPAddress?.zip, globalCheckActiveDetails?.data?.[0]?.cid);
                 
              if (
                servicibilityDetails?.data[0]?.courier_response?.promise_edd && servicibilityDetails?.data[0]?.courier_response?.promise_edd !== "NA"
              ) {
                edd_days = getPromiseNumberOfDays(servicibilityDetails?.data[0]?.courier_response?.promise_edd)
                edd_displayed = getDayOfWeek(
                  servicibilityDetails?.data[0]?.courier_response?.promise_edd
                )+", "+ servicibilityDetails?.data[0]?.courier_response?.promise_edd
                renderOnlyServicableData(
                  servicibilityDetails,
                  systemIPAddress?.zip
                );
               
                localStorage.setItem("_p_edd",getDayOfWeek(
                  servicibilityDetails?.data[0]?.courier_response?.promise_edd
                )+", "+ servicibilityDetails?.data[0]?.courier_response?.promise_edd)
                
              } else {
                renderOnlyCheckServiceData();
              }
            }
          } else {
            renderOnlyCheckServiceData();
          }
        }
        if (/^\/(?:products|collections\/[^/]+\/products)\/[^/]+/.test(window.location.pathname)) {
          callGAEvent("PDP loaded", {});
          
          if (isABTestEnabled === true) {
            if (promiseABVersion === "A") {
              callGAEvent("PDP loaded with A", {});
            } else if (promiseABVersion === "B") {
              callGAEvent("PDP loaded with B", {});
            } else {
              callGAEvent("PDP loaded with C", {});
            }
          }
        }
      }
    else{
      if (document.querySelectorAll(".promise-product-page") && promiseABVersion != "C") {
          const orderDetails = document.querySelectorAll(".promise-product-page");
          orderDetails.forEach((image) => {
            image.innerHTML = null;
          }); 
    }}
  }
});

function getDayOfWeek(date) {
  const inputDate = new Date(date);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (inputDate.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  }

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayIndex = inputDate.getDay();
  return daysOfWeek[dayIndex];
}
function closePromisePopup() {
  if(promiseABVersion==="A"){
  var element = document.getElementsByClassName("promise-overlay-bg")[0];
  element.classList.add("display-none");
  }
  else{
    document.body.classList.remove("promise-no-scroll");
  var element = document.getElementsByClassName("overlay-bg")[0];
  element.classList.add("display-none");
  }
}
function openPromisePopup(source) {
  if(promiseABVersion==="A"){
  if(source){
    callGAEvent('Clicked On '+source , {})
let promiseHeading = promisePopUpContent[source].title;
let promiseContent = promisePopUpContent[source].content;
if(source === 'default' || source === 'five_star'){
  promiseContent = promiseContent.replace("{{years}}", globalCheckActiveDetails?.data?.[0]?.settings?.shopify?.expertise_years)
  promiseContent = promiseContent.replace("{{happy_customers}}", globalCheckActiveDetails?.data?.[0]?.settings?.shopify?.happy_customers)
  promiseContent = promiseContent.replace("{{successful_shipments}}", globalCheckActiveDetails?.data?.[0]?.settings?.shopify?.successful_shipments
  )
}
else if(source === 'refund_return'){
  promiseContent = promiseContent.replace("{{X}}", globalCheckActiveDetails?.data?.[0]?.settings?.return?.max_days)
  promiseHeading = promiseHeading.replace("{{X}}", globalCheckActiveDetails?.data?.[0]?.settings?.return?.max_days)
}
document.getElementById('promise-popup-heading').innerHTML = promiseHeading;
document.getElementById('promise-popup-content').innerHTML = promiseContent;
  }
  var element = document.getElementsByClassName("promise-overlay-bg")[0];
  element.classList.remove("display-none");
}
else{
  if (source == "banner") gaPromiseBannerClicked();
  else GaPromiseLogoClicked();
  document.body.classList.add("promise-no-scroll");
  var element = document.getElementsByClassName("overlay-bg")[0];
  element.classList.remove("display-none");
}
}
function editPromisePincode(){
  if(promiseABVersion==="A"){
    callGAEvent("Clicked on Edit Pincode", {});
  document.getElementById("enter-pincode").innerHTML = ` <div style="    font-size: 14px;
  font-weight: bold;    margin-top: 12px;">
      Enter Pincode
  </div>
  <div class="promise-flexbox" style="align-items: baseline;"> <div style="width: 250px;margin-top: 11px;"><input  id="promise-enter-pincode-input" style="border: 1px solid gainsboro;
  width: 100%;
  height: 30px;
  font-family: Arial, Helvetica, sans-serif !important;
  background: #80808017;
  color: gray;
  padding-left: 10px;" maxlength="6"/><div id="promise-input-error-msg" style="
    font-size: 12px;
    color: #D82C0D;
    line-height: 22px;white-space: nowrap;"></div></div>
    <div style="    height: 27px;
    width: 71px;
    border: none;
    color: white;
    background: #6e7cc3;
    margin-left: 7px;
    padding: 6px 13px;
    font-size: 12px;
    border-radius: 2px;
    cursor: pointer;
    margin-right: 12px;
    white-space: nowrap;
    box-sizing: border-box;" onclick="applyPromisePincode()">Change</div></div>`
    document
    .getElementById("promise-enter-pincode-input")
    .addEventListener("keydown", handlePromiseInputKeyPress);
  }
  else{
    callGAEvent("Clicked on Edit Pincode", {});
    const enterPincodeHtml = `<div class="promise-flexbox" style="align-items: baseline;"><div style="line-height: 22px;white-space: nowrap;" class="pro-tag-text"> Edit Pincode</div> <div style="width: 50%;margin-left: 10px;"><input  id="promise-enter-pincode-input" style="border: 1px solid gainsboro; 
    width:100%;
    height: 30px;font-family: Arial, Helvetica, sans-serif !important;" maxlength="6"/><div id="promise-input-error-msg" style="
  font-size: 12px;
  color: #D82C0D;
  line-height: 22px;white-space: nowrap;"></div></div><div style=" height: 30px;
  width: 66px;
  border: none;
  color: white;
  background: #2C1566;
  margin-left: 12px;
  padding: 6px 16px;
  font-size: 14px;
  border-radius: 2px;
  cursor: pointer;    margin-right: 12px;white-space: nowrap" onclick="applyPromisePincode()">Apply</div></div>`;
    document.getElementById("promise-edit-pincode").innerHTML = enterPincodeHtml;
    document
      .getElementById("promise-enter-pincode-input")
      .addEventListener("keydown", handlePromiseInputKeyPress);
  }
  }
 async function applyPromisePincode(){
   if(promiseABVersion==="A"){
    if (
      !/^[1-9][0-9]{5}$/.test(
        document.getElementById("promise-enter-pincode-input").value
      )
    ) {
      setTimeout(() => {
        document.getElementById("promise-enter-pincode-input").style.border =
          "1px solid red";
        document.getElementById("promise-input-error-msg").innerHTML =
          "Invalid Pincode!";
      }, 100);
    } else {
      const sellerEmail = document
        .getElementById("promise-overlay")
        ?.getAttribute("seller-email")
        ? document.getElementById("promise-overlay")?.getAttribute("seller-email")
        : "";
      const authToken = globalAuthToken ? globalAuthToken :
        localStorage.getItem("_p_token") &&
        new Date().getTime() <
          JSON.parse(localStorage.getItem("_p_token"))?.expirationTime
          ? JSON.parse(localStorage.getItem("_p_token"))?.value
          : await getSellerAuthToken(sellerEmail);
      // const sellerDetails = globalSellerDetails ? globalSellerDetails :
      //   localStorage.getItem("_p_buzz_info") &&
      //   new Date().getTime() <
      //     JSON.parse(localStorage.getItem("_p_buzz_info"))
      //       ?.expirationTime
      //     ? JSON.parse(localStorage.getItem("_p_buzz_info"))?.value
      //     : await getPromiseSellerDetails(authToken);
      const servicibilityDetails = await getServicibilityDetails(
        authToken,
        document.getElementById("promise-enter-pincode-input").value,
        globalCheckActiveDetails?.data?.[0]?.cid
      );
  
      if (
        servicibilityDetails?.data[0]?.courier_response?.promise_edd && servicibilityDetails?.data[0]?.courier_response?.promise_edd !== "NA"
      ) {
        localStorage.setItem(
          "_p_pcode",
          document.getElementById("promise-enter-pincode-input").value
        );
        edd_days = getPromiseNumberOfDays(servicibilityDetails?.data[0]?.courier_response?.promise_edd)
        edd_displayed = getDayOfWeek(
          servicibilityDetails?.data[0]?.courier_response?.promise_edd
        )+", "+ servicibilityDetails?.data[0]?.courier_response?.promise_edd
        localStorage.setItem("_p_edd",getDayOfWeek(
          servicibilityDetails?.data[0]?.courier_response?.promise_edd
        )+", "+ servicibilityDetails?.data[0]?.courier_response?.promise_edd)
        callGAEvent("EDD displayed", {
          delivery_pincode: document.getElementById("promise-enter-pincode-input")
            .value,
          edd_presented:
            servicibilityDetails?.data[0]?.courier_response?.promise_edd,
        });
  document.getElementById("enter-pincode").innerHTML = ` <div class="promise-flexbox" style="color:#5968BE;margin-top:13px;margin-bottom: 13px;"><img
  src="https://remarkable-bonbon-adc3d3.netlify.app/new-icons/location.png" style="height: 14px;
  margin-top: 1px;    margin-left: 8px;
  " />
  <div style="font-size:13px;margin-left: 6px; ">Deliver to ${
    servicibilityDetails?.data[0]?.postcode_info?.city
      .charAt(0)
      .toUpperCase() +
    servicibilityDetails?.data[0]?.postcode_info?.city.slice(
      1
    )
  } - ${document.getElementById("promise-enter-pincode-input").value}</div><img src="https://remarkable-bonbon-adc3d3.netlify.app/new-icons/edit-icon.png" style="height: 13px;
  margin-left: 6px;
  margin-top: 1px;cursor: pointer;" onclick="editPromisePincode()" />
  </div>`
  document.getElementById("delivery-msg").innerHTML = ` <div class="promise-flexbox" style="margin-top:13px"><img src="https://remarkable-bonbon-adc3d3.netlify.app/new-icons/box-icon.png" style="
  height: 14px;
  margin-top: 1px;
  margin-right: 5px;
  " />
  <div style="font-size: 14px;">Get it by <span style="font-weight:600;float:inherit;">${getDayOfWeek(
    servicibilityDetails?.data[0]?.courier_response?.promise_edd
  )},
      
 
      ${
        servicibilityDetails?.data[0]?.courier_response?.promise_edd
      }</span> with </div><div class="promise-flexbox" style="cursor: pointer;" onclick="openPromisePopup('default')"><div class="circle-container">
      <img src="https://remarkable-bonbon-adc3d3.netlify.app/with-bg.svg" style="margin: 2px;height: 16px;margin-top: 0px;">
      <div class="circle-animation"></div>
      </div>
      <img src="https://remarkable-bonbon-adc3d3.netlify.app/sr-text.svg" style="height: 9px;margin-top: 5px;margin-left: 2px;">
          <img src="https://remarkable-bonbon-adc3d3.netlify.app/new-icons/info.png" style="
          height: 9px;
          margin-top: 5px;
          margin-left: 4px;
          ">
  </div>
  </div>`
  document.getElementById("sr-icon").innerHTML = null
      }
      else{
        document.getElementById("promise-enter-pincode-input").style.border =
        "1px solid red";
      document.getElementById("promise-input-error-msg").innerHTML =
        "Pincode not serviceable!";
      }
    }
  }
  else{
    if (
      !/^[1-9][0-9]{5}$/.test(
        document.getElementById("promise-enter-pincode-input").value
      )
    ) {
      setTimeout(() => {
        document.getElementById("promise-enter-pincode-input").style.border =
          "1px solid red";
        document.getElementById("promise-input-error-msg").innerHTML =
          "Invalid Pincode!";
      }, 100);
    } else {
      const sellerEmail = document
        .getElementById("promise-overlay")
        ?.getAttribute("seller-email")
        ? document.getElementById("promise-overlay")?.getAttribute("seller-email")
        : "";
      const authToken = globalAuthToken ? globalAuthToken :
        localStorage.getItem("_p_token") &&
        new Date().getTime() <
          JSON.parse(localStorage.getItem("_p_token"))?.expirationTime
          ? JSON.parse(localStorage.getItem("_p_token"))?.value
          : await getSellerAuthToken(sellerEmail);
      // const sellerDetails = globalSellerDetails ? globalSellerDetails :
      //   localStorage.getItem("_p_buzz_info") &&
      //   new Date().getTime() <
      //     JSON.parse(localStorage.getItem("_p_buzz_info"))
      //       ?.expirationTime
      //     ? JSON.parse(localStorage.getItem("_p_buzz_info"))?.value
      //     : await getPromiseSellerDetails(authToken);
      const servicibilityDetails = await getServicibilityDetails(
        authToken,
        document.getElementById("promise-enter-pincode-input").value,
        globalCheckActiveDetails?.data?.[0]?.cid
      );
  
      if (
        servicibilityDetails?.data[0]?.courier_response?.promise_edd && servicibilityDetails?.data[0]?.courier_response?.promise_edd !== "NA"
      ) {
        localStorage.setItem(
          "_p_pcode",
          document.getElementById("promise-enter-pincode-input").value
        );
        edd_days = getPromiseNumberOfDays(servicibilityDetails?.data[0]?.courier_response?.promise_edd)
        edd_displayed = getDayOfWeek(
          servicibilityDetails?.data[0]?.courier_response?.promise_edd
        )+", "+ servicibilityDetails?.data[0]?.courier_response?.promise_edd
        localStorage.setItem("_p_edd",getDayOfWeek(
          servicibilityDetails?.data[0]?.courier_response?.promise_edd
        )+", "+ servicibilityDetails?.data[0]?.courier_response?.promise_edd)
        callGAEvent("EDD displayed", {
          delivery_pincode: document.getElementById("promise-enter-pincode-input")
            .value,
          edd_presented:
            servicibilityDetails?.data[0]?.courier_response?.promise_edd,
        });
        const pincodeDataHTML = ` <div class="pro-tag-box">
            <div style="margin-bottom: 20px" class="promise-flexbox promise-space-between center-align">
                <div class="promise-flexbox flex-end-align" style="cursor:pointer" onclick="openPromisePopup()">
                <img style="height:27px; vertical-align: baseline;" src="${promiseImgUrl}sr-promise.png" height="27" />
                <img src="${promiseImgUrl}info.png" style="margin:2px;height:11px;vertical-align: baseline;"
                    height="11px" />
                </div>
                ${
                  servicibilityDetails?.data[0]?.courier_response?.cod_available &&
                  globalCheckActiveDetails?.data?.[0]?.settings?.shopify?.cod_option
                    ? ` ${
                      globalCheckActiveDetails?.data?.[0]?.cid === 2567782
                          ? ` <div style="background: #313652; ;
                    padding: 4px 25px 4px 9px;
                    border-radius: 5px 0px 0px 5px;color:#FFFFFF;    font-size: 14px;
                    white-space: nowrap;" class="pro-tag-text">`
                          : `<div style="background: #d7d0fd ;
                    padding: 4px 25px 4px 9px;
                    border-radius: 5px 0px 0px 5px;font-size:14px;" class="pro-tag-text">`
                      }<span style="font-weight: 600;">COD</span> available</div>`
                    : ``
                }
            </div>
            <div style="line-height: 20px;
          word-spacing: 0.28px; margin-bottom: 18px;    margin-right: 10px;" class="pro-tag-text pro-web-text"><span> <img
                        src="${promiseImgUrl}del-date.png"
                        style="margin-right:8px;height:12px; vertical-align: baseline;display:inline; " height="12" />Guaranteed delivery by
                    <span style="font-weight: 600;">${getDayOfWeek(
                      servicibilityDetails?.data[0]?.courier_response?.promise_edd
                    )},
                        
                   
                        ${
                          servicibilityDetails?.data[0]?.courier_response?.promise_edd
                        }</span></div>
               <div id="promise-edit-pincode">
            <div style="line-height: 22px;font-size: 14px;" class="pro-tag-text"><span> <img
                        src="${promiseImgUrl}location-pin.png" style="margin-right:4px;margin-bottom:-2px;height:14px; vertical-align: baseline;display:inline;"
                        height="14" /></span>Deliver in ${
                          servicibilityDetails?.data[0]?.postcode_info?.city
                            .charAt(0)
                            .toUpperCase() +
                          servicibilityDetails?.data[0]?.postcode_info?.city.slice(
                            1
                          )
                        } ${
          document.getElementById("promise-enter-pincode-input").value
        } <a onclick="editPromisePincode()" style="text-decoration: underline;
                        color: #5A1CBD;
                        cursor: pointer;font-size: 14px;"> Edit
                    pincode</a>
            </div>
          </div> 
          </div>`;
        if (document.getElementById("promise-tag-box") && promiseABVersion != "C"){
          document.getElementById("promise-tag-box").innerHTML = pincodeDataHTML;
        }
      } else {
        document.getElementById("promise-enter-pincode-input").style.border =
          "1px solid red";
        document.getElementById("promise-input-error-msg").innerHTML =
          "Pincode not serviceable!";
      }
    }
  }
  }

async function applyEditPincode() {
  if (
    !/^[1-9][0-9]{5}$/.test(
      document.getElementById("promise-enter-pincode-input").value
    )
  ) {
    setTimeout(() => {
      document.getElementById("promise-enter-pincode-input").style.border =
        "1px solid red";
      document.getElementById("promise-input-error-msg").innerHTML =
        "Invalid Pincode!";
    }, 100);
  } else {
    const sellerEmail = document
      .getElementById("promise-overlay")
      ?.getAttribute("seller-email")
      ? document.getElementById("promise-overlay")?.getAttribute("seller-email")
      : "";
    const authToken = globalAuthToken ? globalAuthToken :
      localStorage.getItem("_p_token") &&
      new Date().getTime() <
        JSON.parse(localStorage.getItem("_p_token"))?.expirationTime
        ? JSON.parse(localStorage.getItem("_p_token"))?.value
        : await getSellerAuthToken(sellerEmail);
    // const sellerDetails = globalSellerDetails ? globalSellerDetails :
    //   localStorage.getItem("_p_buzz_info") &&
    //   new Date().getTime() <
    //     JSON.parse(localStorage.getItem("_p_buzz_info"))
    //       ?.expirationTime
    //     ? JSON.parse(localStorage.getItem("_p_buzz_info"))?.value
    //     : await getPromiseSellerDetails(authToken);
    const servicibilityDetails = await getServicibilityDetails(
      authToken,
      document.getElementById("promise-enter-pincode-input").value,
      globalCheckActiveDetails?.data?.[0]?.cid
    );

    if (
      servicibilityDetails?.data[0]?.courier_response?.promise_edd && servicibilityDetails?.data[0]?.courier_response?.promise_edd !== "NA"
    ) {
      localStorage.setItem(
        "_p_pcode",
        document.getElementById("promise-enter-pincode-input").value
      );
      edd_days = getPromiseNumberOfDays(servicibilityDetails?.data[0]?.courier_response?.promise_edd)
      edd_displayed = getDayOfWeek(
        servicibilityDetails?.data[0]?.courier_response?.promise_edd
      )+", "+ servicibilityDetails?.data[0]?.courier_response?.promise_edd
      localStorage.setItem("_p_edd",getDayOfWeek(
        servicibilityDetails?.data[0]?.courier_response?.promise_edd
      )+", "+ servicibilityDetails?.data[0]?.courier_response?.promise_edd)
      callGAEvent("EDD displayed", {
        delivery_pincode: document.getElementById("promise-enter-pincode-input")
          .value,
        edd_presented:
          servicibilityDetails?.data[0]?.courier_response?.promise_edd,
      });
      const pincodeDataHTML = ` <div class="pro-tag-box">
          <div style="margin-bottom: 20px" class="promise-flexbox promise-space-between center-align">
              <div class="promise-flexbox flex-end-align" style="cursor:pointer" onclick="openPromisePopup()">
              <img style="height:27px; vertical-align: baseline;" src="${promiseImgUrl}sr-promise.png" height="27" />
              <img src="${promiseImgUrl}info.png" style="margin:2px;height:11px;vertical-align: baseline;"
                  height="11px" />
              </div>
              ${
                servicibilityDetails?.data[0]?.courier_response?.cod_available &&
                globalCheckActiveDetails?.data?.[0]?.settings?.shopify?.cod_option
                  ? ` ${
                    globalCheckActiveDetails?.data?.[0]?.cid === 2567782
                        ? ` <div style="background: #313652; ;
                  padding: 4px 25px 4px 9px;
                  border-radius: 5px 0px 0px 5px;color:#FFFFFF;    font-size: 14px;
                  white-space: nowrap;" class="pro-tag-text">`
                        : `<div style="background: #d7d0fd ;
                  padding: 4px 25px 4px 9px;
                  border-radius: 5px 0px 0px 5px;font-size:14px;" class="pro-tag-text">`
                    }<span style="font-weight: 600;">COD</span> available</div>`
                  : ``
              }
          </div>
          <div style="line-height: 20px;
        word-spacing: 0.28px; margin-bottom: 18px;    margin-right: 10px;" class="pro-tag-text pro-web-text"><span> <img
                      src="${promiseImgUrl}del-date.png"
                      style="margin-right:8px;height:12px; vertical-align: baseline;display:inline; " height="12" />Guaranteed delivery by
                  <span style="font-weight: 600;">${getDayOfWeek(
                    servicibilityDetails?.data[0]?.courier_response?.promise_edd
                  )},
                      
                 
                      ${
                        servicibilityDetails?.data[0]?.courier_response?.promise_edd
                      }</span></div>
             <div id="promise-edit-pincode">
          <div style="line-height: 22px;font-size: 14px;" class="pro-tag-text"><span> <img
                      src="${promiseImgUrl}location-pin.png" style="margin-right:4px;margin-bottom:-2px;height:14px; vertical-align: baseline;display:inline;"
                      height="14" /></span>Deliver in ${
                        servicibilityDetails?.data[0]?.postcode_info?.city
                          .charAt(0)
                          .toUpperCase() +
                        servicibilityDetails?.data[0]?.postcode_info?.city.slice(
                          1
                        )
                      } ${
        document.getElementById("promise-enter-pincode-input").value
      } <a onclick="editPromisePincode()" style="text-decoration: underline;
                      color: #5A1CBD;
                      cursor: pointer;font-size: 14px;"> Edit
                  pincode</a>
          </div>
        </div> 
        </div>`;
      if (document.getElementById("promise-tag-box") && promiseABVersion != "C"){
        document.getElementById("promise-tag-box").innerHTML = pincodeDataHTML;
      }
    } else {
      document.getElementById("promise-enter-pincode-input").style.border =
        "1px solid red";
      document.getElementById("promise-input-error-msg").innerHTML =
        "Pincode not serviceable!";
    }
  }
}

function openEditPincode() {
  callGAEvent("Clicked on Edit Pincode", {});
  const enterPincodeHtml = `<div class="promise-flexbox" style="align-items: baseline;"><div style="line-height: 22px;white-space: nowrap;" class="pro-tag-text"> Edit Pincode</div> <div style="width: 50%;margin-left: 10px;"><input  id="promise-enter-pincode-input" style="border: 1px solid gainsboro; 
  width:100%;
  height: 30px;font-family: Arial, Helvetica, sans-serif !important;" maxlength="6"/><div id="promise-input-error-msg" style="
font-size: 12px;
color: #D82C0D;
line-height: 22px;white-space: nowrap;"></div></div><div style=" height: 30px;
width: 66px;
border: none;
color: white;
background: #2C1566;
margin-left: 12px;
padding: 6px 16px;
font-size: 14px;
border-radius: 2px;
cursor: pointer;    margin-right: 12px;white-space: nowrap" onclick="applyPromisePincode()">Apply</div></div>`;
  document.getElementById("promise-edit-pincode").innerHTML = enterPincodeHtml;
  document
    .getElementById("promise-enter-pincode-input")
    .addEventListener("keydown", handlePromiseInputKeyPress);
}