<p align="center">
  <img src="https://github.com/FuturoDEV-Eco/M3P-FrontEnd-Squad2/blob/main/public/destinoCerto.png" alt="Logo do Destino Certo">
</p>

# Destino Certo

**Destino Certo** foi desenvolvido como projeto final da formação **FuturoDev** do **Floripa Mais Tec**, coordenado pelo **Lab365** em parceria com o **SESI** e **SENAI**.

**Destino Certo** é uma plataforma que facilita o gerenciamento de resíduos e o acesso a pontos de coleta de materiais recicláveis. Usuários podem cadastrar novos pontos de coleta, encontrar pontos próximos em um mapa interativo ou em uma listagem, visualizar informações sobre os materiais aceitos em cada ponto e registrar suas próprias contribuições para a reciclagem.

Este projeto visa incentivar o descarte correto do lixo, auxiliando a localizar o ponto de coleta correto na sua região.

<p align="center">
  <img src="https://github.com/FuturoDEV-Eco/M3P-FrontEnd-Squad2/blob/main/public/prints/globalMap.jpg?raw=true" alt="destinoCerto">
</p>

## Deploys da aplicação

- Deploy BackEnd: [Render](https://m3p-backend-destino-certo.onrender.com/server/status)
- Deploy FrontEnd: [Vercel](https://m3-p-front-end-squad2-destino-certo.vercel.app/)

## Regras de negócio

- Os pontos de coleta podem ser **editados** somente pelo usuário que cadastrou ou pelo administrador
- Os pontos de coleta podem ser **deletados** somente pelo usuário que cadastrou ou pelo administrador
- CPF e e-mail **não podem ser duplicados** no cadastro e edição do usuário
- CPF deve ser **válido** no cadastro e edição do usuário
- Usuários que tiverem pontos de coleta cadastrados **NÃO** poderão ser excluídos

## Técnicas e Tecnologias Utilizadas

[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

### Componentes e Bibliotecas

- **json-server**: Simula um banco de dados para armazenar informações de usuários e pontos de coleta.
- **react-router-dom**: Gerencia a navegação e o roteamento da aplicação.
- **react-hook-form**: Utilizado para a validação de formulários, facilitando o gerenciamento de estados e a validação de entrada dos dados.
- **react-input-mask**: Aplica máscaras de entrada para campos como CPF e CEP, melhorando a experiência do usuário.
- **react-icons**: Fornece ícones para aprimorar a estética da aplicação.
- **react-leaflet**: Implementa mapas interativos para visualizar geograficamente os pontos de coleta.
- **axios**: Possibilita as chamadas XHTTP para que os dados possam ser carregados da API.
- **dotenv**: Habilita o uso de variáveis de ambiente para melhoria da segurança da aplicação.

### Estado e Gerenciamento

Foi utilizado Context API para gerenciar os estados globais da aplicação, divididos em dois contextos principais:

- **UserContext**: Gerencia funcionalidades relacionadas aos usuários.
- **CollectPlaceContext**: Controla as operações relacionadas aos pontos de coleta.

### Integrações Externas

- **ViaCEP API**: Integrada para obter detalhes de endereços a partir do CEP, utilizada nos formulários de cadastro e edição de usuários e pontos de coleta.
- **Open Street Map**: Após pegar o CEP, essa API verifica a latitude e longitude, adicionando ao campo do formulário.

### Responsividade

Destino Certo foi desenvolvido para suportar diferentes resoluções de tela. O desenvolvimento parte
do conceito mobile-first para depois abranger telas maiores.

https://github.com/user-attachments/assets/7446a608-addf-47ea-93a4-25bc195d4ba6

### Área administrativa

Ao realizar o login como administrador é habilitado o menu **Admin** nele é possível:

- **Listar todos usuários**: Foi desenvolvido para suportar diferentes resoluções de tela.
- **Deletar usuários**: Deletar usuários que **NÃO** tenham pontos de coleta cadastrados.
- **Editar usuários**: Editar os usuários cadastrados e promover para administradores.

Usuários admnistradores também podem:

- **Editar pontos de coleta**: Editar os pontos de coleta cadastrados de outros usuários.
- **Deletar pontos de coleta**: Deletar os pontos de coleta cadastrados por outros usuários.

## Instalação

Para usar o **Destino Certo**, clone ou faça download do repositório:

```bash
git clone https://github.com/FuturoDEV-Eco/M3P-FrontEnd-Squad2.git
```

Depois no terminal execute a instalação

```bash
npm install
```

Após a instalação concluída execute o json-server

```bash
npm run server
```

Com o json-server em execução, inicie o Vite - React

```bash
npm run dev
```

## Melhorias Futuras

### Regionalização da Interface:

Criar um contexto para expressões regionais, permitindo que a aplicação se adapte ao linguajar local de diferentes regiões. Atualmente, a aplicação utiliza expressões típicas de Florianópolis (o "dialeto manezês"). A ideia é expandir essa funcionalidade para incluir outras variantes regionais, permitindo aos usuários escolher o "sotaque" da interface de acordo com suas preferências ou localidade.

### Enriquecimento de Conteúdo (Blog sobre reciclagem):

Ampliar o conteúdo informativo disponível na aplicação incluindo textos e vídeos educativos sobre a importância do descarte correto de resíduos. Isso reforçaria o caráter educativo do **Destino Certo** e aumentaria a conscientização sobre reciclagem e gestão de resíduos.

### Cadastro para Usuários Jurídicos:

A inclusão de um sistema de cadastro para usuários jurídicos permitirá que empresas, como a Comcap, possam registrar seus pontos de coleta. Essa funcionalidade facilitará a gestão amparada por dados concretos, potencializando a coleta e a reciclagem.

### Registro de contribuições dos usuários:

Os usuários podem registrar suas contribuições para a reciclagem no software, criando um histórico de ações sustentáveis. Esse recurso não só incentiva a participação, mas também permite que os usuários visualizem seu impacto coletivo na preservação do meio ambiente (gamificação).


Essas melhorias não só aumentariam a utilidade e a relevância da aplicação , mas também ajudariam a engajar ainda mais os usuários na causa ambiental.


## Créditos

Bibliotecas / Componentes:

- [axios](https://axios-http.com/ptbr/docs/intro)
- [jwt-decode](https://fusionauth.io/dev-tools/jwt-decoder)
- [react-router-dom](https://reactrouter.com/en/main)
- [react-hook-form](https://react-hook-form.com/)
- [react-input-mask](https://github.com/sanniassin/react-input-mask)
- [react-icons](https://react-icons.github.io/react-icons/)
- [react-leaflet](https://react-leaflet.js.org/)


Sites

- Gerar pessoas: [4Devs](https://www.4devs.com.br/gerador_de_pessoas)
- Cores: [ Coolors ](https://coolors.com/)
- Fontes: [ Google Fonts](https://fonts.google.com/)


## Autores

- Bianca Silva Barcelos: [GitHub](https://github.com/BiancaBarcelos)
- Charles Biveu Doehl: [GitHub](https://github.com/charlesbiveu)
- Francisco Grimes da Silva: [GitHub](https://github.com/franciscogrimes)
