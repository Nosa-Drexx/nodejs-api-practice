const fs = require("fs");
const fs_async = require("fs/promises");
const path = require("path");

// fs.readFile(path.join(__dirname, "package.json"), (err, data) => {
//   if (err) console.log(err);
//   console.log(data.toString());
// });

const read = async () => {
  const result = fs_async.readFile(
    path.join(__dirname, "package.json"),
    "utf-8"
  );
  console.log(result);
  return result;
};

read().then((data) => {
  console.log(data);
});
console.log("hi");
