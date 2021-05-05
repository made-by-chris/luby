import fs from "fs";
import { encode, decode } from "./index";

// RUN TEST ENCODING
const file = fs.readFileSync("testfiles/test.txt", "utf8")
var enc = new TextEncoder(); // always utf-8
const encodedSymbols = encode(enc.encode(file), 256);
fs.writeFileSync("testEncodedSymbols.json", JSON.stringify(encodedSymbols));

// RUN TEST DECODING
const encodedSymbols2 = JSON.parse(
  fs.readFileSync("testEncodedSymbols.json", "utf8")
);
const result = decode(encodedSymbols2);
var arr = new Uint8Array(result);
fs.writeFileSync("test.txt",  arr);