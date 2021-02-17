import {
  generateRobustDistribution,
} from "./distributions";
import selectNeighbours from "./selectNeighbours";
import fs from "fs";

class Symbol {
  index: Number;
  degree: Number;
  data: Uint8Array;
  K: Number;
  constructor(index, degree, data, K) {
    this.index = index;
    this.degree = degree;
    this.data = data;
    this.K = K;
  }
}

function splitFile(file: Uint8Array, blockSize: number) {
  let blocks = [];
  for (var i = 0; i < file.length; i+=blockSize) {
    blocks.push(Array.from(file.slice(i, i+blockSize)));
  }
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
  file: Uint8Array,
  blockSize: number,
  seed: string = "None"
) {
  // source symbols / packets
  const sourceSymbols = splitFile(file, blockSize);
  const K = sourceSymbols.length;
  const desiredNumberOfSymbols = Math.floor(K * 1.5); //TODO: make this more sciency
  const randomDegrees = getRandomDegrees(K, desiredNumberOfSymbols);

  const encodedSymbols = [];
  fs.writeFileSync("testfiles/snrl", ``)
  
  const fakeXorStartData = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [3,3,3,3,3,3,3,3,3,3,3,3,3],
    [4,4,4,4,4,4,4,4,4,4,4,4,4],
  ]
  const xaEncode = (arar) => arar.reduce((a,b)=>{
    const out = []
    for (let i = 0; i < arar[0].length; i++) {
      out.push(a[i] ^ b[i])
    }
    return out
  })
  console.log(xaEncode(fakeXorStartData))

  // were making symbols
  // each symbol is a result of XORing multiple original symbols
  const symbols = []
  for (let i = 0; i < desiredNumberOfSymbols; i++) {
    const selectedNeighbours = selectNeighbours(i, randomDegrees[i], K)
    const data = xaEncode(selectedNeighbours.map(sn => sourceSymbols[sn]))
    symbols.push(new Symbol(i,selectedNeighbours.length, data, K))
  }

  fs.writeFileSync("testfiles/ENCODEfakeXOR", JSON.stringify(symbols,null,4))

  return symbols;
}
