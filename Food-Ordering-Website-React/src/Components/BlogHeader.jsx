import React from 'react'

function BlogHeader(props) {
  return (

        <header>
        <div className="head H-N-R">
            <div className="head-1">
                <div className="head-logo">
                    <img src="images/logo-white.png" alt=""/>
                    <button><span className="material-symbols-outlined">location_on
                        </span>Location</button>
                </div>
                <div className="head-nav">
                    <ul>

                        <li> <a href="/"> HOME &nbsp; <span className="material-symbols-outlined">
                                    keyboard_arrow_down
                                </span> </a></li>
                        <li><a href="">ORDER &nbsp; <span className="material-symbols-outlined">
                                    keyboard_arrow_down
                                </span> </a> </li>
                        <li><a href="Blogs">BLOG &nbsp; <span className="material-symbols-outlined">
                                    keyboard_arrow_down
                                </span> </a></li>
                        <li><a href="">PAGES &nbsp; <span className="material-symbols-outlined">
                                    keyboard_arrow_down
                                </span> </a></li>
                        <li><a href="Contact">CONTACT &nbsp; <span className="material-symbols-outlined">
                                    keyboard_arrow_down
                                </span> </a> </li>
                    </ul>
                </div>
                <div className="head-profile flex">
                    <img src="https://img.icons8.com/?size=100&id=On3brTbr5kbp&format=png&color=000000" alt=""
                        />
                    <div className="line"></div>
                    <a style={{textDecoration: "none"}} href="LOGIN">
                        <div className="head-me">
                            <div className="img"><img src="images/Mark.png" alt="" /></div>
                            <div className="head-me-content">
                                <p className="grey">Hi, Mark Jecno</p>
                                <h5 style={{color: "white"}}>My Account</h5>
                            </div>
                        </div>
                    </a>
                </div>
            </div>



            <div className="head-2">
                <div className="head-2-1">
                    <h1>{props.title}</h1>
                </div>
                <div className="head-2-2">
                    <img src="https://img.icons8.com/?size=100&id=BZhTcjGTwoBp&format=png&color=000000" alt=""/>
                    <p className="grey">HOME&nbsp;/</p>
                    <h4>Blog List
                    </h4>
                </div>
            </div>
        </div>

        <div className="head responsive-head">
            <div className="head-1">
                <img className="more" src="https://cdn-icons-png.flaticon.com/128/6015/6015685.png" alt=""/>
                <div className="head-logo imp">
                    <img src="images/logo-white.png" alt=""/>
                    <button><span className="material-symbols-outlined">location_on
                        </span>Location</button>

                </div>

                <div className="head-profile flex">
                    <img src="https://img.icons8.com/?size=100&id=On3brTbr5kbp&format=png&color=000000" alt=""
                        />
                    <div className="line"></div>
                    <div className="head-me">
                        <div className="img"><img src="images/Mark.png" alt="" /></div>
                        <div className="head-me-content">
                            <p className="grey">Hi, Mark Jecno</p>
                            <h5>My Account</h5>
                        </div>
                    </div>
                </div>
            </div>



            <div className="head-2">
                <div className="head-2-1">
                    <h1>Blog List</h1>
                </div>
                <div className="head-2-2">
                    <img src="https://img.icons8.com/?size=100&id=BZhTcjGTwoBp&format=png&color=000000" alt=""/>
                    <p className="grey">HOME&nbsp;/</p>
                    <h4>Blog List
                    </h4>
                </div>
            </div>
        </div>

        <div id="side-menu">
            <div className="menu-header">
                <span>Menu</span>
                <button id="close-btn">✖</button>
            </div>
            <ul className="menu-list">
                <a href="Home">
                    <li>Home</li>
                </a>
                <a href=""><li>Order</li></a>
                <a href="Blogs"><li>Blog</li></a>
                <li>Pages</li>
                <a href="Contact">
                    <li>Contact</li>
                </a>
            </ul>
        </div>
    </header>
  )
}

export default BlogHeader
