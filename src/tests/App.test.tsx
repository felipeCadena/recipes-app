// describe('Verifica se a Rota "/" não possui header', () => {
//   it('Deve renderizar o componente Login na rota "/"', () => {
//     renderWithRouter(<App />, { route: '/' });

//     // Verifica se o componente Login está presente
//     const loginTitle = screen.getByRole('heading', { name: /login/i });
//     expect(loginTitle).toBeInTheDocument();

//     // Verifica se o header não está presente na rota "/"
//     const header = screen.queryByRole('banner');
//     expect(header).not.toBeInTheDocument();
//   });
// });

// describe('Verifica se a Rota "/meals" tem o header correto', () => {
//   it('Deve renderizar o header com o título "Meals" e os ícones de perfil e pesquisa', () => {
//     renderWithRouter(<App />, { route: '/meals' });

//     // Verifica se o header está presente
//     const header = screen.getByRole('banner');
//     expect(header).toBeInTheDocument();

//     // Verifica se o título da página é "Meals"
//     const pageTitle = screen.getByTestId('page-title');
//     expect(pageTitle).toBeInTheDocument();
//     expect(pageTitle).toHaveTextContent('Meals');

//     // Verifica se o ícone de perfil está presente
//     const profileIcon = screen.getByTestId('profile-top-btn');
//     expect(profileIcon).toBeInTheDocument();

//     // Verifica se o ícone de pesquisa está presente
//     const searchIcon = screen.getByTestId('search-top-btn');
//     expect(searchIcon).toBeInTheDocument();
//   });
// });
