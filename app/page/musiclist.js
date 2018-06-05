import React from 'react'
import MusicListItem from '../components/musiclistitem'
class MusicList extends React.Component{
    render(){
        let listEle=null;
        listEle=this.props.musicList.map((item)=>{
           return  <MusicListItem key={item.id} musicItem={item} focus={item===this.props.currentMusicItem}>{item.title}</MusicListItem>
        })
        return(
            <ul>
                {listEle}
            </ul>
        )
    }
}

export default MusicList;
