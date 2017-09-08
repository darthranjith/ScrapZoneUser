import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../shared/loader/loader.component';

import swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  host: { '(document:click)': 'handleClick($event)' }
})
export class SignupComponent implements OnInit {

  email: string;
  password: string;
  cpassword: string;
  showSpinner: boolean;
  showOption: boolean;

  signupForm: FormGroup;

  @ViewChild('signuppopup') private signuppopup: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.showSpinner = false;
    this.showOption = false;

    this.signupForm = this.formBuilder.group({
      Email: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
      CPassword: new FormControl('', Validators.required),
      Terms: new FormControl(false, Validators.requiredTrue)
    });
  }

  ngOnInit() {

  }

  private toggleOption() {
    this.showOption = !this.showOption;
  }
  private handleClick(event) {
    if (this.showOption) {
      let clickedComponent = event.target;
      if (clickedComponent !== this.signuppopup.nativeElement) {
        this.showOption = false;
      }
    }
  }

  doSignup(form: any) {
    this.showSpinner = true;
    this.authService.signupUser(form.value.Email, form.value.Password)
      .then(res => {
        this.showSpinner = false;
        swal('hurray !', "User created succesfully!", 'success').then(() => {
          this.router.navigateByUrl("");
        });
      })
      .catch(err => {
        this.showSpinner = false;
        swal('Oops...', err.message, 'error');
      });
  }

}
