import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <div className="flex w-full justify-center">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  );
};
export default SignInPage;
