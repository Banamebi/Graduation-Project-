import React, { Component } from "react";
import {Link} from 'react-router-dom';
import ReactSwipe from "react-swipe";
import AHeader from "../components/header";
import Footer from "../components/footer";
import "../common/style/app.css";
import { swipeList, activeList, hotSaleList } from "../api/homeData";
import bilibili from "../common/images/bilibili.png";
import acfun from "../common/images/acfun.png";
import pixiv from "../common/images/pixiv.png";
import niconico from "../common/images/niconico.png";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  swipersOnclick = () => {
    window.location.href = "https://www.acgmh.com/";
  };
  routerTo(items) {
    localStorage.setItem("goods",JSON.stringify(items))
    this.props.history.push({pathname: `/Detail`})
  }

  render() {
    return (
      <div className="home">
        <AHeader title="首页" />
        <ReactSwipe
          swipeOptions={{ continuous: true, auto: 3000 }}
          key={swipeList.length}
          className="swipers"
        >
          {swipeList.map((item, index) => {
            return (
              <div key={index} className="swiper">
                <img
                  src={require("../common/images" + item)}
                  onClick={this.swipersOnclick}
                />
              </div>
            );
          })}
        </ReactSwipe>
        <div className="nav">
          <div className="friend">友链</div>
          <ul>
            <li>
              <figure
                onClick={() => {
                  window.location.href = "https://bilibili.com";
                }}
              >
                <img src={bilibili} />
                <figcaption className="figcaption">B站</figcaption>
              </figure>
            </li>
            <li>
              <figure
                onClick={() => {
                  window.location.href = "https://www.acfun.cn/";
                }}
              >
                <img src={acfun} />
                <figcaption className="figcaption">A站</figcaption>
              </figure>
            </li>
            <li>
              <figure
                onClick={() => {
                  window.location.href = " https://www.pixiv.net";
                }}
              >
                <img src={pixiv} />
                <figcaption className="figcaption">P站</figcaption>
              </figure>
            </li>
            <li>
              <figure
                onClick={() => {
                  window.location.href = "http://www.nicovideo.jp/";
                }}
              >
                <img src={niconico} />
                <figcaption className="figcaption">N站</figcaption>
              </figure>
            </li>
          </ul>
        </div>
        <div className="bodyblock">
          <div className="block-active">
            <ul>
              {activeList.map((item, index) => {
                console.log(item);
                return (
                  <li className="items" key={item + index}>
                    <div className="title">
                      <span>新品</span>
                    </div>
                    <ul className="content">
                      {item.list.map((items, indexs) => {
                        return (
                          <li key={items + indexs}>
                            <img
                              src={items.img}
                              onClick={() => this.routerTo(items)
                              }
                            />
                            <div className="rt">
                              {items.smallTitle && (
                                <span
                                  className="smallTitle"
                                  onClick={() => this.routerTo(items)
                                  }
                                >
                                  {items.smallTitle}
                                </span>
                              )}
                              <span
                                className="introduce"
                                onClick={() => this.routerTo(items)
                                }
                              >
                                {items.introduce}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="hot-sale">  
            <div className="title">
              <span>热卖</span>
            </div>
            <div className="sale-bodyblock">
              <ul>
                {hotSaleList.map((item, index) => {
                  
                  return (
                    <li key={item + index}>
                      <img src={item.img} onClick={() => this.routerTo(item)}/>
                      <p>{item.title}</p>
                      <div className="hot-bt">
                        <span>
                          <span className="mark">￥</span>
                          <span className="price">{item.price}</span>
                        </span>
                        <span className="volume" >
                          {item.salesVolume !== 0
                            ? "销量：" + item.salesVolume
                            : ""}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
