---
title: "Gerenciamento de Memória"
date: "2019-03-11T21:28:22-02:00"
description: ""
---

Este é um assunto muito importante para desenvolvedores que têm, ou pretendem ter, preocupação em manter os ciclos no código. No dia a dia acabamos utilizando os recursos para evitar *retain cycles*, mas muitas das vezes não sabemos seu funcionamento correto. Este *post* visa esclarecer como não se perder no uso da memória.

## ARC

O gerenciamento de memória utilizado pelo Swift é o chamado [ARC](https://docs.swift.org/swift-book/LanguageGuide/AutomaticReferenceCounting.html) (Automatic Reference Counting ou Contagem Automática de Referência) que foi herdado do ObjC. 

Ele é responsável por liberar memória apenas para objetos quando não há nenhuma referência `strong` à eles.

O ARC automaticamente armazena referências na memória e as removem quando não estão sendo utilizadas. Para saber quais objetos ainda estão em uso, ele rastreia a relação entre objetos aumentando e diminuindo a contagem de referência. A contagem de referência aplica-se apenas às instâncias de `Classes` por serem `Reference Types`.

`Structs` e `Enums` são `Value Types` portanto não são armazenados ou passados por referência. Este é outro motivo para preferir o uso de `Struct`.

Contudo, o ARC não previne que ocorra *memory leak* no código. O mal uso dos tipos de referências do ARC pode causar erro de memória no app. A utilização dos tipos `weak` e `unowned` podem ajudar no funcionamento da memória.

### Reference Counting

Em Ciência da Computação, `Contagem de Referência` é uma técnica para armazenar o número de referências, ponteiros ou identificadores em recursos como objetos, blocos ou memória.

### Funcionamento do ARC

Cada vez que uma instância de classe é criado através do método `init()`, o ARC aloca memória suficiente e armazena os valores das propriedades. Quando a instância não for mais necessária, o método `deinit()` é chamado e o ARC libera o espaço da memória antes alocado.

## Strong, Weak e Unowned 

O gerenciamento de memória em Swift faz o uso de três tipos de referências: `strong`, `weak` e `unowned`.

### Strong

 É basicamente uma referência que tem como propósito proteger um objeto de ser desalocado pelo *ARC*. Para isso o *retain count* é incrementado por 1 em cada instância.

 **Enquanto** o objeto houver uma referência *strong* à ele, este não será removido da memória. Essencialmente esse tipo protege o objeto de ser desalocado da memória enquanto a referência existir.

 O uso de *strong* é tão comum que é a declaração padrão de toda proprieda. Ou seja, quando declarado uma propriedade e não especificado seu tipo esta será *strong*.

 É seguro utilizar *strong* quando a hierarquia do relacionamento dos objetos é <u>linear</u>. Isso quer dizer que, quando a referência é utilizada do Pai para o Filho sempre é correto manter como *strong*.

No exemplo a seguir o objeto `Device` é instanciado e o método `init()` é invocado. Quando o objeto não mais for utilizado o método `deinit()` será chamado (ou seja, o `retain count` será diminuido):

```swift
class Device {
    var name: String

    init(name: String) {
        self.name = name
        print("Device named \(name) allocated")
    }

    deinit {
        print("Device named \(name) deallocated")
    }
}

do {
    let iphone = Device(name: "iPhone")
}

```
A inicialização do objeto `Device` é envolvida em um bloco `do` para que seja criado um escopo em torno dele.

Retorno no console será:

```swift
Device named iPhone allocated
Device named iPhone deallocated
```

Agora no próximo exemplo é utilizado referência entre classes:

```swift
class Device {
    var name: String
    var owner: Owner?

    init(name: String) {
        self.name = name
        print("Device named \(name) allocated")
    }
    deinit {
        print("Device named \(name) deallocated")
    }
}

class Owner {
    var name: String
    var device: Device?

    init(name: String) {
        self.name = name
        print("Owner \(name) allocated")
    }
 
    deinit {
        print("Owner \(name) deallocated")
    }
}
```

Instanciando os objetos:

```swift
let iphone = Device(name: "iPhone")
let felipe = Owner(name: "Felipe")
iphone.owner = felipe
felipe.device = iphone
```

Retorno no console:

```swift
Device named iPhone allocated
Owner Felipe allocated
```

Como podemos ver os métodos `deinit()` não são invocados. Portanto `strong` impede que a contagem de retenções atinja zero para ser desalocado e liberado da memória.

Para resolver esse problema, precisamos de referências `weak`.

### Weak

Diferentemente das referências `strong`, o tipo `weak` **não** protege o objeto de ser desalocado pelo ARC. Ao ser desalocado, a referência `weak` será automaticamente definida para `nil`. Portanto, a instância é removida da memória se nenhum outro objeto tiver uma referência `strong` à instância.

Em Swift, todas as referências `weak` são opcionais não constantes. Isso porque a referência pode e será modificada para zero quando não houver mais nada mantendo uma referência `strong` à ela.

Alterando o mesmo exemplo anterior para utilizar referência do tipo `weak` o objeto instanciado será desalocado:

```swift
class Device {
    ...
    weak var owner: Owner?
    ...
}

class Owner {
    ...
    weak var device: Device?
    ...
}
```

Retorno no console

```swift
Device named iPhone allocated
Owner Felipe allocated

Owner Felipe deallocated
Device named iPhone deallocated
```

Usos mais frequentes de referências `weak` são:

- Propriedades de `delegate`, que geralmente são referenciadas de maneira fraca para evitar ciclos de retenção;

- `Subviews/Controls` de uma `ViewController`, pois essas instâncias já têm referência `strong` para manter a `view` principal.

### Unowned

Referência `unowned` tem o comportamento semelhante ao `weak`. Diferentemente da `weak`, em `unowned` não é necessário ser um `optional`, pois ao ser desalocado a instância não é definida como `nil`. O uso de `unowned` somente é utilizado quando temos certeza que o objeto nunca será nulo. Recomenda-se utilizá-lo quando a referência e o código referenciado forem desalocado ao mesmo tempo da memória.

Como a referência não pode ser opcional, o código de exemplo fica dessa forma:

```swift
class Device {
    var name: String
    unowned var owner: Owner

    init(model: String, owner: Owner) {
        self.name = model
        self.owner = owner
        print("Device named \(name) allocated")
    }

    deinit {
        print("Device named \(name) deallocated")
    }
}

class Owner {
    var name: String
    var device: Device?

    init(name: String) {
        self.name = name
        print("Owner \(name) allocated")
    }

    deinit {
        print("Owner \(name) deallocated")
    }
}
```

Instanciando os objetos:

```swift
var felipe: Owner?

felipe = Owner(name: "Felipe")
felipe!.device = Device(model: "iPhone", owner: felipe!)
```

Veremos que no console os objetos não serão desalocados, pois o `ARC` não definirá o valor de referência para `nil`.

```swift
Owner Felipe allocated
Device named iPhone allocated
```

Quando definido manualmente para `nil` veremos o objeto sendo desalocado:

```swift
felipe = nil
```

```swift
Owner Felipe allocated
Device named iPhone allocated
Owner Felipe deallocated
Device named iPhone deallocated
```