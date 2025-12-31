import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Login } from '../../components/Login';

describe('Login Component', () => {
    const mockOnLogin = vi.fn();

    beforeEach(() => {
        mockOnLogin.mockClear();
    });

    it('should render login form with username input', () => {
        render(<Login onLogin={mockOnLogin} />);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your name...')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /enter the school/i })).toBeInTheDocument();
    });

    it('should render the application title', () => {
        render(<Login onLogin={mockOnLogin} />);
        expect(screen.getByText(/Maktab/)).toBeInTheDocument();
        expect(screen.getByText(/Lugha/)).toBeInTheDocument();
    });

    it('should show error for empty username submission', async () => {
        render(<Login onLogin={mockOnLogin} />);

        fireEvent.click(screen.getByRole('button', { name: /enter the school/i }));

        expect(await screen.findByText(/please enter a username/i)).toBeInTheDocument();
        expect(mockOnLogin).not.toHaveBeenCalled();
    });

    it('should show error for whitespace-only username', async () => {
        render(<Login onLogin={mockOnLogin} />);

        fireEvent.change(screen.getByRole('textbox'), { target: { value: '   ' } });
        fireEvent.click(screen.getByRole('button', { name: /enter the school/i }));

        expect(await screen.findByText(/please enter a username/i)).toBeInTheDocument();
        expect(mockOnLogin).not.toHaveBeenCalled();
    });

    it('should show error for invalid username', async () => {
        render(<Login onLogin={mockOnLogin} />);

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'InvalidUser' } });
        fireEvent.click(screen.getByRole('button', { name: /enter the school/i }));

        expect(await screen.findByText(/access denied: invalid username/i)).toBeInTheDocument();
        expect(mockOnLogin).not.toHaveBeenCalled();
    });

    it('should call onLogin callback with valid username', async () => {
        render(<Login onLogin={mockOnLogin} />);

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Admin_141225' } });
        fireEvent.click(screen.getByRole('button', { name: /enter the school/i }));

        expect(mockOnLogin).toHaveBeenCalledWith('Admin_141225');
    });

    it('should accept all valid usernames', () => {
        const validUsernames = ['ZH_Designing', 'AJ_Speaking', 'AR_Learning', 'MS_Looking', 'AH_Coding', 'Admin_141225'];

        validUsernames.forEach((username) => {
            mockOnLogin.mockClear();
            const { unmount } = render(<Login onLogin={mockOnLogin} />);

            fireEvent.change(screen.getByRole('textbox'), { target: { value: username } });
            fireEvent.click(screen.getByRole('button', { name: /enter the school/i }));

            expect(mockOnLogin).toHaveBeenCalledWith(username);
            unmount();
        });
    });

    it('should clear error when user types', async () => {
        render(<Login onLogin={mockOnLogin} />);

        // Submit empty to trigger error
        fireEvent.click(screen.getByRole('button', { name: /enter the school/i }));
        expect(await screen.findByText(/please enter a username/i)).toBeInTheDocument();

        // Type to clear error
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a' } });
        expect(screen.queryByText(/please enter a username/i)).not.toBeInTheDocument();
    });

    it('should have proper label for accessibility', () => {
        render(<Login onLogin={mockOnLogin} />);
        expect(screen.getByLabelText(/identify yourself/i)).toBeInTheDocument();
    });
});
