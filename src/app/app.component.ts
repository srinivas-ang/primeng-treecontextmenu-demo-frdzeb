import { Component, OnInit } from "@angular/core";
import { NodeService } from "./nodeservice";
import { MenuItem, TreeNode } from "primeng/api";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  providers: [MessageService]
})
export class AppComponent {
  files: TreeNode[];

  selectedFile: TreeNode;
  viewedFile: TreeNode;

  items: MenuItem[];
  displayBasic: boolean;
  createFolderText: string = "";
  originalFileList: TreeNode[];
  blocked: boolean = false;
  constructor(
    private nodeService: NodeService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.nodeService.getFiles().then(files => {
      this.files = files;
      this.originalFileList = files;
    });

    this.items = [
      {
        label: "View",
        icon: "pi pi-search",
        command: event => this.viewFile(this.selectedFile)
      },
      {
        label: "Create Folder",
        icon: "pi pi-plus-circle",
        command: event => this.createFolder(this.selectedFile)
      },
      {
        label: "Upload file",
        icon: "pi pi-upload",
        command: event => this.createFolder(this.selectedFile)
      },
      {
        label: "Delete",
        icon: "pi pi-trash",
        command: event => this.createFolder(this.selectedFile)
      },
      {
        label: "Unselect",
        icon: "pi pi-times",
        command: event => this.unselectFile()
      },
      {
        label: "Download",
        icon: "pi pi-download",
        command: event => this.unselectFile()
      }
    ];
  }
  getfile() {}
  saveCreateFolder() {
    this.blocked = false;
    alert(this.createFolderText);
    var that = this;
    this.originalFileList.forEach(function(value, index) {
      debugger;
      if (that.viewedFile.label == value.label) {
        var obj = {
          label: that.createFolderText,
          data: "Documents Folder",
          expandedIcon: "pi pi-folder-open",
          collapsedIcon: "pi pi-folder",
          children: []
        };
        that.files[index].children.push(obj);
      } else {
        value.children.forEach(function(x, i) {
          var obj = {
            label: that.createFolderText,
            data: "Documents Folder",
            expandedIcon: "pi pi-folder-open",
            collapsedIcon: "pi pi-folder",
            children: []
          };
          if (x.label == that.viewedFile.label) {
            that.files[index].children[i].children.push(obj);
          }
        });
      }
      this.blocked = false;
    });
  }
  createFolder(file: TreeNode) {
    debugger;
    if (file.children) {
      this.displayBasic = true;
      this.blocked = true;
    }
    else{
      this.messageService.add({
      severity: "info",
      summary: "Waring",
      detail: "Please select Folder to create new folder"
    });
    }
  }
  viewFile(file: TreeNode) {
    debugger;
    if (file.children) this.viewedFile = file;
    // this.selectedFile=file;
    this.messageService.add({
      severity: "info",
      summary: "Node Details",
      detail: file.label
    });
  }

  unselectFile() {
    this.selectedFile = null;
    this.viewedFile = null;
  }
}
