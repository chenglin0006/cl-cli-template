import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Tools } from '../../../util'
import CommonDetail from '../../../components/detail/index';
import { data } from './data';

class Detail extends Component{
    constructor(props){
        super(props);
    }

    _getMemberDetail() {
        let id = Tools.getUrlArg('id');
        this.props.demo.asyncGetDetail({id: id});
    }

    componentDidMount() {
        this._getMemberDetail();
    }
    
    render(){
        return (
            <CommonDetail
                data={data}
                value={[]}
                history={this.props.history}
            /> 
        )

    }
}

export default connect(
    (state) =>{
        return {MemberDetail:state. MemberDetail}
    },
    (dispatch) => {
		return {
			demo: dispatch.demo
		}
	}
)(Detail);




