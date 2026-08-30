document.addEventListener("DOMContentLoaded", function () {

  const menuToggle =
    document.querySelector(".menu-toggle");

  const navigation =
    document.querySelector(".main-navigation");


  if (menuToggle && navigation) {

    menuToggle.addEventListener("click", function () {

      const isOpen =
        navigation.classList.toggle("is-open");


      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    });


    navigation
      .querySelectorAll("a")
      .forEach(function (link) {

        link.addEventListener("click", function () {

          navigation.classList.remove("is-open");

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        });

      });

  }


  const consentKey = "abc_analytics_consent";

  let consentBanner = null;


  function getConsentChoice() {

    try {
      return localStorage.getItem(consentKey);
    } catch (error) {
      return null;
    }

  }


  function saveConsentChoice(choice) {

    try {
      localStorage.setItem(consentKey, choice);
    } catch (error) {}

  }


  function updateGoogleConsent(choice) {

    if (typeof window.gtag !== "function") {
      return;
    }

    window.gtag("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage:
        choice === "granted" ? "granted" : "denied"
    });

  }


  function clearAnalyticsCookies() {

    document.cookie.split(";").forEach(function (cookie) {

      const cookieName =
        cookie.split("=")[0].trim();

      if (cookieName === "_ga" || cookieName.indexOf("_ga_") === 0) {

        document.cookie =
          cookieName + "=; Max-Age=0; path=/; SameSite=Lax";

        document.cookie =
          cookieName + "=; Max-Age=0; path=/; domain=.abcprojects.org; SameSite=Lax";

      }

    });

  }


  function closeConsentBanner() {

    if (!consentBanner) {
      return;
    }

    consentBanner.remove();
    consentBanner = null;

  }


  function setConsentChoice(choice) {

    saveConsentChoice(choice);
    updateGoogleConsent(choice);

    if (choice === "denied") {
      clearAnalyticsCookies();
    }

    if (choice === "granted" && typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href
      });
    }

    closeConsentBanner();

  }


  function showConsentBanner() {

    if (consentBanner) {
      return;
    }

    consentBanner = document.createElement("section");
    consentBanner.className = "cookie-consent";
    consentBanner.setAttribute("role", "dialog");
    consentBanner.setAttribute("aria-modal", "false");
    consentBanner.setAttribute("aria-labelledby", "cookie-consent-title");
    consentBanner.setAttribute("aria-describedby", "cookie-consent-description");

    consentBanner.innerHTML =
      '<div class="cookie-consent-inner">' +
        '<div class="cookie-consent-copy">' +
          '<h2 id="cookie-consent-title">Analytics Cookie Choice</h2>' +
          '<p id="cookie-consent-description">We use optional Google Analytics cookies to understand website use and improve our services. Advertising storage remains disabled. You can accept or reject analytics cookies and change your choice later in Cookie Settings. <a href="/privacy/">Read our Privacy Policy</a>.</p>' +
        '</div>' +
        '<div class="cookie-consent-actions">' +
          '<button class="cookie-button cookie-button-secondary" type="button" data-consent-reject>Reject Analytics</button>' +
          '<button class="cookie-button cookie-button-primary" type="button" data-consent-accept>Accept Analytics</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(consentBanner);

    consentBanner
      .querySelector("[data-consent-reject]")
      .addEventListener("click", function () {
        setConsentChoice("denied");
      });

    consentBanner
      .querySelector("[data-consent-accept]")
      .addEventListener("click", function () {
        setConsentChoice("granted");
      });

    consentBanner
      .querySelector("[data-consent-accept]")
      .focus();

  }


  document
    .querySelectorAll("[data-cookie-settings]")
    .forEach(function (button) {

      button.addEventListener("click", function () {
        showConsentBanner();
      });

    });


  if (!getConsentChoice()) {
    showConsentBanner();
  }

});
