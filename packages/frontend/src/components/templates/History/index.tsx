/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Stack,
  // SimpleGrid,
  Text,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  useBoolean,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiBell, FiSend, FiDollarSign, FiCreditCard, FiChevronRight } from 'react-icons/fi';
import InfiniteScroll from 'react-infinite-scroller';
import { Link, Spinner } from '@components/atoms';
import { Head, HeadProps, Header } from '@components/organisms';
import { shortenAddress } from '@lib/shorten';
import { convertServerTimeToClientTimestamp, getYearMonthDayHourMin } from '@lib/timestamp';

export interface HistoryTableElement {
  date: { en: string; ja: string };
  creator: string;
  price: string;
}

export interface History {
  table?: HistoryTableElement;
}

export interface HistoryContext {
  histories: History[];
}

export interface HistoryProps {
  meta?: HeadProps;
  pageContext: HistoryContext;
}

export const getDBHistoriesLimit = 10;
const initLastOrderIds = {
  charge: {
    id: '',
    acquired: false,
  },
};

export const History: React.FC<HistoryProps> = ({ meta, pageContext }) => {
  // const { creator, requester } = pageContext;
  const [historyLoading, setHistoryLoading] = useBoolean();
  const isSmartPhone = useBreakpointValue({ base: true, lg: false });
  const [histories, setHistories] = useState<History[]>([]);
  const [lastOrderIds, setLastOrderIds] = useState(initLastOrderIds);

  return (
    <>
      <Head {...meta} />
      <Header />

      <Stack
        spacing={['16', '32']}
        justifyContent="center"
        alignItems="center"
        px={['8', '24']}
        py={['4', '16']}
        w="100%"
      >
        <Stack
          spacing="8"
          alignItems="center"
          justifyContent="center"
          w={['100%', '100%', '600px']}
          color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
        >
          <Stack alignItems="flex-start" justifyContent="center" w="100%">
            <Text fontSize={['3xl', '4xl']} fontWeight="bold">
              History
            </Text>
          </Stack>
          <Stack spacing="6" alignItems="center" justifyContent="center" w="100%">
            <Text fontSize="md" fontWeight="normal" w={['100%', '100%', '600px']}>
              History
            </Text>

            <TableContainer w="100%" py="3">
              <Table variant="simple" size={isSmartPhone ? 'sm' : 'md'}>
                <TableCaption></TableCaption>
                <Thead>
                  <Tr>
                    <Th
                      color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
                      fontSize="sm"
                      borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                    >
                      {t('Date')}
                    </Th>
                    <Th
                      color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
                      fontSize="sm"
                      borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                    >
                      {t('Creator')}
                    </Th>
                    <Th
                      color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
                      fontSize="sm"
                      borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                    >
                      {t('Price')}
                    </Th>
                    <Th
                      color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
                      fontSize="sm"
                      borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                    ></Th>
                  </Tr>
                </Thead>
                <Tbody color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}>
                  {histories.map(element => {
                    if (!element.table) return;
                    return (
                      <Tr key={element.table.date.en}>
                        <Td
                          maxW={['140px', '120px']}
                          overflow="hidden"
                          whiteSpace="nowrap"
                          textOverflow="ellipsis"
                          borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                        >
                          {i18n.language === 'en'
                            ? element.table.date.en
                            : i18n.language === 'ja'
                            ? element.table.date.ja
                            : element.table.date.en}
                        </Td>
                        <Td
                          maxW={['100px', '100px']}
                          overflow="hidden"
                          whiteSpace="nowrap"
                          textOverflow="ellipsis"
                          borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                        >
                          {element.table.creator}
                        </Td>
                        <Td
                          maxW={['100px', '100px']}
                          overflow="hidden"
                          whiteSpace="nowrap"
                          textOverflow="ellipsis"
                          // isNumeric
                          borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                        >
                          {element.table.price}
                        </Td>
                        <Td
                          maxW="40px"
                          alignItems="center"
                          justifyContent="center"
                          isNumeric
                          borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                        >
                          <Link type="internal" href={`/request/${element.order.id}`}>
                            <IconButton
                              variant="outline"
                              as={FiChevronRight}
                              size="xs"
                              aria-label=""
                              border="none"
                              color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
                            />
                          </Link>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
