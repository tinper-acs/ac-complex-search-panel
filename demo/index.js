
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from 'bee-button';
import './demo.scss';




const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


import Demo1 from "./demolist/Demo1";
var DemoArray = [{"example":<Demo1 />,"title":" 查询面板","code":"/**\n *\n * @title 查询面板\n * @description 复杂查询面板\n *\n */\n\nimport React, { Component } from 'react';\nimport SearchPanel from '../../src/index';\nimport { Col, Row, Icon, InputGroup, FormControl,Checkbox, Panel, PanelGroup, Label, Message, Select, Radio } from \"tinper-bee\";\nimport moment from \"moment/moment\";\nimport DatePicker from 'bee-datepicker';\nimport Form from 'bee-form';\nconst FormItem = Form.FormItem;\nconst { RangePicker } = DatePicker;\nimport 'bee-datepicker/build/DatePicker.css';\n\n\nclass Demo1 extends Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n            selectData: [],\n            approvalState: '',\n            closeState: '',\n            confirmState: '',\n            voucherDate:[]\n        }\n    }\n    search = (err,values) => {//查询\n        console.log(values)\n    }\n    reset = () => {//重置\n        this.setState({\n            approvalState: '',\n            closeState: '',\n            confirmState: '',\n            voucherDate: [],\n        })\n    }\n    render () {\n        const self=this\n        const { getFieldProps, getFieldError } = self.props.form;\n        let orderTypes=[{\n            \"code\":\"0\",\n            \"name\":\"D001\"\n          },{\n            \"code\":\"1\",\n            \"name\":\"D002\"\n          },{\n            \"code\":\"2\",\n            \"name\":\"D003\"\n          },{\n            \"code\":\"3\",\n            \"name\":\"D004\"\n          }]\n        return (\n            <div className=\"demoPadding\">\n                <SearchPanel form={self.props.form}\n                simple={(\n                    <Row>\n                        <Col md={4} xs={6}>\n                            <FormItem>\n                                <Label>订单编号：</Label>\n                                <FormControl\n                                    {\n                                    ...getFieldProps('orderCode', {\n                                        initialValue: '',\n                                    })\n                                    }\n                                />\n                            </FormItem>\n                        </Col>\n                        <Col md={4} xs={6}>\n                            <FormItem>\n                                <Label>供应商名称：</Label>\n                                <FormControl\n                                    {\n                                    ...getFieldProps('supplierName', {\n                                        initialValue: '',\n                                    })\n                                    }\n                                />\n                            </FormItem>\n                        </Col>\n                        <Col md={4} xs={4}>\n                            <FormItem>\n                                <Label className='time'>凭证日期：</Label>\n                                <RangePicker\n                                    defaultValue={this.state.voucherDate}\n                                    placeholder={'开始 ~ 结束'}\n                                    dateInputPlaceholder={['开始', '结束']}\n                                    {\n                                    ...getFieldProps('voucherDate', {\n                                        initialValue:this.state.voucherDate,\n                                        onChange: function (v) {\n                                            self.setState({\n                                                voucherDate: v\n                                            })\n                                        }\n                                    })\n                                    }\n                                />\n                            </FormItem>\n                        </Col>\n                        </Row>)\n                }\n                search={this.search}\n                 reset={this.reset}>\n                    <Row>\n                        <Col md={4} xs={6}>\n                            <FormItem>\n                                <Label>订单类型：</Label>\n                                <Select {\n                                    ...getFieldProps('type', {\n                                        initialValue: '',\n                                    }\n                                    )}>\n                                    <Option value=\"\">请选择</Option>\n                                    {\n                                        orderTypes.map((item, index) => {\n                                            return (\n                                                <Option key={index} value={item.code}>{item.name}</Option>\n                                            )\n                                        })\n                                    }\n                                </Select>\n                            </FormItem>\n                        </Col>\n                        <Col md={4} xs={6}>\n                            <FormItem>\n                                <Label>采购组：</Label>\n                                <FormControl\n                                    {\n                                    ...getFieldProps('purchasingGroup', {\n                                        initialValue: '',\n                                    })\n                                    }\n                                />\n                            </FormItem>\n                        </Col>\n                        <Col md={4} xs={6}>\n                            <FormItem>\n                                <Label>审批状态：</Label>\n                                <Radio.RadioGroup\n                                    selectedValue={this.state.approvalState}\n                                    {\n                                    ...getFieldProps('approvalState', {\n                                        initialValue: '',\n                                        onChange(value) {\n                                            self.setState({ approvalState: value });\n                                        },\n                                    }\n                                    )}\n                                >\n                                    <Radio value=\"0\" >未审批</Radio>\n                                    <Radio value=\"1\" >已审批</Radio>\n                                    <Radio value=\"\" >全部</Radio>\n                                </Radio.RadioGroup>\n                            </FormItem>\n                        </Col>\n                        <Col md={4} xs={6}>\n                            <FormItem>\n                                <Label>关闭状态：</Label>\n                                <Radio.RadioGroup\n                                    selectedValue={this.state.closeState}\n                                    {\n                                    ...getFieldProps('closeState', {\n                                        initialValue: '',\n                                        onChange(value) {\n                                            self.setState({ closeState: value });\n                                        },\n                                    }\n                                    )}\n                                >\n                                    <Radio value=\"0\" >未关闭</Radio>\n                                    <Radio value=\"1\" >已关闭</Radio>\n                                    <Radio value=\"\" >全部</Radio>\n                                </Radio.RadioGroup>\n                            </FormItem>\n                        </Col>\n                        <Col md={4} xs={6}>\n                            <FormItem>\n                                <Label>确认状态：</Label>\n                                <Radio.RadioGroup\n                                    selectedValue={this.state.confirmState}\n                                    {\n                                    ...getFieldProps('confirmState', {\n                                        initialValue: '',\n                                        onChange(value) {\n                                            self.setState({ confirmState: value });\n                                        },\n                                    }\n                                    )}\n                                >\n                                    <Radio value=\"0\" >未确认</Radio>\n                                    <Radio value=\"1\" >已确认</Radio>\n                                    <Radio value=\"\" >全部</Radio>\n                                </Radio.RadioGroup>\n                            </FormItem>\n                        </Col>\n                    </Row>\n                </SearchPanel>\n            </div>\n        )\n    }\n}\n\n\n","desc":" 复杂查询面板"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ open: !this.state.open })
    }

    render () {
        const { title, example, code, desc  } = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const footer = (
            <Button shape="block" onClick={ this.handleClick }>
                { caret }
                { text }
            </Button>
        );
        return (
            <Col md={12} >
                <h3>{ title }</h3>
                <p>{ desc }</p>
                <Panel collapsible expanded={ this.state.open } colors='bordered' header={ example } footer={footer} footerStyle = {{padding: 0}}>
                    <pre><code className="hljs javascript">{ code }</code></pre>
                </Panel>
            </Col>
        )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
                <Row>
                    {DemoArray.map((child,index) => {

                        return (
                            <Demo example= {child.example} title= {child.title} code= {child.code} desc= {child.desc} key= {index}/>
                        )

                    })}
                </Row>
        )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('root'));
