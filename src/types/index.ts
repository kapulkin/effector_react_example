export interface UserProfile {
  name: string;
  trainingPlan: string;
}

export interface UserState {
  profile: UserProfile;
  isLoading: boolean;
  error: string | null;
} 