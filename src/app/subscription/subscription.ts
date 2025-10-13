import {Component} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { InvestingService } from '../service/investing.service';
import { SYMBOL } from '../models';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatOptionModule, MatSelectModule],
  templateUrl: './subscription.html',
  styleUrl: './subscription.scss'
})

export class SubscriptionComponent {
  constructor(private _investingService: InvestingService) {}
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  stockSymbols = Object.values(SYMBOL);
  selectedSymbol = '';

  matcher = new MyErrorStateMatcher();

  subscribe(email: string, symbol: string) {
    // Add your subscription logic here
    console.log('Subscribing with email:', email, 'and symbol:', symbol);
    this._investingService.subscribe(email, symbol).subscribe({
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
