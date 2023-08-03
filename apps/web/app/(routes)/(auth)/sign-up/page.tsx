import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => (
  <div className="flex w-full justify-center">
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  </div>
);
export default SignUpPage;
