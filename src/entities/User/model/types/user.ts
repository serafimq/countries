interface Geo {
    lat: string;
    lng: string; 
  }
  
  interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
  }
  
  interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
  }
  
 export interface FetchUser {
    id: number;
    name: string;
    username: string;
    email: string;  
    address: Address;
    phone: string;
    website: string;
    company: Company;
  }

export interface User {
    id: string;
    username: string;
    age: number;
}

export interface UsersSchema {
    users: User[];
    isLoading: boolean,
    error?: string,
    data?: FetchUser[],
}