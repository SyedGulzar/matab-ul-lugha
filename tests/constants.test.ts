import { describe, it, expect } from 'vitest';
import { QuestionType } from '../types';
import { DIFFICULTY_LEVELS, VALID_USERNAMES, TOPIC_CATEGORIES, TopicItem } from '../constants';

describe('QuestionType Enum', () => {
    it('should have MULTIPLE_CHOICE value', () => {
        expect(QuestionType.MULTIPLE_CHOICE).toBe('multiple_choice');
    });

    it('should have FILL_IN_BLANK value', () => {
        expect(QuestionType.FILL_IN_BLANK).toBe('fill_in_blank');
    });
});

describe('DIFFICULTY_LEVELS', () => {
    it('should contain 12 difficulty levels', () => {
        expect(DIFFICULTY_LEVELS).toHaveLength(12);
    });

    it('should include all CEFR levels', () => {
        expect(DIFFICULTY_LEVELS).toContain('Beginner (A1)');
        expect(DIFFICULTY_LEVELS).toContain('Elementary (A2)');
        expect(DIFFICULTY_LEVELS).toContain('Intermediate (B1)');
        expect(DIFFICULTY_LEVELS).toContain('Upper Intermediate (B2)');
        expect(DIFFICULTY_LEVELS).toContain('Advanced (C1)');
        expect(DIFFICULTY_LEVELS).toContain('Proficiency (C2)');
    });

    it('should include all Class levels', () => {
        expect(DIFFICULTY_LEVELS).toContain('Class 1-5');
        expect(DIFFICULTY_LEVELS).toContain('Class 6-8');
        expect(DIFFICULTY_LEVELS).toContain('Class 9');
        expect(DIFFICULTY_LEVELS).toContain('Class 10');
        expect(DIFFICULTY_LEVELS).toContain('Class 11');
        expect(DIFFICULTY_LEVELS).toContain('Class 12');
    });
});

describe('VALID_USERNAMES', () => {
    it('should contain expected usernames', () => {
        expect(VALID_USERNAMES).toContain('ZH_Designing');
        expect(VALID_USERNAMES).toContain('AJ_Speaking');
        expect(VALID_USERNAMES).toContain('AR_Learning');
        expect(VALID_USERNAMES).toContain('MS_Looking');
        expect(VALID_USERNAMES).toContain('AH_Coding');
        expect(VALID_USERNAMES).toContain('Admin_141225');
    });

    it('should have correct number of usernames', () => {
        expect(VALID_USERNAMES.length).toBeGreaterThanOrEqual(6);
    });
});

describe('USERS and Role Helpers', () => {
    it('should have matching users for all valid usernames', () => {
        const { USERS } = require('../constants');
        VALID_USERNAMES.forEach((username: string) => {
            const user = USERS.find((u: any) => u.username === username);
            expect(user).toBeDefined();
            expect(user.displayName).toBeDefined();
            expect(user.role).toMatch(/^(user|admin)$/);
        });
    });

    it('should correctly identify admin users', () => {
        const { isAdmin } = require('../constants');
        expect(isAdmin('Admin_141225')).toBe(true);
        expect(isAdmin('ZH_Designing')).toBe(false);
        expect(isAdmin('InvalidUser')).toBe(false);
    });

    it('should return user info for valid usernames', () => {
        const { getUserInfo } = require('../constants');
        const adminInfo = getUserInfo('Admin_141225');
        expect(adminInfo).toBeDefined();
        expect(adminInfo?.displayName).toBe('Administrator');
        expect(adminInfo?.role).toBe('admin');

        const userInfo = getUserInfo('ZH_Designing');
        expect(userInfo).toBeDefined();
        expect(userInfo?.displayName).toBe('Zahir Shah');
        expect(userInfo?.role).toBe('user');
    });

    it('should return undefined for invalid usernames', () => {
        const { getUserInfo } = require('../constants');
        expect(getUserInfo('NonExistent')).toBeUndefined();
    });
});

describe('TOPIC_CATEGORIES', () => {
    it('should have expected category keys', () => {
        const expectedCategories = [
            'Parts of Speech (Nouns/Pronouns)',
            'Parts of Speech (others)',
            'Verbs & Moods',
            'Tenses',
            'Narrations (Direct/Indirect)',
            'Active / Passive Voice',
            'Advanced Grammar',
            'Writing & Mechanics',
        ];

        expectedCategories.forEach((category) => {
            expect(TOPIC_CATEGORIES).toHaveProperty(category);
        });
    });

    it('should have arrays of topics for each category', () => {
        Object.values(TOPIC_CATEGORIES).forEach((topics) => {
            expect(Array.isArray(topics)).toBe(true);
            expect(topics.length).toBeGreaterThan(0);
        });
    });

    it('each topic should have required name and time fields', () => {
        Object.values(TOPIC_CATEGORIES).forEach((topics: TopicItem[]) => {
            topics.forEach((topic) => {
                expect(topic).toHaveProperty('name');
                expect(topic).toHaveProperty('time');
                expect(typeof topic.name).toBe('string');
                expect(typeof topic.time).toBe('string');
            });
        });
    });

    it('topics with videos should have videoUrl field', () => {
        let hasVideoUrls = false;
        Object.values(TOPIC_CATEGORIES).forEach((topics: TopicItem[]) => {
            topics.forEach((topic) => {
                if (topic.videoUrl) {
                    hasVideoUrls = true;
                    expect(topic.videoUrl).toMatch(/^https:\/\/www\.youtube\.com/);
                }
            });
        });
        expect(hasVideoUrls).toBe(true);
    });
});
