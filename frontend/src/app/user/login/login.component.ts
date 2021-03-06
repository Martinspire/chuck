import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string | null;
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
   }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      // valid
    }
  }
}
