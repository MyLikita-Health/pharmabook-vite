/* eslint-disable eqeqeq */
export function checkStrEmpty(str) {
  return !(str && str.length > 1 && str.split(" ").join("").length > 0);
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// System for American Numbering
var th_val = ["", "thousand", "million", "billion", "trillion"];
// System for uncomment this line for Number of English
// var th_val = ['','thousand','million', 'milliard','billion'];
//! Another way
var dg_val = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
var tn_val = [
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
var tw_val = [
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];
export function toWordsconver(s) {
  s = s.toString() || 0;
  s = s.replace(/[\\, ]/g, "");
  if (s != parseInt(s)) return "not a number ";
  var x_val = s.indexOf(".");
  if (x_val == -1) x_val = s.length;
  if (x_val > 15) return "too big";
  var n_val = s.split("");
  var str_val = "";
  var sk_val = 0;
  for (var i = 0; i < x_val; i++) {
    if ((x_val - i) % 3 == 2) {
      if (n_val[i] == "1") {
        str_val += tn_val[Number(n_val[i + 1])] + " ";
        i++;
        sk_val = 1;
      } else if (n_val[i] != 0) {
        str_val += tw_val[n_val[i] - 2] + " ";
        sk_val = 1;
      }
    } else if (n_val[i] != 0) {
      str_val += dg_val[n_val[i]] + " ";
      if ((x_val - i) % 3 == 0) str_val += "hundred ";
      sk_val = 1;
    }
    if ((x_val - i) % 3 == 1) {
      if (sk_val) str_val += th_val[(x_val - i - 1) / 3] + " ";
      sk_val = 0;
    }
  }
  if (x_val != s.length) {
    var y_val = s.length;
    str_val += "point ";
    for (var e = x_val + 1; e < y_val; e++) str_val += dg_val[n_val[e]] + " ";
  }
  return str_val.replace(/\s+/g, " ");
}

export function _calculateAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function formatNumber(n) {
  let num = Math.round(parseInt(n), 0)
  if (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  } else {
    return '0'
  }
}

export const convertSignedMoney = (amt) => {
  if (parseInt(amt) < 0) return `(${formatNumber(Math.abs(amt))})`
  else if (parseInt(amt) > 0) return `${formatNumber(amt)}`
}
