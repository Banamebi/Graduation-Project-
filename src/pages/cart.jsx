import React, { Component } from "react";
import { message, Button } from "antd";
import "../common/style/app.css";
import AHeader from "../components/header";
import Footer from "../components/footer";
import beforeselect from "../common/images/beforeselect.png";
import select from "../common/images/select.png";
import {Toast } from 'antd-mobile';
class Category extends Component {
  state = {
    dataList: [
      {
        kinds: "全部商品",
        list: [
          {
            img:
              "https://img.alicdn.com/bao/uploaded/i3/TB1qmAuHpXXXXcCXFXXXXXXXXXX_!!0-item_pic.jpg_240x240.jpg",
            title: "初音ミク V3 所有音源集合（送V4编辑器）",
            price: 100,
            num: 1,
            checked: false,
          },
          {
            img:
              "https://img.alicdn.com/bao/uploaded/i1/881846768/TB2AWk4XVuWBuNjSspnXXX1NVXa_!!881846768.jpg_240x240.jpg",
            title: "【中日双语】洛天依 V4（附V4编辑器）",
            price: 65,
            num: 1,
            checked: false,
          },
          {
            img:
              "https://img.alicdn.com/bao/uploaded/i3/TB1PvUzHpXXXXcaXFXXXXXXXXXX_!!0-item_pic.jpg_240x240.jpg",
            title: "巡音ルカ V4X 所有音源集合（送V4编辑器）",
            price: 105,
            num: 1,
            checked: false,
          },
        ],
      },
    ],
    isChecked: false, // 是否全选
    checkList: [], // 选中的项
    buyPrice: 0, // 结算总价
  };

  deepClone(source) {
    if (!source && typeof source !== "object") {
      throw new Error("error arguments", "shallowClone");
    }
    const targetObj = source.constructor === Array ? [] : {};
    for (const keys in source) {
      if (source.hasOwnProperty(keys)) {
        if (source[keys] && typeof source[keys] === "object") {
          targetObj[keys] = source[keys].constructor === Array ? [] : {};
          targetObj[keys] = this.deepClone(source[keys]);
        } else {
          targetObj[keys] = source[keys];
        }
      }
    }
    return targetObj;
  }
  componentDidMount() {
    console.log(JSON.parse(localStorage.getItem("goodsList")));
    let goodsList = localStorage.getItem("goodsList")
      ? JSON.parse(localStorage.getItem("goodsList"))
      : [];
    let arr = goodsList.map((child) => {
      return {
        ...child,
        title: child.introduce,
        num: 1,
        checkedL: false,
      };
    });
    let cpData = this.deepClone(this.state.dataList);
    cpData[0].list = arr;
    this.setState({ dataList: cpData });
  }

  // 单选
  selectItem(item) {
    // console.log('item====>',item);
    item.checked = !item.checked;
    this.getCheck();
    this.setState({
      isChecked: this.isCheckedAll(),
    });
  }

  // 全选
  selectAll() {
    // console.log("全选。。。。");
    // 先判断是否有某一项没有被选中,有，则让每一项都变成选中，反之都变成不选中
    let isSelectAll = this.isCheckedAll();
    let lists = [...this.state.dataList];
    for (let i = 0; i < lists.length; i++) {
      const item = lists[i];
      for (let j = 0; j < item.list.length; j++) {
        const item1 = item.list[j];
        item1.checked = !isSelectAll;
        this.setState({
          isChecked: !isSelectAll,
        });
      }
    }
    this.setState({
      dataList: [...lists],
    });
    this.getCheck();
  }

  // 判断各个项是否都被选中了
  isCheckedAll() {
    // 假设全部已经被选中
    let isSelectAll = true;
    // 遍历数组，找出没有被选中的项，推翻假设
    let lists = [...this.state.dataList];
    for (let i = 0; i < lists.length; i++) {
      const item = lists[i];
      for (let j = 0; j < item.list.length; j++) {
        const item1 = item.list[j];
        if (!item1.checked) {
          isSelectAll = false;
          // 结束循环
          return isSelectAll;
        }
      }
    }
    return isSelectAll;
  }

  // 拿到选中的项
  getCheck() {
    let newList = [...this.state.dataList];
    let checkList = [];
    newList.forEach((item, index) => {
      item.list.forEach((item1, index1) => {
        if (item1.checked) {
          checkList.push(item1);
        }
      });
    });
    console.log("checkList===>选中的项", checkList);
    let buyPrice = 0;
    if (checkList.length > 0) {
      checkList.forEach((item) => {
        buyPrice = buyPrice + item.price * item.num;
        this.setState({
          buyPrice: buyPrice,
        });
      });
    }
    console.log("buyPrice==>", buyPrice);

    this.setState({
      buyPrice: buyPrice,
      checkList: [...checkList],
    });
    console.log("this.state.buyPrice==>", this.state.buyPrice);
  }

  // 删除某一项
  deleteItem(item, index) {
    let list = [...this.state.dataList];
    list.forEach((item1, index1) => {
      item1.list.forEach((item2, index2) => {
        if (item2 === item) {
          item1.list.splice(index, 1);
        }

        if (item1.list.length < 1) {
          list.splice(index1, 1);
        }
      });
    });

    let checkList = [...this.state.checkList];
    if (checkList.length > 0) {
      checkList.forEach((item2, index2) => {
        if (item2 === item) {
          checkList.splice(index2, 1);
        }
      });
    }

    let buyPrice = 0;
    if (checkList.length > 0) {
      checkList.forEach((item3) => {
        buyPrice = buyPrice + item3.price * item3.num;
        this.setState({
          buyPrice: buyPrice,
        });
      });
    }
    console.log("buyPrice===>11", buyPrice);

    this.setState({
      dataList: [...list],
      checkList: [...checkList],
      buyPrice: buyPrice,
    });
    console.log("===>", list);
    console.log("checkList===>", this.state.checkList);
  }

  // 减数量
  reduce(item) {
    console.log("item====>", item);
    let list = [...this.state.dataList];
    list.forEach((item1, index1) => {
      item1.list.forEach((item2, index2) => {
        if (item2 === item) {
          console.log(item2);
          if (item2.num > 0) {
            item2.num--;
            this.setState({
              dataList: [...list],
            });
            this.getAllPrice();
          }
        }
      });
    });
  }

  // 加数量
  increase(item) {
    console.log("item====>", item);
    let list = [...this.state.dataList];
    list.forEach((item1, index1) => {
      item1.list.forEach((item2, index2) => {
        if (item2 === item) {
          console.log(item2);
          item2.num++;
          this.setState({
            dataList: [...list],
          });
          this.getAllPrice();
        }
      });
    });
  }

  // 计算价格
  getAllPrice() {
    let list = [...this.state.checkList];
    let buyPrice = 0;
    if (list.length > 0) {
      list.forEach((item) => {
        buyPrice = buyPrice + item.price * item.num;
      });
    }

    this.setState({
      buyPrice: buyPrice,
    });
  }

  render() {
    return (
      <div className="cart">
        <AHeader title="购物车" />
        <div className="content">
          {this.state.dataList.length > 0 && (
            <div>
              {this.state.dataList.map((item, index) => {
                return (
                  <div key={item + index}>
                    <div className="categorys">{item.kinds}</div>
                    {item.list.map((item1, index1) => {
                      return (
                        <div key={item1 + index1} className="item">
                          <div
                            className="select_wrap"
                            onClick={this.selectItem.bind(this, item1)}
                          >
                            {item1.checked && (
                              <img className="select" src={select} />
                            )}
                            {!item1.checked && (
                              <img className="select" src={beforeselect} />
                            )}
                          </div>
                          <img className="btimg" src={item1.img} alt="" />
                          <div className="item_wrap">
                            <div className="title">{item1.title}</div>
                            <div className="bottoms">
                              <span className="left">￥{item1.price}</span>
                              <div className="operate">
                                <span
                                  className="operate-click"
                                  onClick={this.reduce.bind(this, item1)}
                                >
                                  -
                                </span>
                                <span className="operate-click operate-num">
                                  {item1.num}
                                </span>
                                <span
                                  className="operate-click"
                                  onClick={this.increase.bind(this, item1)}
                                >
                                  +
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            className="delete-item"
                            onClick={this.deleteItem.bind(this, item1, index1)}
                          >
                            删除
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
          {this.state.dataList.length === 0 && (
            <div className="no-data">没有加入购物车的数据咯~</div>
          )}
        </div>
        <div className="footer_wrap">
          <div className="wrap-lt">
            <div className="lts" onClick={this.selectAll.bind(this)}>
              <div className="select_wrap">
                {this.state.isChecked && <img src={select} />}
                {!this.state.isChecked && <img src={beforeselect} />}
              </div>
              <div className="allselect">全选</div>
            </div>
            <div className="rts">
              总计：<span>￥{this.state.buyPrice}</span>
            </div>
          </div>
          {/* <div
            className="wrap-rt"
            onClick={message.info("This is a normal message")}
          >
            去结算({this.state.checkList.length})
          </div> */}
          <Button type="primary" className="wrap-rt"
          onClick={() => Toast.success(`总金额为${this.state.buyPrice}`)} >
          去结算({this.state.checkList.length})
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Category;
