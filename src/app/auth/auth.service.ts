import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  dob: string;
  role: string;
  familyName?: string;
  spouseInviteEmail?: string;
  familyInviteCode?: string;
  familyMembers?: FamilyMember[];
}

export interface FamilyMember {
  name: string;
  dob: string;
  role: string;
}

const HARDCODED_EMAIL = 'pppjohanni@gmail.com';
const HARDCODED_PASSWORD = 'password';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn = false;
  private _currentUser: UserProfile | null = null;

  constructor(private router: Router) {
    const stored = localStorage.getItem('familyAtlasUser');
    if (stored) {
      this._currentUser = JSON.parse(stored);
      this._isLoggedIn = true;
    }
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  get currentUser(): UserProfile | null {
    return this._currentUser;
  }

  login(email: string, password: string): boolean {
    if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
      this._isLoggedIn = true;
      this._currentUser = {
        email,
        firstName: 'Peter',
        lastName: 'Johanni',
        dob: '',
        role: 'husband',
      };
      localStorage.setItem('familyAtlasUser', JSON.stringify(this._currentUser));
      return true;
    }
    // Also check registered users
    const users: UserProfile[] = JSON.parse(localStorage.getItem('familyAtlasUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      this._isLoggedIn = true;
      this._currentUser = user;
      localStorage.setItem('familyAtlasUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  register(profile: UserProfile): void {
    const users: UserProfile[] = JSON.parse(localStorage.getItem('familyAtlasUsers') || '[]');
    const existing = users.findIndex(u => u.email === profile.email);
    if (existing >= 0) {
      users[existing] = profile;
    } else {
      users.push(profile);
    }
    localStorage.setItem('familyAtlasUsers', JSON.stringify(users));
    this._isLoggedIn = true;
    this._currentUser = profile;
    localStorage.setItem('familyAtlasUser', JSON.stringify(profile));
  }

  updateUser(profile: UserProfile): void {
    this._currentUser = profile;
    localStorage.setItem('familyAtlasUser', JSON.stringify(profile));
    const users: UserProfile[] = JSON.parse(localStorage.getItem('familyAtlasUsers') || '[]');
    const idx = users.findIndex(u => u.email === profile.email);
    if (idx >= 0) {
      users[idx] = profile;
    } else {
      users.push(profile);
    }
    localStorage.setItem('familyAtlasUsers', JSON.stringify(users));
  }

  logout(): void {
    this._isLoggedIn = false;
    this._currentUser = null;
    localStorage.removeItem('familyAtlasUser');
    this.router.navigate(['/']);
  }
}
