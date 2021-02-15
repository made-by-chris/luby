import fs from "fs";
import selectNeighbours from "./selectNeighbours";

export default function decode(encodedSymbols) {
  const sym = encodedSymbols.find((s) => s.degree === 1);
  const K = sym.K;

  const ax = (a, b) => {
    console.log(0,a.length, b.length);
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
  
  console.log(1,
    JSON.stringify(
      encodedGraph.map((e) => ({ eid: e.eid, nids: e.nids })),
      null,
      4
    )
  );
  const sourceGraph = [];

  let loop = 0;

  function traverse(eid) {
    if(sourceGraph.length===K) {
      console.log(2,"FINISHED!")
      return
    }
    const encodedSymbol = encodedGraph.find((s) => s.eid === eid);
    console.log(3,"traverse was called", eid, encodedSymbol.nids);
    if (encodedSymbol.nids.length > 1) {
      const next = encodedGraph.find((s) => s.degree === 1);
      console.log(4,"next symbol is", next);
      if (!next) {
        console.log(5,"FAILED - no remaining encoded symbols with degree of one",sourceGraph.length,K);
      } else {
        console.log(6,"DDDD");
        traverse(next.eid);
      }
    } else {
      const sourceSymbol = sourceGraph.find(
        (s) => s.sid === encodedSymbol.nids[0]
      );
      if (sourceSymbol) {
        return;
      } else {
        // we're ready to decode here - theres only 1 SID and it hasnt been decoded yet.
        const decodedSymbol = {data:encodedSymbol.data}
        decodedSymbol.sid = encodedSymbol.nids[0];

        sourceGraph.push(decodedSymbol);
        if(sourceGraph.length === K) {
          console.log("SUCCESS!")
          return
        }
        const neighbours = encodedGraph.filter((neighbour) =>
          neighbour.nids.includes(decodedSymbol.sid)
        );
        neighbours.forEach((n) => {
          const un = Object.assign(n);
          console.log(7,"before changes", un.eid, un.nids);
          un.data = ax(decodedSymbol.data, un.data);
          un.nids = un.nids.filter((id) => id !== decodedSymbol.sid);
          un.degree = un.degree - 1;
          encodedGraph = encodedGraph.map((es) =>
            es.eid === un.eid ? un : es
          );
          console.log(8,"after changes", un.eid, un.nids);
          if (un.nids.length === 1) {
            console.log(9,"AAAA");
            traverse(n.eid);
          } else {
            const next = encodedGraph.find((s) => s.degree === 1);
            if (!next) {
                console.log(11,"FAILED - no remaining encoded symbols with degree of one",sourceGraph.length,K)
            } else {
              console.log(12,"BBBB", next);
              traverse(next.eid);
            }
          }
        });
      }
    }
    if (sourceGraph.length === K) {
      console.log(13,"FINISHED!");
    } else {
      const next = encodedGraph.find((s) => s.degree === 1);
      if (!next) {
        console.log(14,"FAILED - no remaining encoded symbols with degree of one",sourceGraph.length,K)
      } else {
        console.log(15,"CCCC");
        traverse(next.eid);
      }
    }
  }
  //START
  const firstSymbol = encodedGraph.find((s) => s.degree === 1);
  if (!firstSymbol) {
    console.log(16,
      "FAIL, no encoded symbol with one degree. Cannot decode. Get more packets!"
    );
  } else {
    console.log(17,"first symbol found, decoding..");
    traverse(firstSymbol.eid);
    console.log(18,JSON.stringify(sourceGraph));
    const cleanedUpGraph = sourceGraph
    .sort((a,b)=>a.sid-b.sid)
    .map(b=>{
      return b.data
    }).flat()
    fs.writeFileSync("bbbb.json",  Buffer.from(arr));

    console.log(19,cleanedUpGraph)
    var enc = new TextDecoder("utf-8");
    var arr = new Uint8Array(cleanedUpGraph);
    fs.writeFileSync("test.txt",  Buffer.from(arr));
  }
}
