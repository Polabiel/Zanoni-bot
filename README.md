<h1 align="center">
  <br>
  <a href="https://github.com/Polabiel/Zanoni-bot"><img src="https://telegra.ph/file/985dc21e18bd1862114f5.png" alt="Zanoni — Whatsapp Bot"></a>
  <br>
  Zanoni — Bot
  <br>  
</h1>

<h4 align="center">Música, Moderação, Diversão and Modulavel.</h4>
  <a href="https://pypi.org/project/Red-DiscordBot/">
     <img alt="PyPI" src="https://img.shields.io/pypi/v/Red-Discordbot">
  </a>
  <a href="https://www.python.org/downloads/">
    <img alt="PyPI - Python Version" src="https://img.shields.io/pypi/pyversions/Red-Discordbot">
  </a>
  <a href="https://github.com/Rapptz/discord.py/">
     <img src="https://img.shields.io/badge/discord-py-blue.svg" alt="discord.py">
  </a>
  <a href="https://www.patreon.com/Red_Devs">
    <img src="https://img.shields.io/badge/Support-Red!-red.svg" alt="Support Red on Patreon!">
  </a>
</p>
<p align="center">
  <a href="https://github.com/Cog-Creators/Red-DiscordBot/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/Cog-Creators/Red-Discordbot/tests.yml?label=tests" alt="GitHub Actions">
  </a>
  <a href="http://docs.discord.red/en/stable/?badge=stable">
    <img src="https://readthedocs.org/projects/red-discordbot/badge/?version=stable" alt="Red on readthedocs.org">
  </a>
  <a href="https://github.com/psf/black">
    <img src="https://img.shields.io/badge/code%20style-black-000000.svg" alt="Code Style: Black">
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg">
  </a>
  <a href="https://crowdin.com/project/red-discordbot">
    <img src="https://d322cqt584bo4o.cloudfront.net/red-discordbot/localized.svg" alt="Localized with Crowdin">
  </a>
</p>

<p align="center">
  <a href="#visão-geral">Visão Geral</a>
  •
  <a href="#installation">Instalação</a>
  •
  <a href="http://docs.discord.red/en/stable/index.html">Documentation</a>
  •
  <a href="#plugins">Plugins</a>
  •
  <a href="#comunidade">Comunidade</a>
  •
  <a href="#licença">Licença</a>
</p>

# Visão Geral

O Zanoni é um bot totalmente modular - o que significa que todos os recursos e comandos podem ser ativados/desativados para o seu
gostar, tornando-o totalmente personalizável. Este é um *bot auto-hospedado* - o que significa que você precisará
para hospedar e manter sua própria instância. Você pode transformar o Red em um bot de administrador, bot de música, bot de curiosidades,
novo melhor amigo ou todos juntos!

[Instalação](#Instalação) é fácil, e você **NÃO** precisa saber nada sobre codificação! Aparte
desde a instalação e atualização, todas as partes do bot podem ser controladas no Whatsapp.

**The default set of modules includes and is not limited to:**

- Recursos de moderação (kick/ban/softban/hackban, mod-log, filtro, limpeza de chat)
- Curiosidades (as listas estão incluídas e podem ser facilmente adicionadas)
- Recursos de música (YouTube, SoundCloud, arquivos locais, listas de reprodução, filas)
- Banco (caça-níqueis, créditos de usuário)
- Comandos personalizados
- Pesquisa Imgur/gif
- Automação administrativa (atribuição de função própria, anúncios entre servidores, relatórios mod-mail)
- Permissões de comando personalizáveis

**Além disso, outros [plugins](#plugins) podem ser facilmente encontrados e adicionados no Zanoninho.

# Instalação

A instalação requer **node.LTS**

**O que significa que você pode baixar** *as seguintes plataformas que suportam Node.LTS:*

- [Windows](https://nodejs.org/pt-br/download/)
- [Termux — Android](#Termux)
- [Linux](https://nodejs.org/pt-br/download/)
- [MacOS](https://nodejs.org/pt-br/download/)

Se depois de ler o guia você ainda tiver problemas, sinta-se à vontade para se juntar ao
[Servidor oficial do Discord](https://discord.gg/QVRM3Z3eY9) e peça ajuda no canal **#Suporte**.

# Plugins

O Zanoni-bot é totalmente modular, permitindo carregar e descarregar plugins de sua escolha e instalar plugins de terceiros
plugins diretamente do Whatsapp! Alguns exemplos são:

- Integração Cleverbot (fale com Red e ela responde)
- Banir sincronização
- Mensagens de boas-vindas
- Cassino
- Papéis de reação
- Modo lento
- AniList
- E muito, muito mais!

Sinta-se livre para dar uma [espreitadela](https://discord.gg/QVRM3Z3eY9) no nosso suporte dentro do servidor para tirar dúvidas comigo.

# Comunidade

**Zanoni** está em desenvolvimento contínuo e é apoiado por uma comunidade ativa que produz novos conteúdo (funções/plugins) para que todos possam desfrutar. Novos recursos são adicionados constantemente. A gente se encotrar bem [aqui](https://discord.gg/QVRM3Z3eY9) com a comunidade do meu discord

# Termux

Para aqueles que tem dificil para mexer no Termux, tem aqui um Tutorial bem básico

1. Instale o aplicativo F-Droid

O F-Droid é uma biblioteca de aplicativos Android, similar a Play Store. A diferença é que o F-Droid é exclusivo para aplicativos open-source.

- [Site Oficial do fdroid](fdroid.org)

<a href="https://fdroid.org"><img src="https://content.invisioncic.com/v310067/monthly_2022_07/f-droid.png.9c45eb46593f3eb4276b56b7e5534118.png" alt="O que é F-droid"></a>

Como se trata de um aplicativo fora da Play Store, pode ser necessário liberar algumas permissões durante o processo de instalação.

2. Instale o Termux

Abra o F-Droid, pesquise por Termux e clique em instalar. O Termux é um poderoso emulador de terminal e ambiente Linux para Android. Ele permite a instalação de diversos pacotes (como o Node.js) usando as bibliotecas apt e pkg.

3. Instale o Node.js

Abra o Termux. Usaremos a lib apt para instalar o Node.js. Mas antes, é necessário atualizar a lib. Digite os seguintes comandos:

```bash
apt update
apt upgrade
```

Caso haja alguma solicitação durante a instalação, apenas pressione a tecla Enter.

Para instalar o Node.js, digite o comando:

```bash
apt install nodejs
```

<a href=""><img src="https://content.invisioncic.com/v310067/monthly_2022_07/apt-nodejs.png.94906a380be23e14fc1f8e13c89820cb.png" alt="Terminal do Termux"></a>

Após a instalação, podemos rodar o Node em nosso dispositivo Android.

<a href=""><img src="https://content.invisioncic.com/v310067/monthly_2022_07/node-running.png.4a758f1bb384e6c748c9ca14af7458ae.png" alt="Terminal do Termux"></a>

- [Creditos](https://forum.casadodesenvolvedor.com.br/topic/44722-como-emular-um-terminal-linux-e-instalar-o-nodejs-no-android/)

# Licença

Esse software usa a licença **MIT**.

É proibido a remoção dos créditos, lembre-se que gastei uma quantidade de tempo enorme para manter isto atualizado gratuitamente para todos.

Peço que não remova os créditos, por gentileza.

Se você ver alguém plagiando, mostre a verdade, diga ser um plágio.