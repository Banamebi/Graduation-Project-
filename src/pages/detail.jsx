import React, { Component } from "react";
import AHeader from "../components/header";
import "../common/style/app.css";
import "../common/style/detail.css"
import { Button } from 'antd-mobile';
import { activeList, hotSaleList } from "../api/homeData";
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: {}
    };
  }
  componentDidMount() {
    const item = localStorage.getItem('goods');
    this.setState({ goods: JSON.parse(item) })
  }
   pushCar() {
    const list = JSON.parse(localStorage.getItem('goodsList'))?JSON.parse(localStorage.getItem('goodsList')):[]
    list.push(this.state.goods)
    localStorage.setItem('goodsList',JSON.stringify(list))
    console.log(list);
  }
  routerTo(items) {
    this.props.history.push({ 
      pathname: `/Detail/${items.id}`,
      state: { data: items },
    });
  }

  render() {
    return (
      <div className="detail">
        <div className="home">
          <AHeader title="商品详情" />
        </div>
        <div className="img">
          <img src={this.state.goods.img} alt="" width="100%" />
        </div>
        <div className='goodstitle'>
          <div style={{marginLeft:"20px",marginBottom:'20px',marginTop:"10px"}}>
          <p style={{fontFamily:'微软雅黑',fontSize:'16px'}}>火爆价格</p>
            <p style={{marginTop:"10px"}}>
            <span style={{color:'red',fontFamily:'微软雅黑',fontSize:'30px'}}>¥</span>
            <span style={{color:'red',fontSize:'16px'}}>{this.state.goods.price}</span>
            </p>
          </div>
          <p style={{color:'#999',padding:'10px',fontFamily:'微软雅黑',fontSize:'14px'}}>
          {this.state.goods.smallTitle} {this.state.goods.introduce}
          </p>
        </div>
        <div className="back">
        <Button onClick={() => this.props.history.goBack()}>返回</Button>
        </div>
        <div className="action">
        <Button onClick={this.pushCar.bind(this)}>加入购物车</Button>
        </div>
      </div>
    );
  }
}

export default Detail;
