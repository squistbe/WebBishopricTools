import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, key?: string): any[] {
    if (!items) return [];

    if (!searchText) return items;

    searchText = (searchText && typeof searchText === 'object' ? searchText[key] : searchText).toLowerCase();

    return items.filter(it => {
      let field = key ? it[key] : it;

      return field.toLowerCase().includes(searchText);
    });
  }
}
