import React, { Component } from 'react';
import { Panel,Button } from 'tinper-bee';
import PropTypes from 'prop-types';
import './index.scss';  
import classnames from 'classnames';
import Hotkeys from 'react-hot-keys';


/**
 * 部分不能通过this.props.form.resetFields()清空的组件，需要传reset方法，在reset方法中自行清空
 */
const propTypes = {
    form:PropTypes.object.isRequired,//将from组件传入
    searchOpen:PropTypes.bool,//是否默认展开更多查询条件，false默认关闭
    search: PropTypes.func,//查询的回调
    reset:PropTypes.func,//重置的回调
    resetName:PropTypes.string,//重置的文字
    searchName:PropTypes.string,//查询的文字
    btnPosition:PropTypes.oneOfType(['left', 'right','center']),//按钮位置
    openName:PropTypes.string,//展开名字
    closeName:PropTypes.string,//收起名字
    showIcon:PropTypes.bool,//是否显示展开收起的图标
};

const defaultProps = {
    searchOpen:false,
    search: () => {},
    reset: () => {},
    btnPosition:'right',
    openName:'展开',
    closeName:'收起',
    showIcon:true
};


class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchOpen:this.props.searchOpen
        };
    }
    open=()=>{
        this.setState({
            searchOpen: !this.state.searchOpen
        })
    }
    search=()=>{
        let self=this;
        this.props.form.validateFields((err, values) => {
            self.props.search(err, values);
        });
    }
    reset=()=>{
        this.props.form.resetFields();
        this.props.reset();
    }
    enter=(e)=>{
        if(e.keyCode === 13){
           this.search();
        }
    }
    render() {
        const {children,className,form,resetName,searchName,btnPosition,openName,closeName,showIcon } = this.props;
        let classes = 'search-panel';
        if(className){
            classes += ' '+className
        }
        return (
            <div className={classes} >
                <div className='search-panel-header' onClick={this.open}>
                    <span className='search-panel-header-title'>
                        查询面板
                    </span>
                    <span className='search-panel-icon'>
                        <span >
                            {
                                showIcon?( <i className={classnames({
                                    'uf': true,
                                    'uf-2arrow-up': this.state.searchOpen,
                                    'uf-2arrow-down': !this.state.searchOpen
                                })}/>):''
                            }
                            {this.state.searchOpen ? closeName : openName}
                        </span>
                    </span>
                </div>
                <div className='search-panel-simple'>
                    {this.props.simple}
                </div>
                <Panel collapsible expanded={this.state.searchOpen}>
                    {children}
                </Panel>
                <div className='search-panel-btn' style={{'textAlign':btnPosition}}>
                        <Hotkeys
                            keyName="enter"
                            onKeyDown={this.search}
                        >
                            <Button size='sm' className='submit-btn' onClick={this.search}>
                            查询
                            </Button>
                        </Hotkeys>
                        
                        <Hotkeys
                            keyName="alt+c,command+c"
                            onKeyDown={this.reset}
                        >
                            <Button size='sm' className='reset-btn' onClick={this.reset}>
                                重置
                            </Button>
                        </Hotkeys>
                    </div>
            </div>
          
        )
    }
}
SearchPanel.propTypes = propTypes;
SearchPanel.defaultProps = defaultProps;
export default SearchPanel;