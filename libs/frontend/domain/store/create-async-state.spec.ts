import { TestBed } from '@angular/core/testing';
import { createAsyncState } from './create-async-state';
import { LogMessage } from '../logger';

describe('createAsyncState', () => {
  it('should create with default initial state', () => {
    const state = createAsyncState<string>();
    
    expect(state.data()).toBeNull();
    expect(state.loading()).toBe(false);
    expect(state.error()).toBeNull();
  });
  
  it('should create with provided initial value', () => {
    const initialValue = 'test';
    const state = createAsyncState<string>(initialValue);
    
    expect(state.data()).toBe(initialValue);
    expect(state.loading()).toBe(false);
    expect(state.error()).toBeNull();
  });
  
  it('should update loading state', () => {
    const state = createAsyncState<string>();
    
    state.setLoading(true);
    expect(state.loading()).toBe(true);
    expect(state.error()).toBeNull();
    
    state.setLoading(false);
    expect(state.loading()).toBe(false);
  });
  
  it('should update data state', () => {
    const state = createAsyncState<string>();
    const newData = 'updated';
    
    state.setData(newData);
    expect(state.data()).toBe(newData);
    expect(state.loading()).toBe(false);
    expect(state.error()).toBeNull();
  });
  
  it('should update error state', () => {
    const state = createAsyncState<string>();
    const error = new Error('Test error');
    
    // Mock logger
    const mockLogger = {
      log: jest.fn().mockResolvedValue(undefined)
    };
    
    state.setError(error, mockLogger);
    expect(state.data()).toBeNull();
    expect(state.loading()).toBe(false);
    expect(state.error()).toBeInstanceOf(LogMessage);
    expect(state.error()?.message).toBe('Test error');
    expect(mockLogger.log).toHaveBeenCalled();
  });
  
  it('should handle error without logger', () => {
    const state = createAsyncState<string>();
    const error = new Error('Test error');
    
    state.setError(error);
    expect(state.data()).toBeNull();
    expect(state.loading()).toBe(false);
    expect(state.error()).toBeInstanceOf(LogMessage);
    expect(state.error()?.message).toBe('Test error');
  });
  
  it('should reset error when setting loading to true', () => {
    const state = createAsyncState<string>();
    const error = new Error('Test error');
    
    state.setError(error);
    expect(state.error()).not.toBeNull();
    
    state.setLoading(true);
    expect(state.error()).toBeNull();
  });
});
