import React, { Component, Fragment } from "react";
import "./index.css";
import cateList from "../../api/categoryData";
import {withRouter } from 'react-router-dom'
class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }
  routerTo(item2) {
    localStorage.setItem("goods",JSON.stringify(item2))
    this.props.history.push({pathname: `/Detail`})
  }
  render() {
    const {id} = this.props;
    return (
      <div className="categorylist">
        {cateList.map((item, index) => {
          return (
            <Fragment key={item.id}>
              {id === item.id && (
                <Fragment >
                  {item.list.map((item1, index1) => {
                    return (
                      <div className="module" key={item1 + index1}>
                        <div className="title">
                          <span className="line"></span>
                          <span className="title-name">{item1.title}</span>
                          <span className="line rt"></span>
                        </div>
                        <ul className="content" >
                          {item1.list.map((item2, index2) => {
                            return (
                              <li key={item2 + index2} className="item" >
                                <div className="imgs" >
                                  <img src={item2.img} onClick={() => this.routerTo(item2)} />
                                </div>
                                <div className="text">
                                  <p>{item2.subTitle}</p>
                                  <div className="all-price">
                                    <div>
                                      ￥<span>{item2.price}</span>
                                    </div>
                                    <div className="price">
                                      ￥<span>{item2.oldPrice}</span>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </Fragment>
              )}
            </Fragment>
          );
        })}
      </div>
    );
  }
}

export default withRouter(CategoryList);
 