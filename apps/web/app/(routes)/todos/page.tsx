'use client';

import { gql, useQuery, useMutation } from '@apollo/client';
import { Todo } from '../../../__generated/graphql/schema';
import { FormEvent, useState } from 'react';

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      title
      completed
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      id
      completed
    }
  }
`;

export default function TodosPage() {
  const { loading, error, data } = useQuery<{ todos: Todo[] }>(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    await addTodo({
      variables: {
        input: {
          title: newTodoTitle,
          completed: false,
        },
      },
    });
    setNewTodoTitle('');
  };

  const handleUpdateTodo = async (id: number, completed: boolean) => {
    await updateTodo({
      variables: {
        input: {
          id,
          completed: !completed,
        },
      },
    });
  };

  return (
    <div className="space-y-6 text-white">
      <h1 className="mb-6 text-4xl font-bold">Todos</h1>

      <form onSubmit={handleAddTodo} className="mb-6">
        <input
          className="mr-4 border-b-[1px] bg-fvst-lilac"
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Title"
        />
        <button className="border-[1px] border-fvst-orange px-3 py-1.5 text-sm text-white" type="submit">
          Add Todo
        </button>
      </form>

      <ul className="space-y-2">
        {data?.todos.map((todo) => (
          <li key={todo.id} className={`flex items-center justify-between bg-fvst-lilac p-4 shadow-xl`}>
            <div>
              <span className="font-semibold">{todo.title}</span>
              <br />
              {todo.completed ? (
                <span className="text-sm text-green-700">Completed</span>
              ) : (
                <span className="text-sm  text-red-700">Not completed</span>
              )}
            </div>
            <button
              className="border-[1px] border-fvst-orange px-3 py-1.5 text-sm text-white"
              onClick={() => handleUpdateTodo(todo.id, todo.completed)}
            >
              Toggle
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
