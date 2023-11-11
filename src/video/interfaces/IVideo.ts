export interface IVideo {
  id: number;
  hash: string;
  url: string;
  mimeType: string;
  duration: number;
  createAt?: Date;
  updateAt?: Date;
}
