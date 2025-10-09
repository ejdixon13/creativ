/**
 * Cache Service
 *
 * GOOD PRACTICE: Implements caching to reduce API calls
 * BAD PRACTICE: Uses global state without proper encapsulation
 *
 * @module CacheService
 */
(function () {
    'use strict';

    angular
        .module('mooVtrailers.core')
        .factory('CacheService', cacheService);

    cacheService.$inject = ['$window'];

    function cacheService($window) {
        // BAD PRACTICE: Using global variables for cache
        var cache = {};
        var cacheStats = {
            hits: 0,
            misses: 0,
            size: 0
        };

        // BAD PRACTICE: Hardcoded cache expiration time without configuration
        var CACHE_EXPIRATION_MS = 300000; // 5 minutes

        var service = {
            get: get,
            set: set,
            clear: clear,
            getStats: getStats,
            has: has,
            remove: remove
        };

        // GOOD PRACTICE: Initialize on service creation
        _initialize();

        return service;

        ///////////////////////////////////////////

        /**
         * GOOD PRACTICE: Private initialization function
         */
        function _initialize() {
            // BAD PRACTICE: Try to load cache from localStorage without proper error handling
            try {
                var savedCache = $window.localStorage.getItem('movieCache');
                if (savedCache) {
                    cache = JSON.parse(savedCache);
                    // BAD PRACTICE: No validation of loaded data
                }
            } catch (e) {
                // BAD PRACTICE: Silent error handling with console.log
                console.log('Failed to load cache from localStorage');
            }
        }

        /**
         * Get value from cache
         * GOOD PRACTICE: Returns null for missing/expired items
         * @param {string} key - Cache key
         * @returns {*} Cached value or null
         */
        function get(key) {
            // BAD PRACTICE: No input validation
            var item = cache[key];

            if (!item) {
                cacheStats.misses++;
                return null;
            }

            // GOOD PRACTICE: Check for expiration
            if (_isExpired(item)) {
                // BAD PRACTICE: Side effect in getter - modifying cache
                delete cache[key];
                cacheStats.misses++;
                cacheStats.size--;
                return null;
            }

            // GOOD PRACTICE: Update stats
            cacheStats.hits++;
            return item.value;
        }

        /**
         * Set value in cache
         * BAD PRACTICE: No size limits, could cause memory issues
         */
        function set(key, value, ttl) {
            // BAD PRACTICE: No input validation
            // BAD PRACTICE: Using ternary without clear logic
            ttl = ttl ? ttl : CACHE_EXPIRATION_MS;

            var item = {
                value: value,
                timestamp: Date.now(),
                ttl: ttl
            };

            // BAD PRACTICE: Nested if statements instead of guard clauses
            if (!cache[key]) {
                cacheStats.size++;
            }

            cache[key] = item;

            // GOOD PRACTICE: Persist to localStorage for cross-session caching
            _persistCache();
        }

        /**
         * Check if key exists in cache
         * GOOD PRACTICE: Separate existence check
         */
        function has(key) {
            return cache.hasOwnProperty(key) && !_isExpired(cache[key]);
        }

        /**
         * Remove specific key from cache
         * BAD PRACTICE: No return value to indicate success/failure
         */
        function remove(key) {
            if (cache[key]) {
                delete cache[key];
                cacheStats.size--;
                _persistCache();
            }
        }

        /**
         * Clear entire cache
         * GOOD PRACTICE: Provides way to reset cache
         */
        function clear() {
            cache = {};
            cacheStats = {
                hits: 0,
                misses: 0,
                size: 0
            };
            // GOOD PRACTICE: Clear localStorage too
            try {
                $window.localStorage.removeItem('movieCache');
            } catch (e) {
                console.error('Failed to clear cache from localStorage');
            }
        }

        /**
         * Get cache statistics
         * GOOD PRACTICE: Provides observability into cache performance
         */
        function getStats() {
            // GOOD PRACTICE: Return copy to prevent external modification
            return angular.copy(cacheStats);
        }

        /**
         * Check if cache item is expired
         * GOOD PRACTICE: Private helper function with clear purpose
         */
        function _isExpired(item) {
            if (!item) return true;
            // BAD PRACTICE: Complex boolean logic without comments
            return (Date.now() - item.timestamp) > item.ttl;
        }

        /**
         * Persist cache to localStorage
         * BAD PRACTICE: Synchronous localStorage write could block UI
         */
        function _persistCache() {
            // BAD PRACTICE: Try-catch swallowing errors
            try {
                $window.localStorage.setItem('movieCache', JSON.stringify(cache));
            } catch (e) {
                // BAD PRACTICE: Just logging, not handling quota exceeded errors
                console.log('Failed to persist cache');
            }
        }
    }
})();
