import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroCard from './index';


describe('HeroCard', () => {
  test('renders HeroCard with title', () => {
    render(<HeroCard backgroundPath="abc.png" title="deadpool" />);
    const heroCardLabel = screen.getByText(/deadpool/);
    expect(heroCardLabel).toBeInTheDocument();
  });

  test('renders HeroCard with correct image', () => {
    const backgroundPath = "abc.png";
    const title = "deadpool"
    render(<HeroCard backgroundPath={backgroundPath} title={title} />);
    const image = screen.getByAltText(title);
    expect(image).toHaveAttribute('src', backgroundPath)
  });
})
  
