import { Helmet } from "react-helmet";

const useHelmet = (title) => {
  return (
    <Helmet>
      <title>{title} - Madicaid</title>
    </Helmet>
  );
};

export default useHelmet;