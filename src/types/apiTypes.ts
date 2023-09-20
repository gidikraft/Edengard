export type NotificationResponse = NotificationItem[];

export type NotificationItem = {
  body: string,
  id: number,
  title: string,
  userId: number,
  name: string;
}

export type UsersResponse = Users[];

type Users =  {
  id: number,
  name: string;
  username: string;
  email: string;
  address: AddressType,
  phone: string,
  website: string
  company: CompanyType
};

type CompanyType = {
  name: string,
  catchPhrase: string,
  bs: string
};

type AddressType = {
  street: string;
  suite: string;
  city: string,
  zipcode: string,
  geo: Coordinates
};

type Coordinates = {
  lat: string,
  lng: string
};
