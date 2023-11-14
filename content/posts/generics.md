---
title: "Programação genérica"
date: "2020-10-29T12:02:10-02:00"
description: "Nesta postagem abordo o que são códigos genéricos e qual a utilidade na rotina de um desenvolvedor Swift."
---

Nesta postagem abordo o que são códigos genéricos e qual a utilidade na rotina de um desenvolvedor Swift.

## O que são códigos genéricos?

A melhor definição de genéricos (ou `generics`) é a que encontramos no nosso dicionário: **Que abarca muitas coisas gerais (ao mesmo tempo)**. Em programação, o conceito não é diferente. `Generic` é utilizado para escrever funções e tipos flexíveis e reutilizáveis que pode funcionar com qualquer tipo, sujeito aos requisitos definidos.

Essa abordagem permite escrever código onde os tipos são especificados posteriormente, quando são instanciados. O maior benefício é reduzir a duplicação e expressar sua intenção de maneira clara e abstrata.

Deste modo, ao invés de criar uma função ou bloco de código que atenda cada tipo, como `String` ou `Int`, podemos especificar um tipo genérico que atenda qualquer situação. Assim deixamos a própria linguagem inferir o tipo com base no valor informado. O termo `Generic` também pode ser conhecido como tipo `placeholder`.

`Swift` é considerada uma linguagem `type-safe`. Isso significa que, **o tipo deve ser definido antes da compilação**. Por esse motivo, todo tipo deve ser definido.

## Criando código genérico

Uma função genérica em Swift possui um tipo reservado (um `placeholder`) antes de seu nome e entre sinais menor e maior. Dessa forma: `<Tipo>`.

Os parâmetros também devem receber o mesmo tipo reservado.

Este tipo reservado, normalmente, é identificado pelas letras `T`, `U`, `V` e entre outras.

## Entendendo com exemplos

Utilizando o exemplo clássico, vamos supor que precisamos trocar dois valores numéricos, entre `a` e `b`. Para reproduzir a criação dessa função, devemos receber dois parâmetros do tipo inteiro. Especificando o tipo `Int` teríamos algo como:

```swift
func swapTwoInts(a: Int, b: Int) -> (Int, Int) {
  return (b, a)
}

swapTwoInts(a: 1, b: 2) // (2, 1)
```

Agora vamos supor que seja necessário trocar dois números de ponto flutuante (`Double`) ou mesmo textos (`String`). Nesta situação, precisaríamos escrever outra função para esta tarefa, pois a função acima aceita apenas a entrada de números inteiros.

Convertendo a mesma função para o tipo genérico, teríamos o código abaixo com o mesmo comportamento:

```swift
func swapTwoValues<T>(a: T, b: T) -> (T, T) {
  return (b, a)
}

swapTwoValues(a: 10.5, b: 12.8)         // (12.8, 10.5)
swapTwoValues(a: "Hello", b: "World")   // ("World", "Hello")
```

Assim é possível trocar qualquer tipo de valor, não será necessário escrever outras funções para cada situação.

> Vale lembrar que não é possível informar tipos diferentes nos parâmetros ao invocar a mesma função genérica.

## Restringindo o tipo genérico

Códigos genéricos também são muito utilizados para restringir instâncias somente para tipos de possuem alguma conformidade, com `class` ou `protocol`, por exemplo.

### Conformidade com classe

No código a seguir, `T` está em conformidade com o tipo `BankAccount`. Portanto, não é possível invocar a função `displayBankAccount()` com nenhum outro valor que não seja do tipo `BankAccount`.

```swift
class BankAccount {
  var holder: String
  var number: Int

  init(holder: String, number: Int) {
    self.holder = holder
    self.number = number
  }
}

func displayBankAccount<T: BankAccount>(for account: T) -> String {
  return "\(account.number) account belongs to \(account.holder)"
}

var myBankAccount = BankAccount(holder: "Felipe", number: 12345678)

displayBankAccount(for: myBankAccount) // 12345678 account belongs to Felipe
```

Da mesma forma que aplicamos esse comportamento nos métodos, também é possível deixar o Swift inferir o tipo de uma `class` ou `struct` e suas propriedades.

O código genérico permite ao Swift inferir o tipo ou ao desenvolvedor preestabelecer essa informação. A `struct` abaixo pode ser instanciada de duas maneiras:

```swift
struct GenericStruct<T> {
  var property: T?
}
```

```swift
let explictStruct = GenericStruct<Bool>()         // T is Bool
let implicitStruct = GenericStruct(property: 10)  // T is Int
```

### Conformidade com protocolo

No exemplo abaixo estamos restringindo a função `compareValues()` somente para os tipos que conformam com o protocolo [Equatable](https://developer.apple.com/documentation/swift/equatable).

```swift
func compareValues<T: Equatable>(between a: T, and b: T) -> String {
  return a == b ? "They are equals" : "They aren't equals"
}

compareValues(between: 2, and: 3)         // They aren't equals
compareValues(between: "Hi", and: "Hi")   // They are equals
```

## Protocolos genéricos

Protocolos por si só possibilitam inúmeras implementações, por isso é tão utilizado e difundido entre desenvolvedores `Swift`. E com o uso de `generics`, podemos ampliar ainda mais este conceito. Utilizando a técnica de `associated type` e da cláusula `where` podemos criar protocolos genéricos e fazer restrições por tipo, semelhante aos `placeholders` dos genéricos.

Visto que, protocolos genéricos fazem uso de `associated types`, este conceito também é conhecido como `Protocol Associated Types` ou `PATs`.

### Uso convencional de protocolo

Antes de aprofundar sobre protocolo genérico, vamos criar um protocolo que nos obriga a adicionar uma propriedade do tipo `String`.

A criação do protocolo seria dessa maneira:

```Swift
protocol MyProtocol {
  var property: String { get set }
}
```

E uma classe em conformidade com este protocolo seria assim:

```Swift
class MyClass: MyProtocol {
  var property: String = "Property value"
}
```

Para aplicar o conceito de `generics` na nossa propriedade e permitir informar qualquer outro tipo diferente de `String`, podemos fazer o uso de `associated types`.

### Protocolos com `Associated Types`

Em protocolos genéricos, a solução de `placeholder` ou algo como `<T>` é relativo à `associated type`:

```Swift
protocol MyGenericProtocol {
  associatedtype T

  var property: T { get set }
}
```

Dessa maneira, para que uma `class` ou `struct` se conforme com o protocolo será necessário, além de implementar a propriedade, definir o seu tipo. Está definição pode ser feita de forma `implícita` ou `explícita`.

#### `Associated Type` implícito

De forma implícita, ou seja, que fica subentendido pelo compilador:

```Swift
class MyClass: MyGenericProtocol {
  var property = true // T is `Bool`
}
```

#### `Associated Type` explícito

De forma explícita, devemos utilizar um `typealias` para especificar o tipo desejado:

```Swift
class MyClass: MyGenericProtocol {
  typealias T = String
  var property: T = "My generic property" // T is `String`
}
```
