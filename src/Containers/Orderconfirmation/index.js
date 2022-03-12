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

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100vh;

  .orderitems {
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 80%;
    overflow-y: scroll;
    ::-webkit-scrollbar{
      display: none;
    }
  }
`;

const Pricediv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 25%;
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

      :hover{
        background: #fe724d;
        cursor:pointer;
        color: white;
      }
    }

    .upi , .cod{
      padding: 5px 0px;
      width: 120px;
      background: rgba(254,120,77,0.9);
      border-radius: 8px;
      color: white;
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
  const [payment,setpayment] = useState('');

  useEffect(() => {
    // if (location.state?.promoCode && !selectedPromocode) {
    //   dispatchSubmitPromoCode(location.state?.promoCode);
    // }
    // add rzp script

    if (navigator.userAgent.toLowerCase().includes('phonepe')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://checkout.razorpay.com/v1/razorpay.js';
      document.head.appendChild(script);
    } else {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      document.head.appendChild(script);
    }
  }, []);

  function totalAmount() {
    console.log(orderitems)
    let total = 0;
    for (let i=0; i < orderitems.length; i++) {
      console.log(orderitems[i].price)
      total += orderitems[i].price * orderitems[i].count;
    }
    return total;
  }

  const finalizeReq = {
    orderId: 12345,
    orderType: 'food',
    amount: totalAmount()+40,
    paymentId: null,
  }

  const razorpayStandardCheckout = data => {
    const base_amount = data.amount;
    const amount = data.amount;
    const base_currency = 'INR';
    const currency = 'INR';
    const orderId = data.orderId;
    const orderType = data.orderType;
    const promoCodeId = data.promoCodeId;
    const description = `${orderType}|${orderId}|${amount}|${currency}|${base_currency}|${promoCodeId}`;
    // eslint-disable-next-line no-undef
    window.r = new Razorpay({
      key: 'rzp_test_Up5TWUTLS5U0Dw',
      protocol: 'https',
      hostname: 'api.razorpay.com',
      base_amount: base_amount * 100,
      base_currency: base_currency,
      amount: amount * 100,
      currency: currency,
      name: 'GRUB IT',
      description: description,
      prefill: {
        name: loginData?.name || 'Harsh',
        contact: `+91${loginData?.mobileNumber}` || '+911234567890',
        email: loginData?.email || 'hash@gmail.com',
      },
      image: Logo,
      handler: function(response) {
        const paymentId = response.razorpay_payment_id;
        data.paymentId = paymentId;
        if (paymentId) {
          // dispatchFallback();
          // dispatchReset();
          // dispatchRemovePickupData(pickupData);
          // dispatchRemoveSelectedStoreId(selectedStoreId);
          // history.replace(routeConstants.success.route);
        } else {
          console.log('PAYMENT ERROR');
        }
      },
    });
    // eslint-disable-next-line no-undef
    r.open();
  };

  return (
    <>
      <Header />
      <Wrapper>
        <Text style={{marginTop:'30px',textAlign:'left',marginBottom:'20px'}} size="30px" weight="500">Orders</Text>
        <Body>
          <div className="orderitems">
            {orderitems.map((item, key) => {
              return <Menucard key={key} data={item} />;
            })}
          </div>
          <Pricediv>
            <Text size="28px" style={{textAlign:'left'}} weight="400">Price Details</Text>
            <div className="categorydiv">
              <div className="category">Delivery</div>
              <div className="category">Pick up</div>
              <div className="category">Dine in</div>
            </div>
            <div className="ordersummary">
              <div className="ordersummary-sections">
                <Text size="20px" weight="300">Order Summary</Text>
                <Text size="20px" weight="500">
                  ₹{totalAmount()}
                </Text>
              </div>
              <div className="ordersummary-sections">
                <Text size="20px" weight="300">Delivery Charge</Text>
                <Text size="20px" weight="500">
                  ₹40
                </Text>
              </div>
              <div className="ordersummary-sections">
                <Text size="20px" weight="300">Total</Text>
                <Text size="20px" weight="500">
                  ₹{totalAmount() + 40}
                </Text>
              </div>
            </div>
            <div className="payment">
              <Text size="20px" style={{textAlign: 'left'}}>Payment</Text>
              <div className="categorydiv">
                <div className={payment=='upi'?'upi':'category'} onClick={()=> setpayment('upi')}>UPI</div>
                <div className={payment=='cod'?'cod':'category'} onClick={()=> setpayment('cod')}>COD</div>
              </div>
            </div>
            <Button bg="#FE724D" color="white" onClick={() => {payment==='upi' && razorpayStandardCheckout(finalizeReq)}}>PLACEORDER</Button>
          </Pricediv>
        </Body>
      </Wrapper>
    </>
  );
};

export default Orderconfirmation;
