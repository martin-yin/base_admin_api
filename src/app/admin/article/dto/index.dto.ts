export class UpdateArticleDto {
  id: number;
  title: string;
  desc: string;
  cover: string;
  type: string;
  status: number;
  categoryId: number;
  carouselImages: string;
  content: string;
  autherId: number;
  source: string;
  tagIds: string;
  viewCount: number;
  collectCount: number;
  marcoCode: string;
}

export class CreateArticleDto {
  title: string;
  desc: string;
  cover: string;
  type: string;
  status: number;
  categoryId: number;
  carouselImages: string;
  content: string;
  autherId: number;
  source: string;
  tagIds: string;
  viewCount: number;
  collectCount: number;
  marcoCode: string;
}
