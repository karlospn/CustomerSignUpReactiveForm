import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';

import { Customer } from './customer';
import { ratingRange } from './validations/customer.validation.range';
import { matchPasswordRange } from './validations/customer.validation.match';

import {errorMessageService} from './services/errorMessageService';

import 'rxjs/add/operator/debounceTime';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html',
    providers: [errorMessageService]
})
export class CustomerComponent implements OnInit  {
    private customerForm : FormGroup;
    private customer: Customer= new Customer();

    private emailMessage: string;
    private firstNameMessage: string;
    private lastNameMessage: string;
    private ratingMessage: string;

    private errorMessages: JSON;
    get addressFormArray(): FormArray {
        return <FormArray>this.customerForm.get('addressFormArray');
    }

    constructor(private fb: FormBuilder, private _errorMessageService: errorMessageService) {}

    public ngOnInit(): void{

        this.customerForm = this.fb.group({
            firstName : ['John', [Validators.required, Validators.minLength(3)]],
            lastName : ['Reed',[Validators.required, Validators.maxLength(50)]],
            emailGroup : this.fb.group({
                email: [null, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+")]],
                emailConfirmation : [null, [Validators.required]]
            }, {validator: matchPasswordRange}),
            phone : [''],
            notification: ['email'],
            rating: [5, ratingRange(1, 10)],
            sendCatalog: false,
            addressFormArray : this.fb.array([
               this.buildAdress() 
            ]) 
        });

        this._errorMessageService.load().subscribe((data : JSON) => {
            this.errorMessages = data
        },
        error => {});

        this.setWatchers();

    }

    private setWatchers() : void {
        this.customerForm.get('notification').valueChanges.subscribe(value => {
           this.setNotification(value);    
        });

        this.customerForm.get('emailGroup.email').valueChanges.debounceTime(1000).subscribe(value => {
            this.setMessage(this.customerForm.get('emailGroup.email'), 'emailGroup.email', 'emailMessage')
        });

        this.customerForm.get('firstName').valueChanges.subscribe(value => {
            this.setMessage(this.customerForm.get('firstName'), 'firstName', 'firstNameMessage')
        });

        this.customerForm.get('lastName').valueChanges.subscribe(value => {
            this.setMessage(this.customerForm.get('lastName'), 'lastName', 'lastNameMessage')
        });

        this.customerForm.get('rating').valueChanges.subscribe(value => {
            this.setMessage(this.customerForm.get('rating'), 'rating', 'ratingMessage')
        });
    }

    private setNotification(type: string): void {
        var phoneControl = this.customerForm.get('phone');
        if(type === 'text')
        {
              phoneControl.setValidators([Validators.required]);
        }
        else{
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
    }


    private setMessage(c: AbstractControl, controlName: string, errorProperty : string ) : void {
        this[errorProperty] = '';
        if((c.touched || c.dirty) && c.errors ){
           this[errorProperty] = Object.keys(c.errors).map(key => this.errorMessages[controlName][key]).join(' ');
        }
    }


    private buildAdress(): FormGroup {
        return  this.fb.group({
                addressType : ['home'],
                street1 : ['', Validators.required],
                street2 : '',
                city: ['', Validators.required],
                state: ['', Validators.required],
                zip: ['', Validators.required]
            })
    }

    private addAddress() : void {
        this.addressFormArray.push(this.buildAdress());
    }

    private save() : void {

    }
 }
