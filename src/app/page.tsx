import { getUsers } from "@/data-layer/users";
import { UserItem } from "@/components/user-item";

export default async function Home() {
  const users = await getUsers();

  return (
    <div>
      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
        />
      ))}
    </div>
  );
}
