import encode from "./encoder";
// import decode from "./decoder";
import file from "./testfiles/data.json";
const filePath = process.env[3];

console.log(JSON.stringify(file));
encode(file, 200);
