import { BlogPosts } from "./types/blog";
import { aiImageGenerators } from "./blog/ai-image-generators";
import { choosingAiGenerator } from "./blog/choosing-ai-generator";
import { futureOfAiVisual } from "./blog/future-of-ai-visual";
import { realisticAiImages } from "./blog/realistic-ai-images";
import { perfectPrompts } from "./blog/perfect-prompts";

export const blogPosts: BlogPosts = {
  "1": aiImageGenerators,
  "2": choosingAiGenerator,
  "3": futureOfAiVisual,
  "4": realisticAiImages,
  "5": perfectPrompts,
};

export { aiImageGenerators, choosingAiGenerator, futureOfAiVisual, realisticAiImages, perfectPrompts };