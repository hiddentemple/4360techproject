import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {
  ContactModel,
  EmailModel,
  PhoneEmailCategory,
  PhoneModel,
  urlType,
  WebpageModel
} from '@hiddentemple/api-interfaces';
import {BreakpointService} from '../../../core/layout/breakpoint.service';
import {DeleteConfirmationComponent} from '../delete-confirmation/delete-confirmation.component';
import {MatDialog} from '@angular/material/dialog';


export const PhoneRegex = /[0-9]{10}/;
export const PhoneValidator = Validators.pattern(PhoneRegex); // TODO validate length and numeric

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styles: []
})
export class ContactFormComponent implements OnInit, OnChanges {
  contactForm: FormGroup;
  isHandset = false;
  showNotes = false;

  @Input() contact: ContactModel;
  @Output() submitContact = new EventEmitter<ContactModel>();

  get phoneCategories(): PhoneEmailCategory[] { return Object.values(PhoneEmailCategory); }
  get emailCategories(): PhoneEmailCategory[] {
    return Object.values(PhoneEmailCategory).filter(category => category !== PhoneEmailCategory.FAX);
  }
  get websiteCategories(): urlType[] { return Object.values(urlType); }

  get emailFormArray(): FormArray { return this.contactForm.controls.emails as FormArray; }
  get phoneFormArray(): FormArray { return this.contactForm.controls.phones as FormArray; }
  get webpagesFormArray(): FormArray { return this.contactForm.controls.webpages as FormArray; }
  get firstNameFormControl(): FormControl { return this.contactForm.controls.firstName as FormControl; }
  get lastNameFormControl(): FormControl { return this.contactForm.controls.lastName as FormControl; }
  get companyFormControl(): FormControl { return this.contactForm.controls.company as FormControl; }
  get notesFormControl(): FormControl { return this.contactForm.controls.notes as FormControl; }
  get jobTitleFormControl(): FormControl { return this.contactForm.controls.jobTitle as FormControl; }
  get departmentFormControl(): FormControl { return this.contactForm.controls.department as FormControl; }
  get organizationFormControl(): FormControl { return this.contactForm.controls.organization as FormControl; }
  get genderFormControl(): FormControl { return this.contactForm.controls.gender as FormControl; }

  constructor(
    private fb: FormBuilder,
    private breakpointService: BreakpointService,
    private dialog: MatDialog
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.breakpointService.isHandset$().subscribe((matches: boolean) => this.isHandset = matches);
    if (this.contact){
      this.setContact();
    }
  }

  ngOnChanges({ contact }: SimpleChanges) {
    this.contact = contact.currentValue;
    this.setContact();
  }

  private initForm(): void {
    this.contactForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      company: new FormControl('', [Validators.maxLength(150)]),
      jobTitle: new FormControl('', [Validators.maxLength(50)]),
      department: new FormControl('', [Validators.maxLength(50)]),
      organization: new FormControl('', [Validators.maxLength(50)]),
      gender: new FormControl('', [Validators.maxLength(50)]),
      notes: new FormControl('', [Validators.maxLength(250)]),
      emails: this.fb.array([]),
      phones: this.fb.array([]),
      webpages: this.fb.array([])
    });
  }


  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Contact Form Submit: ', this.contactForm.value);
      const contact: ContactModel = this.contact ? { id: this.contact.id, ...this.contactForm.value} : this.contactForm.value;
      this.submitContact.emit(contact);
    } else {
      console.error('Try to submit when form is invalid.', this.contactForm);
    }
  }

  setContact() {
    if (!this.contact) { return; }
    this.initForm();
    console.log('Setting this.contact to', this.contact);
    this.firstNameFormControl?.setValue(this.contact.firstName);
    this.lastNameFormControl?.setValue(this.contact.lastName);
    this.companyFormControl?.setValue(this.contact.company);
    this.jobTitleFormControl?.setValue(this.contact.jobTitle);
    this.departmentFormControl?.setValue(this.contact.department);
    this.organizationFormControl?.setValue(this.contact.organization);
    this.genderFormControl?.setValue(this.contact.gender);
    this.notesFormControl?.setValue(this.contact.notes);
    if (this.contact.notes){
      this.showNotes = true;
    }
    Object.values(this.contact.emails).forEach(
      (email: EmailModel) => this.emailFormArray.push(this.initEmail(email.address, email.category))
    );
    Object.values(this.contact.phones).forEach(
      (phone: PhoneModel) => this.phoneFormArray.push(this.initPhone(phone.phoneNumber, phone.category))
    );
    Object.values(this.contact.webpages).forEach(
      (webpage: WebpageModel) => this.webpagesFormArray.push(this.initWebpage(webpage.url, webpage.type))
    );
  }

  /** First Name **/
  firstNameHasRequiredError(): boolean {
    return this.firstNameFormControl.hasError('required') && !this.firstNameHasRequiredError;
  }

  firstNameHasMaxLengthError(): boolean {
    return this.firstNameFormControl?.hasError('maxLength');
  }

  /** Last Name **/
  lastNameHasRequiredError(): boolean {
    return this.lastNameFormControl?.hasError('required') && !this.lastNameHasRequiredError;
  }

  lastNameHasMaxLengthError(): boolean {
    return this.lastNameFormControl?.hasError('maxLength');
  }

  /** Notes **/
  notesHasMaxLengthError(): boolean {
    return this.lastNameFormControl?.hasError('maxLength');
  }

   /** Email **/
  addEmailInput(): void { this.emailFormArray.push(this.initEmail()); }
  removeEmailInput(i: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.emailFormArray.removeAt(i);
      }
    });
  }
  hasEmails(): boolean { return this.emailFormArray.length > 0; }

  initEmail(address: string = '', category: PhoneEmailCategory | string = '', isPrimary: boolean = false): FormGroup {
    return this.fb.group({
      address: [address, [Validators.email, Validators.required]],
      category: [category, [Validators.required]],
      isPrimary: [isPrimary]
    });
  }

  getEmailCategory(i: number): FormControl {
    return this.emailFormArray[i].controls.category as FormControl;
  }

  emailHasRequiredError(emailControl: AbstractControl): boolean {
    return emailControl.get('address').hasError('required');
  }

  emailHasEmailError(emailControl: AbstractControl): boolean {
    return emailControl.get('address').hasError('email');
  }

  /** Phone **/
  addPhoneInput(): void { this.phoneFormArray.push(this.initPhone()); }
  removePhoneInput(i: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.phoneFormArray.removeAt(i);
      }
    });
  }
  hasPhones(): boolean { return this.phoneFormArray.length > 0; }

  initPhone(number: string = '', category: PhoneEmailCategory | string = ''): FormGroup {
    return this.fb.group({
      phoneNumber: [number, [Validators.required, PhoneValidator]],
      category: [category, [Validators.required]]
    });
  }

  phoneHasRequiredError(phoneControl: AbstractControl): boolean {
    return phoneControl.get('phoneNumber').hasError('required');
  }

  phoneHasPatternError(phoneControl: AbstractControl): boolean {
    return phoneControl.get('phoneNumber').hasError('pattern');
  }

  /** Websites **/

  initWebpage(url: string = "", type: urlType = urlType.PERSONAL): FormGroup {
    return this.fb.group({
      type: [type, Validators.required],
      url: [url, Validators.required]
    })
  }

  addWebpageInput(): void { this.webpagesFormArray.push(this.initWebpage()); }
  removeWebpageInput(i: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.webpagesFormArray.removeAt(i);
      }
    });
  }
  hasWebsites(): boolean { return this.webpagesFormArray.length > 0; }
}
