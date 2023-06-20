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

  let mapMenu;

  let styleSheet;
  let elementRules;

  function setMode(mode){
    if (mode == "compact"){
      for(let i = 0; i < styleSheet.cssRules.length; i++) {
        if(styleSheet.cssRules[i].selectorText === '.o-ui .padding-y-small') {
          styleSheet.cssRules[i].style.setProperty('padding-top','0.1rem');
          styleSheet.cssRules[i].style.setProperty('padding-bottom','0.1rem');
        }
        else if (styleSheet.cssRules[i].selectorText === '.o-ui .padding-top-small'){
          styleSheet.cssRules[i].style.setProperty('padding-top','0.1rem');
        }
        else if (styleSheet.cssRules[i].selectorText ==='.o-ui .list > li, .o-ui .list > .item'){
          styleSheet.cssRules[i].style.setProperty('padding-top','0.05rem');
          styleSheet.cssRules[i].style.setProperty('padding-bottom','0.05rem');
        }
        else if (styleSheet.cssRules[i].selectorText ==='.o-ui .list > li:first-child, .o-ui .list > .item:first-child'){
          styleSheet.cssRules[i].style.setProperty('padding-top','0.1rem');
        }
        else if (styleSheet.cssRules[i].selectorText ==='.o-ui .list > li:last-child, .o-ui .list > .item:last-child'){
          styleSheet.cssRules[i].style.setProperty('padding-top','0.1rem');
        }
      }
      isCompact = true;
    } else {
      for(let i = 0; i < styleSheet.cssRules.length; i++) {
        if(styleSheet.cssRules[i].selectorText === '.o-ui .padding-y-small') {
          styleSheet.cssRules[i].style.setProperty('padding-top','0.5rem');
          styleSheet.cssRules[i].style.setProperty('padding-bottom','0.5rem');
        }
        else if (styleSheet.cssRules[i].selectorText === '.o-ui .padding-top-small'){
          styleSheet.cssRules[i].style.setProperty('padding-top','0.5rem');
        }
        else if (styleSheet.cssRules[i].selectorText ==='.o-ui .list > li, .o-ui .list > .item'){
          styleSheet.cssRules[i].style.setProperty('padding-top','0.25rem');
          styleSheet.cssRules[i].style.setProperty('padding-bottom','0.25rem');
        }
        else if (styleSheet.cssRules[i].selectorText ==='.o-ui .list > li:first-child, .o-ui .list > .item:first-child'){
          styleSheet.cssRules[i].style.setProperty('padding-top','0.5rem');
        }
        else if (styleSheet.cssRules[i].selectorText ==='.o-ui .list > li:last-child, .o-ui .list > .item:last-child'){
          styleSheet.cssRules[i].style.setProperty('padding-top','0.5rem');
        }
      }
      isCompact = false;
    }
  }

  return Origo.ui.Component({
    name: 'guimodifier',
    onAdd(evt) {
      viewer = evt.target;
      mapMenu = viewer.getControlByName('mapmenu');
      styleSheet  = document.styleSheets[0];

      guiToggler = mapMenu.MenuItem({
        click() {
          if (isCompact) {
            setMode("original");
          } else {
            setMode("compact");
          }
          mapMenu.close();
        },
        icon: icon,
        title: 'Växla vy'
      });

      if (initialMode == "compact"){
        setMode("compact");
      } else {
        isCompact = false;
      }

      this.addComponent(guiToggler);
      this.on('render', this.onRender);
      this.render();
      this.dispatch('render');
    },
    onInit() {

    },
    render() {
      mapMenu.appendMenuItem(guiToggler);
    }
  });
};

export default Guimodifier;
