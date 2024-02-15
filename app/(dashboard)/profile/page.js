import { UserProfile } from "@clerk/nextjs";

const ProfilePage = () => {
  return (
    <div className="flex justify-center items-center">
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
