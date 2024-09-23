<p align="center">
  <img src="https://github.com/charles-futDevFloripa/blob/develop/public/destinoCerto.png" alt="Logo do Destino Certo">
</p>

# Destino Certo

**Destino Certo** foi desenvolvido como projeto final, individual, do módulo 01 da formação **FuturoDev** do **Floripa Mais Tec**, coordenado pelo **Lab365** em parceria com o **SESI** e **SENAC**.

**Destino Certo** é uma plataforma que facilita o gerenciamento de resíduos e o acesso a pontos de coleta de materiais recicláveis. Usuários podem cadastrar novos pontos de coleta, encontrar pontos próximos em um mapa interativo ou em uma listagem, visualizar informações sobre os materiais aceitos em cada ponto e registrar suas próprias contribuições para a reciclagem.

Este projeto visa incentivar o descarte correto do lixo, auxiliando a localizar o ponto de coleta correto na sua região.

<p align="center">
  <img src="https://github.com/FuturoDEV-Eco/M3P-FrontEnd-Squad2/blob/develop/public/prints/globalMap.jpg?raw=true" alt="destinoCerto">
</p>

## Regras de negócio

- Os pontos de coleta podem ser **editados** somente pelo usuário que cadastrou ou pelo administrador
- Os pontos de coleta podem ser **deletados** somente pelo usuário que cadastrou ou pelo administrador
- CPF e e-mail **não podem ser duplicados** no cadastro e edição do usuário
- CPF deve ser **válido** no cadastro e edição do usuário
- Usuários que tiverem pontos de coleta cadastrados **NÃO** poderão ser excluídos.

## Técnicas e Tecnologias Utilizadas

[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

O projeto **Destino Certo** adota uma arquitetura inspirada no modelo MVC, com a utilização de Context API para a gestão de estados, representando os controllers. O back-end é simulado pelo `json-server`, criando uma representação funcional de um banco de dados.

### Componentes e Bibliotecas

- **json-server**: Simula um banco de dados para armazenar informações de usuários e pontos de coleta.
- **react-router-dom**: Gerencia a navegação e o roteamento da aplicação.
- **react-hook-form**: Utilizado para a validação de formulários, facilitando o gerenciamento de estados e a validação de entrada dos dados.
- **react-input-mask**: Aplica máscaras de entrada para campos como CPF e CEP, melhorando a experiência do usuário.
- **react-icons**: Fornece ícones para aprimorar a estética da aplicação.
- **react-leaflet**: Implementa mapas interativos para visualizar geograficamente os pontos de coleta.

### Estado e Gerenciamento

Foi utilizado Context API para gerenciar os estados globais da aplicação, divididos em dois contextos principais:

- **UserContext**: Gerencia funcionalidades relacionadas aos usuários.
- **CollectPlaceContext**: Controla as operações relacionadas aos pontos de coleta.

### Integrações Externas

- **ViaCEP API**: Integrada para obter detalhes de endereços a partir do CEP, utilizada nos formulários de cadastro e edição de usuários e pontos de coleta.

### Responsividade

Destino Certo foi desenvolvido para suportar diferentes resoluções de tela. O desenvolvimento parte
do conceito mobile-first para depois abranger telas maiores.

https://github.com/FuturoDEV-Eco/M3P-FrontEnd-Squad2/assets/164348201/8957decf-54b0-48ae-ae7b-3f973d97ffd5

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

### Geolocalização Aprimorada:

Implementar a funcionalidade de obter a latitude e longitude diretamente no mapa ao selecionar um ponto, facilitando o cadastro de novos pontos de coleta com maior precisão geográfica.

### Regionalização da Interface:

Criar um contexto para expressões regionais, permitindo que a aplicação se adapte ao linguajar local de diferentes regiões. Atualmente, a aplicação utiliza expressões típicas de Florianópolis (o "dialeto manezês"). A ideia é expandir essa funcionalidade para incluir outras variantes regionais, permitindo aos usuários escolher o "sotaque" da interface de acordo com suas preferências ou localidade.

### Enriquecimento de Conteúdo:

Ampliar o conteúdo informativo disponível na aplicação incluindo textos e vídeos educativos sobre a importância do descarte correto de resíduos. Isso reforçaria o caráter educativo do **Destino Certo** e aumentaria a conscientização sobre reciclagem e gestão de resíduos.

Essas melhorias não só aumentariam a utilidade e a relevância da aplicação , mas também ajudariam a engajar ainda mais os usuários na causa ambiental.

## Bugs Conhecidos

### Problema com `react-input-mask`

- **Descrição do Problema**: Ao utilizar a biblioteca `react-input-mask` para adicionar máscaras de entrada aos campos de formulário, foi identificado um aviso no console:
  _Warning: findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: [React docs on refs](https://reactjs.org/docs/refs-and-the-dom.html)._

Este aviso é gerado devido ao uso de `findDOMNode`, que é considerado obsoleto e será removido em futuras versões do React.

- **Impacto**: O aviso não afeta a funcionalidade atual do aplicativo, mas indica a necessidade de atualização para garantir a compatibilidade com futuras versões do React.

- **Plano de Ação**: Estou monitorando o repositório da `react-input-mask` para uma atualização que resolve esse problema. Existe um pull request aberto que promete corrigir essa questão, e assim que for integrado e disponibilizado, planejo atualizar a dependência em nosso projeto para eliminar este aviso.

## Créditos

Bibliotecas / Componentes:

- [json-server](https://github.com/typicode/json-server)
- [react-router-dom](https://reactrouter.com/en/main)
- [react-hook-form](https://react-hook-form.com/)
- [react-input-mask](https://github.com/sanniassin/react-input-mask)
- [react-icons](https://react-icons.github.io/react-icons/)
- [react-leaflet](https://react-leaflet.js.org/)

Sites

- Gerar pessoas: [4Devs](https://www.4devs.com.br/gerador_de_pessoas)
- Cores: [ Coolors ](https://coolors.com/)
- Fontes: [ Google Fonts](https://fonts.google.com/)
