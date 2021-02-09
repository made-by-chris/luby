import encode from "./encoder";
// import decode from "./decoder";
import file from "./data.json";
const filePath = process.env[3];

encode(file, 1024);
