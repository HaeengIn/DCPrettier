const SELECTORS = {
  "www.dcinside.com": [
    ".gall_exposure",
    ".left_content",
    "#rank_gall",
    "#hot_gall",
    ".new_gall",
    ".dcmedia",
    ".all_list",
  ],
  "gall.dcinside.com": [
    ".gall_exposure",
    ".r_timebest",
    ".r_dcmedia",
    ".r_recommend",
    ".all_list",
    "#opt_use_pop",
    "#opt_use_pop_bg",
    ".left_content",
    ".mini_new",
  ],
  "m.dcinside.com": [
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
    ".minor-is",
  ],
  "dccon.dcinside.com": [".gall_exposure"],
  "mall.dcinside.com": [".gall_exposure"],
  "event.dcinside.com": [".all_list"],
};

const targets = SELECTORS[location.hostname] ?? [];
const remaining = new Set(targets);

function removeElements() {
  for (const selector of remaining) {
    const els = document.querySelectorAll(selector);
    if (els.length > 0) {
      els.forEach((el) => el.remove());
      remaining.delete(selector); // 실제로 찾았을 때만 제거
    }
  }
  if (remaining.size === 0) observer.disconnect();
}

let timer = null;

const observer = new MutationObserver(() => {
  if (timer) return;
  timer = requestAnimationFrame(() => {
    removeElements();
    timer = null;
  });
});

removeElements();
observer.observe(document.documentElement, { childList: true, subtree: true });
