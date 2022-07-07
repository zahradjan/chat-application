import * as IPFS from "ipfs";
// import OrbitDB from "orbit-db";

export async function initDatabase() {
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
  // const node = await IPFS.create(ipfsOptions);
  // const orbitDb = await OrbitDB.createInstance(node);
  // return orbitDb;
}
