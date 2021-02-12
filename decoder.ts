import selectNeighbours from "./selectNeighbours";

export default function decode(encodedSymbols) {
  const sourceSymbols = [];
  // xor back into source blocks / packets / symbols / whatever
  const sym = encodedSymbols.find((s) => s.degree === 1);
  const K = sym.K;
  const sourcePacketIndex = selectNeighbours(sym.index, sym.degree, sym.K);
  console.log({ sourcePacketIndex });
  console.log(encodedSymbols.map((es) => es.data.length));
  const decodedSymbols = [];

  // TODO: do any degree>1 encoding symbols XOR with source symbol with degree=1
  // const neighboursOfDegreeOneSourceSymbol = selectNeighbours(
  //   sym.index,
  //   1,
  //   Math.floor(K * 1.5)
  // );
  // console.log(neighboursOfDegreeOneSourceSymbol);
  let inc = 0;
  while (decodedSymbols.length < K) {
    inc++;
    const neighboursOfDegreeOneSourceSymbol = selectNeighbours(
      inc,
      inc,
      Math.floor(K * 1.5)
    );
    decodedSymbols.push(neighboursOfDegreeOneSourceSymbol);
    console.log(decodedSymbols);
  }
}
