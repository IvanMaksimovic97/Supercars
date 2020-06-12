import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kmWithDots'
})
export class KmWithDotsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    var parts = value.toString().split(".");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
    return parts.join(",");
  }

}
