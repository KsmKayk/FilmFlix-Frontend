import React, { useState } from "react";
import "./App.css";
import api from "./services/api";
import { Swiper, SwiperSlide } from "swiper/react";
import ReactLoading from "react-loading";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

function App() {
  const [filmData, setFilmData] = useState({});
  const [filmNameSearch, setFilmNameSearch] = useState("");
  const [filmSelect, setFilmSelect] = useState();
  const [pageStatus, setPageStatus] = useState(0);
  const [film, setFilm] = useState();
  // status 0 - searchFilm, 1 - selectFilm 2 - watch 3 - loading

  async function handleSearchFilm(event, filmNameSearch) {
    event.preventDefault();
    setPageStatus(3);
    const response = await api.post("/searchFilm", {
      name: filmNameSearch,
    });

    setFilmData(response.data);
    setPageStatus(1);
  }

  async function handleSelectFilm(event, filmSelect) {
    event.preventDefault();
    setPageStatus(3);
    const response = await api.post("/selectFilm", {
      link: filmSelect.link,
    });

    setFilm({
      link: response.data.filmVideoLink,
      title: filmSelect.title,
    });
    setPageStatus(2);
  }

  function array() {
    if (filmData.titleName !== undefined) {
      return (
        <Swiper
          spaceBetween={0}
          slidesPerGroup={1}
          navigation={{ clickable: true }}
          loop={true}
          slidesPerView={3}
          className="container1-swiper"
          breakpoints={{
            306: {
              slidesPerView: 1,
              spaceBetween: 40,
            },

            520: {
              slidesPerView: 1,
            },
            800: {
              slidesPerView: 3,
            },
            1136: {
              slidesPerView: 4,
            },
            1300: {
              slidesPerView: 5,
            },
          }}
        >
          {filmData.titleName.map((name, i) => (
            <SwiperSlide>
              <img
                key={name}
                src={filmData.titleCover[i]}
                alt={name}
                width="150"
              />
              <p className="container1-swiper-title">{name}</p>
              <p className="container1-swiper-index">[{i}]</p>
            </SwiperSlide>
          ))}
        </Swiper>
      );
    }
  }

  function verify() {
    while (true) {
      if (pageStatus === 0) {
        return (
          <>
            <h2 className="container1-title">DIGITE O NOME DE UM FILME</h2>
            <div className="container1">
              <form
                className="container1-form"
                onSubmit={(event) => handleSearchFilm(event, filmNameSearch)}
              >
                <input
                  type="text"
                  className="container1-input"
                  placeholder="Homem de ferro"
                  onChange={(event) => {
                    setFilmNameSearch(event.target.value);
                  }}
                />
                <button type="submit" className="container1-button">
                  Pesquisar
                </button>
              </form>
            </div>
          </>
        );
      }

      if (pageStatus === 1) {
        return (
          <>
            <h2 className="container1-title">SELECIONE UM DOS FILMES</h2>
            <div className="container1">
              <form
                className="container1-form"
                onSubmit={(event) => handleSelectFilm(event, filmSelect)}
              >
                {array()}
                <input
                  type="text"
                  className="container1-input"
                  onChange={(event) => {
                    setFilmSelect({
                      title: filmData.titleName[event.target.value],
                      link: filmData.titleLink[event.target.value],
                    });
                  }}
                />
                <button
                  type="submit"
                  className="container1-button"
                  placeholder="0"
                >
                  Selecionar
                </button>
              </form>
            </div>
          </>
        );
      }

      if (pageStatus === 2) {
        return (
          <>
            <h2 className="container3-title">{film.title}</h2>
            <div className="container3">
              <iframe
                title={film.title}
                src={film.link}
                allowfullscreen=""
                frameborder="0"
                className="container3-iframe"
              ></iframe>
            </div>
          </>
        );
      }

      if (pageStatus === 3) {
        return (
          <div className="container2">
            <ReactLoading
              className="container2-loading"
              type={"bars"}
              color={"grey"}
            />
          </div>
        );
      }
    }
  }

  return <>{verify()}</>;
}

export default App;
