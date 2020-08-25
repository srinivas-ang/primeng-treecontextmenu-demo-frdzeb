import {Component,OnInit} from '@angular/core';
import {NodeService} from './nodeservice';
import {MenuItem,TreeNode} from 'primeng/api';
import {MessageService} from 'primeng/api';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
    providers: [MessageService]
})
export class AppComponent { 
    files: TreeNode[];

    selectedFile: TreeNode;

    items: MenuItem[];
    
    constructor(private nodeService: NodeService, private messageService: MessageService) { }

    ngOnInit() {
      debugger
        this.nodeService.getFiles().then(files => this.files = files);

        this.items = [
            {label: 'View', icon: 'pi pi-search', command: (event) => this.viewFile(this.selectedFile)},
            {label:'Create Folder', icon:'pi pi-plus-circle', command:(event)=>this.createFolder(this.selectedFile)},
             {label:'Upload file', icon:'pi pi-upload', command:(event)=>this.createFolder(this.selectedFile)},
             {label:'Delete', icon:'pi pi-trash', command:(event)=>this.createFolder(this.selectedFile)},
            {label: 'Unselect', icon: 'pi pi-times', command: (event) => this.unselectFile()},
            {label: 'Download', icon: 'pi pi-download', command: (event) => this.unselectFile()}
            
        ];
    }
 createFolder(file: TreeNode) {
    debugger
 }
    viewFile(file: TreeNode) {
      debugger
        this.messageService.add({severity: 'info', summary: 'Node Details', detail: file.label});
    }
    
    unselectFile() {
        this.selectedFile = null;
    }
}
