---
title: "addTeardownBlock do XCTest"
date: "2020-06-10T13:24:51-02:00"
description: "O addTeardownBlock(_) é um método muito útil por ser executado ao finalizar um teste do framework XCTest. Conforme sua documentação é um bloco de código..."
---

O `addTeardownBlock(_)` é um método muito útil por ser executado ao finalizar um teste do framework `XCTest`. Conforme sua [documentação](https://developer.apple.com/documentation/xctest/xctestcase/2887226-addteardownblock) é um bloco de código de desmontagem a ser executado após o término do método de teste atual.

### Quando utilizar addTeardownBlock(_)

Visto que esse trecho de código é executado ao encerrar um teste podemos realizar diversas validações neste ponto. Uma abordagem comum é quando o teste atual cria algum recurso e precisa ser destruído ao finalizar a execução.

Uma outra alternativa é verificar se há possíveis casos de **memory leaks** nos objetos testados. Pelo fato do `Swift` trabalhar orientado à `callbacks`, ou `completion handlers`, é muito comum nos depararmos com referências cíclicas, ou classes que dependam uma da outra. Com isso, os objetos não serão liberados da memória e um **memory leaks** será criado.

Seguindo esse último exemplo, podemos solucionar o vazamento de memória executando o `addTeardownBlock(_)` para verificar se o **sut** está `nulo`. Da seguinte maneira:

```swift
...
addTeardownBlock { [weak sut] in
   XCTAssertNil(sut)
}
... 
```

Para que seja possível reaproveitar essa verificação em demais testes, podemos criar uma `extension` de `XCTest` com um método para verificar o vazamento de memória de qualquer instância:

```swift
import XCTest

extension XCTestCase {
    func checkMemoryLeak(for instance: AnyObject, file: StaticString = #file, line: UInt = #line) {
        addTeardownBlock { [weak instance] in
            XCTAssertNil(instance, file: file, line: line)
        }
    }
}
```

Os parâmetros `file` e `line` ajudam a exibir a falha direto no método de teste ao invés de apontar o erro no método da nossa extensão. Essa abordagem é útil quando o método `helper` possui algum `assert` de teste.
