document.addEventListener("DOMContentLoaded", function () {
  let header = document.querySelector(".header");
  let anchors = document.querySelectorAll('a[href*="#"]');
  let hamburger = document.querySelector(".hamburger");
  let menu = document.querySelector(".nav");
  let menuItem = document.querySelectorAll(".nav__link");
  let mapArea = document.querySelectorAll(".map-area");
  let mapClose = document.querySelector(".close");
  let mapModal = document.querySelector(".modal-map");

  function fixHeader() {
    if (window.pageYOffset >= header.offsetHeight - 10) {
      header.classList.add("header--fixed");
    } else {
      header.classList.remove("header--fixed");
    };
  };

  window.addEventListener('scroll', fixHeader);

  hamburger.addEventListener("click", function (e) {
    this.classList.toggle("is-active");
    menu.classList.toggle("active");
  });

  for (let i = 0; i < menuItem.length; i++) {
    menuItem[i].addEventListener("click", function () {
      this.closest(".nav").classList.remove("active");
      hamburger.classList.remove("is-active")
    });
  };

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const blockID = anchor.getAttribute('href').substr(1)

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  };

  const disableScroll = () => {
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    document.body.dataset.scrollY = window.scrollY;
    document.body.style.cssText = `
      position: fixed;
      width: 100%;
      height: 100vh;
      top: ${-window.scrollY}px;
      overflow: hidden;
      padding-right: ${scrollBarWidth}px;
    `;
  };

  const enableScroll = () => {
    document.body.style.cssText = '';
    window.scroll({
      top: document.body.dataset.scrollY
    });
    document.body.dataset.scrollY = '';
  };

  mapArea.forEach(elem => {
    elem.addEventListener('click', function () {
      mapModal.classList.add("show");
      header.style.display = "none";
      disableScroll();
    });
  });

  mapClose.addEventListener("click", function () {
    mapModal.classList.remove("show");
    header.style.display = "flex";
    enableScroll();
  });

});

let header = document.querySelector(".header");

function fixHeader() {
  if (window.pageYOffset >= header.offsetHeight - 10) {
    header.classList.add("header--fixed");
  } else {
    header.classList.remove("header--fixed");
  };
};
window.addEventListener("load", fixHeader);