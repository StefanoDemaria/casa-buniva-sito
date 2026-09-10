(function () {
  "use strict";

  var scroller = document.querySelector(".scroller");
  var rooms = Array.prototype.slice.call(document.querySelectorAll(".room"));
  var navbar = document.getElementById("navbar");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  var navButtons = Array.prototype.slice.call(document.querySelectorAll(".navlinks button, .navbar .brand"));

  // click on a nav link (or the brand) -> smooth scroll to that room, close mobile menu
  navButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var el = document.getElementById(btn.getAttribute("data-target"));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      navbar.classList.remove("is-open");
      if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var open = navbar.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // highlight the active section in the navbar as the user scrolls (both directions)
  var linkButtons = Array.prototype.slice.call(document.querySelectorAll(".navlinks button"));
  var navObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          linkButtons.forEach(function (btn) {
            btn.setAttribute("aria-current", btn.getAttribute("data-target") === id ? "true" : "false");
          });
        }
      });
    },
    { root: scroller, threshold: 0.55 }
  );
  rooms.forEach(function (r) {
    navObserver.observe(r);
  });

  // reveal content as each room scrolls into view, and reset it when it scrolls back out,
  // so the effect replays whether the visitor scrolls down or back up
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
        } else {
          entry.target.classList.remove("in");
        }
      });
    },
    { root: scroller, threshold: 0.28 }
  );
  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  // photo frames: if the real image file isn't there yet, show the "foto in arrivo" placeholder
  // instead of a broken-image icon. Drop a correctly-named file into images/ and it appears automatically.
  var frames = Array.prototype.slice.call(document.querySelectorAll(".photo-frame"));
  frames.forEach(function (frame) {
    var img = frame.querySelector("img");
    if (!img) return;
    var markMissing = function () {
      frame.classList.add("is-missing");
    };
    img.addEventListener("error", markMissing);
    if (img.complete && img.naturalWidth === 0) markMissing();
  });

  // duplicate the review cards once so the marquee loop is seamless
  var track = document.getElementById("marqueeTrack");
  if (track) {
    track.insertAdjacentHTML("beforeend", track.innerHTML);
  }

  // pause the marquee on touch as well as on hover
  var wrap = document.querySelector(".marquee-wrap");
  if (wrap && track) {
    wrap.addEventListener(
      "touchstart",
      function () {
        track.style.animationPlayState = "paused";
      },
      { passive: true }
    );
    wrap.addEventListener(
      "touchend",
      function () {
        track.style.animationPlayState = "running";
      },
      { passive: true }
    );
  }
})();
