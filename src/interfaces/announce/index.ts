import { iUserRequest } from "../user";

export interface IAnnounceRequest {
  year: number;
  km: number;
  price_fipe: number;
  price: number;
  description: string;
  image: string;
  withinFipe?: boolean;

  owner: iUserRequest;

  mark: iMark;
  model: iModel;
  fuel: iFuel;
  color: iColor;
  gallery: iGallery;
  comments?: iComment[];
}

export interface iMark {
  id?: number;
  name: string;
  announces?: IAnnounceRequest[];
}

export interface iModel {
  id?: number;
  name: string;
  announces?: IAnnounceRequest[];
}

export interface iFuel {
  id?: number;
  type: string;
  announces?: IAnnounceRequest[];
}

export interface iColor {
  id?: number;
  name: string;
  announces?: IAnnounceRequest[];
}

export interface iGallery {
  id?: number;
  images: string[];
  announces?: IAnnounceRequest[];
}

export interface iComment {
  id?: number;
  content: string;
  user: iUserRequest;
  announces?: IAnnounceRequest[];
}
