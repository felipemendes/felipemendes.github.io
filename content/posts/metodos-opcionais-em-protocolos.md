---
title: "Métodos opcionais em Protocolos"
date: "2020-06-25T08:26:12-02:00"
description: ""
---

Você provavelmente já utilizou algum protocolo e após conformar sua classe percebeu que alguns métodos não foram obrigatórios mas mesmo assim não houve nenhum erro? Esse comportamento é comumente encontrado nos protocolos de `UITableView`. Por exemplo, o `UITableViewDataSource` exige apenas que dois métodos sejam implementados, que são:

 ```swift
func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell
 ```

 Os demais métodos podem ser utilizados conforme necessidades da `table`.

 ## Declarando métodos opcionais

 Para criar esse comportamento é necessário informar, explicitamente, quais métodos podem ser omitidos. Há duas maneiras de reproduzir esse procedimento:

 - Utilizar as palavras reservadas `@objc` e `optional`
 - Extender o protocolo e criar implementação vazia do método

 ### Com `optional`

O prefixo `@objc` informa que esse código está disponível também para Objective-C:

```swift
@objc protocol SomeProtocol {
    func requiredMethod()
    @objc optional func optionalMethod()
}

class SomeClass: SomeProtocol {
    func requiredMethod() {

    }
}
```

### Com `extension`

Alternativa totalmente em Swift:

```swift
protocol SomeProtocol {
    func requiredMethod()
    func optionalMethod()
}

extension SomeProtocol {
    func optionalMethod() {
        
    }
}

class SomeClass: SomeProtocol {
    func requiredMethod() {

    }
}
```