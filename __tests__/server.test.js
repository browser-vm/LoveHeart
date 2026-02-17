/**
 * Unit tests for LoveHeart server initialization
 */

import { jest } from '@jest/globals';

// Store mock instances globally for access in tests
let mockApp, mockListen, lastOptions, lastStaticArgs;

// Mock ChemicalJS before importing the server
jest.unstable_mockModule('chemicaljs', () => {
  const ChemicalServer = jest.fn().mockImplementation((options) => {
    mockApp = {
      use: jest.fn(),
      serveChemical: jest.fn(),
    };
    mockListen = jest.fn((port, callback) => {
      if (callback) callback();
      return mockApp;
    });
    lastOptions = options;
    return [mockApp, mockListen];
  });
  return { ChemicalServer };
});

// Mock express
jest.unstable_mockModule('express', () => {
  const express = jest.fn(() => {
    return {
      use: jest.fn(),
      listen: jest.fn(),
    };
  });
  express.static = jest.fn((...args) => {
    lastStaticArgs = args;
    return 'static-middleware';
  });
  return { default: express };
});

describe('Server Initialization', () => {
  let originalPort;

  beforeEach(() => {
    // Reset modules to get fresh imports
    jest.resetModules();
    // Store original PORT
    originalPort = process.env.PORT;
  });

  afterEach(() => {
    // Restore original PORT
    if (originalPort !== undefined) {
      process.env.PORT = originalPort;
    } else {
      delete process.env.PORT;
    }
  });

  describe('ChemicalServer configuration', () => {
    it('should create ChemicalServer with correct options', async () => {
      await import('../index.js');

      expect(lastOptions).toEqual(
        expect.objectContaining({
          bypassDownloads: true,
          downloadMimeTypes: expect.arrayContaining([
            'application/octet-stream',
            'application/zip',
            'application/pdf',
          ]),
        })
      );
    });

    it('should configure bypassDownloads as true', async () => {
      await import('../index.js');

      expect(lastOptions.bypassDownloads).toBe(true);
    });

    it('should include required download MIME types', async () => {
      await import('../index.js');

      const expectedMimeTypes = [
        'application/octet-stream',
        'application/zip',
        'application/x-zip-compressed',
        'application/pdf',
        'application/x-msdownload',
        'application/x-apple-diskimage',
      ];

      expect(lastOptions.downloadMimeTypes).toEqual(
        expect.arrayContaining(expectedMimeTypes)
      );
    });
  });

  describe('Express static configuration', () => {
    it('should serve static files from public directory', async () => {
      await import('../index.js');

      expect(lastStaticArgs[0]).toBe('public');
      expect(lastStaticArgs[1]).toEqual(
        expect.objectContaining({
          index: 'index.html',
          extensions: ['html'],
        })
      );
    });

    it('should call app.use with static middleware', async () => {
      await import('../index.js');

      expect(mockApp.use).toHaveBeenCalledWith('static-middleware');
    });
  });

  describe('Chemical routes', () => {
    it('should call serveChemical on the app', async () => {
      await import('../index.js');

      expect(mockApp.serveChemical).toHaveBeenCalled();
    });
  });

  describe('Server listening', () => {
    it('should listen on default port 3000 when PORT is not set', async () => {
      delete process.env.PORT;
      await import('../index.js');

      expect(mockListen).toHaveBeenCalledWith(3000, expect.any(Function));
    });

    it('should listen on PORT environment variable when set', async () => {
      process.env.PORT = '8080';
      await import('../index.js');

      expect(mockListen).toHaveBeenCalledWith('8080', expect.any(Function));
    });

    it('should execute callback when server starts listening', async () => {
      await import('../index.js');

      const callback = mockListen.mock.calls[0][1];
      
      // Mock console.log to verify it's called
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      callback();
      
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('LoveHeart listening'));
      consoleSpy.mockRestore();
    });
  });
});
