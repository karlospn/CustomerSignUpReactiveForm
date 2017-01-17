import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Customer } from './customer';

@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent implements OnInit  {
    customer: Customer= new Customer();

    public ngOnInit(): void{
        console.log("onInit Hook");
    }

    save(customerForm: NgForm) {
        console.log(customerForm.form);
        console.log('Saved: ' + JSON.stringify(customerForm.value));
    }
 }
