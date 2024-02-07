---
title: "Mocking in Swift"
date: "2021-05-19T19:53:31-02:00"
description: ""
---

Durante o desenvolvimento, frequentemente nos deparamos em situações para escrever código `boilerplate`. Esse é o tipo de código que você prefere não escrever à mão e, na maioria das vezes, acaba copiando e colando de um modelo existente. Essa atitude, por mais trivial que pareça, pode levar a certos erros e até mesmo causar falhas durante a execução do código. Para solucionar essa tarefa, a geração automática de código pode ser útil. Geradores de código permitem que seja feita a criação do código chato e repetitivo de forma automática e no fim torna o aplicativo mais confiável.

Existem diversas maneiras de aplicar geradores de código para auxiliar o desenvolvimento. Alguns dos cenários mais comuns são para geração de Injeção de Dependência, recursos (como imagens, `strings` localizadas, entre outros) e `mock` para testes.

Neste post, vamos entender um pouco como funcionam os gerados de `mock` para nossos testes em `Swift`. Vale lembrar que a própria linguagem possui formas que eliminam a geração de código para certas tarefas. Tais como os protocolos `Codable`, `Equatable`, `Hashable` e `CaseIterable`.

`Swift` é uma linguagem estática e `type safety`, o que é ótimo, mas também quer dizer que o `runtime` é muito limitado. Não é possível criar ou modificar dinamicamente o comportamento de uma classe em tempo de execução. Portanto, testes unitários com `mocks` podem ser tornar uma tarefa árdua em alguns momentos.

## O que são `mocks`?

Classes que servem para fazer uma substituição de uma interface externa, como uma `API`, por exemplo. Essas classes ajudam a verificar determinados comportamentos, tais como, saber se um método foi invocado ou não, quantas vezes foi chamado e quais parâmetros foram informados.

## Quando usar `mocks`?

Ao execurtarmos os testes unitários queremos que a execução seja mais rápida possível e que não haja nenhum tipo de interferência externa que impacte os comportamentos. Dessa forma, `mocks` elimiam as dependências externas como: `APIs`, bibliotecas, camada de serviços, entre outras. Além disso, os `mocks` facilitam a simulação de cenários para os diversos comportamentos possíveis.

## Gerador de código

Gerador de código elimina do desenvolvedor a responsabilidade de criar códigos repetitivos. Assim o time consegue aumentar a produtividade e centralizar todas as energias na entrega de valor, ou seja, focar no que realmente interessa para o negócio: produzir valor.

A economia de tempo é o principal motivo ao escolher uma ferramenta de geração de código. Outro ponto é a consistência que é criada no código. Como o código é gerado automaticamente haverá um padrão em todos os casos.

No desenvolvimento Apple, uma solução comum, herdada do `Objective-C`, é utilizar a biblioteca `OCMock`. Porém, para o desenvolvimento moderno encontramos algumas limitações como: os objetos precisam ser subclasse de `NSObject`; necessário ter o atríbuto `@objc` nos métodos de sobreposição; não suporta tipos genéricos; e não é aplicável em métodos de classe.

Felizmente, existem diversas ferramentas modernas que geram automaticamente os objetos `mocks` para nossos testes. As opções mais comuns são:

- Mockolo
- Sourcery
- SwiftyMocky

### Mockolo

É um `framework`, `open-source` desenvolvido pela Uber para oferecer uma maneira rápida e fácil de gerar automaticamente objetos `mocks`. Um dos principais objetivos do **Mockolo** é o desempenho rápido. Ao contrário das outras alternativas, o **Mockolo** fornece a geração de `mocks` de alto desempenho e escalonável por meio de uma ferramenta de linha de comando leve, de modo que pode ser executado como parte do `Linter` ou do `Build` da aplicação.

A motivação da Uber foi desenvolvedor um projeto que seja rápido o suficiente para atender uma grande base de código. Nos seus projetos internos que possui mais de 2M `LoC` e mais de 10K de protocolos, os demais geradores de código demoravam várias horas e, mesmo com o cache ativado, demoravam vários minutos. Com o **Mockolo** a geração dos códigos ficou na casa dos segundos.

Outro objetivo é permitir flexibilidade no uso ou sobreposição de tipos. Isso permite o uso de alguns dos recursos que requerem uma análise mais profunda, como protocolos com tipos associados, para serem mais simples, diretos e menos frágeis.

> O projeto no GitHub possui um `disclaimer` alertando que o projeto pode conter `APIs` instáveis que podem não estar prontas para o uso geral. E suporte dos contribuidores e/ou novas `releases` podem ser limitados.

O **Mockolo** pode ser executado diretamente pela linha de comando. Para executá-lo, é necessário informar o arquivo ou diretório de origem e destino de saída do `mock`. O executável irá buscar todos os arquivos que possuem o marcador `@mockable` para realizar a geração.

### Sourcery

É um gerador de código construído sobre o `SwiftSyntax` da Apple. Ele estende as abstrações da linguagem para permitir a criação de código `boilerplate` automaticamente.

É usado em mais de 40.000 projetos no iOS e no macOS. Sua adoção massiva pela comunidade foi um dos fatores que levaram a própria Apple a implementar diversas melhorias na linguagem `Swift`.

**Sourcery** vai além da geração de código `mock` e pode ser aplicado em diversas situações do dia a dia. Alguns usos mais comuns são:

- Equality e Hashing
- Enum cases e Counts
- Mocks
- Stubs
- Decorators
- Codable
- UI

O `framework` pode ser utilizado tanto via linha de comando quanto instalando diretamente no projeto. Para a geração de `mocks`, é necessário implementar o protocolo `AutoMockable` ou inserir a anotação `AutoMockable`.

### SwiftyMocky

**SwiftyMocky** é um `framework` leve e fortemente tipado que possui uma experiência de teste unitários mais próxima `Mockito`, usado no desenvolvimento `Java`. A biblioteca abstrai o comportamento do **Sourcery**, que verifica o código-fonte e gera apenas os códigos `mocks`.

A ideia do **SwiftyMocky** é simular automaticamente os protocolos Swift. As principais características são:

- Sintaxe fácil, utilizando todo o poder do `auto-complete`
- Suporta tipos genéricos
- Maneira de especificar o retorno do `mock`
- Possibilidade de especificar diferentes retornos para diferentes atributos

Como abstrai do **Sourcery**, ao executar a geração dos `mocks`, o executável irá buscar em todos os arquivos o marcador `AutoMockable`.