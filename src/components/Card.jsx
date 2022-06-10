import { Flex, Box, Image, Icon, Tooltip, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Link as RouteLink } from "react-router-dom";

function ProductAddToCart(props) {
  const { seed, favorito, carrinho, nome, valor, desc, idx, filter } = props;
  const [favorite, setFavorite] = useState(favorito);
  const [cart, setCart] = useState(carrinho);

  const handleFavorito = () => {
    const key = parseInt(idx);
    setFavorite(!favorite);
    var favoriteSet = new Set(JSON.parse(localStorage.getItem("favoritos")));
    favoriteSet.has(key) ? favoriteSet.delete(key) : favoriteSet.add(key);
    localStorage.setItem("favoritos", JSON.stringify([...favoriteSet]));
    console.log(favoriteSet);
  };
  const handleCarrinho = () => {
    const key = parseInt(idx);
    setCart(!cart);
    var cartSet = new Set(JSON.parse(localStorage.getItem("carrinho")));
    cartSet.has(key) ? cartSet.delete(key) : cartSet.add(key);
    localStorage.setItem("carrinho", JSON.stringify([...cartSet]));
    console.log(cartSet);
  };

  return (
    <Flex display={filter && !favorite ? "none" : "flex"} justifyContent={"center"}>
      <Box
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Tooltip
          label={`${favorite ? "Remover d" : "Adicionar a"}os Favoritos`}
          bg="white"
          placement={"top"}
          color={"gray.800"}
          fontSize={"1.2em"}
        >
          <Flex top={3} right={3} position="absolute">
            <Icon
              as={favorite ? BsStarFill : BsStar}
              alignSelf={"center"}
              onClick={handleFavorito}
              cursor="pointer"
              color={"yellow.500"}
              h={6}
              w={6}
            />
          </Flex>
        </Tooltip>
        <RouteLink to={idx}>
          <Image
            src={"https://picsum.photos/seed/" + seed + "/382/300"}
            alt={`Imagem de ${nome}`}
            roundedTop="lg"
          />
        </RouteLink>

        <Box p="6">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Flex
              fontSize={["lg", "xl", "2xl"]}
              fontWeight="semibold"
              as="h4"
              alignContent="center"
            >
              <RouteLink to={idx}>{nome}</RouteLink>
            </Flex>
            <Tooltip
              label={`${cart ? "Remover d" : "Adicionar a"}o carrinho`}
              bg="white"
              placement={"top"}
              color={"gray.800"}
              fontSize={"1.2em"}
            >
              <Flex>
                <Icon
                  as={cart ? IoMdClose : FiShoppingCart}
                  alignSelf={"center"}
                  onClick={handleCarrinho}
                  cursor="pointer"
                  h={6}
                  w={6}
                />
              </Flex>
            </Tooltip>
          </Flex>

          <Flex
            justifyContent="space-between"
            alignContent="center"
            mt={2}
            position={"relative"}
          >
            <Text
              noOfLines={[1, 2]}
              fontSize={["sm", "md"]}
              width={["70%", "60%"]}
              textAlign={"left"}
            >
              {desc}
            </Text>
            <Box
              fontSize={["lg", "xl"]}
              color={"gray.800"}
              position={"absolute"}
              bottom={0}
              right={0}
            >
              <Box as="span" color={"gray.600"} fontSize="md">
                R$
              </Box>
              {valor.toFixed(2)}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default ProductAddToCart;
