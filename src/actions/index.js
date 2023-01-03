const { extractDataFromMessage, downloadImage, downloadSticker, downloadVideo } = require("../../utils")
const path = require('path')
const { TEMP_FOLDER, BOT_EMOJI } = require("../config")
const { exec } = require('child_process')
const fs = require('fs')

class Action {

    constructor(bot, baileysMessage) {
        const { remoteJid, args, isImage, isSticker, isVideo } = extractDataFromMessage(baileysMessage)

        this.bot = bot
        this.remoteJid = remoteJid
        this.args = args
        this.isVideo = isVideo
        this.isSticker = isSticker
        this.isImage = isImage
        this.baileysMessage = baileysMessage
    }

    async sticker() {
        if (!this.isImage && !this.isVideo) {
            await this.bot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI} ❌ Erro! Você precisa enviar uma imagem ou um vídeo!` })
            return
        }

        const outputPath = path.resolve(TEMP_FOLDER, 'output.webp')

        if (this.isImage) {

            const inputPath = await downloadImage(this.baileysMessage, 'input')

            exec(`ffmpeg -i ${inputPath} -vf scale=512:512 ${outputPath}`, async (error) => {
                if (error) {
                    fs.unlinkSync(inputPath);
                    await this.bot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI}❌ Erro ao converter a imagem para uma figurinha 😢` })
                    return
                }

                await this.bot.sendMessage(this.remoteJid, {
                    sticker: { url: outputPath }
                })

                fs.unlinkSync(inputPath)
                fs.unlinkSync(outputPath)

            }
            )
        } else {
            const inputPath = await downloadVideo(this.baileysMessage, 'input')

            const sizeInSeconds = 10;

            const seconds = this.baileysMessage.message?.videoMessage?.seconds || this.baileysMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage.seconds;

            const haveSecondsRule = seconds <= sizeInSeconds;

            if (!haveSecondsRule) {
                fs.unlinkSync(inputPath);

                await this.bot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI}Erro! ❌ O vídeo que você enviou tem mais de ${sizeInSeconds} segundos!\n Envie um vídeo menor!` });

                return
            }

            exec(`ffmpeg -i ${inputPath} -y -vcodec libwebp -fs 0.99M -filter_complex "[0:v] scale=512:512,fps=12,pad=512:512:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse" -f webp ${outputPath}`, async (error) => {
                if (error) {
                    fs.unlinkSync(inputPath);
                    await this.bot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI} ❌ Erro ao converter o vídeo/gif para figurinha 😢` })
                    return
                }

                await this.bot.sendMessage(this.remoteJid, {
                    sticker: { url: outputPath }
                })

                fs.unlinkSync(inputPath)
                fs.unlinkSync(outputPath)

            })

        }
    }
    async toImage() {
        if (!this.isSticker) {
            await this.bot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI} ❌ Erro! Você precisa enviar uma figurinha!` })
            return
        }
        const inputPath = await downloadSticker(this.baileysMessage, 'input')
        const outputPath = path.resolve(TEMP_FOLDER, 'output.png')

        exec(`ffmpeg -i ${inputPath} ${outputPath}`, async (error) => {
            if (error) {
                fs.unlinkSync(inputPath);
                await this.bot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI}❌ Erro ao converter a figurinha para uma imagem 😢` })
                return
            }
            await this.bot.sendMessage(this.remoteJid, {
                sticker: { url: outputPath }
            })

            fs.unlinkSync(inputPath)
            fs.unlinkSync(outputPath)
        })
    }
}

module.exports = { Action }