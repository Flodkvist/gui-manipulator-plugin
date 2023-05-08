import Origo from 'Origo';

const Guimodifier = function Guimodifier(options = {}) {
  const {
    initialMode = "original"
  } = options;
  let icon = '#fa-angle-double-down';
  let guiToggler;

  let viewer;
  let target;
  let isCompact;

  const ySmallEl = document.querySelectorAll(".o-ui .padding-y-small");
  const topSmallEl = document.querySelectorAll(".o-ui .padding-top-small");
  const padYsmallOriginal = "0.5rem";
  const padYsmallCompact = "0.1rem";

  const liItems = document.querySelectorAll(".o-ui .list > li, .o-ui .list > .item");
  const padListItemsOriginal = "0.25rem";
  const padListItemsCompact = "0.1rem";

  const liFirstItems = document.querySelectorAll(".list > li:first-child, .o-ui .list > .item:first-child");
  const liLastItems = document.querySelectorAll(".o-ui .list > li:last-child, .o-ui .list > .item:last-child");
  const padListFirstLastOriginal = "0.5rem";
  const padListFirstLastCompact = "0.25rem";

  function setMode(mode){
    if (mode == "compact"){
      ySmallEl.forEach(el => {
        el.style.paddingTop = padYsmallCompact;
        el.style.paddingBottom = padYsmallCompact;
      });
      topSmallEl.forEach(el => {
        el.style.paddingTop = padYsmallCompact;
      });
      liItems.forEach(el => {
        el.style.paddingTop = padListItemsCompact;
        el.style.paddingBottom = padListItemsCompact;
      });
      liFirstItems.forEach(el => {
        el.style.paddingTop = padListFirstLastCompact;
      });
      liLastItems.forEach(el => {
        el.style.paddingBottom = padListFirstLastCompact;
      });
      isCompact = true;
    } else {
      ySmallEl.forEach(el => {
        el.style.paddingTop = padYsmallOriginal;
        el.style.paddingBottom = padYsmallOriginal;
      });
      topSmallEl.forEach(el => {
        el.style.paddingTop = padYsmallOriginal;
      });
      liItems.forEach(el => {
        el.style.paddingTop = padListItemsOriginal;
        el.style.paddingBottom = padListItemsOriginal;
      });
      liFirstItems.forEach(el => {
        el.style.paddingTop = padListFirstLastOriginal;
      });
      liLastItems.forEach(el => {
        el.style.paddingBottom = padListFirstLastOriginal;
      });
      isCompact = false;
    }
  }

  return Origo.ui.Component({
    name: 'guimodifier',
    onInit() {
    /*  document.querySelectorAll("span.grow.padding-x-small").forEach(el => {
        el.style.fontWeight = "600";
      }); */

      guiToggler = Origo.ui.Button({
        cls: 'padding-small icon-smaller round light box-shadow',
        click() {
          if (isCompact) {
            setMode("original");
          } else {
            setMode("compact");
          }
        },
        icon,
        tooltipText: 'Växla mellan vanliga eller kompakta menyer',
        tooltipPlacement: 'east'
      });
      if (initialMode == "compact"){
        setMode("compact");
      } else {
        isCompact = false;
      }
    },
    onAdd(evt) {
      viewer = evt.target;
      isCompact = false;
      if (!target) target = `${viewer.getMain().getNavigation().getId()}`;
      this.addComponents([guiToggler]);
      this.render();
    },
    render() {
      const htmlString = guiToggler.render();
      const el = Origo.ui.dom.html(htmlString);
      document.getElementById(target).appendChild(el);
      this.dispatch('render');
    }
  });
};

export default Guimodifier;
