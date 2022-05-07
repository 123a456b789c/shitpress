const fs = require("fs")
const words = fs.readFileSync(__dirname + "/words.txt", 'utf-8').split("\r\n")

var specialChars = ["!","?",".",","]
var text = "What do you want? I want to cook lunch!"

//TODO fix split in edge cases
function encode(text) {
    for(i = 0; i < specialChars.length; i++) {
        if (text.includes(specialChars[i]) == true ) {
            text.replace(specialChars[i], "ii")
        }
    }
    var arr = text.split(" ")
    console.log(text)
    var buffer = new ArrayBuffer(arr.length * 4)
    const bufferView = new Int32Array(buffer)
    for(var i = 0; i < arr.length; i++) {
        if (words.includes(arr[i].toLowerCase()) == true) {
            bufferView[i] = words.indexOf(arr[i].toLowerCase())
        }
   }
   return buffer
}

console.log(encode(text))
console.log(decode(encode(text)))

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