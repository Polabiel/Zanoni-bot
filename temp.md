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