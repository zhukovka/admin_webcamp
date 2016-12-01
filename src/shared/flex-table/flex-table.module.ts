import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    FlexTableComponent, FlexTableHeaderComponent, FlexTableBodyComponent,
    FlexTableRowComponent
} from './flex-table.component';

const FLEX_TABLE_COPONENTS = [FlexTableComponent, FlexTableHeaderComponent,
    FlexTableBodyComponent,
    FlexTableRowComponent];
@NgModule({
    imports: [
        CommonModule
    ],
    exports: FLEX_TABLE_COPONENTS,
    declarations: FLEX_TABLE_COPONENTS
})
export class FlexTableModule {
    static forRoot():ModuleWithProviders {
        return {
            ngModule: FlexTableModule,
            providers: []
        };
    }
}
