import { Announce } from "../../entities/entities/announce";
import { Comment } from "../../entities/entities/comment";
import { IAnnounceRequest, iComment } from "../announce";

export interface iUserRequest {
  id?: string;
  name: string;
  email: string;
  password: string;
  reset_token: string;
  hashPassword: () => void;
  cpf: string;
  phone: string;
  birthDate: Date;
  description: string;
  type: string;
  admin?: boolean;
  address: iAddress;

  announces?: Announce[];
  comments?: Comment[];
}

export interface iAddress {
  id?: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  complement: string;
  zipCode: string;
  user?: iUserRequest;
}

export interface iUserLogin {
  email: string;
  password: string;
}

export interface iUserUpdateRequest {
  name?: string;
  email?: string;
  password?: string;
  cpf?: string;
  phone?: string;
  birthDate?: Date;
  description?: string;
  type?: string;
  admin?: boolean;
  address?: iAddress;
}

export interface iSendEmailRequest {
  to: string,
  subject: string,
  text: string
}