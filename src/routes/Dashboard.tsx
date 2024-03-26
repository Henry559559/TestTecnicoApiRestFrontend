import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import PortalLayout from "../layout/PortalLayout";

interface Todo {
    id: string;
    title: string;
    completed: boolean;
  }
export default function Dashboard(){
    const auth = useAuth();

    const [todos, setTodos] = useState<Todo[]>([]);
    const [value, setValue] = useState("");
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // createTodo();
      }
    
    return(
        <PortalLayout>
          <div className="dashboard">
            <h1>Dashboard de </h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="New task to do..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </form>
            {todos.map((post: Todo) => (
              <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.completed}</p>
              </div>
            ))}
          </div>
        </PortalLayout>
      );
}