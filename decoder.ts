import selectNeighbours from "./selectNeighbours";
const fs = require("fs");

export default function decode() {
  const sourceSymbols = [];
  const x = JSON.parse(fs.readFileSync("testEncodedSymbols.json", "utf8"));
  //   console.log(x);
  // xor back into source blocks / packets / symbols / whatever
  const sym = x.find((s) => s.degree === 1);

  //TODO: how would we know the original number of source packets to pass in here? should we add it to each packet?
  const sourcePacketIndex = selectNeighbours(sym.index, sym.degree, sym.K);
  console.log({ sourcePacketIndex });
  //   for (let i = 0; i < array.length; i++) {
  //     const element = array[i];
  //   }
}
