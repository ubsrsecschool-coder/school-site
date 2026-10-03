import { z } from "zod";
import {
  AchievementSchema,
  GalleryItemSchema,
  NoticeSchema,
  type Achievement,
  type GalleryItem,
  type Notice,
} from "./schema";
import { partitionByGate, withheldReason } from "./gate";
import achievementsJson from "../../content/achievements.json";
import galleryJson from "../../content/gallery.json";
import noticesJson from "../../content/notices.json";

function parseFile<T extends z.ZodType>(schema: T, data: unknown, file: string): z.infer<T>[] {
  const result = z.array(schema).safeParse(data);
  if (!result.success) {
    throw new Error(
      `content/${file} failed validation. Fix the JSON, do not loosen the schema.\n${z.prettifyError(result.error)}`,
    );
  }
  return result.data;
}

const allAchievements: Achievement[] = parseFile(AchievementSchema, achievementsJson, "achievements.json");
const allGallery: GalleryItem[] = parseFile(GalleryItemSchema, galleryJson, "gallery.json");
const allNotices: Notice[] = parseFile(NoticeSchema, noticesJson, "notices.json");

const achievementsGate = partitionByGate(allAchievements);
const galleryGate = partitionByGate(allGallery);
const noticesGate = partitionByGate(allNotices);

export const achievements = achievementsGate.published;
export const gallery = galleryGate.published;
export const notices = noticesGate.published;

export const academicResults = achievements.filter((a) => a.type === "academic" && a.classes?.length);
export const sportsAchievements = achievements.filter((a) => a.type === "sports");

export const galleryBySection = (section: GalleryItem["section"]) =>
  gallery.filter((item) => item.section === section);

export const galleryItem = (id: string): GalleryItem | undefined =>
  gallery.find((item) => item.id === id);

export const withheld = [
  ...achievementsGate.withheld.map((x) => ({ file: "achievements.json", id: x.id, reason: withheldReason(x) })),
  ...noticesGate.withheld.map((x) => ({ file: "notices.json", id: x.id, reason: withheldReason(x) })),
  ...galleryGate.withheld.map((x) => ({ file: "gallery.json", id: x.id, reason: withheldReason(x) })),
];
