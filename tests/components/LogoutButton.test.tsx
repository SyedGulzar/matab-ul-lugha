import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { LogoutButton } from '../../components/LogoutButton';

describe('LogoutButton Component', () => {
    const mockOnLogout = vi.fn();

    it('should render logout button', () => {
        render(<LogoutButton onLogout={mockOnLogout} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should have title attribute for accessibility', () => {
        render(<LogoutButton onLogout={mockOnLogout} />);
        expect(screen.getByRole('button')).toHaveAttribute('title', 'Logout');
    });

    it('should call onLogout when clicked', () => {
        render(<LogoutButton onLogout={mockOnLogout} />);
        fireEvent.click(screen.getByRole('button'));
        expect(mockOnLogout).toHaveBeenCalledTimes(1);
    });

    it('should render door icons', () => {
        render(<LogoutButton onLogout={mockOnLogout} />);
        // Check that SVG elements are present (door icons from lucide-react)
        const button = screen.getByRole('button');
        const svgs = button.querySelectorAll('svg');
        expect(svgs.length).toBeGreaterThan(0);
    });

    it('should have LOGOUT label text', () => {
        render(<LogoutButton onLogout={mockOnLogout} />);
        expect(screen.getByText('LOGOUT')).toBeInTheDocument();
    });
});
