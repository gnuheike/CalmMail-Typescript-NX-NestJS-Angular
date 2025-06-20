import { Component, inject, input, output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FolderVm } from '../../model/folder/folder.vm';
import { FolderIconsProvider } from '../../service/folder-icons/folder-icons-provider.service';

@Component({
    selector: 'lib-folder-list',
    standalone: true,
    imports: [IonicModule, CommonModule],
    templateUrl: './folder-list.component.html',
    styleUrls: ['./folder-list.component.css'],
})
export class FolderListComponent {
    readonly folderSelectedEmitterRef = output<FolderVm>();

    readonly folders = input.required<FolderVm[]>();
    private readonly iconsProvider = inject(FolderIconsProvider);
    protected getFolderIcon = this.iconsProvider.getFolderIcon.bind(this.iconsProvider);
}
