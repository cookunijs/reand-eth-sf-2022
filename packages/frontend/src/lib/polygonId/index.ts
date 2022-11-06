export const proofRequest = {
  // 1. UUID for the request
  // - can be anything UUID
  id: 'c811849d-6bfb-4d85-936e-3d9759c7f105',
  typ: 'application/iden3comm-plain-json',
  type: 'https://iden3-communication.io/proofs/1.0/contract-invoke-request',
  body: {
    transaction_data: {
      contract_address: '0x7eBe6cE0DdBcFA9DE87Be28875AA24ce52b6c181',
      method_id: 'b68967e2',
      chain_id: 80001,
      network: 'polygon-mumbai',
    },
    reason: 'airdrop participation',
    scope: [
      {
        id: 1,
        circuit_id: 'credentialAtomicQuerySig',
        rules: {
          query: {
            allowed_issuers: ['*'],
            req: {
              isCommunityMember: {
                $eq: 1,
              },
            },
            schema: {
              url: 'https://s3.eu-west-1.amazonaws.com/polygonid-schemas/dd79a18f-2a63-4435-b27c-5e89109ebd2d.json-ld',
              type: 'Reand',
            },
          },
        },
      },
    ],
  },
};
