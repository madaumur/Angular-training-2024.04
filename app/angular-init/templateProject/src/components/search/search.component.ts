import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, DatePipe], // permettra l'utilisation de ngModel
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input({required: true}) childValue!: string;
  @Output() childValueChange: EventEmitter<string> = new EventEmitter();


  get search(): string {
    return this.childValue
  }

  set search(value: string) {
    this.childValue = value;
    this.childValueChange.emit(this.childValue);
  }

  today = Date.now();

  // METHODE NON UTILISÉE. GARDÉE POUR ARCHIVE
  onValueChange($event: Event): void {
    // soit on passe par un any

    // soit on demande explicitement a ts de ne pas regarder
    //@ts-ignore
    this.childValue = $event.target.value;

    this.childValueChange.emit(this.childValue);

    // soit on cast
    // this.childValue = ($event.target as HTMLInputElement).value;
  }
}
