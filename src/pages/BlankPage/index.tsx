import { Flex, Spin } from "antd";
import React from "react";

const BlankPage = () => {
  return (
    <Flex
      align="center"
      gap="middle"
      className="w-screen h-screen flex justify-center items-center bg-transparent"
    >
      <Spin size="large" />
    </Flex>
  );
};

export default BlankPage;
