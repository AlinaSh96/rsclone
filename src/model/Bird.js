import {GAME_OPTIONS} from '@constants/general.const';
import {playSound} from '@utils/ComponentUtils';

const BIRD_FLY_DURATION = 100;
const MAX_ANGLE = 30;
const FLY_UP_ANGLE = 20;
const STEP_ANGLE = 2;

const BIRD_SIZES = {
  width: 17,
  height: 12,
  scale: 3
};

export class Bird extends Phaser.GameObjects.Image {
  constructor({scene, x, y, texture, frame}) {
    super(scene, x, y, texture, frame);

    this.setScale(BIRD_SIZES.scale);
    this.setOrigin(0, 0);

    this.dead = false;
    this.flies = false;

    this.scene.physics.world.enable(this);
    this.body.setGravityY(GAME_OPTIONS.birdGravity);
    this.body.setSize(BIRD_SIZES.width, BIRD_SIZES.height);

    this.jumpKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.scene.input.on('pointerdown', this.fly, this);

    this.scene.add.existing(this);
  }

  update() {
    if (this.angle < MAX_ANGLE) {
      this.angle += STEP_ANGLE;
    }

    if (this.jumpKey.isDown && !this.flies) {
      this.fly();
    } else if (this.jumpKey.isUp && this.flies) {
      this.flies = false;
    }

    if (this.y + this.height > this.scene.sys.canvas.height
      || this.y < -this.height) {
      this.die();
    }
  }

  die() {
    if (!this.dead) {
      playSound(this.scene, 'die');
      this.dead = true;
    }
  }

  isDead() {
    return this.dead;
  }

  fly() {
    playSound(this.scene, 'main');
    this.flies = true;
    this.body.setVelocityY(-GAME_OPTIONS.birdFlapPower);
    this.scene.tweens.add({
      targets: this,
      angle: -FLY_UP_ANGLE,
      duration: BIRD_FLY_DURATION,
      ease: 'Power0',
      repeat: 0,
      yoyo: false
    });
  }
}
