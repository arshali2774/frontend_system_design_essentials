# Learning Frontend System Design Essentials

We all have worked on a frontend task where it seems that this task will take 2 hours to wrap up but as we start working on it, the task become large and could take days to complete. To understand the high-level architecture of a task before implementing it would work in our favour greatly.
So lets start by building a user dropdown component with following users

```sql
-- Users table for dropdown
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for this learning project)
CREATE POLICY "Users are viewable by everyone"
  ON users FOR SELECT
  USING (true);

-- Seed with 10 users
INSERT INTO users (name, email, avatar) VALUES
  ('Alice Johnson', 'alice@example.com', 'https://i.pravatar.cc/150?u=alice'),
  ('Bob Smith', 'bob@example.com', 'https://i.pravatar.cc/150?u=bob'),
  ('Carol Williams', 'carol@example.com', 'https://i.pravatar.cc/150?u=carol'),
  ('David Brown', 'david@example.com', 'https://i.pravatar.cc/150?u=david'),
  ('Eve Davis', 'eve@example.com', 'https://i.pravatar.cc/150?u=eve'),
  ('Frank Miller', 'frank@example.com', 'https://i.pravatar.cc/150?u=frank'),
  ('Grace Wilson', 'grace@example.com', 'https://i.pravatar.cc/150?u=grace'),
  ('Henry Taylor', 'henry@example.com', 'https://i.pravatar.cc/150?u=henry'),
  ('Ivy Anderson', 'ivy@example.com', 'https://i.pravatar.cc/150?u=ivy'),
  ('Jack Thomas', 'jack@example.com', 'https://i.pravatar.cc/150?u=jack');
```

Now next.js provide us with server components but we will fetch data in client component to observe various problems and their solution.
We wrote this UserDropdown component with a single api call fetchUsers and we are calling api when we open the dropdown.

```js
async function fetchUsers() {
  const data = await graphqlClient.request(GET_USERS);
  console.log(data);
  const usersData = data.usersCollection.edges.map((edge: any) => edge.node);
  setUsers(usersData);
}
```

But this can cause issue as it calls every time we open or close dropdown. So we added a check to only call the api when the dropdown is open then we added a check to only call api if local state is empty. This way once the data is fetched we do not fetch it again and again when the dropdown is open.
We also added proper loading and error states. We figured out the selection process and how to close the dropdown when user selected and how to deselect selected user.

We initially used shadcn's Select component but discovered it doesn't open until content is ready, so we couldn't see the loading state. We switched to Popover for full control over open/close behavior.
