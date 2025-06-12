import { simulateNetworkDelay, simulateNetworkRequest } from '../../../infrastructure/util/simulation.util';

describe('Simulation Utilities', () => {
  // Mock setTimeout to avoid actual delays in tests
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe('simulateNetworkDelay', () => {
    it('should create a delay using setTimeout', async () => {
      const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

      // Start the delay but don't await it yet
      const delayPromise = simulateNetworkDelay({ minDelay: 100, maxDelay: 100 });

      // Fast-forward timers
      jest.runAllTimers();

      // Now await the promise
      await delayPromise;

      // Verify setTimeout was called with a delay of 100ms
      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 100);
    });

    it('should use default options when none provided', async () => {
      const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

      const delayPromise = simulateNetworkDelay();

      jest.runAllTimers();

      await delayPromise;

      // Verify setTimeout was called with some delay
      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), expect.any(Number));
    });
  });

  describe('simulateNetworkRequest', () => {
    it('should execute the callback and return its result after delay', async () => {
      const mockCallback = jest.fn().mockReturnValue('test result');

      const requestPromise = simulateNetworkRequest(mockCallback, {
        minDelay: 50,
        maxDelay: 50,
        errorRate: 0, // Ensure no random errors
      });

      jest.runAllTimers();

      const result = await requestPromise;

      expect(mockCallback).toHaveBeenCalled();
      expect(result).toBe('test result');
    });

    it('should handle async callbacks correctly', async () => {
      const mockCallback = jest.fn().mockResolvedValue('async result');

      const requestPromise = simulateNetworkRequest(mockCallback, {
        minDelay: 50,
        maxDelay: 50,
        errorRate: 0,
      });

      jest.runAllTimers();

      const result = await requestPromise;

      expect(mockCallback).toHaveBeenCalled();
      expect(result).toBe('async result');
    });

    it('should throw an error when random value is below error rate', async () => {
      // Mock Math.random to return a value below the error rate
      jest.spyOn(Math, 'random').mockReturnValue(0.05);

      const mockCallback = jest.fn();

      const requestPromise = simulateNetworkRequest(mockCallback, {
        minDelay: 50,
        maxDelay: 50,
        errorRate: 0.1,
        errorFactory: () => new Error('Test error'),
      });

      jest.runAllTimers();

      await expect(requestPromise).rejects.toThrow('Test error');
      expect(mockCallback).not.toHaveBeenCalled();
    });

    it('should not throw an error when random value is above error rate', async () => {
      // Mock Math.random to return a value above the error rate
      jest.spyOn(Math, 'random').mockReturnValue(0.2);

      const mockCallback = jest.fn().mockReturnValue('success');

      const requestPromise = simulateNetworkRequest(mockCallback, {
        minDelay: 50,
        maxDelay: 50,
        errorRate: 0.1,
      });

      jest.runAllTimers();

      const result = await requestPromise;

      expect(result).toBe('success');
      expect(mockCallback).toHaveBeenCalled();
    });

    it('should use default error factory when not provided', async () => {
      // Mock Math.random to return a value below the error rate
      jest.spyOn(Math, 'random').mockReturnValue(0.05);

      const requestPromise = simulateNetworkRequest(() => 'success', {
        minDelay: 50,
        maxDelay: 50,
        errorRate: 0.1,
      });

      jest.runAllTimers();

      await expect(requestPromise).rejects.toThrow('Network error');
    });
  });
});
