function getKST() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = Object.fromEntries(
    formatter.formatToParts(now).map(({ type, value }) => [type, value]),
  );

  if (parts.hour === "24") parts.hour = "00";

  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`;
}

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
    ".mini_new",
    // 갤러리
    ".cont_head",
    ".pageing_box.gallmain",
    ".cont_list.img.recomImg",
    ".cont_list.txt.recomTxt",
    ".hotcate_list.clear",
    // 마이너 갤러리
    ".mgall_info.clear",
    ".mgall_list_wrap.clear",
    ".allandrank.clear",
    // 미니 갤러리
    ".mini_list_wrap.clear",
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

      let KST = getKST();
      console.log(`DCPrettier: ${KST} - ${selector}를 삭제했습니다.`);
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
