

export default class Cal {
    
    // coming from db
    constructor(date, time=date.getMonth(), name='', id='') {
      this.date = date;
      this.time = time;
      this.name = name;
      this.id = id;
    }


  }