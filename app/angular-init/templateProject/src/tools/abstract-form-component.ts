import {AbstractControl, FormGroup} from "@angular/forms";

export abstract class AbstractFormComponent {
  abstract form: FormGroup

  getControl(control: AbstractControl | string): AbstractControl {
    if (typeof control === 'string') {
      const c: AbstractControl | null = this.form.get(control);
      if (!c) {
        throw new Error('Le control est introuvable');
      }
      control = c;
    };
    return control;
  }

  hasInteraction(control: AbstractControl | string): boolean {
    control = this.getControl(control);
    return (control.touched || control.dirty)
  }

  isInvalid(control: AbstractControl | string): boolean {
    control = this.getControl(control);
    return this.hasInteraction(control) && control.invalid
  }

  hasError(control: AbstractControl | string, errorCode: string): boolean {
    control = this.getControl(control);
    return this.hasInteraction(control) && control.hasError(errorCode)
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) this.onSubmit$()
  }

  abstract onSubmit$(): void
}
