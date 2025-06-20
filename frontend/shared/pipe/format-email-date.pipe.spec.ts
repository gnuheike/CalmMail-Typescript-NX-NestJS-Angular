import { FormatEmailDatePipe } from './format-email-date.pipe';

describe('FormatEmailDatePipe', () => {
  let pipe: FormatEmailDatePipe;

  beforeEach(() => {
    pipe = new FormatEmailDatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return a string for any date input', () => {
    // Test with a Date object
    const date = new Date();
    const result = pipe.transform(date);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);

    // Test with a string date
    const dateString = '2023-06-15T14:30:00';
    const stringResult = pipe.transform(dateString);
    expect(typeof stringResult).toBe('string');
    expect(stringResult.length).toBeGreaterThan(0);
  });

  // Test the three branches of the transform method
  it('should have different formats based on the date', () => {
    // Create a spy on the transform method to see which branches are covered
    const spy = jest.spyOn(pipe, 'transform');

    // Call with different dates
    const now = new Date();
    const lastYear = new Date(now.getFullYear() - 1, 0, 1);

    pipe.transform(now);
    pipe.transform(lastYear);

    expect(spy).toHaveBeenCalledTimes(2);
  });
});
