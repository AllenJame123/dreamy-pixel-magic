// Common terms and patterns to filter
const RESTRICTED_PATTERNS = [
  // Explicit content patterns
  /\b(nude|naked|sex|porn|xxx|adult|explicit)\b/i,
  // Relationship and intimate actions
  /\b(kiss(ing)?|love\s?making|dating|relationship|intimate|romance|romantic)\b/i,
  // Body parts and anatomy (explicit)
  /\b(genitalia|breasts?|nipples?|body\s?parts)\b/i,
  // Actions and situations (explicit)
  /\b(intercourse|fornication|erotic|sensual|seductive)\b/i,
  // Common circumvention attempts
  /\b(n[u4]d[e3]|s[e3]x[y]?|p[o0]rn|k[i1]ss)\b/i,
  // Emotional/Physical intimacy
  /\b(touch(ing)?|embrace|hug(ging)?|cuddle|affection(ate)?)\b/i,
];

// Words that might be legitimate in certain contexts but need review
const CONTEXT_SENSITIVE_WORDS = [
  'body',
  'skin',
  'figure',
  'pose',
  'intimate',
  'close',
  'together',
  'love',
  'heart',
  'passion',
  'emotion',
];

// Combinations of words that might indicate inappropriate content
const RESTRICTED_COMBINATIONS = [
  ['love', 'passion'],
  ['close', 'touch'],
  ['body', 'pose'],
  ['heart', 'passion'],
];

export const validatePrompt = (prompt: string): { isValid: boolean; message?: string } => {
  // Convert to lowercase for consistent checking
  const lowerPrompt = prompt.toLowerCase();

  // Check for restricted patterns
  for (const pattern of RESTRICTED_PATTERNS) {
    if (pattern.test(lowerPrompt)) {
      return {
        isValid: false,
        message: 'Your prompt contains inappropriate content. Please provide a prompt suitable for children.'
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
          message: 'Your prompt may be inappropriate for children. Please rephrase it.'
        };
      }
    }
  }

  // Check for restricted word combinations
  for (const [word1, word2] of RESTRICTED_COMBINATIONS) {
    if (lowerPrompt.includes(word1) && lowerPrompt.includes(word2)) {
      return {
        isValid: false,
        message: 'This combination of words is not allowed. Please rephrase your prompt.'
      };
    }
  }

  return { isValid: true };
};