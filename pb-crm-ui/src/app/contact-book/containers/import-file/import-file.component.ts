import { Component } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { ImportFileService } from './import-file.service';

@Component({
  selector: 'app-import-file',
  template: `
    <br>
      <div class="form-group">
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="inputGroupFile" aria-describedby="inputGroupFileAddon"
                 (change)="onFileSelected($event)">
          <label class="custom-file-label" for="inputGroupFile">{{filename}}</label>
        </div>
      </div>
    <br>
  `,
})

export class ImportFileComponent {
  constructor(private importFileService: ImportFileService) {
  }
  public importFile: File = null;
  public filename = 'Choose File...';

  onFileSelected(event): any {
    this.filename = this.importFileService.setFile(event);
  }




}
