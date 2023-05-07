import { iUserRequest } from "../user";

export interface IAnnounceRequest {
  id: string;
  year: number;
  km: number;
  price_fipe: number;
  price: number;
  description: string;
  image: string;
  withinFipe?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  softDeleted: boolean;
  publishedAt: boolean;
  checkFipeRange: void;
  owner: iUserRequest;
  mark: iMark;
  model: iModel;
  fuel: iFuel;
  color: iColor;
  gallery: iGallery;
  comments?: iComment[];
}

export interface iUserToken {
  id: string;
  admin: boolean;
  user: iUserRequest;
}

export interface iMark {
  id?: string;
  name: string;
  announces?: IAnnounceRequest[];
}

export interface iModel {
  id?: string;
  name: string;
  announces?: IAnnounceRequest[];
}

export interface iFuel {
  id?: string;
  type: string;
  announces?: IAnnounceRequest[];
}

export interface iColor {
  id?: string;
  name: string;
  announces?: IAnnounceRequest[];
}

export interface iGallery {
  id?: string;
  images: string[];
  announces?: IAnnounceRequest[];
}

export interface iComment {
  id?: string;
  content: string;
  announceId: string;
  text: string;
  createdAt: Date;
  author: iUserRequest;
  user: iUserRequest;
  announces?: IAnnounceRequest[];
}

export interface ICommentRequest {
  id: string;
  text: string;
  content: string;
  author: iUserRequest;
  createdAt: Date;
}
