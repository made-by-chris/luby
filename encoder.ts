import {
  generateIdealDistribution,
  generateRobustDistribution,
} from "./distributions";

class Symbol {
  index: Number;
  degree: Number;
  data: Array<Number>;
  constructor(index, degree, data) {
    this.index = index;
    this.degree = degree;
    this.data = data;
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
  console.log({ weights });
  const choice = () => {
    const randomNr = Math.random();
    let threshold = 0;
    let winner = null;
    for (var i = 0; i < weights.length; i++) {
      console.log({ hmmm: weights[i], threshold, randomNr });
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

function getRandomDegrees(numberOfPackets, desiredNumberOfSymbols) {
  return [
    1,
    ...choices(
      generateRobustDistribution(numberOfPackets.length),
      desiredNumberOfSymbols
    ),
  ];
}

export default function encode(
  file: Array<number>,
  blockSize: number,
  seed: string = "None"
) {
  // source symbols / packets
  const sourceSymbols = splitFile(file, blockSize);
  const degreeDistribution = generateRobustDistribution(sourceSymbols.length);
  const desiredNumberOfSymbols = Math.floor(sourceSymbols.length * 1.5);
  const randomDegrees = getRandomDegrees(
    degreeDistribution,
    desiredNumberOfSymbols
  );
  for (var i = 0; i < desiredNumberOfSymbols; i++) {
    selection_indexes, deg = generate_indexes(i, random_degrees[i], blocks_n)
      1 2 3 4 5 6 7 8 9
      | |
      1 |
      | |\
      1 2 3 4 5 6 7 8 9 10 11 12 13 14
    


  }
}
