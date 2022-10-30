import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';

async function main() {
  const CuongHaoToken = await ethers.getContractFactory('CuongHaoToken');
  const cht = await CuongHaoToken.deploy();

  await cht.deployed();

  console.log(`CuongHaoToken deployed to ${cht.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
