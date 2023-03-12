const { BOT_EMOJI, BOT_NAME, PREFIX } = require("../config");

function errorMessage(message) {
  return `${BOT_EMOJI} ❌ Erro! ${message}`;
}

function warningMessage(message) {
  return `${BOT_EMOJI} ⚠ Atenção! ${message}`;
}

function doneMessage(message) {
  return `${BOT_EMOJI} 👍 Está Pronto ${message}`;
}

function adminMessage(message) {
  return `🤡 ${message} 🤡`;
}

function menuMessage() {
  const date = new Date();

  return `╭━━⪩ BEM VINDO! ⪨━━
▢
▢ • Bot em Desenvolvimento ${BOT_NAME} ${BOT_EMOJI}
▢ • Data: ${date.toLocaleDateString("pt-br")}
▢ • Hora: ${date.toLocaleTimeString("pt-br")}
▢ • Prefixo: ${PREFIX}
▢
╰━━─「🪐」─━━

╭━━⪩ MENU ⪨━━
▢
▢ • ${PREFIX}cep - Consulte o endereço pelo CEP
▢ • ${PREFIX}ping -  Vejá o que acontece
▢ • ${PREFIX}sticker - Faça uma img se tornar um sticker (não funciona animado)
▢ • ${PREFIX}toimg - Faça um sticker se tornar uma img 
▢ • ${PREFIX}ideia - Envia uma ideia de comando
▢ • ${PREFIX}jao - ${"nunca use esse comando".toUpperCase}
▢ • ${PREFIX}server - Entre no nosso server do discord
▢ • ${PREFIX}fato - Fatos que o ${BOT_NAME} sabe
▢ • ${PREFIX}doe - Doe apenas 1 real para o ${BOT_NAME} (necessario 5 reais)
▢ • ${PREFIX}bot - converse com o ${BOT_NAME} escrevendo o que você quiser
▢
╰━━─「🚀」─━━`;
}

function adminMenu() {
  return `╭━━⪩ TA FELIZ?! ⪨━━
  ▢
  ▢ • Bot em Desenvolvimento ${BOT_NAME} ${BOT_EMOJI}
  ▢ • Data: ${date.toLocaleDateString("pt-br")}
  ▢ • Hora: ${date.toLocaleTimeString("pt-br")}
  ▢ • Prefixo: ${PREFIX}
  ▢
  ╰━━─「😎」─━━
  
  ╭━━⪩ MENU ADMINISTRADOR ⪨━━
  ▢
  ▢ • ${PREFIX}sayall - Envie mensagem para os usuario do bot (apenas host)
  ▢ • ${PREFIX}all - Marca todos os usuarios que estão no grupo (apenas host)
  ▢ • ${PREFIX}log - Usar log de cada função (bot, baileys, grupo) (apenas host)
  ▢
  ╰━━─「😈」─━━`;
}

function donationMessage() {
  return `${BOT_EMOJI} Doe apenas R$1,00 para o ${BOT_NAME} continuar funcionado :)\nClique no link para a doação: livepix.gg/polabiel\nou use minha chave-pix:17f19897-d99a-4537-8e77-068b3343cc48`;
}

const fatos = [
  "O jhon escolheu *NÃO* ser rico.",
  "A primeira versão do Zanoni BOT ele não era careca",
  "Pode se dizer que todo mundo já se frustou com um -28",
  "Antigamente o nick do Matheus Zanoni era\n*Danone*",
  "A maior baleia já existente no mundo é a mãe do Xed",
  "Normalmente o Gabryel com Y está em uma tabacaria comendo vinagre",
  `O vencedor da pessoa mais negra do Grupo vai para Douglas`,
  "Precisamos de mais Boa dia no Grupo",
  "Atualmente a pessoa que mais fala merda e ninguem gosta é o Gabriel",
  "O verdadeiro nome do Manuel Ketchup é João Augusto",
  "Pelo incrivel que pareça o Zanoni-BOT é o Matheus Zanoni",
  "O lucas parece o Shaun Ross",
  "O Jhon já comeu um anão(literalmente)",
  "A pessoa mais pobre do Grupo começa com J e termina com N\ntirem suas conclusão",
  "O melhor amigo da infância do Forever foi Hitler",
  "O marquin é o cara mais crente do grupo",
  "A cada 17 segundos o Lessa mata um carioca com um Glock",
  "Sempre que o Art aparece no grupo ele solta 100 citações do Capitão Bolsonaro contra o Jhon",
  "A pessoa mais azarada de todas é o Jhon por sofrer humilhação pelo Xed",
  "O criador desse bot é mono shaco (decepção ou incrivel?)",
  "Infelizmente o Gabriel foi corno aos 13",
  "O jhon já transou na parede da DP (obs: foi de dia)",
  "Quem bolou acende",
  "A segunda bola é do Dono",
  "Tossiu, passou.",
  "O baseado não é microfone",
  "A pessoa mais provável de ter um filho é\nGabryel com Y",
  "O joão já bateu uma no banheiro do Matheus Zanoni com a porta aberta",
  "Iram fazer 3 anos que o album de música de Lucas e Gabriel não foi concluido",
  "Todos os raps deveria ter a mesma qualidade de Poetas no Topo 2",
  "Infelizmente o Wemerson não gosta de ser zuado",
  "Normalmente o Gabriel acorda as 5 da tarde e dorme as 5 da manhã (em ponto)",
  "A melhor música do ano vai para: Manoel Gomes (Caneta Azul)",
  "Jhon já se despe na cozinha e corre sem roupa pela casa do Zanoni",
  "O Gabryel com Y e João não param de se agarrar quando o Lucas entrava no Quarto do Gabriel",
  "Lucas já antigiu a cabeça do Douglas com um cano de aço, causando uma fratura craniana e sequelas permanentes deixando o Douglas com o olho puxado",
  "Jhon e Lucas já cagaram na piscina do Gabriel enquanto ele jogava Geometry Dash",
  "Gabryel com Y casa com a mangueira do narguile",
];

module.exports = {
  errorMessage,
  menuMessage,
  warningMessage,
  doneMessage,
  donationMessage,
  fatos,
  adminMessage,
  adminMenu,
};
