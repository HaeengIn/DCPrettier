// List for remove target
const mobileTargets = [
  ".rank-tit-box",
  ".nh-group",
  ".livebest-group",
  ".gall-group",
  ".media-group",
  ".survey",
  ".evt-noti",
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
