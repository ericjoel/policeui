// Angular
import { FormGroup, FormControl } from '@angular/forms';

export class FormValidator {

  form: FormGroup;
  formErrors = {};
  validationMessages = {};

  /**
   * Display meesages in a Form
   *
   * @param {*} [data]
   * @returns
   * @memberof FormValidator
   */
  onValueChanged(data?: any) {
    if (!this.form) { return; }
    const form = this.form;

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.controls[field];

        if (control && control.touched && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] = messages[key];
            }
          }
        }
      }
    }
  }

}
