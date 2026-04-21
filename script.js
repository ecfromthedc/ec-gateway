// EC Gateway — minimal interaction
// 1. Ladder rungs scroll to the corresponding Wave section.
// 2. Only one audio plays at a time — pausing any others.
// 3. Auto-advance to next tape in same Wave when one ends.

document.addEventListener("DOMContentLoaded", () => {
  // Ladder jump
  document.querySelectorAll(".rung[data-target]").forEach(rung => {
    rung.addEventListener("click", () => {
      const target = document.getElementById(rung.dataset.target);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Single-playback + auto-advance within a Wave
  const audios = Array.from(document.querySelectorAll("audio"));

  audios.forEach((a, idx) => {
    a.addEventListener("play", () => {
      audios.forEach(other => {
        if (other !== a && !other.paused) other.pause();
      });
    });

    a.addEventListener("ended", () => {
      // Find next audio inside the same wave section
      const wave = a.closest(".wave");
      if (!wave) return;
      const waveAudios = Array.from(wave.querySelectorAll("audio"));
      const i = waveAudios.indexOf(a);
      const next = waveAudios[i + 1];
      if (next) {
        next.scrollIntoView({ behavior: "smooth", block: "center" });
        next.play().catch(() => { /* autoplay may be blocked — ignore */ });
      }
    });
  });
});
