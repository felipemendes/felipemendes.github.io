---
title: "Gerenciamento de Memória"
date: 2019-03-11T21:28:22-02:00
draft: false
---

O gerenciamento de memória utilizado pelo Swift é o chamado [ARC](https://docs.swift.org/swift-book/LanguageGuide/AutomaticReferenceCounting.html) (Automatic Reference Counting ou Contagem Automática de Referência) que foi herdado do ObjC. Em Ciência da Computação, `Contagem de Referência` é uma técnica para armazenar o número de referências, ponteiros ou identificadores em recursos como objetos, blocos ou memória. 

O ARC automaticamente armazena referências na memória e as removem quando não estão sendo utilizadas. Para saber quais objetos ainda estão em uso, ele rastreia a relação entre objetos aumentando e diminuindo a contagem de referência. A contagem de referência aplica-se apenas às instâncias de `Classes` por serem `Reference Types`.

`Structs` e `Enums` são `Value Types` portanto não são armazenados ou passados por referência. Este é outro motivo para preferir o uso de `Struct`.

Contudo, o ARC não previne que ocorra *memory leak* no código. O mal uso dos tipos de referências do ARC pode causar erro de memória no app. A utilização dos tipos `weak` e `unowned` podem ajudar no funcionamento da memória.

### Funcionamento do ARC

Cada vez que uma instância de classe é criado através do método `init()`, o ARC aloca memória suficiente e armazena os valores das propriedades. Quando a instância não for mais necessária, o método `deinit()` é chamado e o ARC libera o espaço da memória antes alocado.

#### Strong, Weak e Unowned 

O gerenciamento de memória em Swift faz o uso de três tipos de referências: `strong`, `weak` e `unowned`.

##### Strong

Referência do tipo `strong` é a declaração padrão de uma propriedade quando nada é informado. Essencialmente esse tipo protege o objeto de ser desalocado da memória **enquanto** a referência existir.

No exemplo a seguir o objeto `Device` é instanciado e os métodos `init()` e `deinit()` são invocados pois o objeto não mais é utilizado:

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
```

Instanciando o objeto

```swift
let iphone = Device(name: "iPhone")
```

Retorno no console

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

Instanciando os objetos
```swift
let iphone = Device(name: "iPhone")
let felipe = Owner(name: "Felipe")
iphone.owner = felipe
felipe.device = iphone
```

Retorno no console

```swift
Device named iPhone allocated
Owner Felipe allocated
```

Como podemos ver os métodos `deinit()` não são invocados, portanto `strong` impede que a contagem de retenções atinja zero para ser desalocado da memória.

#### Weak

Diferente das referências `strong` o tipo `weak` **não** protege o objeto de ser desalocado pelo ARC. Ao ser desalocado, a referência `weak` será automaticamente definida para `nil`. Portanto, a instância é removida da memória se nenhum outro objeto tiver uma referência `strong` à instância.

Alterando o mesmo exemplo anterior para utilizar referência do tipo `weak` o objeto instância será desalocado:

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

Device named iPhone deallocated
Owner Felipe deallocated
```

#### Unowned

Referência `unowned` tem o comportamento semelhante ao `weak`. Diferentemente da `weak`, em `unowned` não é necessário ser um `optional`, pois ao ser desalocado a instância não é definida como `nil`. O uso de `unowned` somente é utilizado quando temos certeza que o objeto nunca será nulo. Recomenda-se utilizá-lo quando a referência e o código referenciado forem desalocado ao mesmo tempo da memória.