import encode from "./encoder";
import decode from "./decoder";
var colors = require("colors/safe");

if (require.main === module) {
  const file = process.argv[2];
  const strategy = process.argv[3] || "robust"; // default is robust LT , but also systemic, ideal, raptor etc.
  console.log(colors.green("LTJS running in command line"));
  if (!file) {
    console.error("you need to provide a filepath");
  } else {
    console.log(`using ${strategy} strategy`);
  }
} else {
  //   console.log("required as a module");
}

export { encode, decode };
