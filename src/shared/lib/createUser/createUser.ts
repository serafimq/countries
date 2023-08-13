import { User } from "@/entities/User";

export function generateUser(): User {

    const id = generateId();
    const username = generateUsername();
    const age = generateAge();
  
    return {
      id,
      username,
      age
    };
  
}

function generateId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let i = 0; i < 7; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    return id;
  }
  
  const names = ['John', 'Mike', 'Lisa', 'David'];
  
  function generateUsername(): string {
    return names[Math.floor(Math.random() * names.length)];
  }
  
  function generateAge(): number {
    return Math.floor(Math.random() * 99) + 1;
  }