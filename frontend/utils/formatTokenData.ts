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
  console.log("data:", _data)
  const isonInfo = JSON.parse(_data.split(' ').join(', '));
  console.log("isonInfo", isonInfo)
  const {
    rarity,
    type,
    performance,
    joy,
    durability,
    condition,
    mint,
    parents,
    imgUrl,
  } = isonInfo;

  return {
    level: _level,
    rarity,
    type,
    performance,
    joy,
    durability,
    condition,
    mint,
    parents,
    imgUrl,
  };
};
