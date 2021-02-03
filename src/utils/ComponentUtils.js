import {APP_CONFIG, APP_FONTS} from '@constants/general.const';

export const createSettingsBtn = (scene, onClick) => {
  const x = APP_CONFIG.edgeMargin;
  const y = APP_CONFIG.edgeMargin;
  const settingsBtn = createBtn({
    x,
    y,
    name: 'settings',
    scene,
    onClick
  });
  settingsBtn.y = -settingsBtn.height - y;
  scene.tweens.add({
    targets: settingsBtn,
    y,
    duration: APP_CONFIG.animationDuration,
    ease: 'Back'
  });
  return settingsBtn;
};

export const createBackBtn = (scene, onClick) => {
  const x = APP_CONFIG.edgeMargin * 2;
  const y = APP_CONFIG.edgeMargin * 2;
  const backBtn = createBtn({
    x,
    y,
    name: 'back',
    scene,
    onClick
  });
  backBtn.y = -backBtn.height - y;
  scene.tweens.add({
    targets: backBtn,
    y,
    duration: APP_CONFIG.animationDuration,
    ease: 'Back'
  });
  return backBtn;
};

export const jumpFromUp = (scene, element) => {
  const initialY = element.y;
  element.y = -element.height - element.y;
  scene.tweens.add({
    targets: element,
    y: initialY,
    duration: APP_CONFIG.animationDuration,
    ease: 'Back'
  });
}

export const jumpFromLeft = (scene, element) => {
  const initialX = element.x;
  element.x = -element.width - element.x;
  scene.tweens.add({
    targets: element,
    x: initialX,
    duration: APP_CONFIG.animationDuration,
    ease: 'Back'
  });
}

export const jumpFromRight = (scene, element) => {
  const initialX = element.x;
  element.x = scene.sys.canvas.width;
  scene.tweens.add({
    targets: element,
    x: initialX,
    duration: APP_CONFIG.animationDuration,
    ease: 'Back'
  });
}

export const createTitleText = (scene) => {
  const titleText = scene.add.text(
    scene.getWidth() / 2,
    scene.getHeight() / 4,
    APP_CONFIG.title,
    APP_FONTS.title
  ).setOrigin(0.5, 0)
    .setInteractive()
    .on('pointerover', function () {
      this.setStyle(APP_FONTS.titleHover);
    })
    .on('pointerout', function () {
      this.setStyle(APP_FONTS.title);
    });
  scaleUp(scene, titleText);
  return titleText;
};

export const createBtn = ({x, y, name, scene, onClick, originX = 0, originY = 0}) => scene.add.image(
  x, y, name
).setOrigin(originX, originY)
  .setInteractive({useHandCursor: true})
  .on('pointerdown', onClick)
  .on('pointerover', function () {
    this.setFrame(1);
  })
  .on('pointerout', function () {
    this.setFrame(0);
  });

export const scaleUp = (scene, obj, initialScale = 0.5, finalScale = 1) => {
  obj.setScale(initialScale);
  addScalingAnimation(scene, obj, finalScale);
};

export const addScalingAnimation = (scene, targets, scale) => scene.tweens.add({
  targets,
  scaleX: scale,
  scaleY: scale,
  duration: APP_CONFIG.animationDuration,
  delay: 0,
  ease: 'Cubic.easeOut'
});

export const addJumpingAnimation = (scene, targets) => scene.tweens.add({
  targets,
  scale: 0.9,
  duration: APP_CONFIG.animationDuration,
  delay: APP_CONFIG.animationDuration,
  ease: 'Linear',
  yoyo: 1,
  loop: -1
});

export const createHeadingText = (scene, titleText) => scene.add.text(
  scene.width / 2,
  APP_CONFIG.edgeMargin,
  titleText,
  APP_FONTS.title
).setOrigin(0.5, 0);

export const addKeyHandler = (scene, handler) => scene.input.keyboard.on('keydown', handler, scene);