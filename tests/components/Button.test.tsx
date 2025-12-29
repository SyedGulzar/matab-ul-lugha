import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Button } from '../../components/Button';

describe('Button Component', () => {
    it('should render button with children text', () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByRole('button')).toHaveTextContent('Click Me');
    });

    it('should apply primary variant by default', () => {
        render(<Button>Primary</Button>);
        const button = screen.getByRole('button');
        expect(button.className).toContain('bg-[#4A3728]');
    });

    it('should apply secondary variant styles', () => {
        render(<Button variant="secondary">Secondary</Button>);
        const button = screen.getByRole('button');
        expect(button.className).toContain('bg-[#8D6E63]');
    });

    it('should apply outline variant styles', () => {
        render(<Button variant="outline">Outline</Button>);
        const button = screen.getByRole('button');
        expect(button.className).toContain('bg-transparent');
        expect(button.className).toContain('border-2');
    });

    it('should apply ghost variant styles', () => {
        render(<Button variant="ghost">Ghost</Button>);
        const button = screen.getByRole('button');
        expect(button.className).toContain('bg-transparent');
    });

    it('should show loading spinner when isLoading is true', () => {
        render(<Button isLoading>Loading</Button>);
        const button = screen.getByRole('button');
        const spinner = button.querySelector('svg.animate-spin');
        expect(spinner).toBeInTheDocument();
    });

    it('should be disabled when isLoading is true', () => {
        render(<Button isLoading>Loading</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should display icon when provided', () => {
        const TestIcon = () => <span data-testid="test-icon">★</span>;
        render(<Button icon={<TestIcon />}>With Icon</Button>);
        expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('should not show icon when isLoading is true', () => {
        const TestIcon = () => <span data-testid="test-icon">★</span>;
        render(<Button isLoading icon={<TestIcon />}>Loading</Button>);
        expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
    });

    it('should be disabled when disabled prop is true', () => {
        render(<Button disabled>Disabled</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should call onClick handler when clicked', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click</Button>);
        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', () => {
        const handleClick = vi.fn();
        render(<Button disabled onClick={handleClick}>Click</Button>);
        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('should apply custom className', () => {
        render(<Button className="custom-class">Custom</Button>);
        expect(screen.getByRole('button').className).toContain('custom-class');
    });
});
