import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  useBreakpointValue,
  useDisclosure,
  Circle,
  Center,
  Button,
} from "@chakra-ui/react";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { FaUserAstronaut } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

import { Link as RouteLink } from "react-router-dom";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  // TODO FAZER ICONE CONDICIONAL PARA FILTRO DE FAVORITOS
  // TODO AJUSTAR CONDICIONAL EM MAPEAMENTO DE EXIBIÇÃO

  return (
    <Box position={"static"}>
      <Flex
        minH={"60px"}
        py={{ base: 4 }}
        px={{ base: 8 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            size={"lg"}
            icon={isOpen ? <IoMdClose w={3} h={3} /> : <GiHamburgerMenu />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"Raleway"}
            fontWeight={700}
            fontSize={"2xl"}
            color={"gray.800"}
          >
            <RouteLink to={"/"}>ACME</RouteLink>
          </Text>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={{ base: "12px", md: "18px" }}
        >
          <Flex>
            <Center>
              <Circle size="36px" bg="black" color="white">
                <Icon as={FaUserAstronaut} alignSelf={"center"} h={6} w={5} />
              </Circle>
            </Center>
            <Box display={{ base: "none", md: "flex" }} width={120}>
              <Center>
                <Text ml={"14px"} fontWeight={500}>
                  Olá, Usuário
                </Text>
              </Center>
            </Box>
          </Flex>
          <Flex display={{ base: "none", md: "flex" }}>
            <Center>
              <RouteLink to={"cart"}>
                <Button variant={"ghost"} rounded={"full"}>
                  <Icon as={FiShoppingCart} h={7} w={7} pt={1} />
                </Button>
              </RouteLink>
            </Center>
          </Flex>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const MobileNav = () => {
  return (
    <Stack
      p={4}
      pl={8}
      spacing={4}
      direction={"column"}
      display={{ md: "none" }}
    >
      <MobileNavItem label="Home" href={""} />
      <MobileNavItem label="Carrinho" href={"cart"} />
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={RouteLink}
        to={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600}>{label}</Text>
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={6}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={"gray.200"}
          align={"start"}
        ></Stack>
      </Collapse>
    </Stack>
  );
};
