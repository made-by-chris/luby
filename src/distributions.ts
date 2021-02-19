export const generateIdealDistribution = function (K) {
  let probabilities = [0, 1 / K];
  for (var i = 2; i <= K; i++) {
    probabilities.push(1 / (i * (i - 1)));
  }
  return probabilities;
};

export const generateRobustDistribution = function (K) {
  const ROBUST_FAILURE_PROBABILITY = 0.01;
  const spikeIndex = Math.floor(K / 2) + 1;
  const rrrrr = K / spikeIndex;
  let extra_proba = [0];
  for (var i = 1; i < spikeIndex; i++) {
    extra_proba[i] = 1 / (i * spikeIndex);
  }
  extra_proba.push(Math.log(rrrrr / ROBUST_FAILURE_PROBABILITY) / spikeIndex);
  extra_proba = extra_proba.concat(new Array(K - spikeIndex).fill(0));
  const ideal = generateIdealDistribution(K);
  extra_proba = extra_proba.map((a, i) => {
    const b = ideal[i] || 0;
    return a + b;
  });
  const epSum = extra_proba.reduce((a, b) => a + b, 0);
  return extra_proba.map((val) => val / epSum);
};
