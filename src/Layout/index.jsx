import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react"
import Notif from "../Component/notif"
import Avatar from "../Component/avatar"
import { Icon } from "./icon"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MyContext } from "../MyContext"


const Layout=({children,title,dataLogin,setDataLogin,setIsOpenView})=>{
    const [show,setShow]=useState(false)
    const go=useNavigate()
    const navigate=(name)=>{
        go(name)
        console.log(name)
    }

    const { state, setState } = useContext(MyContext);
      
    const style={
        backgroundText:{
            background:state?"#363740":"",
        color:state?"white":""
        },
        text:{
        color:state?"white":""
        }
    }
    return(
        <div className="layout">
            
            <div className="side" >

                <div className={`side-nav ${show?"show-nav":""}`}> 
                <div className="side-nav-header">Dashboard</div>
                {dataLogin.level=="admin"&&<div onClick={()=>navigate('/home')} className={`side-nav-link ${title=="Overview"?"active":""}`}>{Icon.overview} <span>Overview</span></div>}
                <div onClick={()=>navigate('/tickets')} className={`side-nav-link ${title=="Tickets"?"active":""}`}>{Icon.tickets} <span>Tickets</span></div>
                <div className="side-nav-link">{Icon.ideas} <span>Ideas</span></div>
                <div className="side-nav-link">{Icon.contracts} <span>Contacts</span></div>
                <div className="side-nav-link">{Icon.agents} <span>Agents</span></div>
                <div className="side-nav-link">{Icon.articles} <span>Articles</span></div>
                <div className="side-nav-link">{Icon.settings} <span>Settings</span></div>
                <div className="side-nav-link">{Icon.subscription} <span>Subscription</span></div>
                <div onClick={()=>setState(!state)} className="side-nav-link theme">{state? Icon.dark:Icon.light} <span>Theme</span></div>
                
                </div>



                <div className="nav-and-content">
                    <div style={style.backgroundText}  className="top-nav shadow-md">
                        <div className="top-nav-left"> 
                            <div className="button-show-nav" onClick={()=>setShow(!show)}>{show? Icon.navHidden:Icon.nav}</div>
                            <p className="route-nav">{title}</p>
                        </div>
                      
                        <div className="top-nav-right">
                       {dataLogin.level=="admin"&&title=="Overview"&& <svg className="me-4" onClick={()=>setIsOpenView(true)} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" 
                            stroke={state?"white":"#696B75" }stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>}
                            <Notif color={state?"white":"#493FB9"}/>
                            <div className="devider-vertical"></div>
                            <p>{dataLogin.name}</p>
                            <Avatar setDataLogin={setDataLogin} dataLogin={dataLogin}/>
                        </div>
                    </div>
                    
                    <div className="layout-content">
                       {children}
                    </div>

                </div>             
            </div>
           
        </div>
    )
}

export default Layout