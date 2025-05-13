import { notFound } from "next/navigation";
import { Suspense } from "react";

// Define the User type with all required fields
type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    street: string;
    city: string;
  };
};

// Define error type for fetch failures
type FetchError = {
  message: string;
};

// Fetch user data with type-safe return
async function getUser(id: string): Promise<User> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    cache: "no-store", // Ensure fresh data
  });
  if (!res.ok) notFound();
  return res.json() as Promise<User>;
}

// Error boundary component
type ErrorBoundaryProps = {
  error: FetchError | null;
  children: React.ReactNode;
};

function ErrorBoundary({ error, children }: ErrorBoundaryProps) {
  if (error) {
    return (
      <div className="bg-red-100 p-6 rounded-lg shadow-lg max-w-lg mx-auto text-red-800">
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p>{error.message}</p>
      </div>
    );
  }
  return <>{children}</>;
}

// User display component
type UserDisplayProps = {
  user: User;
};

function UserDisplay({ user }: UserDisplayProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto border border-teal-100">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">{user.name}</h1>
      <div className="space-y-4 text-slate-800">
        <p>
          <strong className="text-teal-600">Email:</strong> {user.email}
        </p>
        <p>
          <strong className="text-teal-600">Phone:</strong> {user.phone}
        </p>
        <p>
          <strong className="text-teal-600">Website:</strong> {user.website}
        </p>
        <p>
          <strong className="text-teal-600">Company:</strong> {user.company.name}
        </p>
        <p>
          <strong className="text-teal-600">Address:</strong> {user.address.street}, {user.address.city}
        </p>
      </div>
    </div>
  );
}

// Main page component
export default async function UserPage({ params }: { params: { id: string } }) {
  let user: User | null = null;
  let error: FetchError | null = null;

  try {
    user = await getUser(params.id);
  } catch (err) {
    error = { message: "Failed to fetch user data. Please try again later." };
  }

  return (
    <ErrorBoundary error={error}>
      <Suspense
        fallback={
          <div className="text-center p-6 text-teal-600">
            Loading user data...
          </div>
        }
      >
        {user && <UserDisplay user={user} />}
      </Suspense>
    </ErrorBoundary>
  );
}