import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  isAuthentication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
  ) {
    const token = this.getToken();
    if (token) {
      this.updateToken(true);
    }
  }

  updateToken(status: boolean) {
    this.isAuthentication.next(status);
  }

  setToken(token: string) {
    this.updateToken(true);
    localStorage.setItem(constants.CURRENT_TOKEN, token);
  }

  getToken(): string | null {
    return localStorage.getItem(constants.CURRENT_TOKEN);
  }

  removeToken(): void {
    this.updateToken(false);
    localStorage.removeItem(constants.CURRENT_TOKEN);
  }


}


// RESUME THIS TOKEN CONFIGURATION(TIME: 47:48)
// https://www.youtube.com/watch?v=AGc8VVQL5sY&list=PL5An65zbtDSXYj0k8ZE4Y5jadoRU7-uJ6