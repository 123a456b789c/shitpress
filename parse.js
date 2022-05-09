const officeParser = require("officeparser");
const pdfParser = require('pdf-parse');
const fs = require("fs");

let path = "" //file name here
let readDataBuffer = fs.readFileSync(path);
let readData = fs.readFileSync(path, 'utf-8');
let type = path.split(".")

function officeParse(path) {
    officeParser.parseOffice(path, function(data, err){
        if (err) return console.err;
        console.log(data)
    })
}

switch(type[1]) {
    case "odt":
    case "pptx":
    case "docx":
    case "xlsx":
    case "odp":
    case "ods":
        officeParse(path)
        break
    case "pdf":
        pdfParser(data).then(function(data) {console.log(data.text);});
        break
    case "txt":
    case "log":
        console.log(readData)
        break
    default:
        console.error("Unsupported format")
        break
}
