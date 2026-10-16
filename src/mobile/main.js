// List for remove target
const mobileTargets = [
  // Common + Gall
  ".rank-tit-box",
  ".nh-group",
  ".livebest-group",
  ".md-tit-box",
  "div.swiper-slide.swiper-slide-active",
  "#main-hotgall",
  "#newgall_category_static",
  ".media-group",
  ".survey",
  ".evt-noti",
  // Minor Gall
  ".minor-is",
  "div.swiper-container.swiper-container-horizontal.swiper-container-autoheight.swiper-container-android",
];

// Remove unnecessary contents
function removeElements() {
  mobileTargets.forEach((selector) => {
    const el = document.querySelector(selector);
    if (el) {
      el.remove();
    }
  });
}

// Try remove at first
removeElements();

// If page is loaded as async: use Mutation Observer
const observer = new MutationObserver(() => {
  removeElements();
});

// Start observing change of website on live.
observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});
