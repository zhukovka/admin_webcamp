import {Component, Input, AfterContentInit, ContentChild, ViewEncapsulation} from "@angular/core";
const SCROLL = 'flex-table-body__scroll';
const HIDDEN = 'flex-table__hidden';
@Component({
    selector: 'flex-table-header',
    template: '<div class="flex-table-item"><ng-content></ng-content></div>',
    encapsulation: ViewEncapsulation.None
})
export class FlexTableHeaderComponent {
    private _fixed:boolean;
    @Input()
    get fixed() {
        return this._fixed;
    }

    set fixed(val:boolean) {
        this._fixed = val !== false;
    }

}
@Component({
    selector: 'flex-table-body',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class FlexTableBodyComponent {
}
@Component({
    selector: 'flex-table-row',
    template: '<div class="flex-table-item"><ng-content></ng-content></div>',
    encapsulation: ViewEncapsulation.None
})
export class FlexTableRowComponent {
}

@Component({
    selector: 'flex-table',
    templateUrl: './flex-table.component.html',
    styleUrls: ['./flex-table.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FlexTableComponent implements AfterContentInit {
    @ContentChild(FlexTableHeaderComponent) flexTableHeader:FlexTableHeaderComponent;
    private fixedHeader:boolean;

    ngAfterContentInit():void {
        this.fixedHeader = this.flexTableHeader.fixed;
    }

    setClasses() {
        return {
            [HIDDEN]: this.fixedHeader
        }
    }

    setBodyClasses() {
        return {
            [SCROLL]: this.fixedHeader
        }
    }
}

