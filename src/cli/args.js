const parseArgs = () => {
  const args = process.argv.slice(2);
  const modifiedArgs = args.map((arg) => arg.replace("--", ""));
  for (let i = 0; i < modifiedArgs.length; i += 2) {
    console.log(`${modifiedArgs[i]} is ${modifiedArgs[i + 1]}`);
  }
};

parseArgs();
