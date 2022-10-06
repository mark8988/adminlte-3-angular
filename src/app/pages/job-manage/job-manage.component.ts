import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '@services/api.service';
import {Subject} from 'rxjs';
import {
    NgbModalConfig,
    NgbModal,
    NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import {JobAddComponent} from './job-add/job-add.component';
import {JobEditComponent} from './job-edit/job-edit.component';
import Swal from 'sweetalert2';
import {DataTableDirective} from 'angular-datatables';

@Component({
    selector: 'app-job-manage',
    templateUrl: './job-manage.component.html',
    styleUrls: ['./job-manage.component.scss'],
    providers: [NgbModalConfig, NgbModal]
})
export class JobManageComponent implements OnInit {
    dtOptions: DataTables.Settings = {
        pagingType: 'full_numbers',
        pageLength: 10,
        stateSave: true
    };

    public Jobs;

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
        (await this.apiService.getJobs()).subscribe((res) => {
            this.Jobs = res['_embedded']['jobs'] as any;
            this.dtTrigger.next(null);
        });
    }

    async refreshData() {
        (await this.apiService.getJobs()).subscribe((res) => {
            this.Jobs = res['_embedded']['jobs'] as any;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next(null);
            });
        });
    }

    open(type, job) {
        if (type == 'add') {
            const modalRef = this.modalService.open(JobAddComponent);
            modalRef.closed.subscribe((result) => {
                this.refreshData();
            });
        } else if (type == 'edit') {
            const modalRef = this.modalService.open(JobEditComponent);
            modalRef.componentInstance.job = job;
            modalRef.closed.subscribe((result) => {
                this.refreshData();
            });
        } else if (type == 'delete') {
            Swal.fire({
                title: '確定要刪除job?',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                icon: 'question'
            }).then((result) => {
                if (result.isConfirmed) {
                    var idArr = job['_links']['self']['href'].split('/');
                    var id = idArr[idArr.length - 1];
                    this.apiService.deleteJobs(id).subscribe((res) => {
                        this.refreshData();
                    });
                }
            });
        }
    }
}
