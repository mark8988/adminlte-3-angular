import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import {ApiService} from '@services/api.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-job-add',
    templateUrl: './job-add.component.html',
    styleUrls: ['./job-add.component.scss']
})
export class JobAddComponent implements OnInit {
    public result;
    jobName = new FormControl('');
    constructor(
        public activeModal: NgbActiveModal,
        public apiService: ApiService
    ) {}

    ngOnInit(): void {
    }

    addJob() {
        this.apiService
            .addJobs(
                this.jobName.value,
            )
            .subscribe((res) => {
                this.result = res as any;
                if (this.result.result_status == false) {
                    Swal.fire({
                        title: this.result.result_message,
                        icon: 'error'
                    });
                } else {
                    this.activeModal.close();
                }
            });
    }
}
