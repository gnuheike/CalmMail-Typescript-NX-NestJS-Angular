import { Component, inject, input, output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FolderEntity, FolderIconsProviderPort } from '@calm-mail/frontend-domain';

@Component({
    selector: 'lib-folder-list',
    standalone: true,
    imports: [IonicModule, CommonModule],
    templateUrl: './folder-list.component.html',
    styleUrls: ['./folder-list.component.css'],
})
export class FolderListComponent {
    readonly folderSelectedEmitterRef = output<FolderEntity>();

    readonly folders = input.required<FolderEntity[]>();
    private readonly iconsProvider = inject(FolderIconsProviderPort);
    protected getFolderIcon = this.iconsProvider.getFolderIcon.bind(this.iconsProvider);
}
