import { Injectable } from '@angular/core';
import { ApiService } from '../../../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ImportFileService{
  constructor(private apiService: ApiService) {
  }

  private importFile = null;
  private filename = 'Choose File...';

  async onSubmit(): Promise<any> {
    if (this.importFile) {
      const fileData: FormData = new FormData();
      fileData.append('file', this.importFile, this.importFile.name);
      return await this.apiService.post('api/contact/import', fileData, { 'content-type': 'multipart-formdata' }).toPromise().catch(err => {
        console.log('ERROR: ', err);
      });
    }
  }

  setFile(event): any {
    if (event.target.files.length > 0) {
      this.importFile = event.target.files[0];
      this.filename = event.target.files[0].name;
      return this.importFile.name;
    } else {
      this.filename = 'Choose File...';
    }
  }
}
