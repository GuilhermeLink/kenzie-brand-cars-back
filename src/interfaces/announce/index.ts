import { Color } from "../../entities/entities/color";
import { Fuel } from "../../entities/entities/fuel";
import { Mark } from "../../entities/entities/mark";
import { Model } from "../../entities/entities/model";
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
  mark: Mark;
  model: Model;
  fuel: Fuel;
  color: Color;
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
  announceId: string;
  text: string;
  createdAt: Date;
  author: iUserRequest;
  announces?: IAnnounceRequest[];
}

export interface ICommentRequest {
  id: string;
  text: string;
  author: iUserRequest;
  createdAt: Date;
}
