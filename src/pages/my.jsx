import React, { Component } from "react";
import "../common/style/app.css";
import { Link } from "react-router-dom";
import AHeader from "../components/header";
import Footer from "../components/footer";
import { orderList, aboutList } from "../api/myData";

class Category extends Component {
  state = {
    avator: "",
  };

  // 动态添加图片
  onLoadImg() {
    let _this = this;
    let file1 = document.getElementById("inputId").files[0];
    if (file1) {
      var reader = new FileReader();
      reader.readAsDataURL(file1);

      reader.onload = function (e) {
        _this.setState({ avator: e.target.result });
      };
    }
  }
  loginOut(type) {
    if(type) {
      this.props.history.replace('/login')
    }
  }

  render() {
    return (
      <div className="my">
        <AHeader title="我的" />
        <div className="bodyblock">
          <div className="top">
            <div className="actor">
              <div className="set-avator">
                <input
                  type="file"
                  id="inputId"
                  onChange={this.onLoadImg.bind(this)}
                />
                {this.state.avator && <img src={this.state.avator} alt="" />}
                {!this.state.avator && (
                  <img src={require("../common/images/上传头像.png")} alt="" />
                )}
              </div>
              <div className="text">
                <span className="user-name">上传头像</span>
              </div>
            </div>
          </div>
          <div className="order">
            <div className="order-top">
              <div className="left">我的订单</div>
              <div className="right">
                <span>查看全部订单</span>
                <img src={require("../common/images/arrow.png")} alt="" />
              </div>
            </div>
            <div className="order-bt">
              <ul className="order-ul">
                {orderList.map((item, index) => {
                  return (
                    <li key={item + index} className="order-li">
                      <img
                        src={require("../common/images/" + item.imgSrc)}
                        alt=""
                      />
                      <span>{item.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="about">
            <ul className="about-ul">
              {aboutList.map((item, index) => {
                return (
                  <li className="about-li" key={item + index} onClick={()=>{
                    this.loginOut(item.type)
                  }}>
                    <div className="left">
                      <img
                        src={require("../common/images/" + item.imgSrc)}
                        alt=""
                      />
                    </div>
                    <div
                      className={
                        index < aboutList.length - 1
                          ? "right"
                          : "right noborder"
                      }
                    >
                      <span className="lt">{item.name}</span>
                      <div className="rt">
                        <img
                          src={require("../common/images/arrow.png")}
                          alt=""
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Category;
