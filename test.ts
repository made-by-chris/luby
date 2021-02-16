import fs from "fs";
import { encode, decode } from "./index";
// const filePath = process.env[3];
// const encodedSymbols = encode(file, 200);

// RUN TEST ENCODING
// const file = fs.readFileSync("testfiles/test.txt", "utf8")
// var enc = new TextEncoder(); // always utf-8
// const encodedSymbols = encode(enc.encode(file), 256);
// // console.log(encodedSymbols)
// fs.writeFileSync("testEncodedSymbols.json", JSON.stringify(encodedSymbols));

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
