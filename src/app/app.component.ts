import {Component, OnInit} from '@angular/core';
import {AsyncValidatorFn, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];

  // @ts-ignore
  signupForm: FormGroup;
  forbiddenUsernames = ['Kosar', 'Gisoo'];

  constructor() {
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        // @ts-ignore
        'email': new FormControl(null, [Validators.required, Validators.email], this.isRegisteredEmail)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    this.signupForm.setValue({
      userData:{
        username:'gisoo',
        email: 'gisoo1400@gmail.com'
      },
      gender:'female',
      hobbies:[]
    })

    this.signupForm.patchValue({
      userData:{
        username: 'kosar'
      }
    })



    /*this.signupForm.statusChanges.subscribe(
      status => {
        console.log(status);
      }
    );*/
    /*this.getUsernameControl().valueChanges.subscribe(
      value =>{console.log(value);}
    )*/
  }

  getUsernameControl() {
    return (<FormControl>this.signupForm.get('userData.username'));
  }

  isRegisteredEmail(control: FormControl): (Promise<any> | Observable<any>) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          return resolve({'emailIsRegisteredBefore': true});
        } else {
          return resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } | null {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }


  onAddHobby() {
    const hobbyControl = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(hobbyControl)
  }

  getHobbies() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  getEmailControl() {
    return (<FormControl>this.signupForm.get('userData.email'));
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset({
      'gender':'male'
    });
  }
}


// this.signupForm = new FormGroup({});


/*export class AppComponent {

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
    /!*this.signedUpForm.setValue({
      userData:  {
        username: suggestedName,
        email: ''
      },
      secret: 'pet',
      questionArea: "",
      gender: "male"
    })*!/
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
*/
