import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '@services/api.service';
import {Subject} from 'rxjs';
import {
    NgbModalConfig,
    NgbModal,
    NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {DataTableDirective} from 'angular-datatables';
import {GoodsAddComponent} from './goods-add/goods-add.component';
import {GoodsEditComponent} from './goods-edit/goods-edit.component';

@Component({
    selector: 'app-goods-manage',
    templateUrl: './goods-manage.component.html',
    styleUrls: ['./goods-manage.component.scss'],
    providers: [NgbModalConfig, NgbModal]
})
export class GoodsManageComponent implements OnInit {
    dtOptions: DataTables.Settings = {
        pagingType: 'full_numbers',
        pageLength: 10,
        stateSave: true
    };
    public goods;
    public goodTypes;
    public result;
    @ViewChild('selectGoodTypes') selectGoodTypes: any;

    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    dtTrigger: Subject<any> = new Subject<any>();

    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;

    constructor(
        public apiService: ApiService,
        config: NgbModalConfig,
        private modalService: NgbModal
    ) {
        // customize default values of modals used by this component tree
        config.backdrop = true;
        config.keyboard = false;
        config.centered = true;
    }

    ngOnInit(): void {
        this.reloadData();

        this.apiService.getGoodTypes().subscribe((res) => {
            console.log(res); //可以打開console看看資料室什麼
            this.goodTypes = res as any;
        });
    }

    async reloadData() {
        (await this.apiService.getGoods(0)).subscribe((res) => {
            //console.log(res); //可以打開console看看資料室什麼
            this.goods = res as any;
            // Calling the DT trigger to manually render the table
            this.dtTrigger.next(null);
        });
    }

    async refreshData() {
        //console.log(this.selectGoodTypes.nativeElement.value);
        (
            await this.apiService.getGoods(
                this.selectGoodTypes.nativeElement.value
            )
        ).subscribe((res) => {
            //console.log(res); //可以打開console看看資料室什麼
            this.goods = res as any;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next(null);
            });
        });
    }

    open(type, good) {
        if (type == 'add') {
            const modalRef = this.modalService.open(GoodsAddComponent);
            modalRef.closed.subscribe((result) => {
                this.refreshData();
            });
        } else if (type == 'edit') {
            const modalRef = this.modalService.open(GoodsEditComponent);
            modalRef.componentInstance.goods = good;
            modalRef.closed.subscribe((result) => {
                this.refreshData();
            });
        } else if (type == 'delete') {
            Swal.fire({
                title: '確定要刪除貨品?',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                icon: 'question'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.apiService.deleteGoods(good.id).subscribe((res) => {
                        if ((res as any).result_status == true) {
                            this.refreshData();
                        } else {
                            Swal.fire({
                                title: (res as any).result_message,
                                icon: 'error'
                            });
                        }
                    });
                }
            });
        }
    }
}
