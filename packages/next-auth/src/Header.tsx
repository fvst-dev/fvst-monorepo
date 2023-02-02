import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <>
      <header>
        <div className="block max-h-max">
          <p className="absolute top-0 m-0 overflow-hidden opacity-100">
            {!session && (
              <>
                <span className="whitespace-no-wrap absolute overflow-hidden pt-3 leading-5">
                  You are not signed in
                </span>
                <a
                  href={`/api/auth/signin`}
                  className="relative z-10 float-right -mr-2 cursor-pointer rounded bg-transparent text-base font-medium leading-6"
                  onClick={(e) => {
                    e.preventDefault();
                    signIn();
                  }}
                >
                  Sign in
                </a>
              </>
            )}
            {session?.user && (
              <>
                {session.user.image && (
                  <span
                    style={{ backgroundImage: `url('${session.user.image}')` }}
                    className="float-left h-12 w-12 rounded-lg bg-white bg-cover bg-no-repeat"
                  />
                )}
                <span className="whitespace-no-wrap absolute overflow-hidden pt-3 leading-5">
                  <small>Signed in as</small>
                  <br />
                  <strong>{session.user.email ?? session.user.name}</strong>
                </span>
                <a
                  href={`/api/auth/signout`}
                  className="relative z-10 float-right -mr-2 cursor-pointer rounded bg-transparent text-base font-medium leading-6"
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Sign out
                </a>
              </>
            )}
          </p>
        </div>
        <nav>
          <ul className="mb-8 p-0">
            <li className="mr-4 inline-block">
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
