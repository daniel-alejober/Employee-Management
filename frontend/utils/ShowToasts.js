import Container, { Toast } from "toastify-react-native";
import { useEffect } from "react";

const ShowToasts = ({ dataAlert }) => {
  const { type, message } = dataAlert;

  useEffect(() => {
    const showToastsF = ({ type, message }) => {
      Toast[type](message);
    };

    showToastsF({ type, message });
  }, [type, message]);

  return <Container position="center" width="100%" height={100} />;
};

export default ShowToasts;
