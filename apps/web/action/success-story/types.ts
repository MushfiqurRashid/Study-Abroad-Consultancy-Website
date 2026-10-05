export interface ApiSuccessStory {
  id: number;
  type: "image" | "video";
  title?: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}
