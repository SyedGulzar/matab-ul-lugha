import { describe, it, expect } from 'vitest';
import {
  SINDH_BOARD_EXAMS,
  getExamDataByClass,
  CLASS_9_SECTIONS,
  CLASS_9_MODEL_PAPER_1,
  CLASS_10_SECTIONS,
  CLASS_10_MODEL_PAPER_1,
  CLASS_11_SECTIONS,
  CLASS_11_MODEL_PAPER_1,
  CLASS_12_SECTIONS,
  CLASS_12_MODEL_PAPER_1,
} from '../../data/exams';

describe('Sindh Board Exam Hub (Classes 9-12)', () => {
  it('should have model papers defined for all 4 classes', () => {
    const classes = ['Class IX', 'Class X', 'Class XI', 'Class XII'];
    classes.forEach((cls) => {
      const data = getExamDataByClass(cls);
      expect(data).toBeDefined();
      expect(data.className).toBe(cls);
      expect(data.sections.length).toBeGreaterThan(0);
      expect(data.modelPaper.length).toBeGreaterThan(0);
    });
  });

  it('Class IX should have valid question structure and non-empty answers', () => {
    expect(CLASS_9_MODEL_PAPER_1.length).toBeGreaterThanOrEqual(4);
    CLASS_9_MODEL_PAPER_1.forEach((section) => {
      expect(section.id).toBeDefined();
      expect(section.title).toBeDefined();
      expect(section.questions.length).toBeGreaterThan(0);
      section.questions.forEach((q) => {
        expect(q.id).toBeGreaterThan(0);
        expect(q.questionText).toBeTruthy();
        expect(q.correctAnswer).toBeTruthy();
        expect(q.explanation).toBeTruthy();
      });
    });
  });

  it('Class X should have valid question structure and non-empty answers', () => {
    expect(CLASS_10_MODEL_PAPER_1.length).toBeGreaterThanOrEqual(5);
    CLASS_10_MODEL_PAPER_1.forEach((section) => {
      expect(section.id).toBeDefined();
      expect(section.title).toBeDefined();
      expect(section.questions.length).toBeGreaterThan(0);
      section.questions.forEach((q) => {
        expect(q.id).toBeGreaterThan(0);
        expect(q.questionText).toBeTruthy();
        expect(q.correctAnswer).toBeTruthy();
      });
    });
  });

  it('Class XI should have valid question structure and non-empty answers', () => {
    expect(CLASS_11_MODEL_PAPER_1.length).toBeGreaterThanOrEqual(4);
    CLASS_11_MODEL_PAPER_1.forEach((section) => {
      expect(section.id).toBeDefined();
      expect(section.title).toBeDefined();
      expect(section.questions.length).toBeGreaterThan(0);
      section.questions.forEach((q) => {
        expect(q.id).toBeGreaterThan(0);
        expect(q.questionText).toBeTruthy();
        expect(q.correctAnswer).toBeTruthy();
      });
    });
  });

  it('Class XII should have valid question structure and non-empty answers', () => {
    expect(CLASS_12_MODEL_PAPER_1.length).toBeGreaterThanOrEqual(4);
    CLASS_12_MODEL_PAPER_1.forEach((section) => {
      expect(section.id).toBeDefined();
      expect(section.title).toBeDefined();
      expect(section.questions.length).toBeGreaterThan(0);
      section.questions.forEach((q) => {
        expect(q.id).toBeGreaterThan(0);
        expect(q.questionText).toBeTruthy();
        expect(q.correctAnswer).toBeTruthy();
      });
    });
  });
});
