import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Customer } from './customer';
import { ratingRange } from './validations/customer.validation.range';
import { matchPasswordRange } from './validations/customer.validation.match';



@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent implements OnInit  {
    private customerForm : FormGroup;
    private customer: Customer= new Customer();


    constructor(private fb: FormBuilder) {}

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
            sendCatalog: true
        });

        this.customerForm.patchValue({
            email: 'john.reed@mail.com',
            phone: '+3333452199',
            sendCatalog: true
        });
    }

    private save(): void {
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
 }
