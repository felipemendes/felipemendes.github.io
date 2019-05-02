---
title: "Template customizado no Xcode"
date: 2019-04-29T12:09:14-02:00
draft: false
---

Xcode possui diversos modelos para criação de novos arquivos. Cada modelo é um padrão de estrutura criado pela Apple. E também é possível criar uma estrutura customizada que melhor adapta ao seu estilo de desenvolvimento. Este post mostra como criar seu próprio modelo.

Para projetos que seguem o padrão de arquitetura MVC sempre defino uma estrutura para minhas classes do tipo Controller. Portanto, vou utilizar este exemplo para criação de um novo modelo, mas pode ser criado para qualquer situação.

### Criando um modelo

Para criar um novo modelo é necessário fazer uma cópia de uma estrutura existente. Irei utilizar a estrutura do template `Swift File` por possuir menos informação e ser suficiente para próximos modelos.

O Xcode procura por modelos customizados no diretório `~/Library/Developer/Xcode/Templates`. Primeiro crie pelo terminal um diretório para armazenar todos os novos modelos:
```
$ mkdir -p ~/Library/Developer/Xcode/Templates/Custom
```

Em seguida, copiar o template `Swift File` para o diretório criado acima. No final do comando incluir o nome do modelo, neste caso está como `Controller File`:
```
$ cp -R /Applications/Xcode.app/Contents/Developer/Library/Xcode/Templates/File\ Templates/Source/Swift\ File.xctemplate/ ~/Library/Developer/Xcode/Templates/Custom/Controller\ File.xctemplate
```

No diretório dos novos templates agora aparecerá a pasta `Controller File.xctemplate` com os seguintes arquivos:
```
~/Library/Developer/Xcode/Templates/Custom/Controller\ File.xctemplate
├── TemplateIcon.png
├── TemplateIcon@2x.png
├── TemplateInfo.plist
└── ___FILEBASENAME___.swift
```

Com a estrutura copiada é necessário alterar o conteúdo do arquivo `___FILEBASENAME___.swift`. Basta abrir o arquivo em qualquer editor de texto. Utilizando o VIM:
```
$ vim ~/Library/Developer/Xcode/Templates/Custom/Controller\ File.xctemplate/___FILEBASENAME___.swift
```

Abaixo a estrutura que utilizo nos Controllers. Gosto de manter o cabeçalho do arquivo, se necessário remover basta excluir a chamada `//___FILEHEADER___`. Da mesma forma a chamada `___FILEBASENAMEASIDENTIFIER___` para formatar o nome da classe com o mesmo nome do arquivo:
```swift
//___FILEHEADER___

import UIKit

class ___FILEBASENAMEASIDENTIFIER___: UIViewController {

    // MARK: - Properties

    // MARK: - Init

    override func viewDidLoad() {
        super.viewDidLoad()
        configureViewComponents()
    }

    // MARK: - Selectors

    // MARK: - Helpers

    func configureViewComponents() {
        view.backgroundColor = .white
    }
}
```

A partir de agora ao criarmos um novo arquivo no Xcode o novo modelo será apresentado na sessão `Custom`:

![Template customizado no Xcode](xcode-templates-customizados.png)

E com o seguinte conteúdo:

![Conteúdo Template customizado](conteudo-template-customizado.png)
