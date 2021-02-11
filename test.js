const {
  generateIdealDistribution,
  generateRobustDistribution,
} = require("./dist/distributions");
const babar = require("babar");

// const idealProbabilites = generateIdealDistribution(10);
const robustProbabilites = generateRobustDistribution(10);

// console.log(
//   idealProbabilites,
//   babar(
//     idealProbabilites.map((val, i) => [i, val]),
//     { caption: "ideal distribution", yFractions: 1 }
//   )
// );
// const vals = robustProbabilites.map((val, i) => [i, val]);
// console.log(
//   robustProbabilites.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
// );
// console.log(babar(vals, { caption: "robust distribution", yFractions: 1 }));
