/**
 * Sound Effects voor GoodVibes
 * 
 * Gebruikt de Web Audio API om korte jingles te genereren.
 * Geen externe audio bestanden nodig!
 */

// Audio context (lazy initialized)
let audioContext = null;

/**
 * Initialiseert de audio context (moet na user interaction)
 */
const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  // Resume if suspended (browser autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
};

/**
 * Speelt een enkele toon
 * @param {number} frequency - Frequentie in Hz
 * @param {number} duration - Duur in seconden
 * @param {number} startTime - Start tijd (relatief aan audio context)
 * @param {string} type - Oscillator type ('sine', 'square', 'triangle', 'sawtooth')
 * @param {number} volume - Volume (0-1)
 */
const playTone = (frequency, duration, startTime, type = 'sine', volume = 0.3) => {
  const ctx = getAudioContext();
  
  // Oscillator voor de toon
  const oscillator = ctx.createOscillator();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  
  // Gain voor volume en fade-out
  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(volume, startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
  
  // Connect en play
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
};

/**
 * Success Jingle - Speelt wanneer een goede daad wordt toegevoegd
 * Een vrolijke, opwaartse melodie (3 noten)
 */
export const playSuccessSound = () => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Vrolijke opwaartse melodie: C5 -> E5 -> G5 (majeur akkoord arpeggio)
    playTone(523.25, 0.15, now, 'sine', 0.25);        // C5
    playTone(659.25, 0.15, now + 0.1, 'sine', 0.25);  // E5
    playTone(783.99, 0.25, now + 0.2, 'sine', 0.3);   // G5 (langer, luider)
    
    // Zachte harmonische ondertoon
    playTone(261.63, 0.3, now, 'triangle', 0.1);      // C4 (octaaf lager)
    
  } catch (error) {
    // Silently fail als audio niet beschikbaar is
    console.log('Audio not available:', error.message);
  }
};

/**
 * Level Up Jingle - Speelt wanneer je een level omhoog gaat
 * Een triomfantelijke fanfare
 */
export const playLevelUpSound = () => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Fanfare: C5 -> E5 -> G5 -> C6
    playTone(523.25, 0.12, now, 'sine', 0.25);         // C5
    playTone(659.25, 0.12, now + 0.1, 'sine', 0.25);   // E5
    playTone(783.99, 0.12, now + 0.2, 'sine', 0.25);   // G5
    playTone(1046.50, 0.4, now + 0.3, 'sine', 0.35);   // C6 (hoog, lang)
    
    // Akkoord ondertoon
    playTone(261.63, 0.5, now + 0.1, 'triangle', 0.1); // C4
    playTone(329.63, 0.5, now + 0.1, 'triangle', 0.1); // E4
    
  } catch (error) {
    console.log('Audio not available:', error.message);
  }
};

/**
 * Achievement Jingle - Speelt wanneer je een achievement unlockt
 * Magisch, sparkle-achtig geluid
 */
export const playAchievementSound = () => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Magische tinkle
    playTone(1318.51, 0.1, now, 'sine', 0.2);          // E6
    playTone(1567.98, 0.1, now + 0.08, 'sine', 0.2);   // G6
    playTone(1975.53, 0.1, now + 0.16, 'sine', 0.2);   // B6
    playTone(2093.00, 0.3, now + 0.24, 'sine', 0.25);  // C7
    
    // Shimmer
    playTone(2637.02, 0.15, now + 0.3, 'sine', 0.1);   // E7
    
  } catch (error) {
    console.log('Audio not available:', error.message);
  }
};

/**
 * Click Sound - Subtiel klik geluid voor UI feedback
 */
export const playClickSound = () => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Korte, zachte klik
    playTone(800, 0.05, now, 'sine', 0.15);
    
  } catch (error) {
    console.log('Audio not available:', error.message);
  }
};

/**
 * Streak Sound - Speelt wanneer je streak toeneemt
 */
export const playStreakSound = () => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Snelle opwaartse sweep
    playTone(392.00, 0.08, now, 'sine', 0.2);          // G4
    playTone(493.88, 0.08, now + 0.06, 'sine', 0.2);   // B4
    playTone(587.33, 0.15, now + 0.12, 'sine', 0.25);  // D5
    
  } catch (error) {
    console.log('Audio not available:', error.message);
  }
};

export default {
  playSuccessSound,
  playLevelUpSound,
  playAchievementSound,
  playClickSound,
  playStreakSound,
};
