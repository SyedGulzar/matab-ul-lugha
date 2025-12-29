import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { QuestionCard } from '../../components/QuestionCard';
import { Question, QuestionType } from '../../types';

const createMultipleChoiceQuestion = (overrides = {}): Question => ({
    id: 1,
    type: QuestionType.MULTIPLE_CHOICE,
    questionText: 'Which sentence is correct?',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 'Option A',
    explanation: 'Option A is correct because...',
    ...overrides,
});

const createFillInBlankQuestion = (overrides = {}): Question => ({
    id: 2,
    type: QuestionType.FILL_IN_BLANK,
    questionText: 'Complete: The cat ___ on the mat.',
    correctAnswer: 'sat',
    explanation: 'The past tense of sit is sat.',
    ...overrides,
});

describe('QuestionCard Component', () => {
    const mockOnAnswer = vi.fn();

    beforeEach(() => {
        mockOnAnswer.mockClear();
    });

    describe('Multiple Choice Questions', () => {
        it('should render question text', () => {
            render(<QuestionCard question={createMultipleChoiceQuestion()} onAnswer={mockOnAnswer} />);
            expect(screen.getByText('Which sentence is correct?')).toBeInTheDocument();
        });

        it('should render all options', () => {
            render(<QuestionCard question={createMultipleChoiceQuestion()} onAnswer={mockOnAnswer} />);
            expect(screen.getByText('Option A')).toBeInTheDocument();
            expect(screen.getByText('Option B')).toBeInTheDocument();
            expect(screen.getByText('Option C')).toBeInTheDocument();
            expect(screen.getByText('Option D')).toBeInTheDocument();
        });

        it('should call onAnswer with correct parameters when option is selected', () => {
            render(<QuestionCard question={createMultipleChoiceQuestion()} onAnswer={mockOnAnswer} />);

            fireEvent.click(screen.getByText('Option A'));
            expect(mockOnAnswer).toHaveBeenCalledWith(1, 'Option A', true);
        });

        it('should call onAnswer with isCorrect=false for wrong answer', () => {
            render(<QuestionCard question={createMultipleChoiceQuestion()} onAnswer={mockOnAnswer} />);

            fireEvent.click(screen.getByText('Option B'));
            expect(mockOnAnswer).toHaveBeenCalledWith(1, 'Option B', false);
        });

        it('should show saved answer state when provided', () => {
            render(
                <QuestionCard
                    question={createMultipleChoiceQuestion()}
                    onAnswer={mockOnAnswer}
                    savedAnswer={{ answer: 'Option A', isCorrect: true }}
                />
            );
            // The component shows a "Read Explanation" button when answered
            expect(screen.getByText(/read explanation/i)).toBeInTheDocument();
        });
    });

    describe('Fill in the Blank Questions', () => {
        it('should render question text', () => {
            render(<QuestionCard question={createFillInBlankQuestion()} onAnswer={mockOnAnswer} />);
            expect(screen.getByText(/Complete: The cat .* on the mat/)).toBeInTheDocument();
        });

        it('should render input field for answer', () => {
            render(<QuestionCard question={createFillInBlankQuestion()} onAnswer={mockOnAnswer} />);
            expect(screen.getByRole('textbox')).toBeInTheDocument();
        });

        it('should call onAnswer when form is submitted', () => {
            render(<QuestionCard question={createFillInBlankQuestion()} onAnswer={mockOnAnswer} />);

            const input = screen.getByRole('textbox');
            fireEvent.change(input, { target: { value: 'sat' } });
            fireEvent.submit(input.closest('form')!);

            expect(mockOnAnswer).toHaveBeenCalledWith(2, 'sat', true);
        });

        it('should call onAnswer with isCorrect=false for wrong answer', () => {
            render(<QuestionCard question={createFillInBlankQuestion()} onAnswer={mockOnAnswer} />);

            const input = screen.getByRole('textbox');
            fireEvent.change(input, { target: { value: 'wrong' } });
            fireEvent.submit(input.closest('form')!);

            expect(mockOnAnswer).toHaveBeenCalledWith(2, 'wrong', false);
        });

        it('should be case insensitive when checking answer', () => {
            render(<QuestionCard question={createFillInBlankQuestion()} onAnswer={mockOnAnswer} />);

            const input = screen.getByRole('textbox');
            fireEvent.change(input, { target: { value: 'SAT' } });
            fireEvent.submit(input.closest('form')!);

            // Should be marked correct (case insensitive)
            expect(mockOnAnswer).toHaveBeenCalledWith(2, 'SAT', true);
        });
    });

    describe('Answered State', () => {
        it('should display read explanation button after answering', () => {
            render(
                <QuestionCard
                    question={createMultipleChoiceQuestion()}
                    onAnswer={mockOnAnswer}
                    savedAnswer={{ answer: 'Option A', isCorrect: true }}
                />
            );
            expect(screen.getByText(/read explanation/i)).toBeInTheDocument();
        });

        it('should show correct indicator for correct answers', () => {
            render(
                <QuestionCard
                    question={createMultipleChoiceQuestion()}
                    onAnswer={mockOnAnswer}
                    savedAnswer={{ answer: 'Option A', isCorrect: true }}
                />
            );
            // Check for correct indicator - component uses teal colors for correct state
            const container = screen.getByText('Option A').closest('button');
            // The component uses teal-900/teal-500 classes for correct answers
            expect(container?.className).toMatch(/teal|15803D/i);
        });

        it('should show incorrect indicator for wrong answers', () => {
            render(
                <QuestionCard
                    question={createMultipleChoiceQuestion()}
                    onAnswer={mockOnAnswer}
                    savedAnswer={{ answer: 'Option B', isCorrect: false }}
                />
            );
            // The wrong answer should be highlighted
            const wrongOption = screen.getByText('Option B').closest('button');
            expect(wrongOption?.className).toMatch(/red|incorrect|error|wrong/i);
        });
    });

    describe('Question ID Display', () => {
        it('should display question number', () => {
            render(<QuestionCard question={createMultipleChoiceQuestion({ id: 3 })} onAnswer={mockOnAnswer} />);
            expect(screen.getByText(/3/)).toBeInTheDocument();
        });
    });
});
