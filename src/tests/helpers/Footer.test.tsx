import { fireEvent, screen } from '@testing-library/react';
import Footer from '../../components/Footer';
import { renderWithRouter } from './renderWithRouter';

describe('Implement the bottom menu', () => {
  it('renders Footer component with correct icons and links', () => {
    renderWithRouter(<Footer />);
    const footerElement = screen.getByTestId('footer');
    const mealIconElement = screen.getByTestId('meals-bottom-btn');
    const drinkIconElement = screen.getByTestId('drinks-bottom-btn');

    expect(footerElement).toBeInTheDocument();
    expect(mealIconElement).toBeInTheDocument();
    expect(drinkIconElement).toBeInTheDocument();
  });

  it('Footer component is fixed at the bottom', () => {
    renderWithRouter(<Footer />);

    const footerElement = screen.getByTestId('footer');

    expect(footerElement).toHaveStyle('position: fixed');
    expect(footerElement).toHaveStyle('bottom: 0');
  });

  it('Footer is displayed on specified routes', () => {
    renderWithRouter(<Footer />);

    expect(screen.queryByTestId('footer')).toBeInTheDocument();
    expect(screen.queryByTestId('footer')).toBeVisible();

    fireEvent.click(screen.getByTestId('drinks-bottom-btn'));
    expect(screen.queryByTestId('footer')).toBeInTheDocument();
    expect(screen.queryByTestId('footer')).toBeVisible();
    fireEvent.click(screen.getByTestId('meals-bottom-btn'));
    expect(screen.queryByTestId('footer')).toBeInTheDocument();
    expect(screen.queryByTestId('footer')).toBeVisible();
  });
});
