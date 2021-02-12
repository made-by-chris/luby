import selectNeighbours from "./selectNeighbours";
import treeify from "treeify";

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
  while (false) {
    //decodedSymbols.length < K) {
    inc++;
    const neighboursOfDegreeOneSourceSymbol = selectNeighbours(
      inc,
      inc,
      Math.floor(K * 1.5)
    );
    decodedSymbols.push(neighboursOfDegreeOneSourceSymbol);
    //TODO: program recursive traversal function
  }
  const tree = [
    { id: 1, neighbours: [1, 2], data: "test test test 0" },
    { id: 2, neighbours: [1, 2, 4], data: "test test test 1" },
    { id: 3, neighbours: [1, 4], data: "test test test 2" },
    { id: 4, neighbours: [3], data: "test test test 3" },
    { id: 5, neighbours: [2, 4], data: "test test test 4" },
    { id: 6, neighbours: [1, 2], data: "test test test 5" },
  ];

  function traverse(id, data) {
    console.log(id);
    if (data.length >= tree.length) return data;
    const currentNode = tree.find((n) => n.id === id);
    const asIds = data.map((e) => e);

    return currentNode.neighbours.map((nextId) =>
      traverse(nextId, [...data, id])
    );
  }
  const result = traverse(4, []);
  console.table(JSON.stringify(result));
  console.log(treeify.asTree(result, true));
}
