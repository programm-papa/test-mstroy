import type { IBaseItem, ITreeNode, ITreeStore } from "./interfaces"


export class TreeStore<T extends IBaseItem> implements ITreeStore<T> {
  private items: T[] = []
  private nodes: Map<T['id'], ITreeNode<T>> = new Map()

  constructor(items: T[] = []) {
    // Запись элементов изначального массива для сохранения порядка
    this.items = items
    // Построение дерева из массива элементов
    this.buildTree(items)
  }

  // Публичные методы

  // Получение всех элементов списка
  getAll(): T[] {
    return this.items
  }

  // Получение элемента по id
  getItem(id: T['id']): T | undefined {
    const node = this.nodes.get(id)
    return node ? node.item : undefined
  }

  // Получение дочерних элементов по id



  // Приватные методы
  private buildTree(items: T[]) {
    // Проходим по каждому элементу и строим узлы дерева
    items.forEach(item => {
      // В случае дублирования id выбрасываем ошибку
      if(this.nodes.has(item.id)) return Error(`Дублирование элемента с id: ${item.id}`)

      this.nodes.set(item.id, {
        parentId: item.parent,
        item,
        childrenIds: []
      })

      // Если элемент имеет родителя, добавляем его в список дочерних элементов узла родителя
      if (item.parent !== null) {
        const parentNode = this.nodes.get(item.parent)
        if(!parentNode) return Error(`Родительский элемент с id: ${item.parent} не найден для элемента с id: ${item.id}`)
        
        parentNode.childrenIds.push(item.id)

        this.nodes.set(item.parent, parentNode)
      }
    })
  }
}