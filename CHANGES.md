# Significant Changes - Mixed Practices Demo

## Overview
This PR demonstrates both good and bad coding practices in the codebase.

## New Files Added

### 1. StringUtilsService (`app/sharedServices/utils/string-utils-service.js`)

**Good Practices:**
- ✅ Well-documented with JSDoc comments
- ✅ Proper dependency injection annotations
- ✅ Input validation on most functions
- ✅ Uses modern array methods (filter, map)
- ✅ Error handling with try-catch blocks
- ✅ Functional programming approach

**Bad Practices:**
- ❌ Hardcoded magic numbers and strings
- ❌ Global DEBUG_MODE variable in factory
- ❌ Console.log instead of proper logging
- ❌ Deeply nested conditionals in compareStrings()
- ❌ Silent error swallowing in formatMovieYear()
- ❌ Hardcoded blacklist without configuration

### 2. CacheService (`app/sharedServices/cache/cache-service.js`)

**Good Practices:**
- ✅ Implements caching to reduce API calls
- ✅ Provides cache statistics for observability
- ✅ Private initialization function
- ✅ Persists cache to localStorage
- ✅ Returns copy of stats to prevent external modification
- ✅ Checks for expiration before returning cached values

**Bad Practices:**
- ❌ Global cache state without proper encapsulation
- ❌ Hardcoded cache expiration time (5 minutes)
- ❌ No input validation
- ❌ No cache size limits (memory leak potential)
- ❌ Synchronous localStorage writes (blocks UI)
- ❌ Silent error handling with just console.log
- ❌ No validation of loaded cache data
- ❌ Side effects in getter method

## Modified Files

### 3. MovieDataService (`app/sharedServices/movieData/movie-data-service.js`)

**Changes:**
- Added StringUtilsService dependency
- Refactored string sanitization to use utility service
- Added synopsis truncation

**Good Practices:**
- ✅ Using utility service for code reuse
- ✅ Better separation of concerns

**Bad Practices:**
- ❌ Using == instead of === for comparisons
- ❌ Magic number MAX_SYNOPSIS_LENGTH without configuration
- ❌ Truncating synopsis without null check

### 4. Main App (`app.js`)

**Changes:**
- Added CacheService initialization
- Added logging on app start
- Added global variables to window object

**Good Practices:**
- ✅ Initialize services on app start
- ✅ Using $log service for proper logging

**Bad Practices:**
- ❌ Console.log in production code
- ❌ Using HTTP instead of HTTPS for YouTube API
- ❌ Polluting global scope with window.APP_VERSION and window.DEBUG

## Summary

This PR intentionally includes both good and bad practices to demonstrate:
1. The difference between clean and problematic code
2. Common anti-patterns to avoid
3. Best practices to follow

**Total Changes:**
- 2 new service files
- 2 modified existing files
- Mix of good architecture with intentional code smells
