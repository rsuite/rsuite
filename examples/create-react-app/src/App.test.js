import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders the RSuite example and switches the theme with the keyboard', async () => {
  const user = userEvent.setup();
  render(<App />);

  expect(screen.getByRole('heading', { name: 'Welcome to React Suite' })).toBeInTheDocument();
  const theme = screen.getByRole('switch', { name: 'Light theme' });
  expect(theme).not.toBeChecked();
  expect(document.body).toHaveClass('rs-theme-dark');

  await user.tab();
  expect(theme).toHaveFocus();
  await user.keyboard('[Space]');
  expect(theme).toBeChecked();
  expect(document.body).toHaveClass('rs-theme-light');

  await user.keyboard('[Space]');
  expect(theme).not.toBeChecked();
  expect(document.body).toHaveClass('rs-theme-dark');
});
