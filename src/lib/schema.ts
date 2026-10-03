import { z } from "zod";

const ClassResultSchema = z.object({
  label: z.string(),
  students: z.number().int().positive(),
  passed: z.number().int().nonnegative().optional(),
  merit: z.number().int().nonnegative().optional(),
  passPercent: z.number().min(0).max(100),
});

export const AchievementSchema = z.object({
  id: z.string(),
  type: z.enum(["academic", "sports"]),
  title: z.string(),
  date: z.string().nullable(),
  summary: z.string().nullable().optional(),
  classes: z.array(ClassResultSchema).optional(),
  results: z.array(z.object({ event: z.string(), position: z.string() })).optional(),
  sourceImage: z.string().optional(),
  verified: z.boolean(),
  usable: z.boolean().optional(),
  note: z.string().optional(),
});

export const NoticeSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  body: z.string(),
  category: z.string().optional(),
  verified: z.boolean(),
  usable: z.boolean().optional(),
  note: z.string().optional(),
});

export const GalleryItemSchema = z.object({
  id: z.string(),
  section: z.enum(["campus", "events", "sports", "brand"]),
  src: z.string(),
  raw: z.string().optional(),
  alt: z.string().min(10, "alt text must actually describe the image"),
  caption: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  verified: z.boolean(),
  usable: z.boolean(),
  note: z.string().optional(),
});

export type Achievement = z.infer<typeof AchievementSchema>;
export type ClassResult = z.infer<typeof ClassResultSchema>;
export type Notice = z.infer<typeof NoticeSchema>;
export type GalleryItem = z.infer<typeof GalleryItemSchema>;
