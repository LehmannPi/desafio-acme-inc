import { verbos, adjetivos } from "../data/dados";
import { useEffect, useState } from "react";
import { loremHipsum } from "../Api";
import Card from "../components/Card";
import { BsStarFill } from "react-icons/bs";
import { Button, Flex, Icon, SimpleGrid } from "@chakra-ui/react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState(false);
  const [favoriteSet, setFavoriteSet] = useState(new Set());
  const [cartSet, setCartSet] = useState(new Set());

  // * Set - produtos favoritos e produtos no carrinho
  const loadFavAndCart = () => {
    if (localStorage.getItem("favoritos")) {
      setFavoriteSet(new Set(JSON.parse(localStorage.getItem("favoritos"))));
    }
    if (localStorage.getItem("carrinho")) {
      setCartSet(new Set(JSON.parse(localStorage.getItem("carrinho"))));
    }
  };

  const randomNum = (arr) => {
    return Math.floor(Math.random() * arr.length);
  };

  const generateProduct = (hipsum) => {
    const idxV = randomNum(verbos);
    const idxA = randomNum(adjetivos);
    const seed = idxV + adjetivos[idxA];
    const nome = verbos[idxV] + " " + adjetivos[idxA];
    const desc = hipsum[idxA % 10].slice(0, hipsum[idxA % 10].length / 2);
    const nameLength = nome.split(" ").length;
    const descrLength = desc.length;
    const valor = 10 + nameLength * ((500 - descrLength) / (3 - nameLength));

    verbos.splice(idxV, 1); // * guarantee not repeating
    adjetivos.splice(idxA, 1);

    return { seed, nome, valor, desc };
  };

  // ! "Mount"
  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("savedState")) {
        const response = await loremHipsum();

        const auxProducts = []; // ! Inicia array de produtos ( tamanho 15 )
        let tamanho = 15;
        for (let i = 0; i < tamanho; i++) {
          auxProducts.push(generateProduct(response.data));
        }
        localStorage.setItem("savedState", JSON.stringify(auxProducts));
        setProducts(auxProducts);
      } else {
        setProducts(JSON.parse(localStorage.getItem("savedState")));
      }
      loadFavAndCart();
    })();
  }, []);

  return (
    <>
      <Flex py={8} px={20}>
        <Button
          w={["100%", "inherit"]}
          onClick={async () => {
            setFilter(!filter);
          }}
          colorScheme={"yellow"}
          variant={filter ? "ghost" : "solid"}
        >
          Favoritos
          <Icon
            ml={2}
            as={BsStarFill}
            alignSelf={"center"}
            color={filter ? "yellow.500" : "white"}
            h={4}
            w={4}
          />
        </Button>
      </Flex>
      <SimpleGrid
        columns={[null, 1, 2, 3]}
        spacing="40px"
        p={"20"}
        pt={0}
        justifyContent={"center"}
      >
        {products.map((prod, idx) => (
          // <Box display={filter ? (favoriteSet.has(idx) ? "flex" : "none") : "flex"} >
          // <Flex alignContent={"center"} direction={"column"}>
          <Card
            key={idx}
            seed={prod.seed}
            favorito={favoriteSet.has(idx)}
            carrinho={cartSet.has(idx)}
            nome={prod.nome}
            valor={prod.valor}
            desc={prod.desc}
            idx={idx.toString()}
            filter={filter}
          />
          // </Flex>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Home;
