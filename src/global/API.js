const MainURL = "https://argus.work/argus/api/v1";
const Login_Api = `https://argus.work/argus/api/v1/auth/login`;
const GetUserData_Api = `https://argus.work/argus/api/v1/auth/user-profile`;

function getDay(day) {
  let today = new Date();
  let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday_milliseconds); //關鍵代碼

  let tYear = today.getFullYear();
  let tMonth = today.getMonth();
  let tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  return tYear + "-" + tMonth + "-" + tDate;
}

function doHandleMonth(month) {
  let m = month;
  if (month.toString().length === 1) {
    m = "0" + month;
  }
  return m;
}

let nowDate = getDay(0);
let LastNowDate = getDay(-7);

export const TestURL = `${MainURL}/data?key=高雄市&start_date=${nowDate}&end_date=${nowDate}&crawler_Web=all`;

export const TestURL02 = `${MainURL}/data?key=台北市&start_date=${nowDate}&end_date=${nowDate}&crawler_Web=chinatimes`;

export function FetchTestAPI() {
  return fetch(TestURL).then((res) => res.json());
}

export function FetchTestAPI02() {
  return fetch(TestURL02).then((res) => res.json());
}

export const AloneApi = (id) => {
  return `${MainURL}/data/${id}`;
};

export function LoginApi(account, password) {
  let data = new FormData();
  data.append("email", account);
  data.append("password", password);
  return fetch(`${Login_Api}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: data,
  });
}

export const FirstCheckUser = (token) => {
  return fetch(GetUserData_Api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
