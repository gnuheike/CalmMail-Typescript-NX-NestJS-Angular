import { AsyncState, INITIAL_ASYNC_STATE } from './async.state.type';

describe('AsyncState', () => {
  it('should define the correct interface properties', () => {
    // This is a type test, so we're just verifying the structure
    const state: AsyncState<string> = {
      data: 'test',
      loading: false,
      error: null,
    };

    expect(state.data).toBe('test');
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });
});

describe('INITIAL_ASYNC_STATE', () => {
  it('should return the default initial state', () => {
    const state = INITIAL_ASYNC_STATE<string>();

    expect(state.data).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should work with different generic types', () => {
    interface TestType {
      id: number;
      name: string;
    }

    const state = INITIAL_ASYNC_STATE<TestType>();

    expect(state.data).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });
});
