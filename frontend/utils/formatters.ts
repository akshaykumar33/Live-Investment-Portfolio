// Format percentage
export const formatPercentage = (value: number, decimals = 2): string => {
  return `${value > 0 ? '+' : ''}${value.toFixed(decimals)}%`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// Ensures function runs at most once per interval
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit = 300
): T => {
  let lastCall = 0;
  return function (...args: any[]) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  } as T;
};

// Delays function execution until user stops triggering it
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay = 300
): T => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (...args: any[]) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  } as T;
};

// Combo: trigger immediately but still debounce later calls
export const debounceThrottleCombo = <T extends (...args: any[]) => void>(
  func: T,
  throttleMs = 300,
  debounceMs = 600
): T => {
  const throttled = throttle(func, throttleMs);
  return debounce(throttled, debounceMs);
};




// Format large numbers to readable units (Cr, L, K)
export const formatNumber = (num: string | number): string => {
  const value = typeof num === 'string' ? parseFloat(num) : num;

  if (isNaN(value)) return '0.00';

  if (Math.abs(value) >= 1e7) {
    return (value / 1e7).toFixed(2) + 'Cr';
  } else if (Math.abs(value) >= 1e5) {
    return (value / 1e5).toFixed(2) + 'L';
  } else if (Math.abs(value) >= 1e3) {
    return (value / 1e3).toFixed(2) + 'K';
  }
  return value.toFixed(2);
};

// ClassName based on gain/loss value
export const getGainLoss = (value: number): 'positive' | 'negative' | 'neutral' => {
  if (value > 0) return 'positive';
  if (value < 0) return 'negative';
  return 'neutral';
};
