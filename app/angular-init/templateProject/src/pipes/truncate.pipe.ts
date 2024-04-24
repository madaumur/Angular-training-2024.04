import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "truncate",
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 5, suffix: string = "..."): string {
    return limit < value.length ? value.slice(0, limit) + suffix : value;
  }
}
