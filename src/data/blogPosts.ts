import { BlogPosts } from "./types/blog";
import { aiImageGenerators } from "./blog/ai-image-generators";
import { perfectPrompts } from "./blog/perfect-prompts";

export const blogPosts: BlogPosts = {
  "1": aiImageGenerators,
  "5": perfectPrompts,
};

export { aiImageGenerators, perfectPrompts };