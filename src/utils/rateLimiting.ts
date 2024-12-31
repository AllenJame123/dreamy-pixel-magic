const RATE_LIMIT_WINDOW = 60000; // 1 minute in milliseconds
const MAX_REQUESTS = 3;

class RateLimiter {
  private requests: number[];

  constructor() {
    this.requests = [];
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    // Remove requests older than the window
    this.requests = this.requests.filter(
      timestamp => now - timestamp < RATE_LIMIT_WINDOW
    );
    return this.requests.length < MAX_REQUESTS;
  }

  addRequest() {
    this.requests.push(Date.now());
  }

  getTimeUntilNextAvailable(): number {
    if (this.requests.length === 0) return 0;
    const oldestRequest = this.requests[0];
    const timeUntilExpiry = RATE_LIMIT_WINDOW - (Date.now() - oldestRequest);
    return Math.max(0, timeUntilExpiry);
  }
}

export const rateLimiter = new RateLimiter();