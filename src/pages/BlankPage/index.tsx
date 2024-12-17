import { Flex, Spin } from "antd";
import React from "react";

const BlankPage = () => {
  return (
    <Flex
      align="center"
      gap="middle"
      className="flex items-center justify-center w-screen h-screen bg-transparent"
    >
      <Spin size="large" />
    </Flex>
  );
};

export default BlankPage;
