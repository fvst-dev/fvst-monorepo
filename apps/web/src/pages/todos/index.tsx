import { gql, useQuery, useMutation } from '@apollo/client';
import { Todo } from '../../graphql/generated/schema';
import { FormEvent, useState } from 'react';
import Layout from '../Layout';

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
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="mb-6 text-4xl font-bold">Todos</h1>

        <form onSubmit={handleAddTodo} className="mb-6">
          <input
            className="mr-4 rounded-md border border-gray-300 p-2"
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Add new todo"
          />
          <button className="rounded-md bg-blue-500 p-2 text-white" type="submit">
            Add Todo
          </button>
        </form>

        <ul className="space-y-2">
          {data?.todos.map((todo) => (
            <li key={todo.id} className={`rounded-md p-4 ${todo.completed ? 'bg-green-100' : 'bg-red-100'}`}>
              <span className="font-semibold">{todo.title}</span> -{' '}
              {todo.completed ? (
                <span className="text-green-700">Completed</span>
              ) : (
                <span className="text-red-700">Not completed</span>
              )}
              <button
                className="ml-4 rounded-md bg-yellow-500 p-1 text-white"
                onClick={() => handleUpdateTodo(todo.id, todo.completed)}
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
