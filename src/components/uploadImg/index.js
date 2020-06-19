/*
*
* */
import React, { Component } from 'react';
import {Upload, Icon, Modal, Button} from 'antd';
import './index.less';
import PropTypes from "prop-types";

export default class uploadImg extends Component {
    constructor(props) {
        super(props);

        this.state = {
            previewVisible: false,
            previewVedeoVisible:false,
            previewImage: '',
            previewVedio:''
        };
        this._handlePreview = this._handlePreview.bind(this);
        this._handleCancel = this._handleCancel.bind(this);
        this._removeImgFun = this._removeImgFun.bind(this);
        this._sortImgFun = this._sortImgFun.bind(this);
        this._handleVideoPreview = this._handleVideoPreview.bind(this);
        this._lodadVideoId = this._lodadVideoId.bind(this);
    }

    _handleCancel() {
        this.setState({previewVisible: false,previewVedeoVisible:false});
        let media = document.getElementById("media");
        if(media){
            media.src = '';
            media.pause();
        }
    }

    _handlePreview(file) {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    _handleVideoPreview(file) {

        this.setState({
            previewVedio: file.url || file.thumbUrl,
            previewVedeoVisible: true,
        },()=>{
            let media = document.getElementById("media");
            if(media){
               media.src = file.url || file.thumbUrl;
               media.play();
            }
        });
    }

    _removeImgFun(flag){
        this.props.removeImgFun(flag,this.props.id);
    }

    _sortImgFun(index,type){
        this.props.sortImgFun(index,type,this.props.id)
    }


    renderPicList(data){
        return(
            data.map((ele,i)=>{
                return (
                    <div className='img-item' key={i}>
                        <img src={ele.url} style={{cursor:'pointer'}} onClick={()=>{this._handlePreview(ele)}}/>
                        <div className='buttons-div'>
                            <Button size='small' onClick={()=>{this._sortImgFun(i,'pre')}}>前移</Button>
                            <Button size='small' onClick={()=>{this._sortImgFun(i,'next')}}>后移</Button>
                            <Button size='small' onClick={()=>{
                                this._removeImgFun(ele.flag,this.props.id)
                            }}>删除</Button>
                        </div>
                    </div>
                )
            })
        )
    }
    _lodadVideoId(id,url){
        let media = document.getElementById(id);
        if(media){
            media.load(url);
        }
    }
    renderVedioList(data){
        return(
            data.map((ele,i)=>{
                let videoId = 'video'+i;
                return (
                    <div className='img-item' key={i}>
                        <video  style={{cursor:'pointer',width:'200px',height:'200px'}} onClick={()=>{this._handleVideoPreview(ele)}} id={videoId} controls>
                            <source src={ele.url} type="video/mp4"/>
                        </video>
                        <div className='buttons-div'>
                            <Button size='small' onClick={()=>{this._sortImgFun(i,'pre')}}>前移</Button>
                            <Button size='small' onClick={()=>{this._sortImgFun(i,'next')}}>后移</Button>
                            <Button size='small' onClick={()=>{
                                this._removeImgFun(ele.flag,this.props.id)
                            }}>删除</Button>
                        </div>
                        {
                            this._lodadVideoId(videoId,ele.url)
                        }
                    </div>
                )
            })
        )
    }

    render() {
        const {previewVisible, previewImage,previewVedeoVisible,previewVedio} = this.state;
        const {uploadImgLimitNumber,isUploadDefine,fileList,imgDesc,isVideoUpload} = this.props;
        const uploadButton = (
            isUploadDefine?
                <Button>
                    <Icon type="upload" /> 点击上传
                </Button>:
                <div>
                    <Icon type="plus"/>
                    <div className="ant-upload-text">点击上传</div>
                </div>
        );
        let className = isUploadDefine?'clearfix define-upload-wall pic-list-div':'clearfix pic-list-div'
        className = className+' '+(this.props.className||'')
        return (
            <div className={className}>
                {isUploadDefine&&imgDesc&&!isVideoUpload?<span>
                        描述图片<span style={{color:'red'}}>（{imgDesc}）</span>
                    </span>:''}
                {isUploadDefine&&imgDesc&&isVideoUpload?<span>
                        视频描述<span style={{color:'red'}}>（{imgDesc}）</span>
                    </span>:''}
                <Upload
                    multiple={!uploadImgLimitNumber||uploadImgLimitNumber&&uploadImgLimitNumber>1?true:false}
                    listType={isUploadDefine?'':"picture-card"}
                    onPreview={this._handlePreview}
                    onRemove={(e)=>this._removeImgFun(e.flag,this.props.id)}
                    fileList={fileList}
                    beforeUpload={this.props.beforeUpload||null}
                    customRequest={(e) => {
                        this.props.getQiniuToken(
                            e,
                            this.props.QiniuCallBack,
                            this.props.id,
                            this.props.fileSizeLimit?this.props.fileSizeLimit:null
                        )
                    }}
                >
                    {fileList&&fileList.length >= uploadImgLimitNumber? null : uploadButton}
                </Upload>
                {!isUploadDefine && imgDesc?
                    <div style={{width:'700px',position: 'absolute',
                        bottom: '-25px'}}>
                        {imgDesc}
                    </div>:''}
                {(isUploadDefine && !isVideoUpload)?<div className='img-list-div'>{this.renderPicList(fileList)}</div>:''}
                {(isUploadDefine && isVideoUpload)?<div className='img-list-div'>{this.renderVedioList(fileList)}</div>:''}

                <Modal visible={previewVisible} footer={null} onCancel={this._handleCancel}>
                    <img alt="example" style={{width: '90%'}} src={previewImage}/>
                </Modal>
                <Modal visible={previewVedeoVisible} footer={null} onCancel={this._handleCancel}>
                    <video  autoPlay={true} style={{width: '90%'}} id="media">
                        <source type="video/mp4" src={this.state.previewVedio}/>
                    </video>
                </Modal>
            </div>
        );
    }
}

PicturesWall.propTypes = {
    disabled: PropTypes.bool,   //是否可点
    id: PropTypes.string,       //用来标识该组件，一个页面上可以有多个上传图片组件
    className: PropTypes.string,   //可以定制样式
    fileList:PropTypes.array,      //用来存放上传的图片列表
    getQiniuToken:PropTypes.func,   //七牛上传func
    QiniuCallBack:PropTypes.func,   //上传后图片处理func
    imgDesc:PropTypes.string,       //上传图片的格式说明
    isUploadDefine:PropTypes.bool,  //是否是自定义的照片墙
    removeImgFun:PropTypes.func,   //删除图片方法
    sortImgFun:PropTypes.func,           //自定义照片墙的图片前移后移方法
    uploadImgLimitNumber:PropTypes.number //可上传图片张数
}