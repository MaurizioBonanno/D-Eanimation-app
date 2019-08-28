import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseAuthService } from './firebase-auth.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ProfiliService {

  constructor(private auhtService: FirebaseAuthService, private db: AngularFirestore) { }

  async getProfile(uid: string) {
    try {

      const result = await this.db.collection('profili').doc(uid).ref.get();
      if (result.exists) {
        return result.data();
      } else {
        throw new Error('utente non esistente');
      }

    // tslint:disable-next-line: one-line
    }catch (error){
       throw new Error(error);
    }
  }
}
