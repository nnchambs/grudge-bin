export default class Grudge {
  constructor(name, offense, date) {
    this.id = Date.now();
    this.name = name;
    this.offense = offense;
    this.forgiven = false;
    this.date = date;
  }
}
