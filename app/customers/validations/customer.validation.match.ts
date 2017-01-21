import { AbstractControl, ValidatorFn } from '@angular/forms';

export function matchPasswordRange (c:AbstractControl) : {[key: string]: boolean} | null {
        var pass = c.get('email');
        var passConfirm = c.get('emailConfirmation');
        if((pass.value === passConfirm.value) || (pass.pristine || passConfirm.pristine))
            return null
        return {'match' : true};
    }
