import React from 'react'
import Header from './components/header'
import Player from "./page/player";
import MusicList from "./page/musiclist";
import {Router,Route,IndexRoute,Link,hashHistory} from 'react-router'
import {MUSIC_LIST} from "./config/musiclist";
import Pubsub from 'pubsub-js'
class App extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            musicList:MUSIC_LIST,
            currentMusicItem:MUSIC_LIST[0],
            leftTime:'',
            musicType:'cycle'
        }
    }
    //点击列表播放音乐控制
    playMusic(musicItem){
        $("#player").jPlayer("setMedia", {
            mp3:musicItem.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem:musicItem
        })
    };
    //音乐播放控制
    playNext(type){
        let index = this.findIndexMusic(this.state.currentMusicItem);
        let newIndex = null;
        let musicLength= this.state.musicList.length;
        if(type==='next'){
            newIndex = (index+1)% musicLength;
        }else{
            newIndex = (index-1+musicLength) % musicLength;
        }
        this.playMusic(this.state.musicList[newIndex])
    };
    //找到歌曲列表位置
    findIndexMusic(musicItem){
        return this.state.musicList.indexOf(musicItem)
    }
    componentDidMount() {
        $("#player").jPlayer({
            supplied: 'mp3',
            wmode: 'window'
        });
        this.playMusic(this.state.currentMusicItem);
        $('#player').bind($.jPlayer.event.ended,(e)=>{
            this.playNext('next');
        });
        Pubsub.subscribe('DELETE_MUSIC',(msg,musicItem)=>{
            this.setState({
                musicList:this.state.musicList.filter(item=>{
                    return item!== musicItem;
                })
            })
        });
        Pubsub.subscribe('PLAY_MUSIC',(msg,musicItem)=>{
            this.playMusic(musicItem);
        });
        Pubsub.subscribe('PLAY_PREV',(msg)=>{
            this.playNext('prev');
        })
        Pubsub.subscribe('PLAY_NEXT',(msg)=>{
            this.playNext('next');
        })
        Pubsub.subscribe('MUSIC_MODEL',(msg)=>{
           
        })
    }
    componentWillUnmount(){
        //解绑
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('PLAY_NEXT');
        Pubsub.unsubscribe('PLAY_PREV');
        $('#player').unbind($.jPlayer.event.ended);
    }
    render() {
        return <div>
            <Header/>
            {React.cloneElement(this.props.children,this.state)}
        </div>
    }
}
class Root extends React.Component {
    render(){
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Player}></IndexRoute>
                    <Route path="/list" component={MusicList}></Route>
                </Route>
            </Router>
        )
}
}
export default Root;