---
title: "Optionals"
date: 2019-02-07T12:24:21-02:00
draft: false
---

Em Swift, *Optional* (ou para muitos, apenas os sinais `?` e `!`) é uma solução segura para acessar valores não existentes. Conforme a documentação da Apple, *Optional* é um tipo que representa um valor empacotado (*wrapped*) ou nulo (*nil*, ausência de um valor).

*Optional* é basicamente um *enum* e essencialmente se parece com isso

```swift
enum Optional<T> {
    case none
    case some<T>
}
```

Onde *T* é um tipo genérico como Array ou Dicionário. Mas o tipo *Optional* é tão importante que possui muitas sintaxes especiais que outros tipos não possuem. Algumas são:

- O *case* sem valor recebe a palavra reservada **nil**
- O sinal `?` é utilizado para declarar um *Optional*
- O sinal `!` serve para desembrulhar (*unwrap*) o valor associado

### Forced Unwrapping

Neste desempacotamento (*unwrap*) o sinal `!` é utilizado diretamente para recuperar o valor associado. Não há nenhum tipo de validação para assegurar que o valor realmente existe. Basicamente, estamos dizendo que temos certeza que há algo para ser extraído. Esse é o método não seguro e não recomendado, uma vez que a variável pode estar vazia e um erro fatal será exibido e o aplicativo será fechado. Este é um erro admissível.

```swift
    var driverLicense: Int? // declara a variável
    driverLicense! // retorna erro

    driverLicense = 1234 // associa valor
    driverLicense! // retorna 1234
```

### Optional Binding

Diferente do `Forced Unwrapping` o `Optional Binding` é a forma mais eficaz e segura para extrair o valor de uma variável ou constante. Permite verificar se o *optional* contém valor antes de utilizá-lo. Quando há valor este pode ser utilizado temporariamente dentro da declaração.

A verificação pode ser feita utilizando qualquer declaração condicional. O `Optional Binding` é mais recomendado que os demais métodos.

```swift
    let hello: String? = "Hello"
    
    switch hello {
        case .some(let data): print(data)
        case .none: // retorna erro
    }
```

##### Utilizando declaração **if**

```swift
    if let greeting = hello {
        print(greeting)
    } else {
        // retorna erro
    }
```

Caso necessário alterar o valor consultado dentro da declaração pode-se utilizar o **if var**

```swift
    if var greeting = hello {
        print(greeting) // retorna *"Hello"*
        greeting = "Olá" // altera valor da variável
        print(greeting) // retorna *"Olá"*
    } else {
        // retorna erro
    }
```

Tanto com *if let* quanto *if var* o valor somente existe dentro do escopo da declaração. Portanto sua mudança não tem efeito fora do bloco de validação. A alternativa para armazenar o valor extraído e ainda utilizá-lo fora do escopo é substituir a sintaxe *if* para *guard*.

##### Utilizando declaração **guard**

A declaração `guard` é simples e muito poderosa. Ela realiza verificação da condição e, se o valor for *nil*, a instrução `else` será executada e sairá do método. Se houver valor a informação desembrulhada é armazenada e pode ser acessar diretamente sem a necessidade de um novo *unwrap*.

```swift
    guard let greeting = hello else { return }

    print(greeting)
```

Da mesma forma do *if var* podemos substituir por *guard var* quando é necessário alterar valor *unwrapped*.

```swift
    guard var greeting = hello else { return }

    print(greeting) // retorna *"Hello"*
    greeting = "Olá"
    print(greeting) // retorna *"Olá"*
```

### Implicitly Unwrapped Optionals

`Implicitly Unwrapped Optional` é outra forma de desembrulhar valores. Apenas use o sinal `!` após o tipo da declaração. Este método é utilizado quando temos certeza que o `optional` possui valor, neste caso não teria necessidade de desembrulhá-lo sempre que for acessá-lo.

Ao acessar a variável/constante utilizando a forma implícita, mesmo que não tenha nenhum valor atribuído, o retorno será bem-sucedido. Mas cuidado, se tentarmos manipular essa informação invocando algum método, por exemplo, o retorno será um erro fatal.

```swift
    var greeting: String!
    print(greeting) // retorna *nil*
    print(greeting.count) // FATAL ERROR. Terminated by signal 4
```

### Nil Coalescing

Maneira de definir um valor padrão quando o *Optional* for *nil*. Há algumas formas de fazer esta ação como **declaração condicional** e **operador ternário**. Mas o *Nil Coalescing* nos permite encurtar isso ainda mais com os sinais `??`.

```swift
    var x: String?
    x = "Testing"
    let y = x ?? "foo"
    print(y)
```

Dessa forma o método *print* retornará *"Testing"*. Se a variável *x* não houvesse valor associado o *print* retornaria *"foo"*.

### Optional Chaining

`Optional Chaining` é o recurso que permite chamar propriedades e métodos em um *Optional* que pode ser nulo. Ao contrário do `Implicitly Unwrapped`, o `Optional Chaining` não retorna um erro fatal quando o valor é nulo.

```swift
    class Person {
        var residence: Residence?
    }

    class Residence {
        var numberOfRooms = 1
    }

    let john = Person()

    let roomCount = john.residence!.numberOfRooms // FATAL ERROR. Terminated by signal 4

    if let roomCount = john.residence?.numberOfRooms {
        print("John's residence has \(roomCount) room(s).")
    } else {
        print("Unable to retrieve the number of rooms.") // retorna aqui
    }
```

Visualmente esta é a melhor forma de *unwrap* e também recomendada.
