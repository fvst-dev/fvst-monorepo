import { gql, useQuery } from '@apollo/client';
import { Todo } from '../graphql/generated/schema';

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      completed
    }
  }
`;

export default function TodosPage() {
  const { loading, error, data } = useQuery<{ todos: Todo[] }>(GET_TODOS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {data?.todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.completed ? 'Completed' : 'Not completed'}
          </li>
        ))}
      </ul>
    </div>
  );
}
