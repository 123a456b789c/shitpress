const fs = require("fs")
const args = require('minimist')(process.argv.slice(2));
const words = fs.readFileSync(__dirname + "/words.txt", 'utf-8').split("\r\n")
const writePath = __dirname + "/buffer.bin";

var specialChars = ["!","?",".",","]

function writeToFile(buffer) {
    fs.createWriteStream(writePath).write(Buffer.from(buffer));
}

function readFromFile(file) {
    const buf = fs.readFileSync('buffer.bin');
    //return Buffer.from(buf.toString('hex'), "hex")
    decode(Buffer.from(buf.toString("hex"), "hex"))
}

function encode(text) {
    for(i = 0; i < specialChars.length; i++) {
        if (text.includes(specialChars[i]) == true ) {
            text = text.replace(specialChars[i], " " + specialChars[i])
        }
    }
    var arr = text.split(" ")
    var buffer = new ArrayBuffer(arr.length * 4)
    const bufferView = new Int32Array(buffer)
    for(var i = 0; i < arr.length; i++) {
        if (words.includes(arr[i].toLowerCase()) == true) {
            bufferView[i] = words.indexOf(arr[i].toLowerCase())
        }
   }
   return buffer
}

function decode(buffer) {
    var text = ""
    const bufferView = new Int32Array(buffer)
    for(var i = 0; i < bufferView.length; i++) {
    var word = words[bufferView[i]]
    if (specialChars.includes(words[bufferView[i + 1]]) == false) {
        word = word + " "
    }
    if (i == 0 || specialChars.includes(words[bufferView[i - 1]]) == true) {
        word = word.charAt(0).toUpperCase() + word.slice(1)
    }
    text = text + word 
    }
    return text
}

writeToFile(encode("Life is the most beautiful thing I have ever experienced."))
console.log(decode(encode("Life is the most beautiful thing I have ever experienced.")))