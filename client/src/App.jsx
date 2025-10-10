import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./constants/constants";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

const App = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/health`);
      if (!res.ok) throw new Error("Internal Server Error");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to fetch data</p>;

  return (
    <div>
      <header>
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <h1>Hello World</h1>
      <p>Health: {data.message}</p>
    </div>
  );
};

export default App;
