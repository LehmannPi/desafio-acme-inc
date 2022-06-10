import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { Link as RouteLink, Navigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [cartSet, setCartSet] = useState(new Set());
  const [total, setTotal] = useState();

  const toast = useToast();

  useEffect(() => {
    let sum = 0;
    for (let key of cartSet) {
      sum += products[key].valor;
    }
    setTotal(sum);
  }, [cartSet]);

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("savedState")) {
        <Navigate to="/" replace={true} />;
      } else {
        setProducts(JSON.parse(localStorage.getItem("savedState")));
      }
      loadCart();
    })();
  }, []);

  const loadCart = async () => {
    setCartSet(new Set(JSON.parse(localStorage.getItem("carrinho"))));
  };

  const handleCarrinho = (idx) => {
    var auxSet = new Set([...cartSet]);
    auxSet.delete(idx);
    setCartSet(auxSet);
    localStorage.setItem("carrinho", JSON.stringify([...auxSet]));
  };

  const checkout = () => {
    let send = [];
    for (let key of cartSet) {
      send.push(products[key]);
    }
    console.log(send);
  };

  return (
    <>
      <Container maxW={"7xl"} p={10}>
        <Heading>Revise seu pedido</Heading>
        <Flex direction={["column", "column", "row"]} gap={[4, 8]} my={10}>
          <Stack
            m={"auto"}
            spacing={{ base: 4, md: 8 }}
            borderWidth="1px"
            w="100%"
            rounded="lg"
            p={8}
          >
            {/* Mapeamento - Inicio */}
            {products.map((prod, idx) => (
              <Flex key={idx} display={cartSet.has(idx) ? "flex" : "none"}>
                {/* <Flex key={idx} display={cartSet.has(idx) ? "flex" : "none"}> */}
                <RouteLink to={1}>
                  <Image
                    src={"https://picsum.photos/seed/" + prod.seed + "/382/300"}
                    alt={`Imagem de ${prod.nome}`}
                    rounded="lg"
                    h={75}
                  />
                </RouteLink>
                <Flex
                  direction={"row"}
                  my={"auto"}
                  mx={3}
                  justify={"space-between"}
                  w="100%"
                >
                  <Flex
                    fontSize={"2xl"}
                    fontWeight="semibold"
                    as="h4"
                    alignContent="center"
                  >
                    <RouteLink to={"../" + idx.toString()}>
                      {prod.nome}
                    </RouteLink>
                  </Flex>
                  <Flex>
                    <Center fontSize={"xl"} color={"gray.800"} mr={6}>
                      <Box as="span" color={"gray.600"} fontSize="md">
                        R$
                      </Box>
                      {prod.valor}
                    </Center>
                    <Tooltip
                      label={"Remover do carrinho"}
                      bg="white"
                      placement={"top"}
                      color={"gray.800"}
                      fontSize={"1.2em"}
                    >
                      <Flex>
                        <Icon
                          as={IoMdClose}
                          alignSelf={"center"}
                          onClick={() => handleCarrinho(idx)}
                          cursor="pointer"
                          h={6}
                          w={6}
                        />
                      </Flex>
                    </Tooltip>
                  </Flex>
                </Flex>
              </Flex>
            ))}
            {/* Mapeamento - Fim */}
          </Stack>

          <Stack
            alignSelf={"start"}
            spacing={{ base: 3, md: 6 }}
            mb={"auto"}
            borderWidth="1px"
            rounded="lg"
            p={4}
            w={["100%", "100%", "65%"]}
          >
            <Flex justify={"space-between"}>
              <Text fontSize={"2xl"} fontWeight="semibold" as="h4">
                Valor total
              </Text>
              <Box
                fontSize={["xl", "2xl"]}
                color={"gray.800"}
                mr={1}
                alignSelf={"center"}
                fontWeight={"bold"}
              >
                <Box as="span" color={"gray.800"} fontSize="md">
                  R$
                </Box>
                {total}
              </Box>
            </Flex>
            <Button
              rounded={"none"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              colorScheme="yellow"
              textTransform={"uppercase"}
              onClick={() => {
                toast({
                  title: "Checkout",
                  description: "Lista de pedidos foi enviada para o console.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
                checkout();
              }}
              _hover={{
                transform: "translateY(3px)",
                boxShadow: "lg",
              }}
            >
              chekcout
            </Button>
          </Stack>
        </Flex>
      </Container>
    </>
  );
};

export default Cart;
