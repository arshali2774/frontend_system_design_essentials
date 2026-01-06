"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { graphqlClient } from "@/lib/graphql-client";
import { GET_USERS } from "@/lib/queries/users";
import { Skeleton } from "./ui/skeleton";
import { Alert, AlertTitle } from "./ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function UserDropdown() {
  // fetch users from graphql api and map over them to create select items
  const [users, setUsers] = useState<
    Array<{ id: string; name: string; email: string; avatar: string }>
  >([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // fetch users from graphql api
  async function fetchUsers() {
    setLoading(true);
    try {
      const data = await graphqlClient.request(GET_USERS);
      console.log(data);
      const usersData = data.usersCollection.edges.map(
        (edge: any) => edge.node
      );
      setUsers(usersData);
    } catch (error: any) {
      console.log("Error fetching users:", error.response);
      const graphqlError = error?.response?.errors?.[0]?.message;
      const networkError = error?.message;
      if (graphqlError) setError(graphqlError);
      else if (networkError) setError(networkError);
      else setError("An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }
  //   useEffect(() => {
  //     fetchUsers();
  //   }, []);
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            src={
              selectedUser
                ? users.find((u) => u.id === selectedUser)?.avatar
                : undefined
            }
            alt={
              selectedUser
                ? users.find((u) => u.id === selectedUser)?.name
                : "No user selected"
            }
          />
          <AvatarFallback>
            {selectedUser
              ? users
                  .find((u) => u.id === selectedUser)
                  ?.name.slice(0, 2)
                  .toUpperCase()
              : "NA"}
          </AvatarFallback>
        </Avatar>
        <p>
          {selectedUser
            ? users.find((u) => u.id === selectedUser)?.name
            : "No user selected"}
          ,
          {selectedUser
            ? users.find((u) => u.id === selectedUser)?.email
            : "No user selected"}
        </p>
      </div>
      <Popover
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (isOpen && users.length === 0) fetchUsers();
        }}
      >
        <PopoverTrigger asChild>
          <Button variant={"default"} className="cursor-pointer">
            Assign Person
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          {loading ? (
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-48 bg-amber-200" />
              <Skeleton className="h-8 w-8 rounded-full bg-amber-200" />
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          ) : (
            <ul>
              {users.map((user) => (
                <li
                  key={user.id}
                  value={user.id}
                  className={`flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer ${
                    selectedUser === user.id
                      ? "bg-amber-200 hover:bg-amber-700"
                      : ""
                  }`}
                  onClick={() => {
                    setOpen(false);
                    setSelectedUser(user.id);
                  }}
                >
                  <span>{user.name}</span>
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </li>
              ))}
            </ul>
          )}
        </PopoverContent>
      </Popover>
      <Button onClick={() => setSelectedUser(null)}>Clear</Button>
    </div>
  );
}
