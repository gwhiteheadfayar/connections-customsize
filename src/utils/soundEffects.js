const soundFiles = {
    click: require('./click.mp3'),
    submit: require('./submit.mp3'),
    mistake: require('./mistake.mp3'),
    success: require('./success.mp3'),
    lose: require('./lose.mp3'),
    win: require('./win.mp3'),
  };
  
  export const playSound = (soundName, volume = 1) => {
    const audio = new Audio(soundFiles[soundName]);
    audio.volume = volume;
    audio.play().catch(error => console.error('Error playing sound:', error));
  };
  
  export const playClickSound = () => playSound('click', 1);
  export const playSubmitSound = () => playSound('submit', 0.5);
  export const playMistakeSound = () => playSound('mistake', 0.5);
  export const playSuccessSound = () => playSound('success', 0.4);
  export const playLoseSound = () => playSound('lose', 0.4);
  export const playWinSound = () => playSound('win', 0.4);