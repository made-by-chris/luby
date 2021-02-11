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
  // console.log(1, extra_proba);
  // extra_proba += [math.log(R / ROBUST_FAILURE_PROBABILITY) / M]  # Spike at M
  extra_proba.push(Math.log(rrrrr / ROBUST_FAILURE_PROBABILITY) / spikeIndex);
  // console.log(2, extra_proba);
  extra_proba = extra_proba.concat(new Array(K - spikeIndex).fill(0));
  // console.log(3, extra_proba);
  const ideal = generateIdealDistribution(K);
  extra_proba = extra_proba.map((a, i) => {
    const b = ideal[i] || 0;
    return a + b;
  });
  // console.log(4, extra_proba);
  const epSum = extra_proba.reduce((a, b) => a + b, 0);
  const probabilities = extra_proba.map((val) => val / epSum);
  // console.log(5,probabilities.reduce((a, b) => a + b, 0));

  // for (var i = spikeIndex + 1; i <= K + 1; ) {}
  return probabilities;
};
