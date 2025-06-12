import { TestBed } from '@angular/core/testing';
import { MockGetFoldersUseCase, MockGetFolderStatsUseCase, MockCreateFolderUseCase } from '../../../infrastructure/adapter/mock-folder.use-cases';
import { MockFolderStateService } from '../../../infrastructure/state/mock-folder-state.service';
import * as SimulationUtil from '../../../infrastructure/util/simulation.util';
import { Folder } from '@calm-mail/contract';

// Mock the simulateNetworkRequest function to avoid random delays and errors
jest.mock('../../../infrastructure/util/simulation.util', () => ({
  simulateNetworkRequest: jest.fn((callback) => Promise.resolve(callback()))
}));

describe('Mock Folder Use Cases', () => {
  let mockFolderStateService: {
    getFolders: jest.Mock;
    getFolderById: jest.Mock;
    addCustomFolder: jest.Mock;
  };
  let simulateNetworkRequestSpy: jest.SpyInstance;

  beforeEach(() => {
    // Create a mock for the MockFolderStateService
    mockFolderStateService = {
      getFolders: jest.fn(),
      getFolderById: jest.fn(),
      addCustomFolder: jest.fn()
    };

    // Set up the spy for simulateNetworkRequest
    simulateNetworkRequestSpy = jest.spyOn(SimulationUtil, 'simulateNetworkRequest');

    // Configure the TestBed with our mocks
    TestBed.configureTestingModule({
      providers: [
        MockGetFoldersUseCase,
        MockGetFolderStatsUseCase,
        MockCreateFolderUseCase,
        { provide: MockFolderStateService, useValue: mockFolderStateService }
      ]
    });
  });

  describe('MockGetFoldersUseCase', () => {
    let useCase: MockGetFoldersUseCase;
    const mockFolders: Folder[] = [
      {
        id: 'folder1',
        name: 'inbox',
        displayName: 'Inbox',
        unreadCount: 5,
        totalCount: 10,
        isDefault: true
      },
      {
        id: 'folder2',
        name: 'custom',
        displayName: 'Custom Folder',
        unreadCount: 0,
        totalCount: 3,
        isDefault: false
      }
    ];

    beforeEach(() => {
      useCase = TestBed.inject(MockGetFoldersUseCase);
      mockFolderStateService.getFolders.mockReturnValue(mockFolders);
    });

    it('should be created', () => {
      expect(useCase).toBeTruthy();
    });

    it('should call getFolders with default parameters when no input is provided', async () => {
      const result = await useCase.execute();

      expect(mockFolderStateService.getFolders).toHaveBeenCalledWith(true, true);
      expect(simulateNetworkRequestSpy).toHaveBeenCalled();
      expect(result.folders).toEqual(mockFolders);
    });

    it('should call getFolders with provided parameters', async () => {
      const result = await useCase.execute({ includeEmpty: false, includeCustom: false });

      expect(mockFolderStateService.getFolders).toHaveBeenCalledWith(false, false);
      expect(result.folders).toEqual(mockFolders);
    });
  });

  describe('MockGetFolderStatsUseCase', () => {
    let useCase: MockGetFolderStatsUseCase;
    const mockFolder: Folder = {
      id: 'folder1',
      name: 'inbox',
      displayName: 'Inbox',
      unreadCount: 5,
      totalCount: 10,
      isDefault: true
    };

    beforeEach(() => {
      useCase = TestBed.inject(MockGetFolderStatsUseCase);
      mockFolderStateService.getFolderById.mockReturnValue(mockFolder);

      // Mock Date.now() to return a fixed value for testing
      jest.spyOn(Date.prototype, 'getTime').mockReturnValue(1234567890);
    });

    it('should be created', () => {
      expect(useCase).toBeTruthy();
    });

    it('should return folder stats when folder exists', async () => {
      const result = await useCase.execute({ folderId: 'folder1' });

      expect(mockFolderStateService.getFolderById).toHaveBeenCalledWith('folder1');
      expect(result.stats.folderId).toBe('folder1');
      expect(result.stats.unreadCount).toBe(5);
      expect(result.stats.totalCount).toBe(10);
      expect(result.stats.lastUpdated).toBeInstanceOf(Date);
      expect(result.stats.sizeInBytes).toBeGreaterThanOrEqual(0);
    });

    it('should throw an error when folder does not exist', async () => {
      mockFolderStateService.getFolderById.mockReturnValue(undefined);

      await expect(useCase.execute({ folderId: 'nonexistent' }))
        .rejects
        .toThrow('Folder with ID nonexistent not found');

      expect(mockFolderStateService.getFolderById).toHaveBeenCalledWith('nonexistent');
    });
  });

  describe('MockCreateFolderUseCase', () => {
    let useCase: MockCreateFolderUseCase;
    const mockParentFolder: Folder = {
      id: 'parent1',
      name: 'custom',
      displayName: 'Parent Folder',
      unreadCount: 0,
      totalCount: 5,
      isDefault: false
    };
    const mockCreatedFolder: Folder = {
      id: 'new-folder-id',
      name: 'custom',
      displayName: 'New Folder',
      unreadCount: 0,
      totalCount: 0,
      isDefault: false,
      parentId: 'parent1'
    };

    beforeEach(() => {
      useCase = TestBed.inject(MockCreateFolderUseCase);
      mockFolderStateService.getFolderById.mockReturnValue(mockParentFolder);
      mockFolderStateService.addCustomFolder.mockReturnValue(mockCreatedFolder);

      // Mock the ID generation to return a predictable value
      jest.spyOn(Date, 'now').mockReturnValue(1234567890);
      jest.spyOn(Math, 'random').mockReturnValue(0.5);
    });

    it('should be created', () => {
      expect(useCase).toBeTruthy();
    });

    it('should create a folder without parent ID', async () => {
      const result = await useCase.execute({
        name: 'New Folder',
        displayName: 'New Folder'
      });

      expect(mockFolderStateService.getFolderById).not.toHaveBeenCalled();
      expect(mockFolderStateService.addCustomFolder).toHaveBeenCalled();
      expect(result.folder).toEqual(mockCreatedFolder);
    });

    it('should create a folder with parent ID when parent exists', async () => {
      const result = await useCase.execute({
        name: 'New Folder',
        displayName: 'New Folder',
        parentId: 'parent1'
      });

      expect(mockFolderStateService.getFolderById).toHaveBeenCalledWith('parent1');
      expect(mockFolderStateService.addCustomFolder).toHaveBeenCalled();
      expect(result.folder).toEqual(mockCreatedFolder);
    });

    it('should throw an error when parent folder does not exist', async () => {
      mockFolderStateService.getFolderById.mockReturnValue(undefined);

      await expect(useCase.execute({
        name: 'New Folder',
        displayName: 'New Folder',
        parentId: 'nonexistent'
      }))
        .rejects
        .toThrow('Parent folder with ID nonexistent not found');

      expect(mockFolderStateService.getFolderById).toHaveBeenCalledWith('nonexistent');
      expect(mockFolderStateService.addCustomFolder).not.toHaveBeenCalled();
    });
  });
});
