import Footer from "../../Components/Footer";
import styled from "styled-components";
import { Button, Text, Wrapper } from "../../Components/ExportStyles";
import Header from "../../Components/Header";
import bgimg from "../../Images/bgimg.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AxiosGet, AxiosPost, URL } from "../../Components/Apicaller";
import { useEffect, useState } from "react";
import Menucard from "../../Components/Menucard";
import Logo from "../../Images/Logo.svg";
import successImg from "../../Images/success.svg";
import { CloseOutlined } from "@ant-design/icons";

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80vh;
  position: relative;

  .orderitems {
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 80%;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .successImg {
    width: 40%;
    position: absolute;
    z-index: 2;
    top: 10%;
    left: 30%;
  }
  .bodydiv {
    position: absolute;
    background: black;
    z-index: 1;
    opacity: 0.3;
    width: 110%;
    left: -85px;
    top: -100px;
    height: 85vh;
  }

  .closeButton{
    position: absolute;
    z-index: 5;
    top: 14%;
    right: 32%;
    padding: 7px;
    transform: scale(2);
    background: white;
    border-radius: 50%;
    color: #fe724d;

    :hover {
      // background: #a0a0a0;
      color: black;
      padding: 9px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
`;

const Pricediv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 30%;
  margin-right: 30px;

  .categorydiv {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .category {
      padding: 5px 0px;
      width: 120px;
      border: 1px solid #fe724d;
      border-radius: 8px;
      font-size: 18px;

      :hover {
        background: #fe724d;
        cursor: pointer;
        color: white;
      }
    }

    .selected {
      padding: 5px 0px;
      width: 120px;
      background: rgba(254, 120, 77, 0.9);
      border-radius: 8px;
      color: white;
      font-size: 18px;
    }
  }

  .ordersummary {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .ordersummary-sections {
      display: flex;
      justify-content: space-between;
    }
  }

  .payment {
    gap: 15px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }
`;
const Orderconfirmation = () => {
  const orderitems = useSelector((state) => state.placeOrder);
  const loginData = useSelector((state) => state.loginData);
  const token = useSelector((state) => state.token);
  const selectedCanteen = useSelector((state) => state.selectedCanteen);
  const [payment, setpayment] = useState("");
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // if (location.state?.promoCode && !selectedPromocode) {
    //   dispatchSubmitPromoCode(location.state?.promoCode);
    // }
    // add rzp script

    if (navigator.userAgent.toLowerCase().includes("phonepe")) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://checkout.razorpay.com/v1/razorpay.js";
      document.head.appendChild(script);
    } else {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.head.appendChild(script);
    }
  }, []);

  function totalAmount() {
    let total = 0;
    for (let i = 0; i < orderitems.length; i++) {
      total += orderitems[i].price * orderitems[i].count;
    }
    return total;
  }

  const finalizeReq = {
    orderId: 12345,
    orderType: "food",
    amount: totalAmount() + 40,
    paymentId: null,
  };

  const razorpayStandardCheckout = (data) => {
    const base_amount = data.amount;
    const amount = data.amount;
    const base_currency = "INR";
    const currency = "INR";
    const orderId = data.orderId;
    const orderType = data.orderType;
    const promoCodeId = data.promoCodeId;
    const description = `${orderType}|${orderId}|${amount}|${currency}|${base_currency}|${promoCodeId}`;
    // eslint-disable-next-line no-undef
    window.r = new Razorpay({
      key: "rzp_test_Up5TWUTLS5U0Dw",
      protocol: "https",
      hostname: "api.razorpay.com",
      base_amount: base_amount * 100,
      base_currency: base_currency,
      amount: amount * 100,
      currency: currency,
      name: "GRUB IT",
      description: description,
      prefill: {
        name: loginData?.name || "Harsh",
        contact: `+91${loginData?.mobileNumber}` || "+911234567890",
        email: loginData?.email || "hash@gmail.com",
      },
      image: Logo,
      handler: function (response) {
        const paymentId = response.razorpay_payment_id;
        data.paymentId = paymentId;
        if (paymentId) {
          // dispatchFallback();
          // dispatchReset();
          // dispatchRemovePickupData(pickupData);
          // dispatchRemoveSelectedStoreId(selectedStoreId);
          // history.replace(routeConstants.success.route);
          setSuccess(true);
        } else {
          console.log("PAYMENT ERROR");
        }
      },
    });
    // eslint-disable-next-line no-undef
    r.open();
  };

  const college = selectedCanteen?.canteen?.college;
  const orderdata = [
    orderitems.map((item, key) => {
      return { name: item.name, price: item.price, quantity: item.count };
    }),
  ];

  // console.log(orderdata[0]);

  const data = {
    "orderDetails:": orderdata[0],
    timeEstimated: 15,
    comment: "perfecto",
    typeOfOrder: "dinein",
    totalPrice: totalAmount() + 40,
    modeOfPayment: payment=='upi'?'online':'cod',
  };

  const header = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  async function placeOrder() {
    if (loginData?.name) {
      if (payment === "upi") {
        razorpayStandardCheckout(finalizeReq);
      } else {
        setSuccess(true);
      }
      const response = await AxiosPost(
        `https://grub-it.herokuapp.com/api/v1/orders/${college._id}/${selectedCanteen.canteen._id}`,
        data,
        header
      );
      console.log(response, "RESPONSE");
      if (response.data.status == "success") {
      }
    } else {
      setShow((prev) => !prev);
    }
  }
  return (
    <>
      <Header show={show} />
      <Wrapper>
        <Text
          style={{ marginTop: "30px", textAlign: "left", marginBottom: "20px" }}
          size="30px"
          weight="500"
        >
          Orders
        </Text>
        <Body>
          <div className="orderitems">
            {orderitems.map((item, key) => {
              return <Menucard key={key} data={item} />;
            })}
          </div>
          {success && (
            <>
              <img src={successImg} className="successImg" />
              <CloseOutlined className="closeButton"
                onClick={() =>
                  setSuccess(false)
                }/>
              <div className="bodydiv"></div>
            </>
          )}
          <Pricediv>
            <Text size="28px" style={{ textAlign: "left" }} weight="400">
              Price Details
            </Text>
            <div className="categorydiv">
              <div className="category">Delivery</div>
              <div className="selected">Pick up</div>
              <div className="category">Dine in</div>
            </div>
            <div className="ordersummary">
              <div className="ordersummary-sections">
                <Text size="20px" weight="300">
                  Order Summary
                </Text>
                <Text size="20px" weight="500">
                  ₹{totalAmount()}
                </Text>
              </div>
              <div className="ordersummary-sections">
                <Text size="20px" weight="300">
                  Delivery Charge
                </Text>
                <Text size="20px" weight="500">
                  ₹40
                </Text>
              </div>
              <div className="ordersummary-sections">
                <Text size="20px" weight="300">
                  Total
                </Text>
                <Text size="20px" weight="500">
                  ₹{totalAmount() + 40}
                </Text>
              </div>
            </div>
            <div className="payment">
              <Text size="20px" style={{ textAlign: "left" }}>
                Payment
              </Text>
              <div className="categorydiv">
                <div
                  className={payment == "upi" ? "selected" : "category"}
                  onClick={() => setpayment("upi")}
                >
                  UPI
                </div>
                <div
                  className={payment == "cod" ? "selected" : "category"}
                  onClick={() => setpayment("cod")}
                >
                  COD
                </div>
              </div>
            </div>
            <Button bg="#FE724D" color="white" onClick={() => placeOrder()}>
              PLACE ORDER
            </Button>
          </Pricediv>
        </Body>
      </Wrapper>
    </>
  );
};

export default Orderconfirmation;
