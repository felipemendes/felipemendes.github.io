---
title: "Pet Project: Chuck Facts"
date: 2019-12-11T21:14:25-02:00
draft: false
---

Nesta postagem compartilho um pouco das práticas e processos que realizei no desenvolvimento no aplicativo Chuck Facts para iOS. O código fonte está disponível no repositório [ChuckFacts](https://github.com/felipemendes/ChuckFacts).

Em resumo, o projeto possibilidade realizar buscas em [api.chucknorris.io](https://api.chucknorris.io/), exibir os resultados consultados e realizar o compartilhamento dos fatos.

Existem centenas de maneiras de resolver um problema e a maneira que o problema é abordado depende muito do gosto pessoal e situação atual. Neste post espero que você aprenda algo útil do meu ponto de vista nesta aplicação.

Esse é o resultado final:

![Chuck Facts](chuck-facts.png)

# Iniciando

Para facilitar a identificação e divisão de tarefas foi utilizado o GitHub Projects com automação dos *cards* com as *issues* do projeto. O quadro criado se chama MLP (*Minimum Loveable Product*) e pode ser encontrado [aqui](https://github.com/felipemendes/ChuckFacts/projects/1).

## Sistema de controle de versão

A primeira linha de comando que digito ao iniciar um novo projeto sempre é `git init`. Sistema de controle de versão é um processo imprescindível no desenvolvimento de aplicativos/sistemas e o `Git` é a melhor e mais completa alternativa para trabalhar em equipes e controlar todo o processo.

## Configuração inicial

No *Xcode* deixo o projeto configurado com o mínimo de informação possível para facilitar a organização de grupos/diretórios e arquivos. Isso ajuda a pensar na arquitetura a ser utilizada e no objetivo do projeto. Afim de escrever um código mais limpo e facilitar o versionamento de código não faço uso de *Storyboards* e/ou *XIBs*. A alternativa que escolho é desenvolver as telas e elementos visuais programaticamente, ou seja, através de *view code*.

Para facilitar o desenvolvimento de layout utilizo frenquentemente o [WTF Auto Layout?](https://www.wtfautolayout.com/) para deixar o *log* de erros mais legível.

## Style guide

Para facilitar a leitura e integração de novos membros ao projeto utilizo o *style guide* de *Swift* do [Raywenderlich](https://github.com/raywenderlich/swift-style-guide). Ferramentas de *linter* também entram na minha receita. O uso do *[SwiftLint](https://github.com/realm/SwiftLint)* ajuda a impor um estilo de código para todos os envolvidos e promove as melhores práticas recomendadas na programação.

## Gerenciador de dependências

Nesse projeto optei em utilizar *Cocoapods* por ser um gerenciador muito fácil de configurar e integrar novas dependências ao projeto. Seu uso também é muito simplificado tanto para integração de dependência quanto para a construção de novas bibliotecas, conforme explico [nesta](https://felipemendes.netlify.com/bibliotecas-com-cocoapods/bibliotecas-com-cocoapods/) postagem.

# Arquitetura

Tentei organizar ao máximo o código por *módulos/features*. Isso facilita a identificação de códigos relacionados para correção e adição de novos recursos mais facilmente no futuro. Essa organização responde à pergunta “O que esse aplicativo faz?” em vez de “O que é esse arquivo ou o que ele faz?”. O maior benefício é tornar tudo modular e facilitar tanto o desenvolvimento quanto os testes.

Aqui foram criadas as *features* e *components*:
- Home
- Search
- CloudTag
- PastSearches
- Placeholder

## MVVM

Existem diversas maneiras para arquitetura um aplicativo e o mais usado no desenvolvimento iOS é o *MVC (Model View Controller)* da Apple. Este modelo é comumente conhecido como *Massive View Controller* por causa de sua falta de abstração. E afim de resolver esta questão escolhi o uso do *MVVM (Model-View-ViewModel)*. O uso do *MVVM* permite tirar parte da lógica de apresentação da *ViewController* e consequentemente facilita a manutenção do código e evolução do projeto.

## FlowController

Semelhante ao padrão *Coordinator*, *FlowController* tem como propósito fornecer um encapsulamento da lógica de navegação. Dessa forma as *ViewController* são isoladas e invisíveis entre si, e isso possibilita o reuso mais fácil. Basicamente, *FlowController* é um container de *ViewControllers* para resolver um fluxo de navegação interno. Normalmente utilizado um *Flow* para cada *feature* e cada ação possui um método próprio para realizar a navegação.

## Injeção de dependência

Cada *ViewController* dentro do *FlowController* pode ter dependências diferentes. Isso evita o primeiro *ViewController* carregar todas as instâncias (ex.: um serviço) e passar para as *ViewControllers* filhas. Para ajudar a divisão de componentes a serem desenvolvidos, testados e mantidos com mais facilidade utilizei o [Swinject](https://github.com/Swinject/Swinject) como framework de Injeção de Dependência.

## Testes unitários

Para os *unit tests* utilizei somente o framework *XCTest* da Apple. Para componente que foi testado há um arquivo de *XCTest* no *target* de testes. Uma boa prática foi criar uma função para cada comportamento e ser o máximo descritivo na assinatura de cada método. Apesar de não recomendado, também foi criado testes de requisição dos *endpoints* de produção. O ideal seria em um ambiente de homologação.

## Camada de serviços

A implementação de serviços normalmente gera dúvida qual abordagem a ser seguida. Utilizar bibliotecas externas como Moya e Alamofire ou desenvolver manualmente. Por mais que essas *libs* sejam acessíveis e de uso simplificado, tento limitar a quantidade de dependências na aplicação e assim evitar problemas com atualizações ou erros de códigos externos.

As requisições estão organizadas da seguinte maneira:

- **Endpointable** é um protocolo que possui as propriedades necessárias para criação da *URLRequest*.
- **HTTPMethod** é um *enum* responsável pelos métodos de requisição HTTP. Neste caso, somente o tipo *get* foi configurado.
- **HTTPTask** é um *enum* que configura os parâmetros dos *endpoints* dos serviços.
- **Routable** este protocolo possui um *endpointable* responsável em fazer as requisições e o método *request()* retorna seu resultado.
- **Router** cria uma *URLSession* a partir do *endpointable*. O retorno da requisição é enviado para *URLSession.shared*. Aqui também é feito o *encoding* dos parâmetros na URL.

## Armazenamento de dados

Para persistência dos dados foi utilizado o framework *CoreData* da Apple. Foi criado o gerenciamento e manipulação básica de objetos devido ao tipo de dados que é salvo. O armazenamento ocorre somente para as pesquisas realizadas pelo usuário. Em cada pesquisa realizada a função *add(_ keyword: String)* é invocada, toda lógica é realizada e o armazenamento é feito, se necessário. A recuperação desses dados é feito através de *observable*. A exclusão dos registros é feita através das configurações do aplicativo dentro de Ajustes do iOS.