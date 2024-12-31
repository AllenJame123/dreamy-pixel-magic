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

export const validatePrompt = (prompt: string): { isValid: boolean; message?: string } => {
  const lowerPrompt = prompt.toLowerCase();

  for (const pattern of RESTRICTED_PATTERNS) {
    if (pattern.test(lowerPrompt)) {
      return {
        isValid: false,
        message: 'Your prompt contains inappropriate content. Please provide a prompt suitable for children.'
      };
    }
  }

  return { isValid: true };
};