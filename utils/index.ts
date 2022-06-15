export const truncateAddress = (address: string) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const toHex = (num: string) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};

export const getRecaptchaToken = async (): Promise<string> => {
  let token = "";

  try {
    token = window.grecaptcha.execute(process.env.CAPATCHA_SITE_KEY, {
      action: "submit",
    });
  } catch {
    throw new Error("Failed to get recaptcha token");
  }

  return token;
};
