import React from 'react'
class Header extends  React.Component {
    render() {
        return (
            <div className="row components-header" >
                <img src="/static/images/logo.png" width="40" alt="" className="-col-auto"/>
                <h1 className="caption"> &nbsp; &nbsp;React Music Player</h1>
            </div>
        )
    }
}
export default Header