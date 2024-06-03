const { copyFileSync, COPYFILE_EXCL, existsSync } = require("node:fs");
const { join } = require("node:path");

function main() {
  const args = process.argv;
  if (args.length < 3) {
    throw new Error("You need to pass a name for your blog post");
  }

  const blogName = args[2];
  const templateFileName = join(__dirname, `blog.__template__.mdx`);
  const fileName = join(__dirname, `../app/routes/blog.${blogName}.mdx`);
  if(existsSync(fileName)) {
    console.error(`ERROR: File ${fileName} exists. Choose a different name.`)
    return;
  }
  copyFileSync(templateFileName, fileName);
  console.log("Success!")
}

main();
