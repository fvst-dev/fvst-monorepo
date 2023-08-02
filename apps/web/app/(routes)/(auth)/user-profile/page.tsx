import { UserProfile } from '@clerk/nextjs';

const UserProfilePage = () => (
  <div className="flex w-full justify-center">
    <UserProfile path="/user-profile" routing="path" />
  </div>
);

export default UserProfilePage;
