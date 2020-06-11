---
title: "Auto Layout programaticamente"
date: 2020-06-11T11:47:12-02:00
---

Durante o desenvolvimento de layout via código a atenção ao adicionar as `constraints` de **Auto Layout** deve ser dobrado. O motivo é que o `iOS` cria automaticamente `constraints` necessárias de tamanho e posição da `UIView/UIControl` a ser inserido na tela. Por isso, quando vamos adicionar as nossas `constraints`, elas entram em conflito e o layout pode ser comprometido.

### Como resolver conflitos de `constraints`?

A melhor solução, para `ViewCode`, é informar ao `iOS` para não criar as `constraints` de Auto Layout automaticamente. Para isto, basta alterar a propriedade `translatesAutoresizingMaskIntoConstraints` do elemento para `false`:

```swift
...
myView.translatesAutoresizingMaskIntoConstraints = false
...
```

Por padrão, o valor inicial desta propriedade é `true` para qualquer elemento criado programaticamente. Quando adicionamos os elementos via `Interface Builder`, o sistema define seu valor para `false`. Por esse motivo não temos esses conflitos com construção de layout visual.