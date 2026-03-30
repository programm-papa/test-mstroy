import type { TTreeItemID } from './types'

export interface IBaseItem {
  id: TTreeItemID,
  parent: TTreeItemID | null,
  [key: string]: unknown
}

export interface ITreeNode<T extends IBaseItem> {
  item: T;
  parentId: TTreeItemID | null;
  childrenIds: TTreeItemID[];
}

export interface ITreeStore<T extends IBaseItem> {
  getAll(): T[];
  getItem(id: TTreeItemID): T | undefined;

  getChildren(id: TTreeItemID): T[];
  getAllChildren(id: TTreeItemID): T[];
  getAllParents(id: TTreeItemID): T[];

  addItem(item: T): void;
  removeItem(id: TTreeItemID): void;
  updateItem(item: T): void;
}
