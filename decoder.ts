import selectNeighbours from "./selectNeighbours";
import treeify from "treeify";

export default function decode(encodedSymbols) {
  const sourceSymbols = [];
  // xor back into source blocks / packets / symbols / whatever
  const sym = encodedSymbols.find((s) => s.degree === 1);
  const K = sym.K;
  const sourcePacketIndex = selectNeighbours(sym.index, sym.degree, sym.K);
  const decodedSymbols = [];

  // TODO: do any degree>1 encoding symbols XOR with source symbol with degree=1
  // const neighboursOfDegreeOneSourceSymbol = selectNeighbours(
  //   sym.index,
  //   1,
  //   Math.floor(K * 1.5)
  // );
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

  // we need to "rebuild the encodedGraph"
  // in each recursion, XOR things that have only 1 un-XOR-ed neigbour
  // to start, let's console.log the neighbours

  // PYTHON CODE
  // def recover_graph(symbols, blocks_quantity):
  // """ Get back the same random indexes (or neighbors), thanks to the symbol id as seed.
  // For an easy implementation purpose, we register the indexes as property of the Symbols objects.
  // """
  // for symbol in symbols:

  //     neighbors, deg = generate_indexes(symbol.index, symbol.degree, blocks_quantity)
  //     symbol.neighbors = {x for x in neighbors}
  //     symbol.degree = deg
  // return symbols

  const ax = (a, b) => {
    const res = [];
    for (let j = 0; j < a.length; j++) {
      res[j] = a[j] ^ b[j];
    }
    return res;
  };

  let encodedGraph = encodedSymbols.map((s) => ({
    eid: s.index,
    nids: selectNeighbours(s.index, s.degree, s.K),
    data: s.data,
    degree: s.degree,
  }));
  console.log(
    JSON.stringify(
      encodedGraph.map((e) => ({ eid: e.eid, nids: e.nids })),
      null,
      4
    )
  );
  const sourceGraph = [];

  //TODO: SID and EIDS are fuck
  let loop = 0;
  function traverse(eid) {
    // we traverse to an encoded symbol which hopefully has 1 degree remaining
    loop++;
    if (loop > 10) return;
    console.log("traverse was called", eid);
    const encodedSymbol = encodedGraph.find((s) => s.eid === eid);
    if (encodedSymbol.nids.length > 1) {
      // if this encoded symbol isnt ready to decode, we skip it
      const next = encodedGraph.find((s) => s.degree === 1);
      if (!next) {
        console.log("FAILED - no remaining encoded symbols with degree of one");
      } else {
        console.log("DDDD");
        traverse(next.nids[0]);
      }
    } else {
      const sourceSymbol = sourceGraph.find(
        (s) => s.sid === encodedSymbol.nids[0]
      );
      if (!sourceSymbol) {
        // we're ready to decode here - theres only 1 SID and it hasnt been decoded yet.
        const decodedSymbol = Object.assign(encodedSymbols)
        decodedSymbol.sid = encodedSymbol.nids[0];
        sourceGraph.push(decodedSymbol);

        // now we update neighbours with the same SID in their nids array
        const neighbours = encodedGraph.filter((neighbour) =>
          neighbour.nids.includes(decodedSymbol.sid)
        );
      }
    }
        const neighbours = encodedGraph.filter((oes) =>
          oes.nids.includes(symbol.sid)
        );
        // Xor symbol.data from each one
        neighbours.forEach((n) => {
          let updatedNeighbour = n;
          console.log("before changes", n.eid, n.nids);
          updatedNeighbour.data = ax(symbol.data, updatedNeighbour.data);
          updatedNeighbour.nids = n.nids.filter((id) => id !== sid);
          updatedNeighbour.degree = n.degree - 1;
          encodedGraph = encodedGraph.map((es) =>
            es.eid === n.eid ? updatedNeighbour : es
          );
          console.log("after changes", n.eid, n.nids);
          if (updatedNeighbour.nids.length === 1) {
            console.log("AAAA");
            traverse(n.nids[0]);
          } else {
            const next = encodedGraph.find((s) => s.degree === 1);
            if (!next) {
              console.log(
                "FAILED - no remaining encoded symbols with degree of one"
              );
            } else {
              console.log("BBBB");
              traverse(next.nids[0]);
            }
          }
        });
      }
    }
    if (sourceGraph.length === K) {
      console.log("FINISHED!");
    } else {
      const next = encodedGraph.find((s) => s.degree === 1);
      if (!next) {
        console.log("FAILED - no remaining encoded symbols with degree of one");
      } else {
        console.log("CCCC");
        traverse(next.nids[0]);
      }
    }
  }
  //START
  const firstSymbol = encodedGraph.find((s) => s.degree === 1);
  if (!firstSymbol) {
    console.log(
      "FAIL, no encoded symbol with one degree. Cannot decode. Get more packets!"
    );
  } else {
    console.log("first symbol found, decoding..");
    traverse(firstSymbol.eid);
    // console.log(sourceGraph);
  }
}
