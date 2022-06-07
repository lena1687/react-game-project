import React from "react";
import { useSearchParams } from "react-router-dom";

export const MemoryCards = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const userName = searchParams.get("userName");
  return (
    <>
      <div>page MemoryCards</div>
      <div>userName : {userName}</div>
    </>
  );
};
