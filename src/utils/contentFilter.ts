// Common terms and patterns to filter
const RESTRICTED_PATTERNS = [
  // Explicit content patterns
  /\b(nude|naked|sex|porn|xxx|adult|explicit)\b/i,
  // Body parts and anatomy (explicit)
  /\b(genitalia|breasts?|nipples?)\b/i,
  // Actions and situations (explicit)
  /\b(intercourse|fornication|erotic)\b/i,
  // Common circumvention attempts
  /\b(n[u4]d[e3]|s[e3]x[y]?|p[o0]rn)\b/i,
];

// Words that might be legitimate in certain contexts but need review
const CONTEXT_SENSITIVE_WORDS = [
  'body',
  'skin',
  'figure',
  'pose',
  'intimate',
];

export const validatePrompt = (prompt: string): { isValid: boolean; message?: string } => {
  // Convert to lowercase for consistent checking
  const lowerPrompt = prompt.toLowerCase();

  // Check for restricted patterns
  for (const pattern of RESTRICTED_PATTERNS) {
    if (pattern.test(lowerPrompt)) {
      return {
        isValid: false,
        message: 'Your prompt violates our content guidelines. Please provide a prompt suitable for all audiences.'
      };
    }
  }

  // Check for combinations of context-sensitive words that might indicate inappropriate content
  let sensitiveWordCount = 0;
  for (const word of CONTEXT_SENSITIVE_WORDS) {
    if (lowerPrompt.includes(word)) {
      sensitiveWordCount++;
      if (sensitiveWordCount >= 2) {
        return {
          isValid: false,
          message: 'Your prompt may contain inappropriate content. Please rephrase it to be suitable for all audiences.'
        };
      }
    }
  }

  return { isValid: true };
};