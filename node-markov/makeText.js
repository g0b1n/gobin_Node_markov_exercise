/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov');

function generateText(text) {
    let mm = new MarkovMachine(text);
    console.log(mm.makeText());
}

function makeText(path, type) {

    if (type === 'file') {
        try {
            const text = fs.readFileSync(path, 'utf8');
            generateText(text);
        } catch (err) {
            console.error(`Error reading file: ${err}`);
            process.exit(1);
        }
    } else if (type === 'url') {
        axios.get(path)
        .then(res => {
            generateText(res.data);
        })
        .catch(err => {
            console.error(`Error fetching URL: ${err}`);
            process.exit(1);
        });
    } else {
        console.error("Invalid type. Use 'file' or 'url'.");
        process.exit(1);
    }
}

const [type, path] = process.argv.slice(2);
makeText(path, type);