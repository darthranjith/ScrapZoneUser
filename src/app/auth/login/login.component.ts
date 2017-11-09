import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { AngularFireDatabase } from 'angularfire2/database';

import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  host: { '(document:click)': 'handleClick($event)' }
})

export class LoginComponent implements OnInit {
  email: string;
  password: string;
  showOption: boolean;
  showSpinner: boolean;
  loginForm: FormGroup;

  @ViewChild('loginpopup') private loginpopup: ElementRef;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private db: AngularFireDatabase) {
    this.showOption = false;

    this.loginForm = this.formBuilder.group({
      Email: new FormControl('iam@varanjith.com', Validators.required),
      Password: new FormControl('', Validators.required)
    });
  }

  private handleClick(event) {
    if (this.showOption) {
      let clickedComponent = event.target;
      if (clickedComponent !== this.loginpopup.nativeElement) {
        this.showOption = false;
      }
    }
  }

  private toggleOption() {
    this.showOption = !this.showOption;
  }
  ngOnInit() {
  }

  doLogin(form: any) {
    this.showSpinner = true;
    this.db.app.auth().signInWithEmailAndPassword(form.value.Email, form.value.Password).then(res => {
      console.log(res);

      this.authService.setUID(res.uid);
      this.showSpinner = false;
      if (res.displayName === null) {
        this.router.navigateByUrl("/profile", );
      }
      else {
        this.router.navigateByUrl("/dashboard");
      }
    })
      .catch(err => {
        this.showSpinner = false;
        swal('Oops...', err.message, 'error');
      });
  }

}
