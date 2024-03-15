import crypto from "node:crypto";

export const encryptMD5 = (data: string) => {
  return crypto.createHash("sha256").update(data).digest("hex");
};

// log(encryptMD5("123456"));
