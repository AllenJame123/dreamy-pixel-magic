import { BlogPosts } from "./types/blog";
import { aiImageGenerators } from "./blog/ai-image-generators";
import { realisticAiImages } from "./blog/realistic-ai-images";
import { perfectPrompts } from "./blog/perfect-prompts";

export const blogPosts: BlogPosts = {
  "1": aiImageGenerators,
  "4": realisticAiImages,
  "5": perfectPrompts,
};

export { aiImageGenerators, realisticAiImages, perfectPrompts };