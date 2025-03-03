import { FormGroup } from "@angular/forms";

export const validateFormField = (form: FormGroup, field: string): boolean => {
    return (form.get(field)?.invalid && form.get(field)?.touched) || false;
}