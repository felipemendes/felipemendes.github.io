---
title: "Multiple Variadic Parameters"
date: "2021-10-21T14:20:30-02:00"
description: ""
---

O termo "variádico" refere-se à capacidade de uma função ou método lidar com um número variável de argumentos. Em linguagens de programação, isso significa que a função pode ser chamada com diferentes quantidades de argumentos, e ela consegue adaptar-se dinamicamente a esses inputs.

No contexto de Swift e de outras linguagens, um parâmetro variádico é marcado com reticências (...). Ele permite que a função aceite zero ou mais valores do mesmo tipo como argumentos. Dentro da função, esses argumentos são tratados como uma coleção, como um array.

Portanto, na linguagem Swift, os parâmetros variádicos são uma maneira eficaz de lidar com uma quantidade variável de argumentos/parâmetros em uma função. 

Felizmente, Swift permite que você tenha mais de um parâmetro variádico na mesma função. Isso oferece uma flexibilidade significativa ao lidar com diferentes tipos de argumentos e simplifica a chamada de funções. Por exemplo:

```swift
func sum(_ numbers: Int..., _ otherNumbers: Int...) -> Int {
    let sumNumbers = numbers.reduce(0, +)
    let sumOtherNumbers = otherNumbers.reduce(0, +)
    return sumNumbers + sumOtherNumbers
}

let total = sum(1, 2, 3, 4, 5, 6, 7, 8)
```

Neste exemplo, a função soma aceita dois conjuntos de parâmetros variádicos, `numbers` e `otherNumbers`, e retorna a soma total de ambos.

Além disso, é interessante observar que outras linguagens, como Python, compartilham uma característica semelhante. Em Python, você pode usar o operador `*` para definir parâmetros variádicos em uma função, permitindo que ela aceite um número variável de argumentos, como mostrado no exemplo a seguir:

```python
def sum_numbers(*numbers):
    result = sum(numbers)
    return result

total = sum_numbers(1, 2, 3, 4, 5)
```

Em resumo, tanto em Swift quanto em Python, a capacidade de usar múltiplos parâmetros variádicos em funções oferece versatilidade na criação de funções que podem lidar com diferentes quantidades de argumentos. Isso é uma ferramenta poderosa para simplificar o código e torná-lo mais eficiente, seja no desenvolvimento de aplicativos iOS e macOS com Swift ou em várias aplicações com Python.