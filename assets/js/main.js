document.addEventListener("DOMContentLoaded", function () {

  const menuToggle =
    document.querySelector(".menu-toggle");

  const navigation =
    document.querySelector(".main-navigation");


  if (!menuToggle || !navigation) {
    return;
  }


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

});