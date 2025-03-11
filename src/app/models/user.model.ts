export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  specialty?: string;
  isDoctor: boolean;
  role: string; // Added role for role-based filtering
}
