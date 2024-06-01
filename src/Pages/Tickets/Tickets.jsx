import "./tickets.css"
import Layout from "../../Layout"
import { Icon } from "../../Layout/icon"
import Tabel from "../../Component/tabel"
import { Dialog, DialogPanel, Popover, PopoverButton, PopoverPanel } from "@headlessui/react"
import { gql, useLazyQuery, useQuery } from "@apollo/client"
import { useContext, useEffect, useState } from "react"
import Label from "../../Component/label"
import ModalCreateTickets from "../../Component/modalCreateTickets"
import { MyContext } from "../../MyContext"



const GET_TICKETS=gql`
query MyQuery($offset: Int = 2, $id: order_by = desc, $where: tickets_bool_exp = {}) {
    tickets(order_by: {id: $id}, limit: 6, offset: $offset, where: $where) {
      url
      tickets
      status
      name
      id
      date
      priority
    }
  }
  `
const GET_MAX_PAGE=gql`
query MyQuery($where: tickets_bool_exp = {priority: {}}) {
    tickets_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }  
  `
  
const Tickets=({dataLogin,setDataLogin})=>{
    const[isOpen,setIsopen]=useState(false)
    const [sort,setSort]=useState(false)
    const [filter,setFilter]=useState('')
    const [page,setPage]=useState(1)
    const [maxPage,setMaxPage]=useState(1)
    const [offset,setOffset]=useState(0)
    const[get_max_page,{data:dataMaxPage}]=useLazyQuery(GET_MAX_PAGE,{
        onCompleted:()=>{
            console.log(Math.ceil(dataMaxPage?.tickets_aggregate?.aggregate?.count/6))
            setMaxPage(Math.ceil(dataMaxPage?.tickets_aggregate?.aggregate?.count/6)||1)
        },
        fetchPolicy: "network-only",   // Used for first execution
        nextFetchPolicy: "cache-and-network" // Doesn't chec
    })
    const [get_tickets,{data,loading,error}]=useLazyQuery(GET_TICKETS,{
        onCompleted:()=>{
            console.log(data)
        },
        fetchPolicy: "network-only",   // Used for first execution
        nextFetchPolicy: "cache-and-network" // Doesn't chec
    })

 
const reset=()=>{
    get_max_page();

    get_tickets({
        variables:{
            offset:0
        }
    })

    console.log("GET")

    setOffset(0)
    setPage(1)
    setSort(false)
    setFilter('')
}
    useEffect(()=>{
  
    },[isOpen])

    useEffect(()=>{
    
        get_max_page();

        get_tickets({
            variables:{
                offset:0
            }
        })
    },[])

    
    const changeFilter=(e)=>{
        // console.log(e.target.value)
        setFilter(e.target.value)
    }
    const next=()=>{
        if(page!=maxPage){
            const where = {};

            if (filter) {
              where.priority = { _eq: filter };
            }
        
            get_tickets({
              variables: {
                offset: offset + 6,
                id: sort ? "asc" : "desc",
                where: where
              }
            });
            setOffset(offset+6)
            setPage(page+1)
        }
    }
    const back=()=>{
        if(page!=1){
            const where = {};

            if (filter) {
              where.priority = { _eq: filter };
            }
        
            get_tickets({
              variables: {
                offset: offset - 6,
                id: sort ? "asc" : "desc",
                where: where
              }
            });
            setOffset(offset-6)
            setPage(page-1)
        }
    }


    useEffect(()=>{
        const where = {};

        if (filter) {
          where.priority = { _eq: filter };
        }
    
        get_max_page({
          variables: {
            where: where
          }
        });
    
        get_tickets({
          variables: {
            offset: 0,
            id: sort ? "asc" : "desc",
            where: where
          }
        });
            setOffset(0)
            setPage(1)
    },[sort,filter])


    const { state, setState } = useContext(MyContext);
    
    const style={
        backgroundText:{
             background:state?"#363740":"",
             color:state?"white":""
        },
        text:{
              color:state?"white":""
        },
        backgroundContainer:{
          background:state?"#373737":""
        },
        sortActive:state?"bg-neutral-800 rounded h-7 w-18 p-1":"bg-neutral-200 rounded h-7 w-18 p-1",

    }
   
    return(
        <Layout title={'Tickets'} dataLogin={dataLogin} setDataLogin={setDataLogin}>
            <ModalCreateTickets reset={reset}  dataLogin={dataLogin} isOpen={isOpen} setIsopen={setIsopen}/>
           <div style={style.backgroundContainer} className="tickets">
                <div className="tickets-container shadow-md" style={style.backgroundText}>
                    <div className="tickets-header mb-5">
                        
                        <div className="tickets-header-title font-bold">All tickets</div>
                        <div className="sort-filter">
                        <button onClick={()=>setIsopen(true)} className="me-2 bg-blue-500  px-3 py-1 flex rounded text-white ">
                            Create
                        </button>
                           <div onClick={()=>setSort(!sort)} className={`${sort?style.sortActive:""} justify-center sort-button cursor-pointer`}> {Icon.sort}
                            <span>{loading ? "loading":"Sort"}</span>
                           </div>
                           <Popover>
                                <PopoverButton className="text-sm/6 font-semibold  mt-1">
                                <div  className={`justify-center sort-button cursor-pointer`}> {Icon.filter}
                                    <span className="font-normal text-base ms-1">Filter</span>
                                </div>
                                </PopoverButton>
                                    <PopoverPanel
                                    anchor="bottom end"
                                    className=" rounded-xl  bg-white  shadow-md text-sm/6 mt-2"
                                    >
                                    <div className="p-3">
                                        <input checked={filter == 'HIGH'} onChange={changeFilter} value="HIGH" type="radio" id="age1" name="age"/>
                                        <label  htmlFor="age1" className="m-2"><Label name="HIGH"/></label><br/>
                                        <input checked={filter == 'NORMAL'} onChange={changeFilter}  value="NORMAL"  className="mt-5" type="radio" id="age2" name="age"/>
                                        <label  htmlFor="age2" className="m-2"><Label name="NORMAL"/></label><br/>  
                                        <input checked={filter == 'LOW'} onChange={changeFilter}  value="LOW"  className="mt-5" type="radio" id="age3" name="age"/>
                                        <label htmlFor="age3" className="m-2"><Label name="LOW"/></label><br/>
                                        <input checked={filter == ''} onChange={changeFilter}  value=""  className="mt-5" type="radio" id="age3" name="age"/>
                                        <label htmlFor="age3" className="m-2"><Label name="ALL"/></label><br/>
                                    </div>
                                    </PopoverPanel>
                            </Popover>
                        </div>
                    </div>

                    <Tabel data={data?.tickets}/>
                    <div className="pagination mt-5 flex justify-center">
                        <div className="flex">
                            <div onClick={back}>{`<`}</div>
                            <div className="ms-3 me-3">Page of <span className="font-bold">{page}</span></div>
                            <div onClick={next}>{`>`}</div>
                        </div>
                    </div>
                </div>
           </div>
        </Layout>       
    )
}

export default Tickets