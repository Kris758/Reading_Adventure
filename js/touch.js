/**
 * Touch / iPad helpers for iOS Safari.
 */

import { resumeAudio } from './audio.js';
import { unlockSpeech } from './speech.js';

/** True on iOS (iPhone, iPad, iPod) including iPadOS desktop mode */
export function isIOS() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

/** Wire global gestures needed for reliable iPad play */
export function initTouchSupport() {
  document.documentElement.classList.toggle('is-ios', isIOS());

  // Unlock Web Audio on first touch anywhere
  const unlockOnFirstTouch = () => {
    resumeAudio();
    unlockSpeech();
  };
  document.addEventListener('touchstart', unlockOnFirstTouch, { passive: true, once: true });
  document.addEventListener('click', unlockOnFirstTouch, { once: true });

  // Keep layout stable when Safari shows/hides toolbars
  const setAppHeight = () => {
    document.documentElement.style.setProperty(
      '--app-height',
      `${window.innerHeight}px`
    );
  };
  setAppHeight();
  window.addEventListener('resize', setAppHeight);
  window.addEventListener('orientationchange', () => {
    setTimeout(setAppHeight, 100);
  });
}
