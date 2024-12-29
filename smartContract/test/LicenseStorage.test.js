const LicenseStorage = artifacts.require("LicenseStorage");

contract("LicenseStorage", (accounts) => {
  it("should store and retrieve user license", async () => {
    const instance = await LicenseStorage.deployed();
    await instance.storeLicense("QmExampleHash", { from: accounts[0] });
    const license = await instance.getLicense(accounts[0]);
    assert.equal(license, "QmExampleHash", "License should match");
  });
});
