export interface iUserRegister {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  birthDate: Date;
  description: string;
  type: string;
  address: iAddress;
}

export interface iAddress {
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}
