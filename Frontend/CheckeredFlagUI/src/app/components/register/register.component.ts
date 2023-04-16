import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Director } from 'src/app/models/director.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  director = new Director();
  email = new FormControl('', [Validators.required, Validators.email]);
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup:FormGroup;

  constructor() {



    this.firstFormGroup = new FormGroup({
      firstCtrl: new FormControl('', Validators.required),
      secondCtrl: new FormControl('', Validators.required)
    });
    this.secondFormGroup = new FormGroup({
     // thirdCtrl: new FormControl('', Validators.required),
      fourthCtrl: new FormControl('', Validators.required)
    });
    this.thirdFormGroup = new FormGroup({
      fifthCtrl: new FormControl('', Validators.required),
      //sixthCtrl: new FormControl('', Validators.required)
    });

}




getErrorMessage() {
  if (this.email.hasError('required')) {
    return 'You must enter a value';
  }

  return this.email.hasError('email') ? 'Not a valid email' : '';
}
}
