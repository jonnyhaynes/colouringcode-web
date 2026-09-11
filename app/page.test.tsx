import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './page';

describe('Home page', () => {
  it('renders the hero copy', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Want more?');
    expect(
      screen.getByText('Award-winning pixel-crafting for the digital world.')
    ).toBeInTheDocument();
  });

  it('keeps the live contact details intact', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: '+44 (0) 7460 843016' })).toHaveAttribute(
      'href',
      'tel:+447460843016'
    );
    expect(screen.getByRole('link', { name: 'team@colouringcode.com' })).toHaveAttribute(
      'href',
      'mailto:team@colouringcode.com'
    );
  });
});
