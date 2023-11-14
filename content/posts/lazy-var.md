---
title: "Lazy Var"
date: "2019-02-27T21:34:03-02:00"
description: ""
---

Em desenvolvimento mobile o poder de computação é muito limitado comparado à outras plataformas. Por esse motivo uma boa prática é criar objetos complexos somente quando precisamos deles.

Swift tem um mecanismo embutido na linguagem que permite o cálculo [just-in-time](https://en.wikipedia.org/wiki/Just-in-time_compilation) para tarefas mais complexas chamado de `lazy var`. Esse tipo de declaração permite que a propriedade seja executada somente quando for solicitada pela primeira vez. Se nunca for solicitada, a propriedade nunca é executada.

No exemplo abaixo foram criadas quatro variáveis, duas com o indicador `lazy` e duas sem. Um `breakpoint` foi habilitado no início da função `viewDidLoad`. Quando o `breakpoint` é acionado **somente as propriedades sem o indicador `lazy` são criadas**. Como podemos confirmar no `lldb`:

![Var criada](../assets/lazy-var/var-criada.png)

Ao avançar a execução do código, as propriedades do tipo `lazy` somente são criadas em tempo de execução.

![Lazy var criada 1](../assets/lazy-var/lazy-var-criada-1.png)

![Lazy var criada 2](../assets/lazy-var/lazy-var-criada-2.png)

Esta prática tem diversas utilidades e é muito comum em **propriedades computadas**. No exemplo abaixo, a propriedade `lazy var fullName` somente será criada na memória quando invocada. E como não foi chamada no teste não houve desperdício de memória, mesmo o objeto sendo instanciado.

![Lazy var não invocada](../assets/lazy-var/lazy-var-nao-invocada.png)
