const countries = 'https://geodata.solutions/api/api.php?type=getCountries';
export class Countries {
  static getCountries() {
    return fetch(countries, {
      method: 'GET',
    });
  }
}
