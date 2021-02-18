import selectNeighbours from "./selectNeighbours";
export default function decode(encodedSymbols) {
  const K = encodedSymbols[0].K;
  const sourceGraph = [];
  let encodedGraph = encodedSymbols.map((s) => {
    const selectedNeighbours = selectNeighbours(s.index, s.degree, s.K)
    return {
      eid: s.index,
      nids: selectedNeighbours,
      data: s.data,
      degree: s.degree,
    }
  });
  
  const firstSymbol = encodedGraph.find((s) => s.degree === 1);
  if (!firstSymbol) throw new Error("No encoded symbol with one degree. Cannot decode. Get more packets!")

  traverse(firstSymbol); // traversal starts here
  if(sourceGraph.length !== K) throw new Error("No remaining encoded symbols with one degree. Cannot decode. Get more packets!")
  const res = sourceGraph // traversal ends here
    .sort((a,b)=>a.sid-b.sid)
    .map(b=>b.data)
    .reduce((a,b)=>a.concat(b))
  while (!res[res.length - 1]) res.pop()
  return res
  
  function traverse(encodedSymbol) {
    if(sourceGraph.length >= K) return
    const alreadyDecoded = sourceGraph.find((s) => s.sid === encodedSymbol.nids[0]);
    if (alreadyDecoded) return

    const decodedSymbol = {data:encodedSymbol.data, sid: encodedSymbol.nids[0]}
    sourceGraph.push(decodedSymbol);
    
    sourceGraph.length < K && encodedGraph.filter((neighbour) =>
      neighbour.nids.includes(decodedSymbol.sid)
    ).forEach((n) => {
      const un = Object.assign(n,{
        data: ax(decodedSymbol.data, n.data),
        nids: n.nids.filter((id) => id !== decodedSymbol.sid),
        degree: n.degree - 1
      });
      encodedGraph = encodedGraph.map(es => es.eid === un.eid ? un : es)
      un.nids.length === 1 ? traverse(n) : next()
    });
    sourceGraph.length < K && next()
  }
  
  function ax(a: Array<number>, b: Array<number>) {
    const res = [];
    for (let j = 0; j < a.length; j++) {res[j] = a[j] ^ b[j]}
    return res;
  };
  
  function next() {
    const next = encodedGraph.find((s) => s.degree === 1);
    next && traverse(next)
  }
}
