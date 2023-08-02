import { SignedIn, SignedOut, SignInButton, UserButton as ClerkUserButton } from '@clerk/clerk-react';

export const UserButton = () => {
  return (
    <>
      <SignedIn>
        {/* Mount the UserButton component */}
        <ClerkUserButton
          appearance={{
            userProfile: {
              variables: {
                borderRadius: '0px',
              },
            },
          }}
        />
      </SignedIn>
      <SignedOut>
        {/* Signed-out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </>
  );
};
