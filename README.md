PT-BR Version

Projeto: Papacapim
Descrição: O Papacapim é um projeto espelho do antigo Twitter. Ele é uma plataforma de microblogging onde os usuários podem criar postagens, curtir, descurtir, responder a postagens, além de seguir outros usuários. O design e as funcionalidades são inspirados em redes sociais clássicas, como o Twitter.
Requisitos do Sistema

Para utilizar e executar o projeto Papacapim, é necessário que o ambiente de desenvolvimento atenda aos seguintes requisitos:

    Node.js: Versão mais recente instalada (mínimo 14.x ou superior).
    NPM (Node Package Manager): Certifique-se de ter a versão mais recente.
    Expo CLI: O aplicativo é gerenciado e executado via Expo, que facilita o desenvolvimento de aplicações React Native.

-------------------------------Preparando o Ambiente-------------------------------

Instalação do Expo CLI: Para começar, você precisará do Expo CLI instalado globalmente em sua máquina. Para isso, abra o terminal e execute o seguinte comando:

    npm install -g expo-cli

Instalação de Dependências: O projeto faz uso de várias bibliotecas externas, como o react-native-animatable para animações. Para instalar todas as dependências necessárias, execute o seguinte comando no terminal dentro do diretório do projeto:

    npm install react-native-animatable --save

Você também pode instalar outras dependências do projeto com:

    npm install


-------------------------------Executando o Projeto-------------------------------

Com o ambiente configurado e as dependências instaladas, o próximo passo é rodar o projeto localmente. Para iniciar a aplicação, use o seguinte comando:

    expo start

Certifique-se de que o dispositivo físico ou o emulador (Android/iOS) está conectado à mesma rede Wi-Fi do seu computador para que o Expo possa identificar e exibir a aplicação corretamente. Com o Expo Go App, você pode escanear o QR code que será gerado no terminal ou na interface web do Expo para abrir o aplicativo em seu celular.
Funcionalidades Principais
1. Postagens

Os usuários podem criar postagens com textos curtos. As postagens são listadas em uma timeline, exibindo o nome de usuário, o texto e opções de interação.
2. Curtir e Descurtir Postagens

    Botão de coração (heart): Para curtir uma postagem.
    Quando uma postagem é curtida, o ícone do coração fica preenchido em vermelho. Caso o usuário clique novamente, a postagem será descurtida.
    Endpoints da API usados:
        Curtir: POST /posts/{id}/likes
        Descurtir: DELETE /posts/{id}/likes/{userId}

3. Responder Postagens

    A funcionalidade de resposta a postagens permite que os usuários interajam entre si comentando diretamente em um post.
    Endpoint da API usado:
        Responder: POST /posts/{id}/replies

4. Seguir e Deixar de Seguir Usuários

    Os usuários podem seguir outros para receber suas postagens diretamente na timeline.
    Há um botão de "Seguir" que muda para "Deixar de seguir" quando o usuário já está seguindo.

Navegação

A aplicação utiliza navegação através de Drawer e Stack Navigator para permitir a navegação entre as diferentes telas, como a tela inicial (Home), perfil de usuário, e configurações.

    HomeScreen: Lista de postagens com opções para curtir e responder.
    UserProfileScreen: Exibe informações do perfil do usuário selecionado, incluindo opções para seguir/descurtir.
    SettingsScreen: Permite ao usuário ajustar preferências pessoais no aplicativo.


-------------------------------API Utilizada-------------------------------

O projeto Papacapim se comunica com uma API para realizar diversas operações como criação de postagens, curtidas e respostas. A URL base da API utilizada no projeto é:

    https://api.papacapim.just.pro.br

    
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

English Version

Description: Papacapim is a project modeled after the old Twitter. It is a microblogging platform where users can create posts, like, unlike, reply to posts, and follow other users. The design and functionalities are inspired by classic social networks like Twitter.

-------------------------------System Requirements-------------------------------

To use and run the Papacapim project, your development environment must meet the following requirements:

    Node.js: Latest version installed (minimum version 14.x or higher).
    NPM (Node Package Manager): Make sure you have the latest version.
    Expo CLI: The app is managed and run via Expo, which facilitates the development of React Native applications.

-------------------------------Setting Up the Environment-------------------------------

Install Expo CLI:
To start, you will need to install Expo CLI globally on your machine. Open the terminal and run the following command:

    npm install -g expo-cli

Installing Dependencies:
The project uses several external libraries, such as react-native-animatable for animations. To install all necessary dependencies, run the following command in the terminal inside the project's root directory:

    npm install react-native-animatable --save

You can also install other project dependencies with:

    npm install

-------------------------------Running the Project-------------------------------

With the environment set up and dependencies installed, the next step is to run the project locally. To start the application, use the following command:

    expo start

Make sure the physical device or emulator (Android/iOS) is connected to the same Wi-Fi network as your computer so that Expo can detect and display the app correctly. With the Expo Go app, you can scan the QR code that will be generated in the terminal or the Expo web interface to open the app on your phone.
