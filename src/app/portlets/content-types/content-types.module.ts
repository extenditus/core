import { CommonModule } from '@angular/common';
import { ContentTypesEditComponent } from './edit';
import { ContentTypesFormComponent } from './form';
import { ContentTypesInfoService } from '@services/content-types-info';
import { ContentTypesLayoutComponent } from './layout';
import { ContentTypesPortletComponent } from './main';
import { ContentTypesRoutingModule } from './content-types-routing.module';
import { FieldValidationMessageModule } from '@components/_common/field-validation-message/file-validation-message.module';
import { FormatDateService } from '@services/format-date-service';
import { IconButtonTooltipModule } from '@components/_common/icon-button-tooltip/icon-button-tooltip.module';
import { ListingDataTableModule } from '@components/listing-data-table/listing-data-table.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SiteSelectorFieldModule } from '@components/_common/site-selector-field/site-selector-field.module';
import { DragulaModule } from 'ng2-dragula';
import { DragulaService } from 'ng2-dragula';
import {
    FieldService,
    FieldDragDropService,
    FieldPropertyService,
    FieldVariablesService
} from './fields/service';
import { ContentTypeFieldsAddRowModule } from './fields/content-type-fields-add-row';
import { ContentTypeEditResolver } from './edit/content-types-edit-resolver.service';

import {
    ContentTypeFieldsDropZoneComponent,
    ContentTypeFieldsPropertiesFormComponent,
    ContentTypeFieldsVariablesComponent,
    ContentTypeFieldsRowComponent,
    ContentTypeFieldsTabComponent,
    ContentTypesFieldDragabbleItemComponent,
    ContentTypesFieldsListComponent
} from './fields';
import {
    ButtonModule,
    ConfirmDialogModule,
    DataTableModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    OverlayPanelModule,
    SplitButtonModule,
    RadioButtonModule,
    CheckboxModule,
    TabViewModule,
    MultiSelectModule
} from 'primeng/primeng';
import {
    NamePropertyComponent,
    CheckboxPropertyComponent,
    CategoriesPropertyComponent,
    DataTypePropertyComponent,
    HintPropertyComponent,
    DefaultValuePropertyComponent,
    RegexCheckPropertyComponent,
    ValuesPropertyComponent
} from './fields/content-type-fields-properties-form/field-properties';
import { AddVariableFormComponent } from './fields/content-type-fields-variables/add-variable-form';

import { DotAddToBundleModule } from '@components/_common/dot-add-to-bundle/dot-add-to-bundle.module';
import { DotBaseTypeSelectorModule } from '@components/dot-base-type-selector/dot-base-type-selector.module';
import { DotDialogModule } from '../../view/components/dot-dialog/dot-dialog.module';
import { DotDirectivesModule } from '@shared/dot-directives.module';
import { DotIconButtonModule } from '@components/_common/dot-icon-button/dot-icon-button.module';
import { DotMenuModule } from '@components/_common/dot-menu/dot-menu.module';
import { DotIconModule } from '@components/_common/dot-icon/dot-icon.module';
import { DotPageSelectorModule } from '@components/_common/dot-page-selector/dot-page-selector.module';
import { DotTextareaContentModule } from '@components/_common/dot-textarea-content/dot-textarea-content.module';
import { DotWorkflowService } from '@services/dot-workflow/dot-workflow.service';
import { DotWorkflowsSelectorFieldModule } from '@components/_common/dot-workflows-selector-field/dot-workflows-selector-field.module';
import {
    DynamicFieldPropertyDirective
} from './fields/content-type-fields-properties-form/field-properties/dynamic-field-property-directive/dynamic-field-property.directive';
import { IFrameModule } from '@components/_common/iframe';
import { MdInputTextModule } from '@directives/md-inputtext/md-input-text.module';
import { PushPublishContentTypesDialogModule } from '@components/_common/push-publish-dialog/push-publish-dialog.module';
import { SearchableDropDownModule } from '@components/_common/searchable-dropdown';
import { DotAutofocusModule } from '@directives/dot-autofocus/dot-autofocus.module';
import {
    RelationshipsPropertyComponent
} from './fields/content-type-fields-properties-form/field-properties/relationships-property/dot-relationships-property.component';
// tslint:disable-next-line:max-line-length
import { DotRelationshipService } from './fields/content-type-fields-properties-form/field-properties/relationships-property/services/dot-relationship.service';
import {
    DotNewRelationshipsComponent
// tslint:disable-next-line:max-line-length
} from './fields/content-type-fields-properties-form/field-properties/relationships-property/new-relationships.component.ts/dot-new-relationships.component';
import {
    DotEditRelationshipsComponent
// tslint:disable-next-line:max-line-length
} from './fields/content-type-fields-properties-form/field-properties/relationships-property/edit-relationship.component.ts/dot-edit-relationships.component';
import { DotEditContentTypeCacheService } from './fields/content-type-fields-properties-form/field-properties/relationships-property/services/dot-edit-content-type-cache.service';
// tslint:disable-next-line:max-line-length
import { DotCardinalitySelectorComponent } from './fields/content-type-fields-properties-form/field-properties/relationships-property/cardinality-selector/dot-cardinality-selector.component';

@NgModule({
    declarations: [
        CategoriesPropertyComponent,
        CheckboxPropertyComponent,
        ContentTypeFieldsDropZoneComponent,
        ContentTypeFieldsPropertiesFormComponent,
        ContentTypeFieldsVariablesComponent,
        AddVariableFormComponent,
        ContentTypeFieldsRowComponent,
        ContentTypeFieldsTabComponent,
        ContentTypesEditComponent,
        ContentTypesFieldDragabbleItemComponent,
        ContentTypesFieldsListComponent,
        ContentTypesFormComponent,
        ContentTypesLayoutComponent,
        ContentTypesPortletComponent,
        DataTypePropertyComponent,
        DefaultValuePropertyComponent,
        DynamicFieldPropertyDirective,
        HintPropertyComponent,
        NamePropertyComponent,
        RegexCheckPropertyComponent,
        ValuesPropertyComponent,
        RelationshipsPropertyComponent,
        DotNewRelationshipsComponent,
        DotCardinalitySelectorComponent,
        DotEditRelationshipsComponent
    ],
    entryComponents: [
        NamePropertyComponent,
        CheckboxPropertyComponent,
        CategoriesPropertyComponent,
        DataTypePropertyComponent,
        DefaultValuePropertyComponent,
        HintPropertyComponent,
        RegexCheckPropertyComponent,
        ValuesPropertyComponent,
        RelationshipsPropertyComponent
    ],
    exports: [ContentTypesPortletComponent],
    imports: [
        ButtonModule,
        CheckboxModule,
        CommonModule,
        ConfirmDialogModule,
        ContentTypesRoutingModule,
        DataTableModule,
        DialogModule,
        DotDialogModule,
        DotIconModule,
        DotIconButtonModule,
        DotMenuModule,
        DragulaModule,
        DropdownModule,
        FieldValidationMessageModule,
        FormsModule,
        IFrameModule,
        IconButtonTooltipModule,
        InputTextModule,
        ListingDataTableModule,
        OverlayPanelModule,
        PushPublishContentTypesDialogModule,
        RadioButtonModule,
        ReactiveFormsModule,
        SearchableDropDownModule,
        SiteSelectorFieldModule,
        ContentTypeFieldsAddRowModule,
        SplitButtonModule,
        TabViewModule,
        DotTextareaContentModule,
        MultiSelectModule,
        DotAddToBundleModule,
        DotDirectivesModule,
        DotWorkflowsSelectorFieldModule,
        DotPageSelectorModule,
        DotBaseTypeSelectorModule,
        MdInputTextModule,
        DotAutofocusModule
    ],
    providers: [
        ContentTypeEditResolver,
        ContentTypesInfoService,
        DotWorkflowService,
        DragulaService,
        FieldDragDropService,
        FieldPropertyService,
        FieldVariablesService,
        FieldService,
        FormatDateService,
        DotRelationshipService,
        DotEditContentTypeCacheService
    ]
})
export class ContentTypesModule {}
