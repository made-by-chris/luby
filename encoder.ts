function splitFile(file: Array<number>, blockSize: number) {
  let blocks = [];
  for (var i = 0; i <= file.length; i += blockSize) {
    blocks.push(file.splice(i, i + blockSize));
  }
  // pad last block if smaller than blocksize
  if (blocks[blocks.length - 1].length < blockSize) {
    blocks[blocks.length - 1] = blocks[blocks.length - 1].concat(
      new Array(blockSize - blocks[blocks.length - 1].length).fill(0)
    );
  }
  return blocks;
}
function generateDistribution(seed: number) {}

export default function encode(
  file: Array<number>,
  blockSize: number,
  seed: string = "None"
) {
  // source symbols / packets
  const sourceSymbols = splitFile(file, blockSize);
  const degreeDistribution = generateDistribution(123);
}
