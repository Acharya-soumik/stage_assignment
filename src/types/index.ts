export interface Story {
  id: string;
  url: string;
}

export interface User {
  userId: number;
  username: string;
  previewUrl: string;
  stories: Story[];
}
