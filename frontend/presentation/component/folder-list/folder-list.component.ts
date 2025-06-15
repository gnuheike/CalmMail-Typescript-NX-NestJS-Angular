import { Component, inject, input, output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FolderIconsProvider } from '../../service';
import { FolderVm } from '../../model';

@Component({
    selector: 'lib-folder-list',
    standalone: true,
    imports: [IonicModule, CommonModule],
    templateUrl: './folder-list.component.html',
    styleUrl: './folder-list.component.css',
})
export class FolderListComponent {
    readonly folderSelectedEmitterRef = output<FolderVm>();

    readonly folders = input.required<FolderVm[]>();
    private readonly iconsProvider = inject(FolderIconsProvider);
    protected getFolderIcon = this.iconsProvider.getFolderIcon.bind(this.iconsProvider);
}
