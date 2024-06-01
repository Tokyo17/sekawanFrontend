import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react"
import Notif from "../Component/notif"
import Avatar from "../Component/avatar"
import { Icon } from "./icon"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MyContext } from "../MyContext"


const Layout=({children,title,dataLogin})=>{
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
                <div onClick={()=>navigate('/home')} className={`side-nav-link ${title=="Overview"?"active":""}`}>{Icon.overview} <span>Overview</span></div>
                <div onClick={()=>navigate('/tickets')} className={`side-nav-link ${title=="Tickets"?"active":""}`}>{Icon.tickets} <span>Tickets</span></div>
                <div className="side-nav-link">{Icon.ideas} <span>Ideas</span></div>
                <div className="side-nav-link">{Icon.contracts} <span>Contacts</span></div>
                <div className="side-nav-link">{Icon.agents} <span>Agents</span></div>
                <div className="side-nav-link">{Icon.articles} <span>Articles</span></div>
                <div className="side-nav-link">{Icon.settings} <span>Settings</span></div>
                <div className="side-nav-link">{Icon.subscription} <span>Subscription</span></div>
                <div onClick={()=>setState(!state)} className="side-nav-link">{state? Icon.dark:Icon.light} <span>Theme</span></div>
                
                </div>



                <div className="nav-and-content">
                    <div style={style.backgroundText}  className="top-nav shadow-md">
                        <div className="top-nav-left"> 
                            <div className="button-show-nav" onClick={()=>setShow(!show)}>{show? Icon.navHidden:Icon.nav}</div>
                            <p className="route-nav">{title}</p>
                        </div>
                      
                        <div className="top-nav-right">
                            <Notif color={state?"white":"#493FB9"}/>
                            <div className="devider-vertical"></div>
                            <p>{dataLogin.name}</p>
                            <Avatar dataLogin={dataLogin}/>
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