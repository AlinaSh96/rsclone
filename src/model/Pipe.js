import {GAME_OPTIONS} from '@constants/general.const';

const PIPE_SIZES = {
  width: 20,
  height: 20,
  scale: 3,
};

export default class Pipe extends Phaser.GameObjects.Image {
  constructor({
    scene, x, y, texture, frame,
  }) {
    super(scene, x, y, texture, frame);

    this.setScale(PIPE_SIZES.scale);
    this.setOrigin(0, 0);

    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.setVelocityX(-GAME_OPTIONS.birdSpeed);
    this.body.setSize(PIPE_SIZES.width, PIPE_SIZES.height);

    this.scene.add.existing(this);
  }
}
