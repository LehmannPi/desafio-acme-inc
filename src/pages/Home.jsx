import { verbos, adjetivos } from '../data/dados';
import { useEffect, useState } from 'react';
import { loremHipsum } from '../Api';
import Card from '../components/Card';
import { BsStarFill } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import {
  Button,
  Flex,
  Icon,
  SimpleGrid,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

const Home = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(false);
  const [cartSet, setCartSet] = useState(new Set());
  const [products, setProducts] = useState([]);
  const [favoriteSet, setFavoriteSet] = useState(new Set());

  const handleChange = (event) => setSearch(event.target.value);

  // * Set - produtos favoritos e produtos no carrinho
  const loadFavAndCart = () => {
    if (localStorage.getItem('favoritos')) {
      setFavoriteSet(new Set(JSON.parse(localStorage.getItem('favoritos'))));
    }
    if (localStorage.getItem('carrinho')) {
      setCartSet(new Set(JSON.parse(localStorage.getItem('carrinho'))));
    }
  };

  const randomNum = (arr) => {
    return Math.floor(Math.random() * arr.length);
  };

  const generateProduct = (hipsum) => {
    const idxV = randomNum(verbos);
    const idxA = randomNum(adjetivos);
    const seed = idxV + adjetivos[idxA];
    const nome = verbos[idxV] + ' ' + adjetivos[idxA];
    const desc = hipsum[idxA % 10].slice(0, hipsum[idxA % 10].length / 2);
    const nameLength = nome.split(' ').length;
    const descrLength = desc.length;
    const valor = 10 + nameLength * ((500 - descrLength) / (3 - nameLength));

    verbos.splice(idxV, 1); // * guarantee not repeating
    adjetivos.splice(idxA, 1);

    return { seed, nome, valor, desc };
  };

  // ! "Mount"
  useEffect(() => {
    (async () => {
      if (!localStorage.getItem('savedState')) {
        const response = await loremHipsum();

        const auxProducts = []; // ! Inicia array de produtos ( tamanho 15 )
        let tamanho = 15;
        for (let i = 0; i < tamanho; i++) {
          auxProducts.push(generateProduct(response.data));
        }
        localStorage.setItem('savedState', JSON.stringify(auxProducts));
        setProducts(auxProducts);
      } else {
        setProducts(JSON.parse(localStorage.getItem('savedState')));
      }
      loadFavAndCart();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Flex maxW={'1092px'} direction={'column'} m={'auto'}>
        <Flex
          maxW={'1092px'}
          justifyContent={'space-between'}
          px={20}
          py={8}
          direction={['column', 'row']}
        >
          <Button
            w={['100%', '140px']}
            onClick={async () => {
              setFilter(!filter);
            }}
            colorScheme={'yellow'}
            variant={filter ? 'ghost' : 'solid'}
          >
            Favoritos
            <Icon
              ml={2}
              as={BsStarFill}
              alignSelf={'center'}
              color={filter ? 'yellow.500' : 'white'}
              h={4}
              w={4}
            />
          </Button>
          <InputGroup size="md" w={['100%', '200px']} mt={[4, 0]}>
            <Input
              pr="1.5rem"
              type={'text'}
              placeholder="Busque por nome..."
              onChange={handleChange}
            />
            <InputRightElement width="2rem">
              {' '}
              <BiSearchAlt />
            </InputRightElement>
          </InputGroup>
        </Flex>
        <SimpleGrid
          columns={[null, 1, 2, 3]}
          spacing="60px"
          p={20}
          pt={0}
          justifyContent={'center'}
        >
          {products
            .filter((val) => {
              if (search === '') {
                return val;
              } else if (
                val.nome.toLowerCase().includes(search.toLocaleLowerCase())
              ) {
                return val;
              }
              return null;
            })
            .map((prod, idx) => {
              if (favoriteSet.has(idx) || !filter) {
                return (
                  <Card
                    key={idx}
                    seed={prod.seed}
                    favorito={favoriteSet.has(idx)}
                    carrinho={cartSet.has(idx)}
                    nome={prod.nome}
                    valor={prod.valor}
                    desc={prod.desc}
                    update={loadFavAndCart}
                    idx={idx.toString()}
                  />
                );
              }
              return null;
            })}
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default Home;
