const {
  BOT_EMOJI,
  TEMP_FOLDER,
  CONTACTS_PATH,
  BOT_NAME,
} = require("../config");
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
const {
  errorMessage,
  warningMessage,
  menuMessage,
  donationMessage,
  fatos,
} = require("../utils/messages");
const speed = require("performance-now");

class Action {
  constructor(bot, baileysMessage) {
    const checkPro = {
      react: {
        text: "⏳",
        key: baileysMessage.key,
      },
    };

    const checkGreen = {
      react: {
        text: "✅",
        key: baileysMessage.key,
      },
    };

    const checkRed = {
      react: {
        text: "❌",
        key: baileysMessage.key,
      },
    };

    const checkWarning = {
      react: {
        text: "⚠",
        key: baileysMessage.key,
      },
    };

    const checkNerd = {
      react: {
        text: "🤓",
        key: baileysMessage.key,
      },
    };

    const {
      remoteJid,
      args,
      isImage,
      isVideo,
      isSticker,
      owner,
      GroupParticipant,
      nickName,
      isGroup,
      sentMessage,
      sentText,
      numberBot,
      host,
    } = extractDataFromMessage(baileysMessage);

    this.sentMessage = sentMessage;
    this.numberBot = numberBot;
    this.isGroup = isGroup;
    this.checkNerd = checkNerd;
    this.GroupParticipant = GroupParticipant;
    this.nickName = nickName;
    this.owner = owner;
    this.checkWarning = checkWarning;
    this.checkRed = checkRed;
    this.checkGreen = checkGreen;
    this.checkPro = checkPro;
    this.bot = bot;
    this.remoteJid = remoteJid;
    this.args = args;
    this.host = host;
    this.isImage = isImage;
    this.isVideo = isVideo;
    this.isSticker = isSticker;
    this.baileysMessage = baileysMessage;
    this.sentText = sentText;
  }

  async ideia() {
    await this.bot.sendMessage(this.remoteJid, this.checkPro);
    if (!this.args) {
      await this.bot.sendMessage(this.remoteJid, this.checkNerd);
      await this.bot.sendMessage(this.remoteJid, {
        text: errorMessage("Você precisa escrever sua ideia na frente 🤓"),
      });
      return;
    } else if (this.isGroup) {
      await this.bot.sendMessage(this.remoteJid, this.checkWarning);
      await this.bot.sendMessage(this.remoteJid, {
        text: errorMessage("Esse comando não funciona em grupo"),
      });
      return;
    }
    await this.bot.sendMessage(this.remoteJid, {
      text: `${BOT_EMOJI} Talvez eu envie pro Pola, ou não 😈`,
    });
    await this.bot.sendMessage(this.owner, {
      text: `${BOT_EMOJI} ${this.nickName} mandou essa ideia\n\n_${this.sentMessage}${this.sentText}_`,
    });
    await this.bot.sendMessage(this.remoteJid, this.checkGreen);
  }

  async cep() {
    await this.bot.sendMessage(this.remoteJid, this.checkPro);
    if (!this.args || ![8, 9].includes(this.args.length)) {
      await this.bot.sendMessage(this.remoteJid, this.checkRed);
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
        await this.bot.sendMessage(this.remoteJid, this.checkWarning);
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
      await this.bot.sendMessage(this.remoteJid, this.checkGreen);
    } catch (error) {
      console.log(error);
      await this.bot.sendMessage(this.remoteJid, this.checkRed);
      await this.bot.sendMessage(this.remoteJid, {
        text: errorMessage(`Contate o proprietário do bot para resolver o problema!
        
Erro: ${error.message}`),
      });
    }
  }

  async sticker() {
    try {
      await this.bot.sendMessage(this.remoteJid, this.checkPro);
      if (!this.isImage && !this.isVideo) {
        await this.bot.sendMessage(this.remoteJid, {
          text: errorMessage("Você precisa enviar uma imagem ou vídeo!"),
        });
        await this.bot.sendMessage(this.remoteJid, this.checkWarning);
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

              await this.bot.sendMessage(this.remoteJid, this.checkRed);
              await this.bot.sendMessage(this.remoteJid, {
                text: errorMessage("Não foi possível converter a figurinha!"),
              });

              return;
            }

            await this.bot.sendMessage(this.remoteJid, this.checkGreen);
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

          await this.bot.sendMessage(this.remoteJid, this.checkWarning);
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

              await this.bot.sendMessage(this.remoteJid, this.checkRed);
              await this.bot.sendMessage(this.remoteJid, {
                text: errorMessage(
                  "Não foi possível converter o vídeo/gif em figurinha!"
                ),
              });

              return;
            }

            await this.bot.sendMessage(this.remoteJid, this.checkGreen);
            await this.bot.sendMessage(this.remoteJid, {
              sticker: { url: outputPath },
            });

            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
          }
        );
      }
    } catch (error) {
      await this.bot.sendMessage(this.remoteJid, {
        text: `${errorMessage(
          "Ocorreu algum erro dentro do código fala com o host do bot"
        )}`,
      });
      await this.bot.sendMessage(this.remoteJid, this.checkRed);
    }
  }

  async toImage() {
    await this.bot.sendMessage(this.remoteJid, this.checkPro);
    if (!this.isSticker) {
      await this.bot.sendMessage(this.remoteJid, this.checkWarning);
      await this.bot.sendMessage(this.remoteJid, {
        text: errorMessage("Você precisa enviar um sticker!"),
      });
      return;
    }

    const inputPath = await downloadSticker(this.baileysMessage, "input");
    const outputPath = path.resolve(TEMP_FOLDER, "output.png");

    exec(`ffmpeg -i ${inputPath} ${outputPath}`, async (error) => {
      if (error) {
        await this.bot.sendMessage(this.remoteJid, this.checkRed);
        console.log(error);
        await this.bot.sendMessage(this.remoteJid, {
          text: errorMessage(
            "Não foi possível converter o sticker para figurinha!"
          ),
        });
        return;
      }
      await this.bot.sendMessage(this.remoteJid, this.checkGreen);
      await this.bot.sendMessage(this.remoteJid, {
        image: { url: outputPath },
      });

      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  }

  async ping() {
    await this.bot.sendMessage(this.remoteJid, this.checkPro);
    const timestamp = speed();
    const latencia = speed() - timestamp;
    this.bot.sendMessage(
      this.remoteJid,
      { text: `Latência: ${latencia.toFixed(4)}Ms` },
      { quoted: this.baileysMessage }
    );
    await this.bot.sendMessage(this.remoteJid, this.checkGreen);
  }

  async fatos() {
    const getContent = fatos[Math.floor(Math.random() * fatos.length)];
    this.bot.sendMessage(this.remoteJid, {
      text: `${BOT_EMOJI} Fato: ${getContent}`,
    });
  }

  async server() {
    await this.bot.sendMessage(this.remoteJid, this.checkPro);
    await this.bot.sendMessage(this.remoteJid, {
      text: `${BOT_EMOJI} Entra no Servidor do discord do Pola: https://discord.gg/BgQrmc6TnC 😰\nE no servidor da Haze no Discord: https://discord.gg/3qgtSr6SrZ 💀`,
    });
    await this.bot.sendMessage(this.remoteJid, this.checkGreen);
  }

  async default() {
    await this.bot.sendMessage(this.remoteJid, this.checkWarning);
    await this.bot.sendMessage(this.remoteJid, {
      text: errorMessage("Esse comando não existe, use o */MENU*"),
    });
  }

  async jao() {
    const conteudo = [
      {
        video: fs.readFileSync("media/video/jao.mp4"),
        caption: "eu avisei",
        gifPlayback: true,
      },
      {
        image: fs.readFileSync("media/img/jao.jpeg"),
        caption: "qual foi parça",
      },
    ];

    const getContent = conteudo[Math.floor(Math.random() * conteudo.length)];
    this.bot.sendMessage(this.remoteJid, getContent);
  }

  async menu() {
    await this.bot.sendMessage(this.remoteJid, this.checkPro);
    await this.bot.sendMessage(this.remoteJid, { text: `${menuMessage()}` });
    await this.bot.sendMessage(this.remoteJid, this.checkGreen);
  }

  async doa() {
    await this.bot.sendMessage(this.remoteJid, this.checkPro);
    await this.bot.sendMessage(this.remoteJid, {
      text: `${donationMessage()}`,
    });
    await this.bot.sendMessage(this.remoteJid, this.checkGreen);
  }

  async createContacts() {
    // Verifica se o evento é referente a um contato do WhatsApp
    if (
      this.remoteJid.includes("@s.whatsapp.net") &&
      !this.owner &&
      !this.numberBot &&
      this.nickName ==
        "Gabriel Oliveira" /* essa parte do código é necessario colocar o nome do seu usuario para não dar problema */ &&
      this.nickName == `${BOT_NAME}`
    ) {
      try {
        // Inicializa a variável contacts com o conteúdo do arquivo de contatos, caso ele exista
        let contacts = fs.existsSync(CONTACTS_PATH)
          ? JSON.parse(fs.readFileSync(CONTACTS_PATH, "utf-8"))
          : [];

        // Verifica se o contato já foi registrado
        const contactIndex = contacts.findIndex(
          (c) => c.remoteJid === this.remoteJid
        );
        if (contactIndex !== -1) {
          contacts[contactIndex].nickName =
            this.nickName || contacts[contactIndex].remoteJid == this.remoteJid;
        } else {
          contacts.push({ remoteJid: this.remoteJid, nickName: this.nickName });
        }
        // Salva os contatos atualizados no arquivo JSON
        fs.appendFileSync(CONTACTS_PATH, JSON.stringify(contacts, null, 2), {
          flag: "w+",
        });
        console.log("Contato registrado com sucesso:", {
          Número: this.remoteJid,
          "Nome do Contato": this.nickName,
        });
      } catch (error) {
        await this.bot.sendMessage(this.owner, {
          text: `${errorMessage(
            "Erro ao ler ou salvar arquivo de contatos:",
            error
          )}`,
        });
        await this.bot.sendMessage(this.owner, this.checkRed);
        console.log("Erro ao ler ou salvar arquivo de contatos:", error);
      }
    }
  }

  async sayAll() {
    // Verificar se this.host e this.owner foram definidos
    if (!this.host || !this.owner) {
      return await this.bot.sendMessage(this.remoteJid, {
        text: `${errorMessage("Você não é o dono/host do bot")}`,
      });
    }

    // Verificar se this.args foi definido
    else if (!this.args) {
      return await this.bot.sendMessage(this.remoteJid, {
        text: `${warningMessage("Você precisa enviar alguma mensagem")}`,
      });
    }

    // Ler os contatos do arquivo JSON e enviar as mensagens
    const fileContent = fs.readFile(CONTACTS_PATH);
    const Readcontacts = JSON.parse(fileContent);

    for (const contacts of Readcontacts) {
      try {
        await this.bot.sendMessage(`${contacts.remoteJid}`, {
          text: `${this.args}`,
        });
      } catch (error) {
        await this.bot.sendMessage(this.host, {
          text: `${errorMessage(
            "Não foi possivel enviar mensagem para todos"
          )}`,
        });
      }
    }
  }
}
module.exports = Action;
