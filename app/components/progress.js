import React from 'react'
import './progress.less'
class Progress extends  React.Component {
    static get defaultProps(){
        return {
            barcolor: '#2f9842'
        }
    };
    changeProgress(e){
        //let progress = (e.clientX - this.refs.progressBar.offsetLeft) / this.refs.progressBar.offsetWidth;
        let progressBar = this.refs.progressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
        console.log(progress)
        this.props.onProgressChange&&  this.props.onProgressChange(progress)
    }
    render() {
        return (
            <div ref="progressBar" className="components-progress" onClick={this.changeProgress.bind(this)}>
                <div className="progress" style= {{width: `${this.props.progress}%` ,background:this.props.barcolor}}>
                </div>
            </div>
        )
    }
}
export default Progress