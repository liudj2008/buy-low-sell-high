import {Component} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  NgModel,
} from '@angular/forms';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { InvestingService } from '../service/investing.service';

@Component({
  selector: 'app-subscription',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './subscription.html',
  styleUrl: './subscription.scss'
})

export class SubscriptionComponent {
  constructor(private _investingService: InvestingService) {}
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  subscribe(email: string) {
    // Add your subscription logic here
    this._investingService.subscribe(email).subscribe({
      next: (response) => {
        console.log('Subscription successful:', response);
      },
      error: (error) => {
        console.error('Subscription failed:', error);
      }
    });
    console.log('Subscribing email:', email);
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
