import * as moment from 'moment';
enum Modifiers{
  Default, Morning, Weekend, Individual
}
export class Schedule {

  public id:number;
  public course_id:number;
  public start:String;
  private modifier:number;
  private modifier_name:string;
  private modifier_default_hour:string;
  static Modifiers = Modifiers;
  static ModifiersNames = {
    [Modifiers.Morning]: 'Утренний',
    [Modifiers.Weekend]: 'Выходной день',
    [Modifiers.Individual]: 'Индивидуальные занятия',
    [Modifiers.Default]: 'Вечерний в рабочие дни'
  };

  constructor() {
    this.start = new Date().toISOString();
    this.setModifierByStartDate();
  }

  public getModifier():string {
    return Schedule.ModifiersNames[this.modifier];
  }

  public setModifierByStartDate() {
    let start = moment(this.start);
    let startDay = start.day();
    let startHour = start.hour();
    switch (startDay) {
      case 0:
      case 6:
        this.modifier = 2;
        break;
      default:
        this.modifier = 0;
    }
    if (startHour < 19 && this.modifier != 2) {
      this.modifier = 1;
    }
  }

  public static fromJSON(json:any):Schedule {
    const schedule = new Schedule();
    Object.assign(schedule, json);
    return schedule;
  }

  normalizeStart() {
    this.start = moment(this.start).format("YYYY-MM-DDTHH:mm:ss");
  }
}
