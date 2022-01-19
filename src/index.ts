import "../style/index.css";

const main = document.getElementsByTagName("main").item(0);
const pages = Array.from(main.children);
const rmap = ["?", "?schedule", "?map", "?prizes", "?officehours"];
let map = new Map<string, number>();
rmap.forEach((s, i) => map.set(s, i));
const rmapT = ["MakeMIT 2022 Day Of", "MakeMIT 2022 Schedule", "MakeMIT 2022 Map", "MakeMIT 2022 Prizes", "MakeMIT 2022 Office Hours"];
const timeouts = [0, 0, 0, 0];
function spa(i: number, modify = true, push = true) {
    const j = +main.getAttribute("data-visible");
    window.clearTimeout(timeouts[i]);
    if (j != i) {
        timeouts[j] = window.setTimeout(() => pages[j].removeAttribute("style"), 750);
        pages[j].removeAttribute("makemit-visible");
        const h = pages[i] as HTMLElement;
        h.style.display = "inherit";
        //Transition computation
        window.getComputedStyle(h).opacity;
        window.getComputedStyle(h).transform;
        pages[i].setAttribute("makemit-visible", "");
        main.setAttribute("data-visible", "" + i);
        if (modify) (push ? window.history.pushState : window.history.replaceState).bind(window.history)(i, rmapT[i], rmap[i]);
        document.title = rmapT[i];
        console.log(j + ", " + i);
        console.log(timeouts);
    }
}
for (let i = 0; i < pages.length; i++) {
    if (map.get(window.location.search) == i) {
        pages[i].setAttribute("style", "display:inherit;")
        spa(i, true, false);
        break;
    }
}
if (!window.location.search) {
    (pages[0] as HTMLElement).style.display = "unset";
    window.history.replaceState(0, rmapT[0], rmap[0]);
}
map = undefined;
(window as any).spa = spa;
window.onpopstate = (e: PopStateEvent) => { if (e.state || e.state == 0) spa(e.state, false); };