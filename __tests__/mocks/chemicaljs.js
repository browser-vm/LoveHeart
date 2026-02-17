/**
 * Mock for ChemicalJS module
 * Used to isolate tests from the actual ChemicalJS implementation
 */

const mockApp = {
  use: jest.fn(),
  serveChemical: jest.fn(),
};

const mockListen = jest.fn((port, callback) => {
  if (callback) callback();
  return mockApp;
});

export const ChemicalServer = jest.fn().mockImplementation((options) => {
  // Store options for verification in tests
  ChemicalServer.lastOptions = options;
  return [mockApp, mockListen];
});

// Export mock instances for test assertions
export { mockApp, mockListen };
