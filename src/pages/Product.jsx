import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

var favoriteSet = new Set();
var cartSet = new Set();

const Product = () => {
  const [product, setProduct] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [cart, setCart] = useState(false);

  let { id } = useParams();

  const loadFavAndCart = () => {
    favoriteSet = new Set(JSON.parse(localStorage.getItem("favoritos")));
    setFavorite(favoriteSet.has(parseInt(id)));
    cartSet = new Set(JSON.parse(localStorage.getItem("carrinho")));
    setCart(cartSet.has(parseInt(id)));
  };

  const handleFavorito = () => {
    const key = parseInt(id);
    setFavorite(!favorite);
    // favoriteSet = new Set(JSON.parse(localStorage.getItem("favoritos")));
    favoriteSet.has(key) ? favoriteSet.delete(key) : favoriteSet.add(key);
    localStorage.setItem("favoritos", JSON.stringify([...favoriteSet]));
  };
  const handleCarrinho = () => {
    const key = parseInt(id);
    setCart(!cart);
    // favoriteSet = new Set(JSON.parse(localStorage.getItem("favoritos")));
    cartSet.has(key) ? cartSet.delete(key) : cartSet.add(key);
    localStorage.setItem("carrinho", JSON.stringify([...cartSet]));
  };

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("savedState")) {
        <Navigate to="/" replace={true} />;
      } else {
        setProduct(
          JSON.parse(localStorage.getItem("savedState"))[parseInt(id)]
        );
      }
      loadFavAndCart();
    })();
  }, []);

  // * Use parseInt(str)
  return (
    <>
      <Container maxW={"7xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 4, md: 6 }}
        >
          <Flex>
            <Image
              rounded={"md"}
              alt={"product image"}
              src={"https://picsum.photos/seed/" + product.seed + "/600/500"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }} m={"auto"}>
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {product.nome}
              </Heading>
              <Text
                color={useColorModeValue("gray.900", "gray.400")}
                fontWeight={300}
                fontSize={"2xl"}
              >
                {(product.valor || 0).toFixed(2)} R$
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text
                  color={useColorModeValue("gray.500", "gray.400")}
                  fontSize={"2xl"}
                  fontWeight={"300"}
                >
                  {(product.desc || "").split(".")[0] + "."}
                </Text>
                <Text fontSize={"lg"}>{product.desc}</Text>
              </VStack>
            </Stack>

            <Stack>
              <Button
                w={60}
                alignSelf={"center"}
                mb={3}
                colorScheme="yellow"
                variant={"ghost"}
                onClick={handleFavorito}
              >{`${
                favorite ? "Remover d" : "Adicionar a"
              }os Favoritos`}</Button>
              <Button
                rounded={"none"}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
                colorScheme="yellow"
                textTransform={"uppercase"}
                onClick={handleCarrinho}
                _hover={{
                  transform: "translateY(3px)",
                  boxShadow: "lg",
                }}
              >
                {cart ? "Remover d" : "Adicionar a"}o carrinho
              </Button>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Product;
