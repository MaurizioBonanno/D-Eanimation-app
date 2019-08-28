import { HelperService } from './helper.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../interfaces/users';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  utente: any;

  constructor(private angularFireAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private googlePlus: GooglePlus,
              private helperService: HelperService) {
    this.angularFireAuth.authState.subscribe( user => {
      if (user ) {
        this.registerUser(user);
      } else {
        this.router.navigate(['/login']);
      }
    });
   }


   async googleLoginWeb() {
    try {
      const result = await this.angularFireAuth.auth.signInWithRedirect( new auth.GoogleAuthProvider());
      return result;
    } catch ( error ) {
      throw new Error(error);
    }
  }

  async googleLoginNative() {
    try {
      // tslint:disable-next-line:prefer-const
      let result = await this.googlePlus.login({
        webClientId: '872799106461-icagohl987fju4v6e2mrv7fl0h72dh0i.apps.googleusercontent.com',
        offline: true
      });
      // tslint:disable-next-line: deprecation
      await this.angularFireAuth.auth.signInAndRetrieveDataWithCredential(auth.GoogleAuthProvider.credential(result.idToken));
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }


  async registerUser( user ) {

    await this.afs.doc(`profili/${user.id}`).ref.get().then( dc => {

      if (dc.exists) {
        this.utente = dc.data();
      } else {
        const us: Users = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          roles: {
            admin: false,
            editor: false,
            owner: false,
            subscriber: true
          }
        };
        return this.afs.doc(`profili/${user.uid}`).set(us, {merge: true});
      }

    });
  }

  async logOut() {
    try {
          const result = this.angularFireAuth.auth.signOut();
          if (this.helperService.isNativePlatform()) {
            await this.googlePlus.logout();
          }
          return result ;
         } catch (error) {
         throw new Error(error);
       }
  }

  getLoggedInUser() {
    return this.angularFireAuth.authState;
  }

  getMyUtente() {
    try {
     if (this.utente) {
       return this.utente;
     }
    } catch (error) {
      throw new Error(error);
    }
  }

  getMyRoles() {
    try {
      if (this.utente) {
        return this.utente.roles;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  isAdmin() {
    return this.utente.roles.admin;
  }


}
