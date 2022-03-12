import styled from "styled-components";
import { Button, Text } from "../ExportStyles";

const Carddiv = styled.div`
    position: relative;
    width: 400px;

    .img{
        position: absolute;
        top: 0px;
        left 0px;
        z-index:1;
    }

    .add{
        position: absolute;
        top: 10px;
        right: 10px;
        z-index:1;
    }

    .counter{
        display: flex;
        gap: 5px;
        position: absolute;
        top: 10px;
        right: 10px;
        z-index:1;
    }

    .Text-price{
        padding: 5px 15px;
        display: flex;
        position: absolute;
        bottom: 5px;  
        text-align: left;
        width: 100%;
        z-index: 1;
    }
`;

const Card = ({ data, count, setCounter, add, setAdd }) => {
  return (
    <Carddiv>
      <img src={data.imgSrc} />
      {add ? (
        <div className="counter">
          <Button
            bg="#FE724D"
            onClick={() =>
              setCounter((prev) => {
                if (count == 0) {
                  return 0;
                } else {
                  return prev - 1;
                }
              })
            }
          >
            -
          </Button>
          <Button bg="#FE724D">{count}</Button>
          <Button bg="#FE724D" onClick={() => setCounter((prev) => prev + 1)}>
            +
          </Button>
        </div>
      ) : (
        <Button className="add" bg="#FE724D" onClick={() => setAdd(data.id)}>
          + Add
        </Button>
      )}
      <div className="Text-price">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text color="white" size="25px" weight="500">
            {data?.name}
          </Text>
          <Text color="white" size="15px">
            {data?.canteen}
          </Text>
        </div>
        <Text color="white" size="20px">
          {data?.price}
        </Text>
      </div>
    </Carddiv>
  );
};

export default Card;
