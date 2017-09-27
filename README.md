# The Chick :hatching_chick:
CLI to create and configure modules to ERP - Tijuca Alimentos

## Binary
```sh
$ tiju
```
or

```sh
$ chick
```


## List of commands

| Command | Description |
| ------ | ------ |
| iniciar | criar novo módulo com os arquivos padrões necessários (boilerplate) |
| criar | criar novos itens para o módulo como, sub módulos, views ou boilerplate para ajax |
| status | mostra as informações sobre o módulo |
| ajuda | mostrar instruções de como usar determinado comando |

## Dictionary of commands
### iniciar

```sh
$ tiju iniciar <module-name>
```
#### Example

```sh
$ tiju iniciar myModule
```

### criar

* OBS: item = template || sub-modulo
* [type] to item = template:   (empty), form, dataTable, formTable
* [type] to item = sub-modulo: (empty), crud
  
```sh
$ tiju criar <item> <name> [type]
```

#### Example

```sh
$ tiju criar template myNewTemplate form
```

```sh
$ tiju criar sub-modulo mySub crud
```

### status

```sh
$ tiju status
```

### ajuda

```sh
$ tiju ajuda <command>
```
#### Example

```sh
$ tiju ajuda iniciar
```
