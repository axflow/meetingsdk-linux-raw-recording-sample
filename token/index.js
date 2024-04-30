const KJUR = require("jsrsasign");
// https://www.npmjs.com/package/jsrsasign

function generateSignature(key, secret, meetingNumber, role) {
  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2;
  const oHeader = { alg: "HS256", typ: "JWT" };

  const oPayload = {
    sdkKey: key,
    appKey: key,
    mn: meetingNumber,
    role: role,
    iat: iat,
    exp: exp,
    tokenExp: exp,
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const sdkJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, secret);
  return sdkJWT;
}

console.log(
  generateSignature(
    "REPLACE_WITH_CLIENT_ID",
    "REPLACE_WITH_CLIENT_SECRET",
    REPLACE_WITH_MEETING_ID,
    0
  )
);
