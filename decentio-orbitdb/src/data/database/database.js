import * as IPFS from "ipfs";

function initIpfs() {
  const ipfsOptions = {
    repo: "./ipfs",
    EXPERIMENTAL: { pubsub: true },
    libp2p: {
      config: {
        dht: {
          enabled: true,
        },
      },
    },
  };
  const node = IPFS.create(ipfsOptions);
}
