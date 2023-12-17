'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav>
      <div className="logo">
        <Link href="/">
          <a>My App</a>
        </Link>
      </div>
      <div className="buttons">
        {!session ? (
          <button onClick={() => signIn()}>Sign In</button>
        ) : (
          <>
            <Link href="/addCustomer">
              <a>Add Customer</a>
            </Link>
            <Link href="/customers">
              <a>Show Customers</a>
            </Link>
            <button onClick={() => signOut()}>Sign Out</button>
          </>
        )}
      </div>
    </nav>
  );
}
