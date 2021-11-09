import React, { Component } from "react";
import { Card, WingBlank,Toast, WhiteSpace, Button, InputItem } from 'antd-mobile';
import axios from 'axios';
import AHeader from "../components/header";
import "../components/header/index.css";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: ''
        }
    }
    login() {
        axios.post('http://localhost:7001/checkLogin',{userName:this.state.userName,password:this.state.password}).then(response => {
            const data = response.data
            sessionStorage.setItem("token",data.token)
            if(response.data.data){
                this.props.history.replace('/')
            }else{
                Toast.loading('登录失败，用户名不存在或密码错误', 1);
                
            }
        })
    }
    register() {
        axios.post('http://localhost:7001/register',{userName:this.state.userName,password:this.state.password}).then(response => {
            console.log(response.data);
            if(response.data.data) {
                Toast.success('注册成功', 1);
            }
        })
    }

    render() {
        return (
            <div>
                  <div className="home">
          <AHeader title="登录" />
        </div>
        <div className="lgdown">
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <Card>
                        <Card.Header
                            title="登录"
                            extra={<Button type="primary" size="small" onClick={()=>{
                                this.register()
                            }}>注册</Button>}
                        />
                        <Card.Body>
                            <InputItem
                                clear
                                placeholder="请输入用户名"
                                onChange={(val)=>{
                                    this.setState({userName:val})
                                }}
                            >用户名：</InputItem>
                            <InputItem
                                clear
                                placeholder="请输入密码"
                                onChange={(val)=>{
                                    this.setState({password:val})
                                }}
                            >密码：</InputItem>
                            <Button type="primary" size="small" onClick={()=>{
                                this.login()
                            }}>登录</Button>
                        </Card.Body>
                    </Card>
                    <div className="back">
        <Button onClick={() => this.props.history.goBack()}>返回</Button>
        </div>
                </WingBlank>
                </div>
            </div>
        )
    }
}

export default Login;