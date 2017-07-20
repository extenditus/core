import { ActivatedRoute, Router } from '@angular/router';
import { CONTENT_TYPE_INITIAL_DATA, ContentType } from '../main';
import { Component, ViewChild } from '@angular/core';
import { ContentTypesInfoService } from '../../../api/services/content-types-info';
import { CrudService } from '../../../api/services/crud';
import { LoginService } from '../../../api/services/login-service';
import { MessageService } from '../../../api/services/messages-service';
import { Observable } from 'rxjs/Observable';
import { StringUtils } from '../../../api/util/string.utils';
import { ContentTypesFormComponent } from '../form';
import { BaseComponent } from '../../../view/components/_common/_base/base-component';

/**
 * Portlet component for edit content types
 *
 * @export
 * @class ContentTypesEditComponent
 * @extends {BaseComponent}
 */
@Component({
    selector: 'content-types-create',
    templateUrl: './content-types-create.component.html'
})
export class ContentTypesCreateComponent extends BaseComponent {
    @ViewChild('form') form: ContentTypesFormComponent;
    contentTypeName: Observable<string>;
    contentTypeType: string;
    contentTypeIcon: string;

    constructor(
        messageService: MessageService,
        private contentTypesInfoService: ContentTypesInfoService,
        private crudService: CrudService,
        private loginService: LoginService,
        private route: ActivatedRoute,
        public router: Router,
        private stringUtils: StringUtils
    ) {
        super([
            'File',
            'Content',
            'Form',
            'Persona',
            'Widget',
            'Page'
        ], messageService);
    }

    ngOnInit(): void {
        this.route.url.subscribe(res => {
            let type = res[1].path;
            this.contentTypeName = this.messageService.messageMap$.pluck(this.stringUtils.titleCase(type));
            this.contentTypeType = type;
            this.contentTypeIcon = this.contentTypesInfoService.getIcon(type);
        });

        this.setOwnerToContentTypeData();
    }

    /**
     * Combine data from the form and submit to create content types
     *
     * @param {any} $event;
     *
     * @memberof ContentTypesCreateComponent
     */
    public handleFormSubmit($event): void {
        let contentTypeData: ContentType = Object.assign(
            {},
            CONTENT_TYPE_INITIAL_DATA,
            $event.value
        );
        contentTypeData.clazz = this.contentTypesInfoService.getClazz(
            this.contentTypeType
        );

        this.crudService
            .postData('v1/contenttype', contentTypeData)
            .subscribe(this.handleFormSubmissionResponse.bind(this));
    }

    private handleFormSubmissionResponse(res: any): void {
        this.form.resetForm();
    }

    private setOwnerToContentTypeData(): void {
        if (this.loginService.auth) {
            CONTENT_TYPE_INITIAL_DATA.owner = this.loginService.auth.user.userId;
        }

        this.loginService.auth$.subscribe(res => {
            CONTENT_TYPE_INITIAL_DATA.owner = res.user.userId;
        });
    }
}
