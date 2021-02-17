import fs from "fs";
import { encode, decode } from "./index";
// const filePath = process.env[3];
// const encodedSymbols = encode(file, 200);
import selectNeighbours from "./selectNeighbours";


const fakeInputs = 
[
  [0, 1, 18],
  [1, 9, 18],
  [2, 2, 18],
  [3, 2, 18],
  [4, 10, 18],
  [5, 2, 18],
  [6, 3, 18],
  [7, 3, 18],
  [8, 3, 18],
  [9, 2, 18],
  [10, 4, 18],
  [11, 5, 18],
  [12, 1, 18],
  [13, 2, 18],
  [14, 10, 18],
  [15, 10, 18],
  [16, 10, 18],
  [17, 4, 18],
  [18, 2, 18],
  [19, 2, 18],
  [20, 10, 18],
  [21, 3, 18],
  [22, 2, 18],
  [23, 5, 18],
  [24, 10, 18],
  [25, 2, 18],
  [26, 5, 18],
]
// for (var i = 0; i < 27; i++) {
//   // make each encoded symbol in here
//   let selectedNeighbours = selectNeighbours(fakeInputs[i][0],fakeInputs[i][1],fakeInputs[i][2]);
//   fs.appendFileSync("testfiles/selectedNeighboursOUTPUT2", `${selectedNeighbours}\r\n`)
// }
// RUN TEST ENCODING
const file = fs.readFileSync("testfiles/test.txt", "utf8")
var enc = new TextEncoder(); // always utf-8
const encodedSymbols = encode(enc.encode(file), 256);
// console.log(encodedSymbols)
fs.writeFileSync("testEncodedSymbols.json", JSON.stringify(encodedSymbols));

// // RUN TEST DECODING
const encodedSymbols2 = JSON.parse(
  fs.readFileSync("testEncodedSymbols.json", "utf8")
);
const result = decode(encodedSymbols2);
var arr = new Uint8Array(result);
fs.writeFileSync("test.txt",  arr);

// const {
//   generateIdealDistribution,
//   generateRobustDistribution,
// } = require("./dist/distributions");
// const babar = require("babar");

// // const idealProbabilites = generateIdealDistribution(10);
// const robustProbabilites = generateRobustDistribution(10);

// // console.log(
// //   idealProbabilites,
// //   babar(
// //     idealProbabilites.map((val, i) => [i, val]),
// //     { caption: "ideal distribution", yFractions: 1 }
// //   )
// // );
// // const vals = robustProbabilites.map((val, i) => [i, val]);
// // console.log(
// //   robustProbabilites.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
// // );
// // console.log(babar(vals, { caption: "robust distribution", yFractions: 1 }));
