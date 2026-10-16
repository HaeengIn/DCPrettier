// List for remove target
const dcconTargets = [".gall_exposure"];

// Remove unnecessary contents
function removeElements() {
  dcconTargets.forEach((selector) => {
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
