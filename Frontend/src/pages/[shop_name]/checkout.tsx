import React, { useContext, useState } from "react";
import CheckoutLayout from "@layouts/shop/checkout";
import { Flex, Heading, Button, Stack } from "@chakra-ui/react";
import VerifyUser from "@components/checkout/VerifyUser";
import DeliveryDetails from "@components/checkout/DeliveryDetails";
import PaymentMethod from "@components/checkout/PaymentMethod";
import OrderDetails from "@components/checkout/OrderDetails";
import useFetchCartProducts from "@hooks/useFetchCartProducts";
import { useRouter } from "next/router";
import { createOrder } from "@api/order";
import { IOrderDetails } from "interfaces/IOrder";
import NoResult from "@components/NoResult";
import Stepper from "react-stepper-horizontal";
import CartProductItem from "@components/common/cart/productItem";
import ShopContext from "context/shop/ShopContext";

const Checkout = () => {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<0 | 1 | 2 | 3>(0);
  const products = useFetchCartProducts();
  const { shop } = useContext(ShopContext);
  //data from forms:
  const [userData, setUserData] = useState<any>(null);
  const [deliveryDetails, setDeliveryDetails] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<
    "cod"
  >("cod");
  const [loading, setLoading] = useState<boolean>(false);

  const goToMainPage = () => {
    router.push(`/${router.query.shop_name}/`);
  };

  const placeOrder = async () => {
    //only get the id and quantity of products.
    let orderDetails: IOrderDetails[] = products?.map((product) => ({
      _id: product._id,
      product: product.id,
      quantity: product.quantity,
      price: product.price,
      image: product.image,
      size: product.size || "",
      sizeId: product.sizeId || "",
    }));

    const formData = {
      name: deliveryDetails.name,
      email: deliveryDetails.email,
      mobile: userData.mobile,
      otp: userData.otp,
      city: deliveryDetails.city,
      state: deliveryDetails.state,
      fullAddress: deliveryDetails.fullAddress,
      orderDetails,
      paymentMethod,
      shop_name: router.query.shop_name,
    };

    setLoading(true);
    await createOrder(formData);
    setLoading(false);
  };

  if (products?.length === 0) {
    return (
      <NoResult>
        <Heading mt="5" fontSize="lg">
          Missing Cart Items
        </Heading>
        <Flex mt={3}>View products and add them to cart to checkout.</Flex>
        <Button mt={5} colorScheme="primary" onClick={goToMainPage}>
          Browse Items
        </Button>
      </NoResult>
    );
  }

  if (shop.opened === false) {
    return (
      <NoResult>
        <Heading mt="5" fontSize="lg">
          The store is currently closed!
        </Heading>
        <Flex mt={3}>You can resume ordering once the store opens.</Flex>
        <Button mt={5} colorScheme="primary" onClick={goToMainPage}>
          Back to home page
        </Button>
      </NoResult>
    );
  }

  return (
    <Flex w="full" my={5} flexDirection={["column", "column", "column", "row"]}>
      <Flex
        w={["full", "full", "full", "65%"]}
        bg="white"
        boxShadow="base"
        p={[1, 1, 5]}
        flexDirection="column"
        minH={["fit-content", "fit-content", "fit-content", "80vh"]}
        m="1"
        borderRadius="lg"
      >
        <Stack display={["none", "none", "block"]}>
          <Stepper
            steps={[
              {
                title: "Shopping bag",
                onClick: () => setOpenIndex(0),
              },
              {
                title: "Verify user",
                onClick: () => setOpenIndex(1),
              },
              { title: "Delivery details", onClick: () => setOpenIndex(2) },
              { title: "Payment method", onClick: () => setOpenIndex(3) },
            ]}
            activeStep={openIndex}
            activeColor="#009E7F"
            completeColor="#009E7F"
          />
        </Stack>
        {openIndex === 0 && (
          <Stack spacing="5" p={[0, 0, 5]}>
            <Stack spacing="1" mt="5">
              {products?.map((product) => (
                <CartProductItem data={product} key={product.id} />
              ))}
            </Stack>
            <Button
              mt="5"
              colorScheme="primary"
              onClick={() => setOpenIndex(1)}
            >
              Proceed
            </Button>
          </Stack>
        )}

        {openIndex === 1 && (
          <VerifyUser
            setOpenIndex={setOpenIndex}
            openIndex={openIndex}
            setUserData={setUserData}
          />
        )}

        {openIndex === 2 && (
          <DeliveryDetails
            setOpenIndex={setOpenIndex}
            openIndex={openIndex}
            setDeliveryDetails={setDeliveryDetails}
          />
        )}

        {openIndex === 3 && (
          <>
            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
            <Button
              mt="5"
              colorScheme="primary"
              w="full"
              onClick={placeOrder}
              isLoading={loading}
            >
              Place Order
            </Button>
          </>
        )}
      </Flex>
      <Flex
        minH={["fit-content", "fit-content", "fit-content", "80vh"]}
        w={["full", "full", "full", "35%"]}
        bg="white"
        m="1"
        boxShadow="base"
        borderRadius="lg"
      >
        <OrderDetails />
      </Flex>
    </Flex>
  );
};

Checkout.layout = CheckoutLayout;

export default Checkout;
