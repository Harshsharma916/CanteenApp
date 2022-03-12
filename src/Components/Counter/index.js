import { useState } from "react";
import styled from "styled-components";
import { Button } from "../ExportStyles";

const Counterdiv = styled.div`
  display: flex;
  gap: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
`;

const Counterbutton = styled(Button)`
    padding: 5px 15px;
`

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <Counterdiv className="counter">
      <Counterbutton
        bg="#FE724D"
        onClick={() =>
          setCount((prev) => {
            if (count == 0) {
              return 0;
            } else {
              return prev - 1;
            }
          })
        }
      >
        -
      </Counterbutton>
      <Counterbutton bg="#FE724D">{count}</Counterbutton>
      <Counterbutton bg="#FE724D" onClick={() => setCount((prev) => prev + 1)}>
        +
      </Counterbutton>
    </Counterdiv>
  );
};

export default Counter;
