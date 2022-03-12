import styled from "styled-components";
import Counter from "../Counter";
import { Button, Text } from "../ExportStyles";
import fooditem from "../../Images/fooditem.svg";

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

const Card = ({ data }) => {

  return (
    <Carddiv>
      <img src={fooditem} />
      {/* {add ? (
        <Counter/>
      ) : (
        <Button className="add" bg="#FE724D" onClick={() => setAdd(data.id)}>
          + Add
        </Button>
      )} */}
      <Counter name={data?.name}/>
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
