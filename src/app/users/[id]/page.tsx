import { notFound } from "next/navigation";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

async function getUser(id: string): Promise<User> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) notFound();
  return res.json();
}

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-[#4E342E]">{user.name}</h1>
      <p className="text-[#4E342E] mb-2">Email: {user.email}</p>
      <p className="text-[#4E342E]">Phone: {user.phone}</p>
    </div>
  );
}