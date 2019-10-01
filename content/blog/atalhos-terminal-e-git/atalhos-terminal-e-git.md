---
title: "Atalhos de Terminal e Git"
date: 2019-09-30T20:46:53-02:00
draft: false
---


Fato notório que o uso de *terminal* é indispensável para muitos programadores. Seja para o gerenciamento de versão dos projetos ou tarefas rotineiras passamos muito tempo com o interpretador de comandos aberto no nosso dia a dia.

Afim de reduzir o tempo de digitação de comandos nada melhor do que utilizar os famosos *Shell Aliases*. *Alias* é um pseudônimo ou simplemente um *atalho* para comandos ou scripts mais complexos.

Por exemplo, um comando muito comum é o `ls -a` que serve para listar todo tipo de arquivo do diretório. Você pode facilmente criar um atalho para esse comando: `la`.

Sistemas operacionais baseados no *Unix* possuem alguns *aliases* já criados. Você pode visualizá-los digitantando `alias` sem nenhum parâmetro no terminal.

Para facilitar a minha rotina de desenvolvimento criei um conjunto de atalhos e funções do *Bash* para acelerar meu fluxo de trabalho e economizar centenas de teclas diárias.

Este *post* tem como propósito em apenas listar armazenar meus *alisases* e comandos úteis. Para criação de atalhos do *Git* recomendo a [documentação oficial](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases).

Git Alias:

* **ac** = !git add -A && git commit -m
* **bump** = commit -m 'Bump version number'
* **minor** = commit -m 'Make minor changes'
* **open** = remote -v | awk '/origin.*push/ {print $2}' | xargs open
* **save** = !git add -A && git commit -m 'SAVEPOINT'
* **search** = !f() { git log -S "$@"; }; f
* **amend** = commit -a --amend
* **df** = diff
* **as** = add -u
* **po** = push origin
* **co** = checkout
* **cob** = checkout -b
* **cm** = commit -m
* **st** = status
* **stb** = status -sb
* **tags** = tag -l
* **undo** = reset HEAD~1 --mixed
* **branches** = branch -a
* **remotes** = remote -v
* **br** = branch
* **hist** = log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short
* **type** = cat-file -t
* **dump** = cat-file -p
* **alias** = ! git config --get-regexp ^alias\. | sed -e s/^alias\.// -e s/\ /\ =\ /
* **1** = 'cd -'
* **2** = 'cd -2'
* **3** = 'cd -3'
* **4** = 'cd -4'
* **5** = 'cd -5'
* **6** = 'cd -6'
* **7** = 'cd -7'
* **8** = 'cd -8'
* **9** = 'cd -9'
* **_** = sudo
* **afind** = 'ack -il'
* **d** = 'dirs -v | head -10'
* **globurl** = 'noglob urlglobber '
* **grep** = 'grep  --color=auto --exclude-dir={.bzr,CVS,.git,.hg,.svn}'
* **history** = omz_history
* **l** = 'ls -lah'
* **la** = 'ls -lAh'
* **ll** = 'ls -lh'
* **ls** = 'ls -G'
* **lsa** = 'ls -lah'
* **md** = 'mkdir -p'
* **please** = sudo
* **rd** = rmdir
* **run** - help=man
* **which** - command=whence

Para aumentar a produtividade no desenvolvimento utilize frequentementes os seguintes atalhos no *Terminal* e *[VIM](https://www.vim.org/)*:

Terminal:

* **ctrl+A** = moves to start of line
* **ctrl+E** = moves to end of line
* **ctrl+B** = moves back one character
* **ctrl+F** = moves forward one character
* **ctrl+U** = deletes from cursor to start of line
* **ctrl+K** = deletes from cursor to end of line
* **ctrl+W** = deletes from cursor to beginning of current word
* **cmd+shift+v** = copy the highlighted text and paste into cursor position

VIM:

* **0** = move to the beginning of the line
* **$** = move to the end of the line
* **G** = move to the end of the file
* **gg** = move to the beginning of the file
* **W** = move forward one word (delimited by a white space)
* **B** = move backward one word (delimited by a white space)
* **A** = Insert text at the end of the line
* **o** = Begin a new line below the cursor
* **O** = Begin a new line above the cursor
* **dd** = delete line
* **3dd** = delete three lines
* **u** = undo the last operation
* **Ctrl+r** = redo the last undo