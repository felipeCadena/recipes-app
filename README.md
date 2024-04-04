# Recipes APP 🍔 🍹

Neste projeto desenvolvido em grupo, realizamos frontend de uma aplicação utilizando React.js juntamente com ContextAPI para gerenciamento de estados globais. Neste projeto conta com uma tela de login, e após o login feito é possível navegar entre as receitas tanto de comidas quanto bebidas. Neste projeto é possível acessar uma receita e começar a realizar ela, marcando os ingredientes já utilizados, após marcar todos ingredientes você tem a opção de marcar a receita como finalizada assim ficando salva no seu perfil via localStorage.

## Tecnologias Utilizadas:

- TypeScript
- ContextAPI
- Custom Hooks
- Metodologia Kanban 📊
- Styled Components 💅🏻

## Aplicação

### 🪛 Instalação

- Clone o repositório Utilize o comando: git clone git@github.com:felipeCadena/recipes-app.git 
- Faça uma nova Branch a partir da main: git checkout -b nome-da-sua-branch 
- Instale as dependências com npm install 
- Inicialize o projeto com npm run start 
- Acesse o projeto O projeto estará disponível na porta 3001 localhost:3001

### 📋 Requisitos

1 – Desenvolva os testes unitários de maneira que a cobertura seja de, no mínimo, 90%

2 – Crie todos os elementos que devem respeitar os atributos descritos no protótipo para a tela de login

3 – Desenvolva a tela de maneira que a pessoa consiga escrever seu e-mail no input de email e sua senha no input de senha

4 – Desenvolva a tela de maneira que o formulário só seja válido após o preenchimento de um e-mail válido e de uma senha com mais de 6 caracteres

5 – Após a submissão do formulário, salve no localStorage o e-mail da pessoa usuária na chave user

6 – Redirecione a pessoa usuária para a tela principal de receitas de comidas após a submissão e validação com sucesso do login

7 – Implemente o header de acordo com a necessidade de cada tela

8 – Redirecione a pessoa usuária para a tela de perfil ao clicar no botão de perfil

9 – Desenvolva o botão de busca que, ao ser clicado, permita a visualização da barra de busca ou a esconda

10 – Implemente os elementos da barra de busca respeitando os atributos descritos no protótipo

11 – Implemente três radio buttons na barra de busca: Ingredient, Name e First letter

12 – Busque na API de comidas caso a pessoa esteja na página de comidas e na API de bebidas caso a pessoa esteja na de bebidas

13 – Redirecione a pessoa usuária para a tela de detalhes da receita caso apenas uma receita seja encontrada (o ID da receita deve constar na URL)

14 – Caso a busca retorne mais de uma receita, renderize as 12 primeiras encontradas e exiba a imagem e o nome de cada uma delas

15 – Exiba um alert caso nenhuma receita seja encontrada

16 – Implemente o menu inferior posicionando-o de forma fixa e contendo dois ícones: um para comidas e outro para bebidas

17 – Exiba o menu inferior apenas nas telas indicadas pelo protótipo

18 - Redirecione a pessoa usuária para a tela correta ao clicar em cada ícone no menu inferior

19 – Carregue as 12 primeiras receitas de comidas ou bebidas, uma em cada card

20 - Implemente os botões de categoria para serem utilizados como filtro

21 – Implemente o filtro das receitas por meio da API ao clicar no filtro de categoria

22 – Implemente o filtro como um toggle, o qual, se for selecionado novamente, fará o app retornar as receitas sem nenhum filtro

23 – Redirecione a pessoa usuária para a tela de detalhes quando ela clicar no card (a rota da tela deve mudar e sua URL deve conter o ID da receita)

24 – Realize uma request para a API passando o ID da receita que deve estar disponível nos parâmetros da URL

25 – Desenvolva a tela de modo que ela contenha uma imagem da receita, um título, a categoria da receita (em caso de comidas) e se é ou não alcoólica (em caso de bebidas), uma lista de ingredientes (com as quantidades e instruções necessárias), um vídeo do YouTube incorporado e recomendações

26 – Implemente as recomendações (para receitas de comida, a recomendação deverá ser bebida; já para as receitas de bebida, a recomendação deverá ser comida)

27 – Implemente os 6 cards de recomendação, mostrando apenas 2 deles (o scroll é horizontal, similar a um carousel)

28 – Desenvolva um botão de nome "Start Recipe", que deve ficar fixo na parte de baixo da tela o tempo todo

29 – Implemente a solução de forma que, caso a receita já tenha sido feita, o botão "Start Recipe" desapareça

30 – Implemente a solução de modo que, caso a receita tenha sido iniciada mas não finalizada, o texto do botão deve ser "Continue Recipe"

31 – Redirecione a pessoa usuária caso o botão Start Recipe seja clicado (nesse caso, a rota deve mudar para a tela de receita em progresso)

32 – Implemente um botão de compartilhar e um de favoritar a receita

33 – Implemente a solução de forma que, ao clicar no botão de compartilhar, o link de detalhes da receita seja copiado para o clipboard e uma mensagem avisando que ele foi copiado apareça na tela em uma tag HTML

34 – Salve as receitas favoritas no localStorage na chave favoriteRecipes

35 – Implemente o ícone do coração (favorito) de modo que ele fique preenchido caso a receita esteja favoritada e vazio caso contrário

36 – Implemente a lógica no botão de favoritar de modo que, caso ele seja clicado, o ícone de coração mude seu estado atual e, caso esteja preenchido, mude para vazio e vice-versa

37 – Desenvolva a tela de modo que ela contenha uma imagem da receita, um título, a categoria (em caso de comidas) e se é ou não alcoólico (em caso de bebidas), uma lista de ingredientes (com as quantidades e instruções necessárias)

38 – Desenvolva um checkbox para cada item da lista de ingredientes

39 - Implemente uma lógica que ao clicar no checkbox de um ingrediente, o nome dele deve ser "riscado" da lista

40 - Salve o estado do progresso, que deve ser mantido caso a pessoa atualize a página ou volte para a mesma receita

41 - Desenvolva a lógica de favoritar e compartilhar (a lógica da tela de detalhes de uma receita se aplica aqui)

42 - Implemente a solução de modo que o botão de finalizar receita (Finish Recipe) só esteja habilitado quando todos os ingredientes estiverem "checkados" (marcados)

43 - Redirecione a pessoa usuária após ela clicar no botão de finalizar receita (Finish Recipe) para a página de receitas feitas, cuja rota deve ser /done-recipes

44 – Implemente os elementos da tela de receitas feitas respeitando os atributos descritos no protótipo

45 – Desenvolva a tela de modo que, caso a receita do card seja uma comida, ela apresente: foto da receita, nome, categoria, nacionalidade, data em que a pessoa fez a receita, duas primeiras tags retornadas pela API e botão de compartilhar

46 – Desenvolva a tela de maneira que, caso a receita do card seja uma bebida, ela apresente: foto da receita, nome, se é alcoólica, data em que a pessoa fez a receita e botão de compartilhar

47 – Desenvolva a solução de modo que o botão de compartilhar copie a URL da tela de detalhes da receita para o clipboard

48 – Implemente 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros

49 – Redirecione a pessoa usuária para a tela de detalhes da receita caso seja clicado na foto ou no nome da receita

50 – Implemente os elementos da tela de receitas favoritas (cumulativo com os atributos em comum com a tela de receitas feitas) respeitando os atributos descritos no protótipo

51 – Desenvolva a tela de modo que, caso a receita do card seja uma comida, ela apresente: foto da receita, nome, categoria, nacionalidade, botão de compartilhar e botão de desfavoritar

52 – Desenvolva a tela de modo que, caso a receita do card seja uma bebida, ela apresente: foto da receita, nome, se é alcoólica ou não, botão de compartilhar e botão de desfavoritar

53 – Desenvolva a solução de modo que o botão de compartilhar copie a URL da tela de detalhes da receita para o clipboard

54 – Desenvolva a solução de modo que o botão de desfavoritar remova a receita da lista de receitas favoritas do localStorage e da tela

55 – Implemente dois botões que filtrem as receitas por comida ou bebida e um terceiro que remova todos os filtros

56 – Redirecione a pessoa usuária quando ela clicar na foto ou no nome da receita (nesse caso, a rota deve mudar para a tela de detalhes daquela receit

57 – Implemente os elementos da tela de perfil respeitando os atributos descritos no protótipo

58 – Implemente a solução de maneira que o e-mail da pessoa usuária esteja visível

59 – Implemente três botões: um de nome Done Recipes, um de nome Favorite Recipes e um de nome Logout

60 – Redirecione a pessoa usuária de modo que, ao clicar no botão de `Done Recipes, a rota mude para a tela de receitas feitas

61 – Redirecione a pessoa usuária de modo que, ao clicar no botão de Favorite Recipes, a rota mude para a tela de receitas favoritas

62 – Redirecione a pessoa usuária de modo que, ao clicar no botão Logout, o localStorage seja limpo e a rota mude para a tela de login
