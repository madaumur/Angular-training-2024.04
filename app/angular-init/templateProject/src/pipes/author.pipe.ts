import {Pipe, PipeTransform} from '@angular/core';
import {Person} from '../components/header/header.component';
import {TitleCasePipe} from '@angular/common';

@Pipe({
  name: 'author',
  standalone: true
})
export class AuthorPipe implements PipeTransform {

  transform(value: Person): string {
    const firstName: string = value.firstName;
    const lastName: string = value.lastName;
    return `by ${lastName.toUpperCase()} ${new TitleCasePipe().transform(firstName)}`;
  }
}
