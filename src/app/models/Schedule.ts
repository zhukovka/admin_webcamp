export class Schedule {

  public id:number;
  public course_id:number;
  public start:Date;
  private modifier:number;
  private modifier_name:string;
  private modifier_default_hour:string;

  constructor(){
    this.start = new Date();
  }
  public getModifier():string {
    switch (this.modifier) {
      case 1:
        return 'Утренний';
      case 2:
        return 'Выходной день';
      case 3:
        return 'Индивидуальные занятия';
      case 0:
      default:
        return 'Вечерний в рабочие дни';

    }
  }

  public setModifierByStartDate() {
    let startDay = this.start.getDay();
    let startHour = this.start.getHours();
    switch (startDay) {
      case 0:
      case 6:
        this.modifier = 2;
        break;
      default:
        this.modifier = 0;
    }
    if(startHour < 19){
      this.modifier = 1;
    }
  }

  public static fromJSON(json:any):Schedule {
    const schedule = new Schedule();
    Object.assign(schedule, json);
    return schedule;
  }
}
