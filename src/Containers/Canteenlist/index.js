import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AxiosGet } from "../../Components/Apicaller";
import { Text, Wrapper } from "../../Components/ExportStyles";
import Card from "../../Components/FoodCard";
import Header from "../../Components/Header";
import fooditem from "../../Images/fooditem.svg";

export const Toppickdiv = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: scroll;
  flex-direction: column;
  margin-top: 50px;
  ::-webkit-scrollbar {
    display: none;
  }

  .toppick-header {
    display: flex;
    justify-content: space-between;
    text-align: left;
  }
  .img-div {
    display: flex;
    gap: 4%;
    overflow-x: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Canteensdiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  gap: 10px;

  .canteenCard {
    position: relative;
    width: max-content;

    .img {
      // position: absolute;
      // z-index: 1;
    }

    .text {
      position: absolute;
      z-index: 8;
      bottom: 10px;
      left: 10px;
    }

    :hover {
      cursor: pointer;
    }
  }

  .canteen-header {
    text-align: left;
  }

  .img-div {
    padding: 10px 0px;
    display: grid;
    grid-template-columns: auto auto auto auto;
    column-gap: 20px;
    row-gap: 20px;
  }
`;
const CanteenList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const canteens = useSelector((state) => state?.canteenData);

  useEffect(() => {});

  async function changeRoute(item) {
    const response = await AxiosGet(
      `https://grub-it.herokuapp.com/api/v1/canteen/622c9f26b0bdf47b2307940f/622caa483b41d0c1c3164a7b` 
    );
    console.log(response, "CANTEEN ID");
    if (response?.data?.status == "success") {
      dispatch({ type: "selectedCanteen", data: response.data.data });
      navigate("/canteenmenu");
    }
  }

  const foodItems = [
    {
      id: 0,
      name: "Samosa",
      imgSrc: fooditem,
      rate: 0,
      canteen: "AMUL CORNER",
    },
    {
      id: 1,
      name: "Samosa",
      imgSrc: fooditem,
      rate: 0,
      canteen: "AMUL CORNER",
    },
  ];
  // const canteens = [{ id: 0, name: "AMUL CORNER", imgSrc: fooditem }];
  return (
    <>
      <Header college={canteens[0].college.name} />
      <Wrapper>
        <Toppickdiv>
          <div className="toppick-header">
            <Text size="25px" weight="500">
              TOP PICKS
            </Text>
          </div>
          <div className="img-div">
            {foodItems.map((item, key) => {
              return (
                <Card
                  key={key}
                  data={item}
                  // count={count}
                  // setCounter={setCounter}
                  // add={item.id == id ? true : false}
                  // setAdd={setAddID}
                />
              );
            })}
          </div>
        </Toppickdiv>
        <Canteensdiv>
          <div className="canteen-header">
            <Text size="25px" weight="500">
              CANTEENS
            </Text>
          </div>
          <div className="img-div">
            {canteens.map((item, key) => {
              return (
                <div
                  key={key}
                  className="canteenCard"
                  onClick={() => changeRoute(item)}
                >
                  <img src={fooditem} className="img" />
                  <Text className="text" color="white" weight="500" size="20px">
                    {item.name}
                  </Text>
                </div>
              );
            })}
          </div>
        </Canteensdiv>
      </Wrapper>
    </>
  );
};

export default CanteenList;
