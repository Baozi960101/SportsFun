import { useState } from "react";
import { ScrollToTop } from "./Scroll";
import { fetchAPIName } from "./API";

//此包含引入所有文章以及換頁功能
export default function useHandleArticle() {
  const [load, setLoad] = useState(false);
  //以下是來源

  const [coverPost, setCoverPost] = useState([]);
  const [honePageTopPost, setHomePageTopPost] = useState([]);
  const [honePageBottomPost, setHomePageBottomPost] = useState([]);
  //首頁來源資料

  //以下是抓取文章 換頁set
  const [post, setPost] = useState([]);
  const [page, setPage] = useState(0);
  const [prevPage, setPrevPage] = useState("");
  const [nextPage, setNextPage] = useState("");
  const [nowLastPage, setNowLastPage] = useState("");

  async function FetchDate(API) {
    setLoad(true);
    const res = await fetch(API);
    const data = await res.json();
    setCoverPost(data.data.slice(0, 1));
    setPost(data.data);
    setPage(data.meta.current_page);
    setPrevPage(data.links.prev);
    setNextPage(data.links.next);
    setNowLastPage(data.meta.last_page);
    setLoad(false);
  }

  async function homePageArticle() {
    setLoad(true);
    const res = await fetch(
      `https://api.hinduhope.com/api/v1/data/showWeb?groups_Type=playgames`
    );
    const { data } = await res.json();
    const GameInformation = data.GameInformation.map((item) => {
      return item.source_Name;
    });
    const Sports = data.Sports.map((item) => {
      return item.source_Name;
    });
    const homeRes = await fetch(fetchAPIName(GameInformation.join()));
    const homedata01 = await homeRes.json();
    setCoverPost(homedata01.data.slice(0, 1));
    setHomePageTopPost(homedata01.data.slice(0, 9));
    const homeRes02 = await fetch(fetchAPIName(Sports.join()));
    const homedata02 = await homeRes02.json();
    setHomePageBottomPost(homedata02.data.slice(0, 9));
    setLoad(false);
  }

  async function gameInformationPageArticle() {
    setLoad(true);
    const res = await fetch(
      `https://api.hinduhope.com/api/v1/data/showWeb?groups_Type=playgames`
    );
    const { data } = await res.json();
    const GameInformation = data.GameInformation.map((item) => {
      return item.source_Name;
    });
    FetchDate(fetchAPIName(GameInformation.join()));
  }

  async function sportsPageArticle() {
    setLoad(true);
    const res = await fetch(
      `https://api.hinduhope.com/api/v1/data/showWeb?groups_Type=playgames`
    );
    const { data } = await res.json();
    const Sports = data.Sports.map((item) => {
      return item.source_Name;
    });
    FetchDate(fetchAPIName(Sports.join()));
  }

  async function vehiclesPageArticle() {
    setLoad(true);
    const res = await fetch(
      `https://api.hinduhope.com/api/v1/data/showWeb?groups_Type=playgames`
    );
    const { data } = await res.json();
    const Vehicles = data.Vehicles.map((item) => {
      return item.source_Name;
    });
    FetchDate(fetchAPIName(Vehicles.join()));
  }

  async function MoreLikeThisArticle() {
    setLoad(true);
    const res = await fetch(
      `https://api.hinduhope.com/api/v1/data/showWeb?groups_Type=playgames`
    );
    const { data } = await res.json();
    const GameInformation = data.GameInformation.map((item) => {
      return item.source_Name;
    });
    const homeRes = await fetch(fetchAPIName(GameInformation.join()));
    const homedata01 = await homeRes.json();
    setPost(homedata01.data.slice(0, 3));
    setLoad(false);
  }

  async function ChangePrevPage() {
    if (page === 1) {
      alert("目前在第一頁囉");
      return;
    }
    setLoad(true);
    const res = await fetch(prevPage);
    const data = await res.json();
    setPost(data.data);
    setPage(data.meta.current_page);
    setPrevPage(data.links.prev);
    setNextPage(data.links.next);
    setNowLastPage(data.meta.last_page);
    ScrollToTop();
    setLoad(false);
  }

  async function ChangeNextPage() {
    if (page === nowLastPage) {
      alert("最後一頁囉");
      return;
    }
    setLoad(true);
    const res = await fetch(nextPage);
    const data = await res.json();
    setPost(data.data);
    setPage(data.meta.current_page);
    setPrevPage(data.links.prev);
    setNextPage(data.links.next);
    setNowLastPage(data.meta.last_page);
    ScrollToTop();
    setLoad(false);
  }

  return {
    FetchDate,
    post,
    setPost,
    page,
    setPage,
    prevPage,
    setPrevPage,
    nextPage,
    setNextPage,
    nowLastPage,
    setNowLastPage,
    ChangeNextPage,
    ChangePrevPage,
    load,
    setLoad,
    homePageArticle,
    coverPost,
    honePageTopPost,
    honePageBottomPost,
    gameInformationPageArticle,
    MoreLikeThisArticle,
    sportsPageArticle,
    vehiclesPageArticle,
  };
}
