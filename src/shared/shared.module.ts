import {NgModule, ModuleWithProviders} from '@angular/core';
import {FlexTableModule} from "./flex-table/flex-table.module";

const SHARED_MODULES = [
    FlexTableModule
];

@NgModule({
    imports: [
        FlexTableModule.forRoot()
    ],
    exports: SHARED_MODULES
})
export class SharedRootModule {
}

@NgModule({
    imports: SHARED_MODULES,
    exports: SHARED_MODULES
})
export class SharedModule {
    static forRoot():ModuleWithProviders {
        return {ngModule: SharedRootModule};
    }
}
