// List for remove target
const desktopTargets = [
  ".left_content",
  "#rank_gall",
  "#hot_gall",
  ".new_gall",
  ".dcmedia",
  ".all_list"
];

// Remove unnecessary contents
function removeElements() {
  desktopTargets.forEach(selector => {
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
  subtree: true
});
