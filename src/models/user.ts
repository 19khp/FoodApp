export interface UserProps {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  gender: boolean;
  image: string;
  registerDate: string;
  status: boolean;
  token: string;
  roles: [
    {
      id: number;
      name: string;
    },
  ];
}
