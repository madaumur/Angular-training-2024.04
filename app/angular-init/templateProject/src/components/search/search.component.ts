import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input({required: true}) childValue!: string;
  @Output() childValueChange: EventEmitter<string> = new EventEmitter();


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
