import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error parsing JSON for key ${key}`, error);
      return null;
    }
  }
  

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}