import { NextApiRequest, NextApiResponse } from 'next';
import { getAssetsForOpenSea } from '@lib/opensea';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case 'POST':
      const {
        chainId,
        owner,
        limit,
        cursor,
        offset,
        orderDirection,
        tokenAddress,
        tokenAddresses,
        tokenIds,
      } = req.body;
      const result = await getAssetsForOpenSea(chainId.toString(), {
        owner,
        limit,
        cursor,
        offset,
        orderDirection,
        tokenAddress,
        tokenAddresses,
        tokenIds,
      });

      res.json({
        ok: true,
        ...result,
      });
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
