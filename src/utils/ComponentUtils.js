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

export const createTitleText = (scene) => scene.add.text(
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
  duration: 300,
  delay: 0,
  ease: 'Cubic.easeOut'
});

export const createHeadingText = (scene, titleText) => scene.add.text(
  scene.width / 2,
  APP_CONFIG.edgeMargin,
  titleText,
  APP_FONTS.title
).setOrigin(0.5, 0);

export const addKeyHandler = (scene, handler) => scene.input.keyboard.on('keydown', handler, scene);