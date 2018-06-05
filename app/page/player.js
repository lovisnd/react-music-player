import React from 'react'
import Progress from "../components/progress";
import './player.less'
import { Link } from 'react-router';
import Pubsub from 'pubsub-js'
let duration =null;
class Player extends React.Component{
    constructor(props){
        super(props)
        this.state={
            progress:0,
            volume:0,
            isPlay:true
        }
    }
    formatTime(time){
        time = Math.floor(time);
        let min = Math.floor(time/60);
        let sec = Math.floor(time%60);
        sec = sec <10 ? `0${sec}`:sec;
        return `${min}:${sec}`;
    }
    componentDidMount(){
       var _this = this;
        $('#player').bind($.jPlayer.event.timeupdate, function(event) {
            duration = event.jPlayer.status.duration;
            _this.setState({
                volume:event.jPlayer.options.volume * 100,
                progress: event.jPlayer.status.currentPercentRelative,
                leftTime:_this.formatTime(duration*(1-event.jPlayer.status.currentPercentAbsolute/100))
            });
        })
    }
    componentWillUnmount(){
        $('#player').unbind($.jPlayer.event.timeupdate);
    }
    //进度条控制
    progressChangeHandler(progress){
        $('#player').jPlayer('play',duration*progress);
        this.setState({ isPlay: true});
    }
    //音量控制
    volumeChangeHandler(progress){
        $('#player').jPlayer('volume',progress);

    }
    play(){
        if(this.state.isPlay){
            $('#player').jPlayer('pause')
        }else{
            $('#player').jPlayer('play')
        }
        this.setState({
            isPlay:!this.state.isPlay
        })
    }
    change(){
       Pubsub.publish('MUSIC_MODEL')
    }
    playPrev(){
        Pubsub.publish('PLAY_PREV');
    }
    playNext(){
        Pubsub.publish('PLAY_NEXT');
    }
    render(){
        return<div className="player-page">
            <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
            <div className="mt20 row">
                <div className="controll-wrapper">
                    <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                    <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                    <div className="row mt20">
                        <div className="left-time -col-auto">-{this.state.leftTime}</div>
                        <div className="volume-container">
                            <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                            <div className="volume-wrapper">
                                <Progress
                                    progress={this.state.volume}
                                    onProgressChange={this.volumeChangeHandler}
                                    barcolor="#aaa"
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{height: 10, lineHeight: '10px'}}>
                        <Progress
                            progress={this.state.progress}
                            onProgressChange={this.progressChangeHandler.bind(this)}
                        />
                    </div>
                    <div className="mt35 row">
                        <div>
                            <i className="icon prev" onClick={this.playPrev}></i>
                            <i className={`icon ml20 ${this.state.isPlay?'pause':'play'}`} onClick={this.play.bind(this)}></i>
                            <i className="icon next ml20" onClick={this.playNext}></i>
                        </div>
                        <div className="-col-auto">
                            <i className={`icon repeat-${this.props.musicType}`} onClick={this.change.bind(this)}></i>
                        </div>
                    </div>
                </div>
                <div className="-col-auto cover">
                    <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                </div>
            </div>
        </div>
    }
}
export default Player;