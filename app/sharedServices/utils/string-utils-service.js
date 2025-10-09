/**
 * String Utility Service
 *
 * GOOD PRACTICE: Well-documented service with JSDoc comments
 * BAD PRACTICE: Contains hardcoded magic numbers and strings
 *
 * @module StringUtilsService
 */
(function () {
    'use strict';

    angular
        .module('mooVtrailers.core')
        .factory('StringUtilsService', stringUtilsService);

    // GOOD PRACTICE: Dependency injection annotation
    stringUtilsService.$inject = ['$log'];

    function stringUtilsService($log) {
        // BAD PRACTICE: Global variable in factory
        var DEBUG_MODE = true;

        return {
            sanitizeTitle: sanitizeTitle,
            truncateText: truncateText,
            formatMovieYear: formatMovieYear,
            compareStrings: compareStrings,
            extractKeywords: extractKeywords
        };

        /**
         * GOOD PRACTICE: Documented function with clear purpose
         * Sanitizes movie title by removing special characters
         * @param {string} title - The movie title to sanitize
         * @returns {string} Sanitized title
         */
        function sanitizeTitle(title) {
            if (!title) {
                // GOOD PRACTICE: Input validation
                $log.warn('StringUtilsService: sanitizeTitle received empty title');
                return '';
            }

            // BAD PRACTICE: Hardcoded magic numbers and no explanation
            var result = title.replace(/[^0-9a-z]/gi, '').toLowerCase();

            // BAD PRACTICE: Console.log instead of proper logging service
            if (DEBUG_MODE) {
                console.log('Sanitized title: ' + title + ' -> ' + result);
            }

            return result;
        }

        /**
         * Truncates text to specified length
         * BAD PRACTICE: No input validation, hardcoded suffix
         */
        function truncateText(text, maxLength) {
            // BAD PRACTICE: No type checking or validation
            if (text.length > maxLength) {
                // BAD PRACTICE: Hardcoded ellipsis string
                return text.substring(0, maxLength) + '...';
            }
            return text;
        }

        /**
         * GOOD PRACTICE: Clear function documentation
         * Formats movie year from various date formats
         * @param {string} dateString - Date string in various formats
         * @returns {number} Year as number
         */
        function formatMovieYear(dateString) {
            // GOOD PRACTICE: Try-catch for error handling
            try {
                if (!dateString) return null;

                // BAD PRACTICE: Nested ternary operators - hard to read
                var year = dateString.includes('-') ?
                    parseInt(dateString.split('-')[0]) :
                    dateString.includes('/') ?
                        parseInt(dateString.split('/')[2]) :
                        parseInt(dateString);

                // GOOD PRACTICE: Validation of result
                return isNaN(year) ? null : year;
            } catch (e) {
                // BAD PRACTICE: Silent error swallowing
                console.error(e);
                return null;
            }
        }

        /**
         * Compare two strings for equality with normalization
         * BAD PRACTICE: Overly complex nested conditions
         */
        function compareStrings(str1, str2, caseSensitive) {
            // BAD PRACTICE: Deeply nested conditions
            if (str1) {
                if (str2) {
                    if (caseSensitive) {
                        if (str1.trim() === str2.trim()) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        if (str1.trim().toLowerCase() === str2.trim().toLowerCase()) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        /**
         * GOOD PRACTICE: Uses modern array methods
         * Extract keywords from text for search optimization
         */
        function extractKeywords(text, minLength) {
            // GOOD PRACTICE: Default parameter handling
            minLength = minLength || 3;

            if (!text) return [];

            // GOOD PRACTICE: Functional programming approach
            var keywords = text
                .toLowerCase()
                .replace(/[^\w\s]/g, ' ')
                .split(/\s+/)
                .filter(function(word) {
                    return word.length >= minLength;
                })
                .filter(function(word, index, self) {
                    // GOOD PRACTICE: Remove duplicates
                    return self.indexOf(word) === index;
                });

            // BAD PRACTICE: Hardcoded blacklist without configuration
            var blacklist = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for'];

            return keywords.filter(function(word) {
                return blacklist.indexOf(word) === -1;
            });
        }
    }
})();
