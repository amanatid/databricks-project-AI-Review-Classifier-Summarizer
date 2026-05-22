export const calculateScore = (reviews, totalProjects) => {

  const weights = {
    reliability: 0.25,
    consistency: 0.20,
    quality: 0.25,
    response: 0.15,
    price: 0.15
  };

  const normalize = (v) => (v / 5) * 100;

  const now = Date.now();

  let weightedSum = 0;
  let totalWeight = 0;

  reviews.forEach(r => {

    const baseScore =
      normalize(r.reliability) * weights.reliability +
      normalize(r.consistency) * weights.consistency +
      normalize(r.quality) * weights.quality +
      normalize(r.response) * weights.response +
      normalize(r.price) * weights.price;

    /* -------- TIME DECAY -------- */

    const daysOld =
      (now - new Date(r.created_at)) / (1000 * 60 * 60 * 24);

    const decay = Math.exp(-daysOld / 30);

    /* -------- PENALTIES -------- */

    let penalty = 0;

    if (!r.completed) penalty -= 15;
    if (r.days > 5) penalty -= 5;

    let final = baseScore + penalty;

    final = Math.max(0, Math.min(100, final));

    /* -------- VERIFIED WEIGHT -------- */

    const reviewWeight = r.verified ? 1 : 0.5;

    weightedSum += final * decay * reviewWeight;
    totalWeight += decay * reviewWeight;
  });

  let score = weightedSum / totalWeight;

  /* -------- BAYESIAN -------- */

  const globalAvg = 70;
  const m = 5;

  score =
    (reviews.length * score + m * globalAvg) /
    (reviews.length + m);

  /* -------- EXPERIENCE -------- */

  const experienceScore = Math.log10(totalProjects + 1) * 20;

  score = score * 0.85 + experienceScore * 0.15;

  return Math.round(score);
};