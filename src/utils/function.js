const idMessage = require("./index")

const reactionMessage = {
        text: ["⌛", "✅","❌","⚠️"],
        key: idMessage.key
}

function checkGreen() {
    console.log(reactionMessage.text[0]);
}

checkGreen()