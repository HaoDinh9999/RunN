export const mapTokenDataToSneaker = (tokenData) => {
  console.log("tokenData", tokenData)
  const { level, tokenId, info } = tokenData;
  const jsonInfo = JSON.parse(String(info).replaceAll(' ', ', '));
  const {
    rarity,
    type,
    performance,
    joy,
    durability,
    condition,
    mint,
    parents,
  } = jsonInfo;
  return {
    level,
    id: tokenId,
    rarity,
    type,
    performance,
    joy,
    durability,
    condition,
    mint,
    parents,
  };
};

export const mapTokenDataToSneakerInDetail = (tokenData) => {
  const _data = tokenData[3];
  const _level = tokenData[4];
  const isonInfo = JSON.parse(String(_data).split("'").join('"').split(' ').join(', '));

  const {
    Rarity,
    Type,
    Performance,
    Joy,
    Durability,
    Condition,
    Mint,
    UrlImage,
    Parents,
  } = isonInfo;

  return {
    Level: _level,
    Rarity,
    Type,
    Performance,
    Joy,
    Durability,
    Condition,
    Mint,
    UrlImage,
    Parents,
  };
};
