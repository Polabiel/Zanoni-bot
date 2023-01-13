const { BOT_EMOJI, BOT_NAME, PREFIX, OWNER } = require("../config");

function errorMessage(message) {
  return `${BOT_EMOJI} ❌ Erro! ${message}`;
}

function warningMessage(message) {
  return `${BOT_EMOJI} ⚠ Atenção! ${message}`;
}

function menuMessage() {
  const date = new Date();

  return `​​
  ​​​​​
  ​​
  ​​
  ​​​​
  ╭───────────────┐
  ├── MENU DE COMANDOS 
  ├───────────────
  │ Bot em desenvolvimento | ${BOT_NAME}
  │ Data: ${date.toLocaleDateString("pt-br")}
  │ Hora: ${date.toLocaleTimeString("pt-br")}
  │ Prefixo: ${PREFIX}
  │ Usuário: @${sender.split("@")[0]}
  ╰──────────┐
  ╭──────────┴─┐
  │ COMANDOS/BÁSICOS
  ├────────────
  │▢ • ${PREFIX}sticker — Transforme uma img/gif em sticker
  │▢ • ${PREFIX}cep — Consulta o CEP mostrando o endereço por ele
  │▢ • ${PREFIX}ping — Retorna a latencia do servidor real
  │▢ • ${PREFIX}toimg — Transforme um sticker em image
  │▢ • ${PREFIX}ideia — Escreva sua ideia de comandos para o @Pola
  │▢ • ${PREFIX}adm — Em desevolvimento
  ╰──────────┘
  `;
}

function menuAdms() {`​​
​​​​​
​​
​​
​​​​
╭───────────────┐
├── MENU DE ADMS
├───────────────
│ Bot em desenvolvimento | ${BOT_NAME}
│ Data: ${date.toLocaleDateString("pt-br")}
│ Hora: ${date.toLocaleTimeString("pt-br")}
│ Prefixo: ${PREFIX}
╞───────────────┘
│▢ • ${PREFIX}ativacoes
│▢ • ${PREFIX}listanegra (NUMERO)
│▢ • ${PREFIX}tirardalista (NUMERO)
│▢ • ${PREFIX}listanegraG (NÚMERO)
│▢ • ${PREFIX}tirardalistaG (NÚMERO)
│▢ • ${PREFIX}Kick [@] (pra-remover) 
│▢ • ${PREFIX}Ban (responder-mensagem)
│▢ • ${PREFIX}Promover [@] (Ser-ADM)
│▢ • ${PREFIX}Rebaixar [@] (rebaixar-adm)
│▢ • ${PREFIX}Totag (menciona-algo)
│▢ • ${PREFIX}Grupo f/a
│▢ • ${PREFIX}Status
│▢ • ${PREFIX}Limpar (texto-invisível-gp)
│▢ • ${PREFIX}Atividades (DO-GRUPO)
│▢ • ${PREFIX}Linkgp
│▢ • ${PREFIX}Grupoinfo
│▢ • ${PREFIX}Hidetag (txt) (marcação)
│▢ • ${PREFIX}Marcar (marca tds do gp)
│▢ • ${PREFIX}Marcar2 (Marca-tds-Wa.me/)
│▢ • ${PREFIX}Anagrama 1 / 0
│▢ • ${PREFIX}Antipalavra 1 / 0
│▢ • ${PREFIX}Descgp (TXT)
│▢ • ${PREFIX}Nomegp (Nome)
│▢ • ${PREFIX}Criartabela (ESCREVA-ALGO)
│▢ • ${PREFIX}Tabelagp
╰──────────┘
`
}

function menudono(prefix, sender){
  return `​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
  ​​​​​
  ​​
  ​​
  ​​​​
  ╭───────────────┐
  ├── MENU DE DONO
  ├───────────────
  │ Usuário: @${sender.split("@")[0]}
  ├───────────────┐
  │ Config: ${prefix}Configurar-bot
  ╞───────────────┘
  │▢ • ${prefix}ativacoes_dono
  │▢ • ${prefix}Botoes
  │▢ • ${prefix}Bangp
  │▢ • ${prefix}Unbangp
  │▢ • ${prefix}Fotomenu (MARCAR-IMG) 
  │▢ • ${prefix}Blockcmd  (cmd)
  │▢ • ${prefix}Unblockcmd (cmd)
  │▢ • ${prefix}Legenda_estrangeiro (msg)
  │▢ • ${prefix}Legendabv (oq qr)
  │▢ • ${prefix}Legendasaiu (oq qr)
  │▢ • ${prefix}Legendasaiu2 (oq qr)
  │▢ • ${prefix}Legendabv2 (oq qr)
  │▢ • ${prefix}Fundobemvindo (marcar-img)
  │▢ • ${prefix}Fundosaiu (marcar-img)
  │▢ • ${prefix}Serpremium
  │▢ • ${prefix}Listagp
  │▢ • ${prefix}Antipalavrão 1 / 0
  │▢ • ${prefix}Antiligar 1 / 0
  │▢ • ${prefix}Addpalavra (palavrão)
  │▢ • ${prefix}Delpalavra (palavrão)
  │▢ • ${prefix}Ativo
  │▢ • ${prefix}Ausente (fale-oq-faz)
  │▢ • ${prefix}Delpremium @(marca)
  │▢ • ${prefix}Addpremium @(marca)
  │▢ • ${prefix}Clonar [@] (rouba ft de prf)
  │▢ • ${prefix}Fotobot (img, = foto do BT)
  │▢ • ${prefix}Descriçãogp (digite-algo)
  │▢ • ${prefix}Block [@] (bloq de usar cmds) 
  │▢ • ${prefix}Unblock [@] (desbloquear) 
  │▢ • ${prefix}Setprefix  (prefixo-novo)
  │▢ • ${prefix}Bcgp (TM-PRA-PV-MEMBROS)
  ╰──────────┘
  `;
  
  };
  
module.exports = {
  menudono,
  errorMessage,
  menuMessage,
  warningMessage,
};
