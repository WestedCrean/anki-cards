const { Apkg } = require("@seangenabe/apkg")
const fs = require("fs")
const { promisify } = require("util")
const readFile = promisify(fs.readFile)

async function run() {
  const apkg = new Apkg()
  try {
    const ankiFile = await readFile("./Perodic_table_with_atomic_data.apkg")
    console.log("Anki file was read")
    console.log(ankiFile)
    await apkg.load(ankiFile)
    console.log({ apkg })
  } catch (e) {
    console.log("Anki file read error")
    console.log({ e })
  }
}
run()
