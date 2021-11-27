
/**************************************************
 File: update-stl-header.js
 Name: Update stl header
 Explain: Update binary STL header
 node .\update-stl-header.js -i input.stl
 node .\update-stl-header.js -i input.stl -o output.stl
****************************************By QQBoxy*/
const fs = require('fs');
const path = require('path');
const { program } = require('commander');

// Entry point
(async () => {
    try {
        program
            .version('0.0.1')
            .option('-i, --input <string>', 'Input STL file')
            .option('-o, --output <string>', 'Output STL file');
        program.parse(process.argv);
        const options = program.opts();
        // Input file
        const inputFile = path.resolve(__dirname, options.input);
        // Output file
        let outputFile = "";
        if (options.output) {
            outputFile = path.resolve(__dirname, options.output);
        } else {
            outputFile = path.resolve(__dirname, `output_${options.input}`);
        }
        // File exist
        const isExist = fs.existsSync(inputFile);
        if (!isExist) {
            throw "File not exist!";
        }
        // Read Buffer
        const arrayBuffer = fs.readFileSync(inputFile).buffer;
        // Read DataView
        let view = new DataView(arrayBuffer);
        // Edit Data
        view.setUint32(0, 1866617169, true);
        view.setUint32(4, 31096, true);
        for (let i = 8; i < 80; i += 4) {
            view.setUint32(i, 0, true);
        }
        // Create Buffer
        const stlBuf = Buffer.from(arrayBuffer);
        // Write Buffer
        fs.writeFileSync(outputFile, stlBuf);
    } catch (error) {
        console.log(error);
        console.log("Error. (Ctrl+C Exit)");
    }
})();