import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private db: AngularFireDatabase) {
    this.userForm = this.formBuilder.group({
      Name: new FormControl('Test'),
      Mobile: new FormControl('Test'),
      Gender: new FormControl('Test'),
      Address: this.formBuilder.group({
        DoorNo: new FormControl('Test'),
        Street: new FormControl('Test'),
        Landmark: new FormControl('Test'),
        City: new FormControl('Test'),
        State: new FormControl('Test'),
        Pin: new FormControl('Test')
      })
    });
  }
  doUpdateUser(form) {
    this.db.object('/usermaster/' + this.db.app.auth().currentUser.uid).set(form.value);
    this.db.app.auth().currentUser.updateProfile({ displayName: form.value.Name, photoURL: '' });
  }
  ngOnInit() {
  }

}
