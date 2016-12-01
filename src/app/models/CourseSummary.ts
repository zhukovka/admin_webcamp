export interface ICourseSummary {
    name:string;
    course_id:number;
    price:number;
    modifier:string;
    track_id:number;
}
export class CourseSummary {
    public name:string;
    public course_id:number;
    public price:number;
    public modifier:string;
    public track_id:number;
    /**
     * datestring
     */
    public start:string;

    public static fromJSON(json:ICourseSummary):CourseSummary {
        const course = new CourseSummary();
        Object.assign(course, json);
        return course;
    }
}