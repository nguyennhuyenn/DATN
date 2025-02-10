const validPhone = (phone: string) => {
  if (!phone) {
    return "Vui lòng nhập số điện thoại";
  } else {
    if (!/^\d{10}$/.test(phone)) {
      return "Vui lòng nhập đúng định dạng số điện thoại";
    }
  }
  return "";
};
const validPassword = (password: string) => {
  if (!password) {
    return "Vui lòng nhập mật khẩu";
  } else {
    if (password.length < 6) {
      return "Mật khẩu không được ít hơn 6 kí tự";
    }
  }
  return "";
};

const validNotFound = (value: string | number) => {
  if (!value) {
    return "Không được bỏ trống";
  }
  return "";
};

export function convertToSlug(str: string): string {
  const vietnameseMap: Record<string, string> = {
    a: "áàảãạăắằẳẵặâấầẩẫậÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬ",
    d: "đĐ",
    e: "éèẻẽẹêếềểễệÉÈẺẼẸÊẾỀỂỄỆ",
    i: "íìỉĩịÍÌỈĨỊ",
    o: "óòỏõọôốồổỗộơớờởỡợÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢ",
    u: "úùủũụưứừửữựÚÙỦŨỤƯỨỪỬỮỰ",
    y: "ýỳỷỹỵYÝỲỶỸỴ",
  };
  const regex = /[a-zA-Z0-9\s]/g;

  const filteredString = str
    .split("")
    .map((char) => {
      for (const key in vietnameseMap) {
        if (vietnameseMap[key].includes(char)) {
          return key;
        }
      }
      return char;
    })
    .join("")
    .match(regex)
    ?.join("")
    .replace(/\s+/g, "-")
    .toLowerCase();

  return filteredString || "";
}

export { validPhone, validPassword, validNotFound };
