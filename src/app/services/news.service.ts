import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private db: AngularFirestore) { }

  getNewstList() {
    /* return this.db.collection('products').valueChanges();*/
    return this.db.collection('news').snapshotChanges().pipe(
      map(docArray => {
        return docArray.map( doc => {
          console.log('doc.payload.doc:', doc.payload.doc);
          console.log('doc.payload.doc.data:', doc.payload.doc.data());
          return({
           id: doc.payload.doc.id,
           ...doc.payload.doc.data()
          });
        });
      })
    );
   }
}
