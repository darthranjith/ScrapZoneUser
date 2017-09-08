import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable()
export class FirebaseService {

  token: string;
  constructor(
    private http: Http,
    private authSrv: AuthService,
    private db: AngularFireDatabase) {
    this.token = this.authSrv.getToken();
    console.log(db.list('/usermaster'));

  }

  setUserProfile(userForm: any) {
    return this.http.put('https://scrapzone-240c7.firebaseio.com/usermaster/' + this.authSrv.getUID() + '.json?auth=' + this.authSrv.getToken(), userForm);
  }

}
