import { Component } from '@angular/core';

@Component({
  selector: 'app-import-file',
  template: `
    <br>
    <div class="input-group">
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
  filename = 'Choose File...';

  onFileSelected(event): any {
    if (event.target.files.length > 0) {
      this.filename = event.target.files[0].name;
      return this.filename;
    } else {
      this.filename = 'Choose File...';
    }
  }

}
