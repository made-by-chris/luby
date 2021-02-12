import encode from "./encoder";
import decode from "./decoder";
import file from "./testfiles/data.json";
import fs from "fs";
const filePath = process.env[3];

// const encodedSymbols = encode(file, 200);
// fs.writeFileSync("testEncodedSymbols.json", JSON.stringify(encodedSymbols));

const encodedSymbols2 = JSON.parse(
  fs.readFileSync("testEncodedSymbols.json", "utf8")
);
decode(encodedSymbols2);
