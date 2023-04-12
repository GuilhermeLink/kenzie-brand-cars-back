import { IAnnounceRequest, iComment } from "../announce";

export interface iUserRequest {
  id?: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  birthDate: Date;
  description: string;
  type: string;
  admin?: boolean;
  address: iAddress;

  announces?: IAnnounceRequest[];
  comments?: iComment[];
}

export interface iAddress {
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  user?: iUserRequest;
}

export interface iUserLogin {
  email: string;
  password: string;
}
