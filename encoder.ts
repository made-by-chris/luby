import {
  generateIdealDistribution,
  generateRobustDistribution,
} from "./distributions";
import fs from "fs";
import selectNeighbours from "./selectNeighbours";

class Symbol {
  index: Number;
  degree: Number;
  data: Array<Number>;
  K: Number;
  constructor(index, degree, data, K) {
    this.index = index;
    this.degree = degree;
    this.data = data;
    this.K = K;
  }
}

function splitFile(file: Array<number>, blockSize: number) {
  let blocks = [];
  for (var i = 0; i <= file.length; i++) {
    blocks.push(file.splice(0, blockSize));
  }
  // pad last block if smaller than blocksize
  if (blocks[blocks.length - 1].length < blockSize) {
    blocks[blocks.length - 1] = blocks[blocks.length - 1].concat(
      new Array(blockSize - blocks[blocks.length - 1].length).fill(0)
    );
  }
  return blocks;
}

function choices(weights, k) {
  const choice = () => {
    const randomNr = Math.random();
    let threshold = 0;
    let winner = null;
    for (var i = 0; i < weights.length; i++) {
      threshold += weights[i];
      if (threshold > randomNr) {
        winner = i;
        return winner;
      }
    }
    return winner;
  };

  const _choices = [];
  for (let i = 0; i < k; i++) {
    _choices[i] = choice();
  }

  return _choices;
}

function getRandomDegrees(K: Number, desiredNumberOfSymbols: Number) {
  return [1, ...choices(generateRobustDistribution(K), desiredNumberOfSymbols)];
}

export default function encode(
  file: Array<number>,
  blockSize: number,
  seed: string = "None"
) {
  // source symbols / packets
  const sourceSymbols = splitFile(file, blockSize);
  const K = sourceSymbols.length;
  const desiredNumberOfSymbols = Math.floor(K * 1.5);
  const randomDegrees = getRandomDegrees(K, desiredNumberOfSymbols);

  const encodedSymbols = [];
  for (var i = 0; i < desiredNumberOfSymbols; i++) {
    // make each encoded symbol in here
    let selectedNeighbours = selectNeighbours(i, randomDegrees[i], K);
    selectedNeighbours = selectedNeighbours.map((i) => sourceSymbols[i]);
    const xorNeighbours = [];
    for (let i = 0; i < selectedNeighbours[0].length; i++) {
      xorNeighbours.push(selectedNeighbours.reduce((a, b) => a[i] ^ b[i]));
    }
    encodedSymbols.push(new Symbol(i, randomDegrees[i], xorNeighbours, K));
    // encodedSymbols.push(`i am  ${i} ${K}`);
  }
  fs.writeFileSync("testEncodedSymbols.json", JSON.stringify(encodedSymbols));
}
