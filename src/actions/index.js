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
const { performance } = require('perf_hooks');
const { errorMessage, warningMessage } = require('../utils/messages')

class Action {
  constructor(bot, baileysMessage) {
    const { remoteJid, args, isImage, isVideo, isSticker,idMessage } =
      extractDataFromMessage(baileysMessage);

    this.bot = bot;
    this.remoteJid = remoteJid;
    this.args = args;
    this.isImage = isImage;
    this.isVideo = isVideo;
    this.isSticker = isSticker;
    this.baileysMessage = baileysMessage;
    this.idMessage = idMessage
    this.numOwner = '+5519981022857@s.whatsapp.net'
  }

  async cep() {
    const reactionMessagePro = {
      react: {
          text: "⌛", // use an empty string to remove the reaction
          key: this.baileysMessage.key
      }
    }
    const reactionMessageGreen= {
      react: {
          text: "✅", // use an empty string to remove the reaction
          key: this.baileysMessage.key
      }
    }
    const reactionMessageRed= {
      react: {
          text: "❌", // use an empty string to remove the reaction
          key: this.baileysMessage.key
      }
    }
    const reactionMessageWarning= {
      react: {
          text: "⚠️", // use an empty string to remove the reaction
          key: this.baileysMessage.key
      }
    }
// Configuração de Reação bem merda
    await this.bot.sendMessage(this.remoteJid, reactionMessagePro);
    if (!this.args || ![8, 9].includes(this.args.length)) {
      await this.bot.sendMessage(this.remoteJid, reactionMessageWarning);
      await this.bot.sendMessage(this.remoteJid, {
        text: errorMessage('Você precisa enviar um CEP no formato xxxxx-xxx ou xxxxxxxx!'),
      });
      return;
    }

    try {
      const { data } = await consultarCep(this.args);

      if (!data.cep) {
        await this.bot.sendMessage(this.remoteJid, reactionMessageWarning);
        await this.bot.sendMessage(this.remoteJid, {
          text: warningMessage('CEP não encontrado!'),
        });
        return;
      }

      await this.bot.sendMessage(this.remoteJid, reactionMessageGreen);
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
    } catch (error) {
      console.log(error);
      await this.bot.sendMessage(this.remoteJid, reactionMessageRed);
      await this.bot.sendMessage(this.remoteJid, {
        text: errorMessage("Contate o proprietário do bot para resolver o problema!\nErro: ",`${error.message}`),
      });
    }
  }

  async sticker() {
    const reactionMessagePro = {
      react: {
          text: "⌛", // use an empty string to remove the reaction
          key: this.baileysMessage.key
      }
    }
    const reactionMessageGreen= {
      react: {
          text: "✅", // use an empty string to remove the reaction
          key: this.baileysMessage.key
      }
    }
    const reactionMessageRed= {
      react: {
          text: "❌", // use an empty string to remove the reaction
          key: this.baileysMessage.key
      }
    }
    const reactionMessageWarning= {
      react: {
          text: "⚠️", // use an empty string to remove the reaction
          key: this.baileysMessage.key
      }
    }
// Configuração de Reação bem merda
    await this.bot.sendMessage(this.remoteJid, reactionMessagePro);
    if (!this.isImage && !this.isVideo) {
      await this.bot.sendMessage(this.remoteJid, reactionMessageWarning);
      await this.bot.sendMessage(this.remoteJid, {
        text: errorMessage("Você precisa enviar uma imagem ou um vídeo!"),
      });
      return;
    }

    const outputPath = path.resolve(TEMP_FOLDER, "output.webp");

    if (this.isImage) {
      const inputPath = await downloadImage(this.baileysMessage, "input");

      exec(
        `ffmpeg -i ${inputPath} -vf scale=512:512 ${outputPath}`,
        async (error) => {
          if (error) {
            fs.unlinkSync(inputPath);

            await this.bot.sendMessage(this.remoteJid, reactionMessageRed);
            await this.bot.sendMessage(this.remoteJid, {
              text: errorMessage("ao converter a imagem para figurinha!"),
            });

            return;
          }

          await this.bot.sendMessage(this.remoteJid, reactionMessageGreen);
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

        await this.bot.sendMessage(this.remoteJid, reactionMessageWarning);
        await this.bot.sendMessage(this.remoteJid, {
          text: errorMessage("O vídeo que você enviou tem mais de", `${sizeInSeconds}`, "segundos! Envie um vídeo menor!"),
        });

        return;
      }
      exec(
        `ffmpeg -i ${inputPath} -y -vcodec libwebp -fs 0.99M -filter_complex "[0:v] scale=512:512,fps=12,pad=512:512:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse" -f webp ${outputPath}`,
        async (error) => {
          if (error) {
            fs.unlinkSync(inputPath);
            console.log(error)
            await this.bot.sendMessage(this.remoteJid, reactionMessageRed);
            await this.bot.sendMessage(this.remoteJid, {
              text: errorMessage("ao converter o vídeo/gif para figurinha!"`${error.message}`)
            });
            return;
          }

          await this.bot.sendMessage(this.remoteJid, reactionMessageGreen);
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
    const reactionMessagePro = {
      react: {
          text: "⌛", // use an empty string to remove the reaction
          key: this.baileysMessage.key
      }
    }
    const reactionMessageGreen= {
      react: {
          text: "✅", // use an empty string to remove the reaction
          key: this.baileysMessage.key
      }
    }
    const reactionMessageRed= {
      react: {
          text: "❌", // use an empty string to remove the reaction
          key: this.baileysMessage.key
      }
    }
    const reactionMessageWarning= {
      react: {
          text: "⚠️", // use an empty string to remove the reaction
          key: this.baileysMessage.key
      }
    }
// Configuração de Reação bem merda
    await this.bot.sendMessage(this.remoteJid, reactionMessagePro);    
    if (!this.isSticker) {
      await this.bot.sendMessage(this.remoteJid, reactionMessageWarning);
      await this.bot.sendMessage(this.remoteJid, {
        text: errorMessage("Você precisa enviar um sticker!"),
      });
      return;
    }

    const inputPath = await downloadSticker(this.baileysMessage, "input");
    const outputPath = path.resolve(TEMP_FOLDER, "output.png");

    exec(`ffmpeg -i ${inputPath} ${outputPath}`, async (error) => {
      if (error) {
        console.log(error);
        await this.bot.sendMessage(this.remoteJid, reactionMessageRed);
        await this.bot.sendMessage(this.remoteJid, {
          text: errorMessage("ao converter o sticker para figurinha!"),
        });
        return;
      }

      await this.bot.sendMessage(this.remoteJid, reactionMessageGreen);
      await this.bot.sendMessage(this.remoteJid, {
        image: { url: outputPath },
      });

      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  }

  async ping() {
    const reactionMessagePro = {
      react: {
          text: "⌛", // use an empty string to remove the reaction
          key: this.baileysMessage.key
      }
    }
    const reactionMessageGreen= {
      react: {
          text: "✅", // use an empty string to remove the reaction
          key: this.baileysMessage.key
      }
    }
    const reactionMessageRed= {
      react: {
          text: "❌", // use an empty string to remove the reaction
          key: this.baileysMessage.key
      }
    }
    const reactionMessageWarning= {
      react: {
          text: "⚠️", // use an empty string to remove the reaction
          key: this.baileysMessage.key
      }
    }
// Configuração de Reação bem merda
    await this.bot.sendMessage(this.remoteJid, reactionMessagePro)
    const before = performance.now()
    const after = performance.now()
    const result = Math.floor(after - before)
    if (result <= 0) {
      await this.bot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI} 🏓 Pong: 1 ms` })
      await this.bot.sendMessage(this.remoteJid, reactionMessageGreen, this.idMessage)
      return;
    }
    await this.bot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI} 🏓 Pong: ${result}ms` })
    await this.bot.sendMessage(this.remoteJid, reactionMessageGreen, this.idMessage)
    return;
  }

}

module.exports = Action;