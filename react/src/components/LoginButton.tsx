import { useAuth0 } from "@auth0/auth0-react";
import { Browser } from "@capacitor/browser";
import { IonButton } from "@ionic/react";

const LoginButton: React.FC = () => {
  const { buildAuthorizeUrl } = useAuth0();

  const login = async () => {
    const url = await buildAuthorizeUrl();
    await Browser.open({ url, windowName: "_self" });
  };

  return <IonButton onClick={login}>Log in</IonButton>;
};

export default LoginButton;
