import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-upload-members',
  templateUrl: './upload-members.component.html',
  styleUrls: ['./upload-members.component.scss']
})
export class UploadMembersComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: `${this.auth.getRoot()}/api/upload/members`,
    authToken: this.auth.getToken(),
    allowedMimeType: ['text/csv']
  });
  hasDropZoneOver: boolean = false;
  showInstructions: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.uploader.onCompleteItem = this.fileUploadSuccess.bind(this);
  }

  fileOverZone(e) {
    this.hasDropZoneOver = e;
  }

  dropped(event) {
    this.uploader.uploadAll();
  }

  fileUploadSuccess(item, response, status, header) {
    if (status === 200) {
      this.router.navigate(['members']);
    }
  }
}
