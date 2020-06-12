import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  nameValid = true;
  emailValid = true;
  subjectValid = true;
  questionValid = true;
  formValid = false;

  msgIfValid = 'Your data is Valid';

  constructor() { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', Validators.required),
      question: new FormControl('', Validators.required)
    });
  }

  onSubmit(){
    this.nameValid = true;
    this.emailValid = true;
    this.subjectValid = true;
    this.questionValid = true;
    this.formValid = false;
    
    if(this.contactForm.controls.name.status != "VALID"){
      this.nameValid = false;
    }
    if(this.contactForm.controls.email.status != "VALID"){
      this.emailValid = false;
    }
    if(this.contactForm.controls.subject.status != "VALID"){
      this.subjectValid = false;
    }
    if(this.contactForm.controls.question.status != "VALID"){
      this.questionValid = false;
    }

    if(this.contactForm.status == "VALID"){
      this.formValid = true;
    }
  }
}
