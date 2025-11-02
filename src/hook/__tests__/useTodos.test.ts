import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import type { Todo } from '../../types/todo'
import useTodos from '../useTodos'

const mockTodos: Todo[] = [
  { id: 1, title: 'Write docs', completed: false },
  { id: 2, title: 'Ship feature', completed: true },
]

describe('useTodos', () => {
  describe('initialization', () => {
    it('initializes with an empty list when storage is empty', () => {
      const { result } = renderHook(() => useTodos())

      expect(result.current.todos).toEqual([])
    })

    it('hydrates todos from localStorage when available', () => {
      window.localStorage.setItem('todos', JSON.stringify(mockTodos))

      const { result } = renderHook(() => useTodos())

      expect(result.current.todos).toEqual(mockTodos)
    })

    it('handles malformed localStorage data gracefully', () => {
      window.localStorage.setItem('todos', 'invalid-json')

      expect(() => renderHook(() => useTodos())).toThrow()
    })
  })

  describe('adding todos', () => {
    it('adds a todo and persists it to localStorage', () => {
      vi.spyOn(Date, 'now').mockReturnValue(42)
      const { result } = renderHook(() => useTodos())

      act(() => result.current.handleAddTodo('New todo'))

      const expectedTodo = { id: 42, title: 'New todo', completed: false }
      expect(result.current.todos).toEqual([expectedTodo])
      expect(window.localStorage.getItem('todos')).toEqual(
        JSON.stringify([expectedTodo]),
      )
    })

    it('prepends new todos to the beginning of the list', () => {
      window.localStorage.setItem('todos', JSON.stringify(mockTodos))
      vi.spyOn(Date, 'now').mockReturnValue(999)
      const { result } = renderHook(() => useTodos())

      act(() => result.current.handleAddTodo('Urgent task'))

      expect(result.current.todos[0]).toEqual({
        id: 999,
        title: 'Urgent task',
        completed: false,
      })
      expect(result.current.todos).toHaveLength(3)
    })
  })

  describe('updating todos', () => {
    beforeEach(() => {
      window.localStorage.setItem('todos', JSON.stringify(mockTodos))
    })

    it('updates completion status for a single todo', () => {
      const { result } = renderHook(() => useTodos())

      act(() => result.current.handleCompletedChange(1, true))

      expect(result.current.todos).toEqual([
        { id: 1, title: 'Write docs', completed: true },
        { id: 2, title: 'Ship feature', completed: true },
      ])
    })

    it('persists completion changes to localStorage', () => {
      const { result } = renderHook(() => useTodos())

      act(() => result.current.handleCompletedChange(1, true))

      const stored = JSON.parse(window.localStorage.getItem('todos') || '[]')
      expect(stored[0].completed).toBe(true)
    })

    it('does not modify other todos when updating one', () => {
      const { result } = renderHook(() => useTodos())

      act(() => result.current.handleCompletedChange(1, true))

      const unchangedTodo = result.current.todos.find((t) => t.id === 2)
      expect(unchangedTodo).toEqual(mockTodos[1])
    })
  })

  describe('deleting todos', () => {
    beforeEach(() => {
      window.localStorage.setItem('todos', JSON.stringify(mockTodos))
    })

    it('removes a todo by id', () => {
      const { result } = renderHook(() => useTodos())

      act(() => result.current.handleDelete(1))

      expect(result.current.todos).toEqual([
        { id: 2, title: 'Ship feature', completed: true },
      ])
    })

    it('persists deletion to localStorage', () => {
      const { result } = renderHook(() => useTodos())

      act(() => result.current.handleDelete(1))

      const stored = JSON.parse(window.localStorage.getItem('todos') || '[]')
      expect(stored).toHaveLength(1)
      expect(stored[0].id).toBe(2)
    })

    it('handles deleting non-existent todo gracefully', () => {
      const { result } = renderHook(() => useTodos())

      act(() => result.current.handleDelete(999))

      expect(result.current.todos).toEqual(mockTodos)
    })
  })

  describe('clearing completed todos', () => {
    beforeEach(() => {
      window.localStorage.setItem('todos', JSON.stringify(mockTodos))
    })

    it('removes all completed todos', () => {
      const { result } = renderHook(() => useTodos())

      act(() => result.current.handleClearCompleted())

      expect(result.current.todos).toEqual([
        { id: 1, title: 'Write docs', completed: false },
      ])
    })

    it('persists cleared state to localStorage', () => {
      const { result } = renderHook(() => useTodos())

      act(() => result.current.handleClearCompleted())

      const stored = JSON.parse(window.localStorage.getItem('todos') || '[]')
      expect(stored).toHaveLength(1)
      expect(stored.every((t: Todo) => !t.completed)).toBe(true)
    })

    it('handles clearing when no todos are completed', () => {
      const incompleteTodos = [{ id: 1, title: 'Task', completed: false }]
      window.localStorage.setItem('todos', JSON.stringify(incompleteTodos))
      const { result } = renderHook(() => useTodos())

      act(() => result.current.handleClearCompleted())

      expect(result.current.todos).toEqual(incompleteTodos)
    })
  })
})
