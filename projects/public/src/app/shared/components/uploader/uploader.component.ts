

import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '@pc-core/components/toast/toast.service';
import { AttachmentIsRequired, AttachmentState } from '@pc-view/classification-request/enums/attachment-type.enum';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { ViewAttachmentsModalComponent } from '../view-attachments-modal/view-attachments-modal.component';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
})
export class UploaderComponent implements OnInit {

  @Input() attachment: any;
  @Input() accept!: any;
  @Input() type!: string;
  @Input() size!: number;
  @Input() isViewOnly!: boolean;
  @Output() fileUploaded = new EventEmitter<any>();
  @Output() onCancelFileEmit = new EventEmitter<any>();
  acceptString = ''
  isRequired = false;
  isFlagged = false;
  isDeleted = false;
  fileState: string = 'uploader-body'
  attachmentState = AttachmentState




  constructor(private toastService: ToastService, private translate: TranslateService, private router: Router, public modalService: NgbModal,
  ) { }

  public files: NgxFileDropEntry[] = [];
  ngOnInit(): void {
    this.getAcceptString()
    this.isRequired = this.attachment.isRequired === AttachmentIsRequired.REQUIRED
    this.isFlagged = this.attachment.status === AttachmentState.TO_BE_CHANGED
    this.isDeleted = this.attachment.status === null

    if (!this.isDeleted && this.isViewOnly === false)
      this.isViewOnly = true
  }


  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

        fileEntry.file((file: File) => {

          if (!this.isSizeAllowed(file.size)) {
            this.toastService.error(this.translate.instant('general.errors.fileSizeError'))
            this.files = [];
          }

          else if (!this.isTypeAllowed(file.type)) {
            this.toastService.error(this.translate.instant('general.errors.fileTypeError'))
            this.files = [];
          }

          else {
            this.fileUploaded.emit({ file: file, att: this.attachment });
          }

        });

      }
    }
  }

  // method to check if type is allowed of dropped file * browsed files are checked by ngx-file-drop: accept="getAcceptString()"
  isTypeAllowed(fileType: string) {
    let isFileAllowed = false;
    for (const type of this.accept) {
      if (fileType.split('/').pop() === type) {
        isFileAllowed = true;
      }
    }
    return isFileAllowed;
  }

  isSizeAllowed(size: number) {
    let isFileSizeAllowed = false;
    if (size < (this.size || 5000000)) {
      isFileSizeAllowed = true;
    }
    return isFileSizeAllowed;

  }

  // generate string to [accept] input of ngx-file-drop
  getAcceptString() {
    for (const type of this.accept)
      this.acceptString += '.' + type + ','
  }

  getFileStatus() {
    this.fileState = 'uploader-body'
    if (!this.isViewOnly) {
      if (this.attachment.url) {
        this.fileState += ' is-success '
      }
      else if (this.isRequired) {
        this.fileState += ' is-required '
      }
    }
    else {
      this.fileState += ' is-viewable'
      if (this.isFlagged)
        this.fileState += ' is-error'
    }

    return this.fileState
  }

  onCancelFile() {
    this.onCancelFileEmit.emit(this.attachment)
  }


  onViewFile() {
    const modalRef = this.modalService.open(ViewAttachmentsModalComponent);
    this.modalService.activeInstances.arguments = {
      attachment: this.attachment,
    }
  }

  isShown: boolean = false;
  toggleShow() {
    this.isShown = !this.isShown;
  }

}
