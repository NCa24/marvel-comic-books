import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchHero from './index';

describe('SearchHero', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  })
  afterEach(() => {
    jest.useRealTimers();
  })
  test('onChange triggers after 500ms done writing', async() => {
    const onChangeMock = jest.fn();
    render(<SearchHero onChange={onChangeMock} />);
    const input = screen.getByLabelText('search-hero-input');
    userEvent.type(input, 'deadpool');
    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledWith('deadpool');
    }, {
      timeout: 501
    })
  });
})
