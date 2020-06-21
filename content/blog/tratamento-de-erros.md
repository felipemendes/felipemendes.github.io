---
title: "Tratamento de erros"
date: "2019-06-29T14:41:21-02:00"
description: ""
---

É notório que tratamento de erros é uma etapa muito importante no desenvolvimento de software. Um bom tratamento possibilita um retorno relativamente mais amigável para o programador ou usuário. Dessa forma evitamos mensagens de erros padrões geradas pela própria linguagem de programação e exibimos uma informação mais fácil de ser compreendida.

No entanto, muito se vê a utilização da estrutura de condição *IF* para tratamento de erros. O uso dessa condicional torna a manutenção do código muito difícil, pois as validações ficam aninhadas e aumentar a complexidade ciclomática. A melhor alternativa para melhorar a leitura e manutanção é manter as validações em pequenos blocos de código.

A declaração **TRY** é uma ótima recomendação para manter o código mais compreensível.

## Protocolo de erro do Swift

O protoco de erro é apenas um tipo para representar valores de erro que podem ser retornados por uma função ou como inicializador ao utilizar a declaração **TRY**. Em *Swift* é necessário criar um tipo de erro personalizado. Normalmente, um `Enum` é usado em conformidade com o protocolo de erro.

Exemplo de `Enum` básico de erros:

```swift
enum FetchError: Error {
    case url
    case taskError(error: Error)
    case noResponse
    case noData
    case responseStatusCode(code: Int)
    case invalidJson
}
```

### throws e throw

Se uma função ou inicializador deve retornar um erro, o modificador *throws* precisa ser adicionado na sua assinatura, após os parâmetros e o tipo de retorno. Esse modificador é responsável por transmitir o erro da função até o local onde foi executado.

Estrutura de assinatura de método com *throws*:

```swift
func testData() throws -> <Return Type> {
    
}
```

Agora o *throw* é utilizado dentro da função e é responsável por retornar o tipo de error definido. Uma função com ambos ficaria dessa forma:

```swift
func testData() throws {
    if <condition> {
        // Code
    }
    else {
        throw FetchError.noData
    }
}
```

*throw* também é útil dentro da declaração *Guard*. Desta forma se essa validação também retornar um erro podemos invocar um tipo definido no `Enum`:

```swift
guard <condition> else { throw FetchError.noResponse }
```

### do-catch

Diferentemente de algumas linguagens, Swift utiliza a declaração *do-catch* ao invés de *try-catch*. Independentemente da forma que é escrito, toda função que utiliza o modificador *throws* deve ser executada dentro de um tratamento *TRY*, devido a possibilidade de retornar erros.

Portanto, em Swift a execução deve ser feito da seguinte maneira:

```swift
do {
    try testData()
}
catch {
    print("Error: \(error)")
}
```

Quando o bloco *catch* não possui nenhum padrão, *Swift* automaticamente entende que pode ser qualquer erro e cria uma constante local ocultando o valor de retorno com o erro. A melhor maneira neste caso é utilizar o *Enum* de erros aplicado na função e tratar cada tipo que foi criado. Com o *Enum* podemos criar um bloco *catch* para cada tipo.

Ficaria desta forma:

```swift
do {
    try testData()
} catch FetchError.url {
    print("URL can not be reached")
} catch FetchError.taskError(error: Error) {
    print("Task error when fetch data. Message: \(error)")
} catch FetchError.noResponse {
    print("No response on fetch data")
} catch FetchError.noData {
    print("No data available")
} catch FetchError.responseStatusCode(code: Int) {
    print("Error on fetch data. Status code: \(code)")
} catch FetchError.invalidJson {
    print("Invalid JSON returned. Can not be processed")
}
```

### try, try? e try!

*Swift* possui estas três variações do *TRY*:

- *TRY*: maneira mais básica para lidar com funções que podem gerar erros.

- *TRY?*: é utilizado para converter o retorno em um valor opcional. Dessa forma, se ocorrer um erro, a função retornará um valor nulo e o tratamento pode ser feito fora do bloco *do-catch*.

- *TRY!*: é usado para afirmar que o erro não ocorrerá ao invocar a função. O sinal de *exclamação* também tira a obrigatóriedade de utilizar a declaração *do-catch*. Porém deve ser utilizado somente quando tiver certeza absoluta que a função não causará erros, caso contrário a aplicação irá travar. E este é um erro inadmissível durante o desenvolvimento.