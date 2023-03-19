import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Subscription_Process';
  private stepper!: Stepper;

  public addForm1!: FormGroup;
  public addForm2!: FormGroup;
  public addForm3!: FormGroup;


  public submitted1 = false;
  public submitted2 = false;
  public submitted3 = false;

  public Duration !: any;
  public GB!: any;
  public Payement!: any;
  public CardNumer!: any;
  public ExpDate!: any;
  public Code!: any;
  public Email!: any;
  public FlexCheck!: any;
  public Totalprice!: any;

  public subscription_plans: Array<any> = [
    {
      "duration_months": 3,
      "price_usd_per_gb": 3
    },
    {
      "duration_months": 6,
      "price_usd_per_gb": 2.5
    },
    {
      "duration_months": 12,
      "price_usd_per_gb": 2
    }

  ];

  constructor(private fb: FormBuilder) {     //Reactive form declaration
    this.addForm1 = this.fb.group({
      InputDuration: ['12', Validators.required],
      InputGB: ['5', Validators.required],
      InputPayment: ['no', Validators.required],

    });

    this.addForm2 = this.fb.group({

      InputCardNumber: ['', Validators.required],
      InputExpDate: ['', Validators.required],
      InputCode: ['', Validators.required],

    });


    this.addForm3 = this.fb.group({


      InputEmail: ['', Validators.required],
      flexCheck: ['', Validators.required],
    });
  }

  ngOnInit(): void {


    this.stepper = new Stepper(document.querySelector('#stepper1')!, {
      linear: false,
      animation: true
    })
    this.Totalprice = 10;
    this.SelectedItems();


  }

  SelectedItems() {


    this.Duration = this.addForm1.value.InputDuration;
    this.GB = this.addForm1.value.InputGB;
    this.Payement = this.addForm1.value.InputPayment;
    this.CardNumer = this.addForm2.value.InputCardNumber;
    this.ExpDate = this.addForm2.value.InputExpDate;
    this.Code = this.addForm2.value.InputCode;
    this.Email = this.addForm3.value.InputEmail;
    this.FlexCheck = this.addForm2.value.flexCheck;

    this.CalculPrice();
  }



  nextStep() {
    this.stepper.next();
  }

  prevStep() {
    this.stepper.previous();
  }
  get formControl1() { return this.addForm1.controls; }

  ValidateStep1() {
    this.submitted1 = true;

    // stop here if form is invalid
    if (this.addForm1.invalid) {
      return;
    }
    else {
      this.nextStep();
    }

  }
  get formControl2() { return this.addForm2.controls; }

  ValidateStep2() {
    this.submitted2 = true;

    // stop here if form is invalid
    if (this.addForm2.invalid) {
      return;
    }
    else {
      this.nextStep();
    }

  }

  get formControl3() { return this.addForm3.controls; }


  ValidateStep3() {
    this.submitted3 = true;

    // stop here if form is invalid
    if (this.addForm3.invalid) {
      return;
    }
    else {
      this.nextStep();
    }

  }


  CalculPrice() {
    if (this.Duration == 3) {

      this.Totalprice = this.GB * 3;
      console.log("totale price", this.Totalprice);
    }
    if (this.Duration == 6) {

      this.Totalprice = this.GB * 2.5;
      console.log("totale price", this.Totalprice);
    }
    if (this.Duration == 12 && this.Payement == 'no') {

      this.Totalprice = this.GB * 2;
      console.log("totale price", this.Totalprice);
    }

    else if (this.Duration == 12 && this.Payement == 'yes') {

      this.Totalprice = (this.GB * 2) * 10 / 100;
      console.log("totale price", this.Totalprice);
    }

  }


}
