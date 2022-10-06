import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '@services/api.service';
import {Subject} from 'rxjs';
import {
    NgbModalConfig,
    NgbModal,
    NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import {DataTableDirective} from 'angular-datatables';

@Component({
    selector: 'app-work-item-manage',
    templateUrl: './work-item-manage.component.html',
    styleUrls: ['./work-item-manage.component.scss'],
    providers: [NgbModalConfig, NgbModal]
})
export class WorkItemManageComponent implements OnInit {
    dtOptions: DataTables.Settings = {
        pagingType: 'full_numbers',
        pageLength: 10,
        stateSave: true
    };

    public workItems;

    dtTrigger: Subject<any> = new Subject<any>();

    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;

    constructor(
        public apiService: ApiService,
        config: NgbModalConfig,
        private modalService: NgbModal
    ) {
        config.backdrop = true;
        config.keyboard = false;
        config.centered = true;
    }
    ngOnInit(): void {
        this.reloadData();
    }

    async reloadData() {
        (await this.apiService.getworkItems('0', '10000')).subscribe((res) => {
            this.workItems = res['_embedded']['workItems'] as any;
            this.dtTrigger.next(null);
        });
    }

    async refreshData() {
        (await this.apiService.getworkItems('0', '10000')).subscribe((res) => {
            this.workItems = res['_embedded']['workItems'] as any;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next(null);
            });
        });
    }
}
