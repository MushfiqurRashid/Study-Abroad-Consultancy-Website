/** University type matching what the backend returns */
export interface ApiUniversity {
  id: number;
  name: string;
  description: string;
  location: string;
  country: string;
  established?: number;
  type: "public" | "private";
  ranking?: number;
  tuitionFee?: string;
  website?: string;
  email?: string;
  phone?: string;
  image?: string;
  programs: string[];
  facilities: string[];
  languageRequirements: string[];
  admissionRequirements: string[];
  scholarships: string[];
  whyChoose: string[];
  intakes?: string;
  applicationDeadline?: string;
  accommodation?: string;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}
