import { useAuth0 } from "@auth0/auth0-react";
import { IonAvatar } from "@ionic/react";

const Profile: React.FC = () => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!user) return null;

  return (
    <div className="profile-container">
      <IonAvatar className="avatar">
        <img src={user.picture} alt={user.name} />
      </IonAvatar>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
