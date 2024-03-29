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

  function setMode(mode){    //-- minifiying properies --
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
          styleSheet.cssRules[i].style.setProperty('padding-top','0.0rem');
          styleSheet.cssRules[i].style.setProperty('padding-bottom','0.0rem');
        }
        else if (styleSheet.cssRules[i].selectorText ==='.o-ui .list > li:first-child, .o-ui .list > .item:first-child'){
          styleSheet.cssRules[i].style.setProperty('padding-top','0.1rem');
        }
        else if (styleSheet.cssRules[i].selectorText ==='.o-ui .list > li:last-child, .o-ui .list > .item:last-child'){
          styleSheet.cssRules[i].style.setProperty('padding-top','0.1rem');
        }
        else if (styleSheet.cssRules[i].selectorText ==='.o-ui .button.icon-small .icon, .o-ui .button.icon-small .icon > *, .o-ui button.icon-small .icon, .o-ui button.icon-small .icon > *'){
          styleSheet.cssRules[i].style.setProperty('height','1rem');
          styleSheet.cssRules[i].style.setProperty('width','1rem');
        }
      }
      const cssRule = '.grey-lightest.round.compact.icon-small.relative.no-shrink.light {' +
        'height: calc(1rem + 2px) !important;' +
        'width: calc(1rem + 2px) !important;' +
        '}' ;
      styleSheet.insertRule(cssRule, styleSheet.cssRules.length);

      //-- legend button -- Unwanted Shrinkage, original size set to element.style
      const allElements = document.getElementsByTagName('*');
      for (let i = 0; i < allElements.length; i++) {
        const element = allElements[i];
        const xlinkHref = element.getAttribute('xlink:href');
        if (xlinkHref === '#ic_layers_24px') {
          const parentElement = element.parentNode;
          const parentStep2element=parentElement.parentNode
          parentElement.style.height ='1.5rem';
          parentElement.style.width ='1.5rem';
          parentStep2element.style.height = '1.5rem';
          parentStep2element.style.width = '1.5rem';
          break;
        }
      }

      // -- background map buttons -- Unwanted Shrinkage, original size set to element.style
      const bgButtons = document.querySelectorAll('.round.smallest.border.icon-small.icon-bg');
      bgButtons.forEach(function(element) {
        const bgIcons = element.querySelectorAll('.icon');
        bgIcons.forEach(function(bgIcon) {
          bgIcon.style.height = '1.5rem';
          bgIcon.style.width = '1.5rem';
          const bgImg = bgIcon.querySelector('img');
          bgImg.style.height = '1.5rem';
          bgImg.style.width = '1.5rem';
        });
      });

      // -- turnofflayercontrol -- Unwanted Shrinkage, original size set to element.style
      const layersOffBtn = document.querySelectorAll('.round.compact.icon-small.margin-x-smaller');
      layersOffBtn.forEach(function(element) {
        const layersOffIcons = element.querySelectorAll('.icon');
        layersOffIcons.forEach(function(layersOffIcon) {
          layersOffIcon.style.height = '1.5rem';
          layersOffIcon.style.width = '1.5rem';
          const layersOffSvg = layersOffIcon.querySelector('svg');
          layersOffSvg.style.height = '1.5rem';
          layersOffSvg.style.width = '1.5rem';
        });
      });

      isCompact = true;

    } else {    //-- The following is/are/should be the original origo css properties --
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
        else if (styleSheet.cssRules[i].selectorText ==='.o-ui .button.icon-small .icon, .o-ui .button.icon-small .icon > *, .o-ui button.icon-small .icon, .o-ui button.icon-small .icon > *'){
          styleSheet.cssRules[i].style.setProperty('height','1.5rem');
          styleSheet.cssRules[i].style.setProperty('width','1.5rem');
        }
        else if (styleSheet.cssRules[i].selectorText ==='.grey-lightest.round.compact.icon-small.relative.no-shrink.light'){
          styleSheet.deleteRule(i);
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
