/** Review type matching what the backend returns */
export interface ApiReview {
  id: number;
  name: string;
  university: string;
  quote: string;
  rating: number;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}
