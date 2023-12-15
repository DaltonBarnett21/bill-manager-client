import React from "react";
import Layout from "./layout";

const WithLayout = (Component: React.ComponentType) => {
  return (props: any) => (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};

export default WithLayout;
