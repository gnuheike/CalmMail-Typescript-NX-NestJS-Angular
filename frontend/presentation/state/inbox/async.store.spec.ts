import { AsyncStore } from './async.store';
import { AsyncState } from './async.state.type';

// Create a concrete implementation of the abstract class for testing
class TestAsyncStore extends AsyncStore<string> {
  // Expose protected methods for testing
  setLoadingPublic(): void {
    this.setLoading();
  }

  setDataPublic(data: string): void {
    this.setData(data);
  }

  setErrorPublic(error: unknown): void {
    this.setError(error);
  }

  // Expose the state for testing
  getState(): AsyncState<string> {
    return this._state();
  }
}

describe('AsyncStore', () => {
  let store: TestAsyncStore;

  beforeEach(() => {
    store = new TestAsyncStore();
  });

  it('should initialize with default state', () => {
    expect(store.data()).toBeNull();
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  describe('setLoading', () => {
    it('should set loading to true and clear error', () => {
      // Set an initial error
      store.setErrorPublic('Initial error');
      expect(store.error()).toBe('Initial error');

      // Call setLoading
      store.setLoadingPublic();

      // Verify state
      expect(store.loading()).toBe(true);
      expect(store.error()).toBeNull();
      expect(store.data()).toBeNull();
    });
  });

  describe('setData', () => {
    it('should set data and reset loading and error', () => {
      // Set initial loading and error
      store.setLoadingPublic();
      expect(store.loading()).toBe(true);

      // Call setData
      const testData = 'Test data';
      store.setDataPublic(testData);

      // Verify state
      expect(store.data()).toBe(testData);
      expect(store.loading()).toBe(false);
      expect(store.error()).toBeNull();
    });
  });

  describe('setError', () => {
    it('should set error and reset data and loading', () => {
      // Set initial data and loading
      store.setDataPublic('Initial data');
      store.setLoadingPublic();
      expect(store.data()).toBe('Initial data');
      expect(store.loading()).toBe(true);

      // Call setError
      const testError = 'Test error';
      store.setErrorPublic(testError);

      // Verify state
      expect(store.error()).toBe(testError);
      expect(store.data()).toBeNull();
      expect(store.loading()).toBe(false);
    });

    it('should handle undefined error', () => {
      store.setErrorPublic(undefined);
      expect(store.error()).toBeNull();
    });
  });

  describe('computed signals', () => {
    it('should update computed signals when state changes', () => {
      // Initial state
      expect(store.data()).toBeNull();
      expect(store.loading()).toBe(false);
      expect(store.error()).toBeNull();

      // Update state
      store.setDataPublic('New data');
      expect(store.data()).toBe('New data');

      store.setLoadingPublic();
      expect(store.loading()).toBe(true);

      store.setErrorPublic('New error');
      expect(store.error()).toBe('New error');
    });
  });
});
