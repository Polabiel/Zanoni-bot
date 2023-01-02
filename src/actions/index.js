const { extractDataFromMessage, downloadImage,downloadSticker } = require("../../utils")
const path = require('path')
const { TEMP_FOLDER, BOT_EMOJI } = require("../config")
const { exec } = require('child_process')
const fs = require('fs') 

class Action {

    constructor(bot, baileysMessage) {
        const { remoteJid, args ,isImage,isSticker } =  extractDataFromMessage(baileysMessage)

        this.bot = bot
        this.remoteJid = remoteJid
        this.args = args
        this.isSticker = isSticker
        this.isImage = isImage
        this.baileysMessage = baileysMessage
    }

    async sticker() {
        if (!this.isImage) {
            await this.bot.sendMessage(this.remoteJid, {text: `${BOT_EMOJI} ❌ Erro! Você precisa enviar uma imagem`})
            return
        }

        const inputPath = await downloadImage(this.baileysMessage, 'input')
        const outputPath = path.resolve(TEMP_FOLDER, 'output.webp')

        exec(`ffmpeg -i ${inputPath} -vf scale=512:512 ${outputPath}`, async (error) => {
            if (error)  {
                await this.bot.sendMessage(this.remoteJid, {text: `${BOT_EMOJI}❌ Erro ao converter a imagem para uma figurinha 😢`})
                return
            }

            await this.bot.sendMessage(this.remoteJid, {
                sticker: {url: outputPath}
            })

            fs.unlinkSync(inputPath)
            fs.unlinkSync(outputPath)

        })
    }
   async toImage() {
    if (!this.isSticker) {
        await this.bot.sendMessage(this.remoteJid, {text: `${BOT_EMOJI} ❌ Erro! Você precisa enviar uma figurinha!`})
        return
    }
    const inputPath  = await downloadSticker(this.baileysMessage,'input')
    const outputPath = path.resolve(TEMP_FOLDER, 'output.png')

    exec(`ffmpeg -i ${inputPath} ${outputPath}`, async (error) => {
        if (error) {
            await this.bot.sendMessage(this.remoteJid, {text:`${BOT_EMOJI}❌ Erro ao converter a figurinha para uma imagem 😢`})
            return
        }
        await this.bot.sendMessage(this.remoteJid, {
            sticker: {url: outputPath}
        })

        fs.unlinkSync(inputPath)
        fs.unlinkSync(outputPath)
    })
    }
}

module.exports = {Action}