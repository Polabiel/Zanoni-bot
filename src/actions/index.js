const { BOT_EMOJI, TEMP_FOLDER } = require("../config");
const { consultarCep } = require("correios-brasil");
const {
  extractDataFromMessage,
  downloadImage,
  downloadVideo,
  downloadSticker,
} = require("../utils");
const path = require("path");
const { exec } = require("child_process");
const fs = require("fs");
const { errorMessage, warningMessage } = require("../utils/messages");
const speed = require('performance-now');
const { resourceUsage } = require("process");

class Action {
  constructor(bot, baileysMessage) {

    const checkPro = {
      react: {
        text: "⏳", // use an empty string to remove the reaction
        key: baileysMessage.key
      }
    }

    const checkGreen = {
      react: {
        text: "✅", // use an empty string to remove the reaction
        key: baileysMessage.key
      }
    }

    const checkRed = {
      react: {
        text: "❌", // use an empty string to remove the reaction
        key: baileysMessage.key
      }
    }

    const checkWarning = {
      react: {
        text: "⚠", // use an empty string to remove the reaction
        key: baileysMessage.key
      }
    }

    const checkNerd = {
      react: {
        text: "🤓", // use an empty string to remove the reaction
        key: baileysMessage.key
      }
    }

    const { remoteJid, args, isImage, isVideo, isSticker, peido, GroupParticipant, nickName,isGroup, sentMessage} =
      extractDataFromMessage(baileysMessage);

    this.sentMessage = sentMessage;
    this.isGroup = isGroup;
    this.checkNerd = checkNerd;
    this.GroupParticipant = GroupParticipant;
    this.nickName = nickName;
    this.peido = peido;
    this.checkWarning = checkWarning;
    this.checkRed = checkRed;
    this.checkGreen = checkGreen;
    this.checkPro = checkPro;
    this.bot = bot;
    this.remoteJid = remoteJid;
    this.args = args;
    this.isImage = isImage;
    this.isVideo = isVideo;
    this.isSticker = isSticker;
    this.baileysMessage = baileysMessage;
  }

  async ideia() {
    await this.bot.sendMessage(this.remoteJid, this.checkPro)
    if (!this.args) {
        await this.bot.sendMessage(this.remoteJid, this.checkNerd)
        await this.bot.sendMessage(this.remoteJid, {
          text: errorMessage(
            "Você precisa escrever sua ideia na frente 🤓"
          ),
        });
        return;
    } else if (this.isGroup) {
      await this.bot.sendMessage(this.remoteJid, this.checkWarning)
        await this.bot.sendMessage(this.remoteJid, {
          text: errorMessage(
            "Esse comando não funciona em grupo"
          ),
        });
      return;
    }
    await this.bot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI} Talvez eu envie pro Pola, ou não 😈` })
    await this.bot.sendMessage(this.peido, { text: `${BOT_EMOJI} ${this.nickName} mandou essa ideia\n\n_${this.sentMessage.replace('/ideia ','')}_` })
    await this.bot.sendMessage(this.remoteJid, this.checkGreen)
  }

  async cep() {
    await this.bot.sendMessage(this.remoteJid, this.checkPro)
    if (!this.args || ![8, 9].includes(this.args.length)) {
      await this.bot.sendMessage(this.remoteJid, this.checkRed)
      await this.bot.sendMessage(this.remoteJid, {
        text: errorMessage(
          "Você precisa enviar um CEP no formato xxxxx-xxx ou xxxxxxxx!"
        ),
      });
      return;
    }

    try {
      const { data } = await consultarCep(this.args);

      if (!data.cep) {
        await this.bot.sendMessage(this.remoteJid, this.checkWarning)
        await this.bot.sendMessage(this.remoteJid, {
          text: warningMessage("CEP não encontrado!"),
        });
        return;
      }

      await this.bot.sendMessage(this.remoteJid, {
        text: `${BOT_EMOJI} *Resultado*
        
*CEP*: ${data.cep}
*Logradouro*: ${data.logradouro}
*Complemento*: ${data.complemento}
*Bairro*: ${data.bairro}
*Localidade*: ${data.localidade}
*UF*: ${data.uf}
*IBGE*: ${data.ibge}`,
      });
      await this.bot.sendMessage(this.remoteJid, this.checkGreen)
    } catch (error) {
      console.log(error);
      await this.bot.sendMessage(this.remoteJid, this.checkRed)
      await this.bot.sendMessage(this.remoteJid, {
        text: errorMessage(`Contate o proprietário do bot para resolver o problema!
        
Erro: ${error.message}`),
      });
    }
  }

  async sticker() {
    await this.bot.sendMessage(this.remoteJid, this.checkPro)
    if (!this.isImage && !this.isVideo) {
      await this.bot.sendMessage(this.remoteJid, {
        text: errorMessage("Você precisa enviar uma imagem ou um vídeo!"),
      });
      await this.bot.sendMessage(this.remoteJid, this.checkWarning)
      return;
    }

    const outputPath = path.resolve(TEMP_FOLDER, "output.webp");

    if (this.isImage) {
      const inputPath = await downloadImage(this.baileysMessage, "input");

      exec(
        `ffmpeg -i ${inputPath} -vf scale=512:512 ${outputPath}`,
        async (error) => {
          if (error) {
            console.log(error);

            fs.unlinkSync(inputPath);

            await this.bot.sendMessage(this.remoteJid, this.checkRed)
            await this.bot.sendMessage(this.remoteJid, {
              text: errorMessage("Não foi possível converter a figurinha!"),
            });

            return;
          }

          await this.bot.sendMessage(this.remoteJid, this.checkGreen)
          await this.bot.sendMessage(this.remoteJid, {
            sticker: { url: outputPath },
          });

          fs.unlinkSync(inputPath);
          fs.unlinkSync(outputPath);
        }
      );
    } else {
      const inputPath = await downloadVideo(this.baileysMessage, "input");

      const sizeInSeconds = 10;

      const seconds =
        this.baileysMessage.message?.videoMessage?.seconds ||
        this.baileysMessage.message?.extendedTextMessage?.contextInfo
          ?.quotedMessage?.videoMessage?.seconds;

      const haveSecondsRule = seconds <= sizeInSeconds;

      if (!haveSecondsRule) {
        fs.unlinkSync(inputPath);

        await this.bot.sendMessage(this.remoteJid, this.checkWarning)
        await this.bot.sendMessage(this.remoteJid, {
          text: errorMessage(`O vídeo que você enviou tem mais de ${sizeInSeconds} segundos!
Envie um vídeo menor!`),
        });

        return;
      }

      exec(
        `ffmpeg -i ${inputPath} -y -vcodec libwebp -fs 0.99M -filter_complex "[0:v] scale=512:512,fps=12,pad=512:512:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse" -f webp ${outputPath}`,
        async (error) => {
          if (error) {
            fs.unlinkSync(inputPath);

            await this.bot.sendMessage(this.remoteJid, this.checkRed)
            await this.bot.sendMessage(this.remoteJid, {
              text: errorMessage(
                "Não foi possível converter o vídeo/gif em figurinha!"
              ),
            });

            return;
          }

          await this.bot.sendMessage(this.remoteJid, this.checkGreen)
          await this.bot.sendMessage(this.remoteJid, {
            sticker: { url: outputPath },
          });

          fs.unlinkSync(inputPath);
          fs.unlinkSync(outputPath);
        }
      );
    }
  }

  async toImage() {
    await this.bot.sendMessage(this.remoteJid, this.checkPro)
    if (!this.isSticker) {
      await this.bot.sendMessage(this.remoteJid, this.checkWarning)
      await this.bot.sendMessage(this.remoteJid, {
        text: errorMessage("Você precisa enviar um sticker!"),
      });
      return;
    }

    const inputPath = await downloadSticker(this.baileysMessage, "input");
    const outputPath = path.resolve(TEMP_FOLDER, "output.png");

    exec(`ffmpeg -i ${inputPath} ${outputPath}`, async (error) => {
      if (error) {
        await this.bot.sendMessage(this.remoteJid, this.checkRed)
        console.log(error);
        await this.bot.sendMessage(this.remoteJid, {
          text: errorMessage(
            "Não foi possível converter o sticker para figurinha!"
          ),
        });
        return;
      }
      await this.bot.sendMessage(this.remoteJid, this.checkGreen)
      await this.bot.sendMessage(this.remoteJid, {
        image: { url: outputPath },
      });

      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  }

  async ping() {
    await this.bot.sendMessage(this.remoteJid, this.checkPro)
    const timestamp = speed();
    const latencia = speed() - timestamp
    this.bot.sendMessage(this.remoteJid, { text: `Latência: ${latencia.toFixed(4)}Ms` }, { quoted: this.baileysMessage })
    await this.bot.sendMessage(this.remoteJid, this.checkGreen)
  }

}

module.exports = Action;
