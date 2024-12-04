
import numeral from 'numeral';

import { getCurrentInstance } from "vue";

// format to naira
export const formatAmount = (
  value: string | number,
  currency = "NGN",
  isBare = true
) => {
  if (typeof value !== "number") {
    value = parseFloat(value);
  }

  const currencySymbol = {
    NGN: "₦",
    USD: "$",
    EUR: "€",
  } as any;

  // check if value is a number
  if (isNaN(value)) {
    return "";
  }

  let result;
  const hasDecimal = (value as any) % 1 !== 0;
  if (hasDecimal) {
    result = numeral(value / (isBare ? 100 : 1)).format("0,0.00");
  } else {
    result = numeral(value / (isBare ? 100 : 1)).format("0,0");
  }

  return result === "0" ? "" : `${currencySymbol[currency]}${result}`;
};

export const convertToNaira = (value: number | string) => {
  const num = parseInt(value.toString());
  return `${numeral(num / 100).format("0,0.00", Math.ceil)}`;
};

// CAPITALIZE FIRST LETTER
export const capitalize = (value: string, full = false) => {
  if (!value) return "";

  if (full) {
    return value
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  } else {
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
};

// TRUNCATE CHARACTERS

export const propertTypeLabel = (value: string) => {
  switch (value) {
    case "rent":
      return "Rent";
    case "sell":
      return "Buy";
    case "shortlet":
      return "Shortlet";
    default:
      return "";
  }
};

export const sleep = (ms: number = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// CONSOLE.LOG IN DEVELOPMENT MODE
export const logger = (...arg: any) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(
      JSON.stringify(
        arg,
        // .join(", ")
        // .replace(/[\n\r]/g, "")
        // .replace(/\s{2,}/g, " "),

        null,
        2
      )
    );
  }
};

export const hasPropsOrEvents = (name: any) => {
  //   https://mokkapps.de/vue-tips/check-if-component-has-event-listener-attached
  return getCurrentInstance()?.vnode.props?.[name];
};

export const hextoRgb = (hex: string, raw = true, alpha?: number) => {
  // https://stackoverflow.com/questions/72653246/use-v-bind-in-a-scss-sass-variable-vuejs

  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    // 6 digits
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  } else return hex;

  if (alpha) {
    return `${raw ? `rgba(` : ""} ${r}, ${g}, ${b}, ${alpha}${raw ? `)` : ""}`;
  } else {
    return `${raw ? `rgb(` : ""}${r}, ${g}, ${b}${raw ? `)` : ""}`;
  }
};

// MASK EMAIL CHARACTERS
export function formatEmail(email: string | null): string {
  if (!email) return "";
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 3) return email;
  const maskedLocalPart = `${localPart.slice(0, 3)}***`;
  return `${maskedLocalPart}@${domain}`;
}

// PHONE NUMBER VALIDATION
export const isValidPhoneNumber = (phone: string) => {
  if (phone.length === 10) {
    //then it does not start with 0
    return /^([789][01]\d{8})$/.test(phone);
  } else if (phone.length === 11) {
    //then it starts with 0
    return /^0[789][01]\d{8}$/.test(phone);
  } else if (phone.length === 13) {
    //then it starts with just 234
    return /^234[789][01]\d{8}$/.test(phone);
  } else return false;
};

export const isValidURL = (url: string): boolean => {
  // TODO: Add more validation
  // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
  // return /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,})(\/[\w.-]*)*\/?$/.test(url);

  return /^(http|https):\/\/[^ "]+$/.test(url);
};

export const isValidSocialMediaHandle = (handle: string) => {
  return /^(?=.*[a-zA-Z_])[a-zA-Z0-9_]+$/.test(handle);
};

// CONVERT FILE SIZE TO MB
export const convertToMB = (size: any) => {
  return Math.round((size / 1024 / 1024) * 100) / 100;
};

// NAVIGATE TO THE LAST VISITED URL
export const previousURL = () => {
  const router = useRouter();
  router.back();
};

export const queryParamBuilder = (params: any) => {
  // ignore null, empty or undefined values
  const query = Object.keys(params)
    .map((key) => {
      if (
        params[key] === null ||
        params[key] === undefined ||
        params[key] === ""
      ) {
        return "";
      }
      return `${key}=${params[key]}`;
    })
    .filter((item) => item)
    .join("&");

  return query ? `?${query}` : "";
};

export const getQueryParams = (url: string): Record<string, string> => {
  const str1 = url.split("?")[1];
  const params = {} as Record<string, string>;

  if (str1) {
    const pairs = str1.split("&");
    for (const pair of pairs) {
      const [key, value] = pair.split("=");
      if (decodeURIComponent(value.replace(/\+/g, " "))) {
        params[key] = decodeURIComponent(value.replace(/\+/g, " "));
      }
    }
  }

  return params;
};

export const plural = (value: number, label: string) => {
  // if string ends with s and value is 1, remove the s
  if (value === 1 && label.endsWith("s")) {
    return label.slice(0, -1);
  }

  // if string already ends with s and value is greater than 1, return the string
  if (value > 1 && label.endsWith("s")) {
    return label;
  }

  return value > 1 ? `${label}s` : label;
};

export const truncate = (value: string, limit = 200, enforce = true) => {
  if (!value) return "";
  if (!enforce) return value;
  value = value.toString();
  return value.length > limit ? value.substring(0, limit) + "..." : value;
};

export const shakeContent = () => {
  //add the shake class for few seconds
  document.querySelector(".app-modal")?.classList.add("not-closeable");
  sleep(500).then(() => {
    document.querySelector(".app-modal")?.classList.remove("not-closeable");
  });
};
