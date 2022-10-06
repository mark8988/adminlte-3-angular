import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss']
})
export class JobEditComponent implements OnInit {
  public result;
  jobName = new FormControl('');
  @Input() job;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.jobName.setValue(this.job.jobName);
  }

  editGood() {
    var idArr = this.job["_links"]["self"]["href"].split('/');
    this.apiService
      .editJobs(
        idArr[idArr.length - 1],
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
