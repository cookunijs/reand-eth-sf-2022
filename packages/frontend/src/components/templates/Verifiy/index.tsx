/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  ButtonGroup,
  Icon,
  IconButton,
  Stack,
  Text,
  useBoolean,
  useColorModeValue,
  useDisclosure,
  keyframes,
} from '@chakra-ui/react';
import { defaultAbiCoder as abi } from '@ethersproject/abi';
import { useAccount, useNetwork, useSigner } from 'wagmi';
import { VerificationResponse, WidgetProps } from '@worldcoin/id';
import { motion } from 'framer-motion';
import { useReward } from 'react-rewards';
import { QRCode } from 'react-qr-svg';
import { FaTwitter } from 'react-icons/fa';
import { FiCheck, FiX } from 'react-icons/fi';
import { Button, Image, Link } from '@components/atoms';
import { Modal } from '@components/molecules';
import { Head, Header, HeadProps } from '@components/organisms';
import { proofRequest } from '@lib/polygonId';
import { id } from '@lib/ethereum/assets';
import { verifyWithWorldId, getVerified } from '@lib/ethereum/contracts/reand';
import addressJson from '@configs/ethereum/address.json';
import { SupportChainId } from 'src/types/ethereum';

const animationKeyframes = keyframes`
  0% { transform: scale(1);  border-radius: 50%; opacity: 1; }
  25% { transform: scale(1.2); border-radius: 50%; opacity: 0.7; }
  50% { transform: scale(1); border-radius: 50%; opacity: 0.8; }
  75% { transform: scale(1); border-radius: 50%; opacity: 0.9; }
  100% { transform: scale(1); border-radius: 50%; opacity: 1; }
`;
const animation = `${animationKeyframes} 2s ease-in-out infinite`;

const WorldIDWidget = dynamic<WidgetProps>(
  () => import('@worldcoin/id').then(mod => mod.WorldIDWidget),
  {
    ssr: false,
  }
);

export interface VerifiyContext {
  worldId?: boolean;
  polygonId?: { req: any; schema: any };
}

export interface VerifiyProps {
  meta?: HeadProps;
  pageContext: VerifiyContext;
}

export const Verifiy: React.FC<VerifiyProps> = ({ meta, pageContext }) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data: signer } = useSigner();

  const { reward } = useReward('rewardId', 'confetti', {
    lifetime: 280,
    angle: 75,
    spread: 70,
    elementCount: 180,
  });

  const [worldIdVerificationResponse, setWorldIdVerificationResponse] =
    useState<VerificationResponse>();
  const [isWorldIdVerified, setIsWorldIdVerified] = useState(false);
  const [isPolygonIdVerified, setIsPolygonIdVerified] = useState(false);

  const [disabled, setDisabled] = useBoolean();
  const [loading, setLoading] = useBoolean();
  const [isCompleted, setIsCompleted] = useBoolean();
  const [awaitingSignForSubmit, setAwaitingSignForSubmit] = useState<
    'awaiting' | 'pending' | 'done'
  >('awaiting');
  const [completingTransactionForSubmit, setCompletingTransactionForSubmit] = useState<
    'awaiting' | 'pending' | 'done'
  >('awaiting');
  const [finalizingForSubmit, setFinalizingForSubmit] = useState<'awaiting' | 'pending' | 'done'>(
    'awaiting'
  );
  const {
    isOpen: isOpenForSending,
    onOpen: onOpenForSending,
    onClose: onCloseForSending,
  } = useDisclosure();

  const polygonIdQr = useMemo(() => {
    if (!pageContext.polygonId) {
      return;
    }
    const chainId = chain ? (String(chain.id) as SupportChainId) : '80001';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const proofRequestForQr = { ...proofRequest } as any;
    proofRequestForQr.body.transaction_data.contract_address = addressJson[chainId].reand;
    proofRequestForQr.body.scope[0].rules.query.req = pageContext.polygonId.req;
    proofRequestForQr.body.scope[0].rules.query.schema = pageContext.polygonId.schema;
    return proofRequestForQr;
  }, [pageContext.polygonId]);

  useEffect(() => {
    if (!signer) return;
    (async () => {
      const account = await signer.getAddress();
      const chainId = chain ? (String(chain.id) as SupportChainId) : '80001';

      const checkForWorldId = setInterval(() => {
        getVerified(signer, addressJson[chainId].reand, { account, idType: id('WORLDID') }).then(
          isWorldIdVerified => {
            setIsWorldIdVerified(isWorldIdVerified);
            if (isWorldIdVerified) {
              clearInterval(checkForWorldId);
            }
          }
        );
      }, 5000);

      const checkForPolygonId = setInterval(() => {
        getVerified(signer, addressJson[chainId].reand, { account, idType: id('POLYGONID') }).then(
          isPolygonIdVerified => {
            setIsPolygonIdVerified(isPolygonIdVerified);
            if (isPolygonIdVerified) {
              clearInterval(checkForPolygonId);
            }
          }
        );
      }, 5000);
    })();
  }, [signer]);

  const startFunction = () => {
    setDisabled.on();
    setLoading.on();
    setIsCompleted.off();
  };

  const endFunction = () => {
    setDisabled.off();
    setLoading.off();
  };

  const execute = async () => {
    if (!signer || !worldIdVerificationResponse) return;
    startFunction();
    onOpenForSending();

    const account = await signer.getAddress();
    const chainId = chain ? (String(chain.id) as SupportChainId) : '80001';

    setAwaitingSignForSubmit('pending');
    const unpackedProof = abi.decode(['uint256[8]'], worldIdVerificationResponse.proof)[0];
    console.log({
      account,
      root: worldIdVerificationResponse.merkle_root,
      nullifierHash: worldIdVerificationResponse.nullifier_hash,
      proof: unpackedProof,
    });
    const txDetail = await verifyWithWorldId(signer, addressJson[chainId].reand, {
      account,
      root: worldIdVerificationResponse.merkle_root,
      nullifierHash: worldIdVerificationResponse.nullifier_hash,
      proof: unpackedProof,
    });
    setAwaitingSignForSubmit('done');

    setCompletingTransactionForSubmit('pending');
    await txDetail.wait();
    setCompletingTransactionForSubmit('done');

    setFinalizingForSubmit('pending');
    await new Promise(resolve => {
      setTimeout(resolve, 600);
    });
    setFinalizingForSubmit('done');

    endFunction();
    setIsCompleted.on();
    reward();
  };

  return (
    <>
      <Head {...meta} />
      <Header />
      <Stack
        spacing={['16', '32']}
        justifyContent="center"
        alignItems="center"
        px={['8', '16']}
        py={['12', '20']}
      >
        <Stack
          spacing="8"
          alignItems="center"
          justifyContent="center"
          w={['100%', '100%', '600px']}
          color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
        >
          <Stack alignItems="flex-start" justifyContent="center" w="100%">
            <Text fontSize={['3xl', '3xl']} fontWeight="bold">
              Account Check ✅
            </Text>
          </Stack>

          <Stack alignItems="center" justifyContent="center" w="100%">
            <>
              {pageContext && pageContext.worldId && (
                <Stack w="100%">
                  <Text fontSize="lg" fontWeight="bold">
                    Verifiy World ID
                  </Text>
                  {signer && (
                    <>
                      {!isWorldIdVerified && (
                        <>
                          {!worldIdVerificationResponse && (
                            <WorldIDWidget
                              actionId="wid_staging_8d57f55812cb5d995ef5f1321cf5bc0d"
                              signal={address}
                              enableTelemetry
                              onSuccess={setWorldIdVerificationResponse}
                              onError={error => console.error(error)}
                              debug={true}
                            />
                          )}
                          {worldIdVerificationResponse && (
                            <Button
                              onClick={execute}
                              disabled={!worldIdVerificationResponse || disabled || loading}
                              colorScheme="blue"
                            >
                              Register
                            </Button>
                          )}
                        </>
                      )}
                      {isWorldIdVerified && (
                        <Text fontSize="sm" fontWeight={'bold'}>
                          Verified ✅
                        </Text>
                      )}
                    </>
                  )}
                </Stack>
              )}

              {pageContext && pageContext.polygonId && polygonIdQr && (
                <Stack w="100%">
                  <Text fontSize="lg" fontWeight="bold">
                    Verifiy Polygon ID
                  </Text>
                  {!isPolygonIdVerified && (
                    <QRCode level="Q" style={{ width: 300 }} value={JSON.stringify(polygonIdQr)} />
                  )}
                  {isPolygonIdVerified && (
                    <Text fontSize="sm" fontWeight={'bold'}>
                      Verified ✅
                    </Text>
                  )}
                </Stack>
              )}
            </>
          </Stack>
        </Stack>
      </Stack>

      <Modal
        title={isCompleted ? `Done 🎉` : 'Sending Complete'}
        isOpen={isOpenForSending}
        onClose={onCloseForSending}
      >
        {isCompleted ? (
          <>
            <Stack spacing="4" w="100%" id="rewardId">
              <Stack alignItems="flex-start" justifyContent="center">
                <Text fontSize="md" fontWeight="medium">
                  Success!
                </Text>
              </Stack>
              <Stack spacing="6" alignItems="flex-start" justifyContent="center">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  w="100%"
                  py="8"
                ></Stack>

                <Stack spacing="4" direction="row" w="100%">
                  <Link type="external" w="100%" href="https://dune.com/shiro_social/reand">
                    <Button w="100%" size="md" fontWeight="semibold" bgColor="orange.200">
                      <Stack
                        spacing="2"
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Image src="/assets/dune.png" w="4" h="4" />
                        <Text>View Dune</Text>
                      </Stack>
                    </Button>
                  </Link>

                  <Link type="external" w="100%" href="">
                    <Button
                      w="100%"
                      size="md"
                      colorScheme="blue"
                      fontWeight="semibold"
                      leftIcon={<FaTwitter color="blue.500" />}
                    >
                      <Text>Tweet it</Text>
                    </Button>
                  </Link>
                </Stack>
              </Stack>
            </Stack>
          </>
        ) : (
          <>
            <Stack spacing="6">
              <Stack spacing="4" direction="row" alignItems="center" justifyContent="flex-start">
                <Stack>
                  {awaitingSignForSubmit === 'awaiting' && (
                    <Stack
                      width="5"
                      height="5"
                      borderRadius="full"
                      bgColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')}
                      mt="1px"
                    />
                  )}
                  {awaitingSignForSubmit === 'pending' && (
                    <Stack
                      as={motion.div}
                      animation={animation}
                      width="5"
                      height="5"
                      bgColor="brand.400"
                      mt="1px"
                    />
                  )}
                  {awaitingSignForSubmit === 'done' && (
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      width="5"
                      height="5"
                      borderRadius="full"
                      bgColor="brand.400"
                      mt="1px"
                    >
                      <Icon as={FiCheck} boxSize="4" color="white" />
                    </Stack>
                  )}
                </Stack>
                <Stack spacing="0">
                  <Text fontSize="sm" fontWeight="bold">
                    Awaiting signature
                  </Text>
                  <Text
                    color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
                    fontSize="sm"
                    fontWeight="normal"
                  >
                    Open Wallet and sign the transaction.
                  </Text>
                </Stack>
              </Stack>

              <Stack spacing="4" direction="row" alignItems="center" justifyContent="flex-start">
                <Stack>
                  {completingTransactionForSubmit === 'awaiting' && (
                    <Stack
                      width="5"
                      height="5"
                      borderRadius="full"
                      bgColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')}
                      mt="1px"
                    />
                  )}
                  {completingTransactionForSubmit === 'pending' && (
                    <Stack
                      as={motion.div}
                      animation={animation}
                      width="5"
                      height="5"
                      bgColor="brand.400"
                      mt="1px"
                    />
                  )}
                  {completingTransactionForSubmit === 'done' && (
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      width="5"
                      height="5"
                      borderRadius="full"
                      bgColor="brand.400"
                      mt="1px"
                    >
                      <Icon as={FiCheck} boxSize="4" color="white" />
                    </Stack>
                  )}
                </Stack>
                <Stack spacing="0">
                  <Text fontSize="sm" fontWeight="bold">
                    Completing
                  </Text>
                  <Text
                    color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
                    fontSize="sm"
                    fontWeight="normal"
                  >
                    Waiting for complete transaction to be completed.
                  </Text>
                </Stack>
              </Stack>

              <Stack spacing="4" direction="row" alignItems="center" justifyContent="flex-start">
                <Stack>
                  {finalizingForSubmit === 'awaiting' && (
                    <Stack
                      width="5"
                      height="5"
                      borderRadius="full"
                      bgColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')}
                      mt="1px"
                    />
                  )}
                  {finalizingForSubmit === 'pending' && (
                    <Stack
                      as={motion.div}
                      animation={animation}
                      width="5"
                      height="5"
                      bgColor="brand.400"
                      mt="1px"
                    />
                  )}
                  {finalizingForSubmit === 'done' && (
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      width="5"
                      height="5"
                      borderRadius="full"
                      bgColor="brand.400"
                      mt="1px"
                    >
                      <Icon as={FiCheck} boxSize="4" color="white" />
                    </Stack>
                  )}
                </Stack>
                <Stack spacing="0">
                  <Text fontSize="sm" fontWeight="bold">
                    Finalizing
                  </Text>
                  <Text
                    color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
                    fontSize="sm"
                    fontWeight="normal"
                  >
                    Waiting for data to be saved.
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </>
        )}
      </Modal>
    </>
  );
};
