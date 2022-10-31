import confetti from "canvas-confetti";

export const fireConfetti = () => {
  var end = Date.now() + 15 * 300;

  // go Buckeyes!
  var colors = ["#bb0000", "#ffffff"];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 0,
      spread: 70,
      origin: { x: 0, y: 0.2 },
      colors: colors,
      
    });
    confetti({
      particleCount: 3,
      angle: 180,
      spread: 70,
      origin: { x: 1 , y: 0.2},
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
