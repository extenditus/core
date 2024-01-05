import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { DotcmsLayout } from './DotcmsLayout';

import { mockPageContext } from '../../mocks/mockPageContext';

// Mock the custom hook and components
jest.mock('../../hooks/usePageEditor', () => ({
    usePageEditor: jest.fn().mockReturnValue({ current: [] })
}));

jest.mock('../Row/Row', () => {
    const { forwardRef } = jest.requireActual('react');

    return {
        Row: forwardRef(({ children }, ref) => (
            <div data-testid="mockRow" ref={ref}>
                {children}
            </div>
        ))
    };
});

jest.mock('../PageProvider/PageProvider', () => {
    return {
        PageProvider: ({ children }) => <div data-testid="mockPageProvider">{children}</div>
    };
});

describe('DotcmsLayout', () => {
    it('renders correctly with PageProvider and rows', () => {
        render(<DotcmsLayout entity={mockPageContext} />);
        expect(screen.getAllByTestId('mockRow').length).toBe(
            mockPageContext.layout.body.rows.length
        );
    });
});