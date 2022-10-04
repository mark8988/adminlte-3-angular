import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public api_url = 'https://chain1.min-net.net';
    public api_url2 = 'http://59.125.142.82:8082';
    constructor(private http: HttpClient) {}

    async getMenu(groupId) {
        try {
            const menus = await this.http.get(
                this.api_url + '/api/Menu/?id=' + groupId
            );
            return menus;
        } catch (error) {
            console.log(error);
        }
    }

    async getGoods(goodTypeId) {
        try {
            const goods = this.http.get(
                this.api_url + '/api/Goods/?id=' + goodTypeId
            );
            return goods;
        } catch (error) {
            console.log(error);
        }
    }

    addGoods(goodsName, goodsTypeId, goodsRemark) {
        try {
            // const headers = {
            //     'Access-Control-Allow-Origin': '*',
            //     Accepts: 'application/json',
            //     'Content-Type': 'application/json; charset=utf-8'
            // };
            const result = this.http.post(this.api_url + '/api/Goods/', {
                goodsName: goodsName,
                goodsTypeId: goodsTypeId,
                goodsRemark: goodsRemark,
                createTime: ''
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    editGoods(id, goodsName, goodsTypeId, goodsRemark) {
        try {
            const result = this.http.patch(this.api_url + '/api/Goods/', {
                id: id,
                goodsName: goodsName,
                goodsTypeId: goodsTypeId,
                goodsRemark: goodsRemark,
                createTime: ''
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    deleteGoods(id) {
        try {
            const result = this.http.delete(
                this.api_url + '/api/Goods/?id=' + id
            );
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    getGoodTypes() {
        try {
            const goodTypes = this.http.get(this.api_url + '/api/GoodTypes/');
            return goodTypes;
        } catch (error) {
            console.log(error);
        }
    }

    addGoodTypes(goodsTypeName) {
        try {
            const result = this.http.post(this.api_url + '/api/GoodTypes/', {
                goodsTypeName: goodsTypeName
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    editGoodTypes(id, goodsTypeName) {
        try {
            const result = this.http.patch(this.api_url + '/api/GoodTypes/', {
                id: id,
                goodsTypeName: goodsTypeName
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    deleteGoodTypes(id) {
        try {
            const result = this.http.delete(
                this.api_url + '/api/GoodTypes/?id=' + id
            );
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    getJobs(page = '', size = '', sort = '') {
        try {
            var query = '';
            if (page != '') {
                query += '&page=' + page;
            }
            if (size != '') {
                query += '&size=' + size;
            }
            if (sort != '') {
                query += '&sort=' + sort;
            }
            const jobs = this.http.get(this.api_url2 + '/jobs?' + query);
            return jobs;
        } catch (error) {
            console.log(error);
        }
    }

    addJobs(jobName) {
        try {
            const result = this.http.post(this.api_url2 + '/jobs/', {
                jobName: jobName,
                modifiedDate: new Date()
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    editJobs(id, jobName) {
        try {
            const result = this.http.put(this.api_url2 + '/jobs/' + id, {
                jobName: jobName,
                modifiedDate: new Date()
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    deleteJobs(id) {
        try {
            const result = this.http.delete(this.api_url2 + '/jobs/' + id);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    getworkItems(page = '', size = '', sort = 'itemCode') {
        try {
            var query = '';
            if (page != '') {
                query += '&page=' + page;
            }
            if (size != '') {
                query += '&size=' + size;
            }
            if (sort != '') {
                query += '&sort=' + sort;
            }
            const workItems = this.http.get(
                this.api_url2 + '/workItems?' + query
            );
            return workItems;
        } catch (error) {
            console.log(error);
        }
    }
}
