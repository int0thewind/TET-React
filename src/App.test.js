import React from 'react';
import { render, screen } from '@testing-library/react';
import App, { PROJECT_NAME } from './App';

test('renders essential webpage element', () => {
    render(<App />);
    expect(screen.getByText(PROJECT_NAME)).toBeInTheDocument();
    expect(screen.getByText('MIDI')).toBeInTheDocument();
    expect(screen.getByText('Hertz')).toBeInTheDocument();
    expect(screen.getByText('Pitch')).toBeInTheDocument();
});
