import { APP_CONFIG, COLORS } from '@constants/general.const';

export const createElement = (tag, ...classList) => {
  const element = document.createElement(tag);
  if (classList && classList.length > 0) {
    element.classList.add(...classList.filter(Boolean));
  }
  return element;
};

export const createSvgObject = (
  svgName
) => `<object type="image/svg+xml" data="./assets/icons/${svgName}.svg">
    Your browser does not support SVG
</object>`;

export const createIcon = (name, ...classList) =>
  `<i class="material-icons ${
    classList ? classList.join(' ') : ''
  }">${name}</i>`;

export const setElementVariable = (element, name, value) =>
  element.style.setProperty(name, value);

export const fadeOutIn = function (passedCallback, context) {
  context.cameras.main.fadeOut(250);
  context.time.addEvent({
    delay: 250,
    callback: function () {
      context.cameras.main.fadeIn(250);
      passedCallback(context);
    },
    callbackScope: context,
  });
};

export const changeScene = (newSceneName, curScene, data) => {
  curScene.cameras.main.fadeOut(
    APP_CONFIG.sceneChangeDuration,
    COLORS.fadeBckg.red,
    COLORS.fadeBckg.green,
    COLORS.fadeBckg.blue
  );
  curScene.time.addEvent({
    delay: APP_CONFIG.sceneChangeDuration,
    callback: function () {
      curScene.scene.start(newSceneName, data);
    },
    callbackScope: curScene,
  });
};
