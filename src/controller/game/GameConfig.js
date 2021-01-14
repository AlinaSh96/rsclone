import GameScene from '@controller/game/GameScene';

export const gameConfig = {
  width: 320, // Width of the game in pixels
  height: 480, // Height of the game in pixels
  backgroundColor: '#87ceeb', // The background color
  physics: { // The type of physics engine to use
    default: 'arcade', // Use simple arcade-style physics engine
    arcade: {
      gravity: {
        y: 0, // Vertical gravity for the whole scene
      },
    },
  },
  parent: 'game', // Create the game inside the <div id='game'>
  scene: GameScene, // The class containing the methods to create our game (preload, create, update)
  audio: {disableWebAudio: true}, // Use HTML5 audio instead of WebAudio
};
