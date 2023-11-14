---
title: "Função com parâmetro In-Out"
date: "2019-10-02T08:14:51-02:00"
description: ""
---

Em Swift, todos os parâmetros que são informados nas funções e métodos parmanecem com o mesmo valor dentro do escopo. Ou seja, por padrão todos os parâmetros são `constantes` e por este motivo o valor recebido não pode ser modificado. Tentar alterar esse valor dentro do escopo retornará um erro ao compilar a aplicação. Isso previne fazer alguma alteração por engano no valor de origem.

No entanto, este comportamento por ser alterado quando utilizado o tipo **In-Out** junto à declaração do parâmetro. Este procedimento é conhecido como **copy-in copy-out** ou **call by value result** e segue o seguinte comportamento:

- Quando a função é invocada, o valor do argumento é copiado.
- No escopo da função, a cópia é modificada.
- No retorno da função, o valor da cópia é atribuído ao argumento de origem.

A assinatura de funções com *In-Out* deve seguir este modelo:

```Swift
func swapTwoInts(_ a: inout Int, _ b: inout Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

E ao invocar a função é obrigatório informar o caracter `&` antes do parâmetro:

```Swift
swapTwoInts(&someInt, &anotherInt)
```

O uso do tipo *In-Out* possui diversos benefícios, como evitar a declaração de uma nova variável com o valor do parâmetro atribuído para que seja realizado as modifições na função.

No exemplo abaixo, o parâmetro *viewItems* do método *arrangeIntoStackView()* recebe uma coleção de *UIView's* e a cada dois itens estes são empilhados dentro de uma nova *UIStackView*:

```Swift
func arrangeIntoStackView(from viewItems: inout [UIView]) {
    let verticalStackView = UIStackView(frame: .zero)
    verticalStackView.axis = .vertical
    verticalStackView.spacing = 8
    
    viewItems.prefix(2).forEach({ item in
        verticalStackView.addArrangedSubview(item)
        viewItems.removeFirst()
    })
}
```

A chamada ficaria desta maneira:

```Swift
arrangeIntoStackView(from: &itemViewCollection)
```

Para mais detalhes sobre este comportamento do *in-out*, veja [In-Out Parameters em Swift Docs](https://docs.swift.org/swift-book/ReferenceManual/Declarations.html#ID545).