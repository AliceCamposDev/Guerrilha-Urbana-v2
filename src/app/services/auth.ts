import { Injectable } from '@angular/core';
import {
  Auth as FirebaseAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})

export class Auth {
  constructor(private auth: FirebaseAuth) {}

  async register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<UserCredential | null> {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password,
      );
      return user;
    } catch (e) {
      console.error('Erro no registro:', e);
      return null;
    }
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<UserCredential | null> {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      console.error('Erro no login:', e);
      return null;
    }
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
