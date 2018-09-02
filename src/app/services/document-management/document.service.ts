import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../common/configSetting';
import { HttpClientService } from '../../common/http-client.service';

@Injectable()
export class DocumentService {

    constructor(
        private httpClient: HttpClientService
    ) { }

    getDocsGroup(){
        return this.httpClient.getJsonObservable('/api/getGroups');
    }

    getTitleSuggest(partial){
        return this.httpClient.getJsonObservable('/api/document/' + partial);
    }

    getAllTags(){
        return this.httpClient.getJsonObservable('/api/tags');
    }

    getTagsByDocumentId(document_id){
        return this.httpClient.getJsonObservable('/api/documents/tags/' + document_id);
    }

    getTreeData(){
      return this.httpClient.getJsonObservable('/api/tree');
    }

    createDocs(obj){
        return this.httpClient.postJsonObservable('/api/createDoc', obj);
    }
    searchDocs(obj){
      return this.httpClient.postJsonObservable('/api/search', obj);
    }

    uploadFile(file){
        return this.httpClient.uploadFile('/uploadFile', file);
    }

    downloadFile(file_name){
        return this.httpClient.getJsonObservable('/downloadFile/' + file_name);
    }


}
