import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {stringify} from "@angular/compiler/src/util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // @ts-ignore
  @ViewChild('f') signedUpForm: NgForm;
  defaultSelectOption = 'pet';
  answer = ''
  genders = ['male', 'female'];
  // @ts-ignore
  user =  {
    username : '',
    email : "",
    secretQuestion: "",
    answer: "",
    gender: ""
  }
  submitted = false;

  suggestUsername() {
    const suggestedName = "SuperUser";
    /*this.signedUpForm.setValue({
      userData:  {
        username: suggestedName,
        email: ''
      },
      secret: 'pet',
      questionArea: "",
      gender: "male"
    })*/
    this.signedUpForm.form.patchValue({
      userData: {
        username: suggestedName,
      }
    })
  }

  onSubmit() {
    this.submitted = true;
    this.user.username = this.signedUpForm.value.userData.username;
    this.user.email = this.signedUpForm.value.userData.email;
    this.user.secretQuestion = this.signedUpForm.value.secret;
    this.user.answer = this.signedUpForm.value.questionArea;
    this.user.gender = this.signedUpForm.value.gender;
    this.signedUpForm.reset();
  }
}
