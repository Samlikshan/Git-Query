export interface Friend {
  id: number;
  userId: number;
  login: string;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
