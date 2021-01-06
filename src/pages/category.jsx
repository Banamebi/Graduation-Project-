import React, { Component } from "react";
import "../common/style/app.css";
import AHeader from "../components/header";
import Footer from "../components/footer";
import CategoryList from "../components/categoryList";

class Category extends Component {
  state = {
    navList: [
      { id: 1, name: "周边" },
      { id: 2, name: "古风" },
      { id: 3, name: "手办" },
      { id: 4, name: "首饰" },
      { id: 5, name: "服饰" },
      { id: 6, name: "漫画" },
      { id: 7, name: "原耽" },
      { id: 8, name: "轻小说" },
      { id: 9, name: "游戏" },
      { id: 10, name: "V家" },
    ],
    id: 1
  };

  checkNav(id) {
    this.setState({ id: id });
  }

  render() {
    return (
      <div className="category">
        <AHeader title="分类" />
        <div className="nav">
          <div className="tab-nav">
            <ul className="tab-ul">
              {this.state.navList.map((item, index) => {
                return (
                  <li
                    className={
                      item.id === this.state.id ? "tab-li active" : "tab-li"
                    }
                    key={item + index}
                    onClick={this.checkNav.bind(this, item.id)}
                  >
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <CategoryList id={this.state.id} />
        <Footer />
      </div>
    );
  }
}

export default Category;
