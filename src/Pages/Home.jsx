import ReactApexChart from 'react-apexcharts';
import Chart from '../Data';
import Layout from '../Layout';
import { MyContext } from '../MyContext';
import { useContext, useEffect, useState } from 'react';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { Icon } from '../Layout/icon';
import ModalCreateTask from '../Component/modalCreateTask';
import Label from '../Component/label';
import ModalViewAllTask from '../Component/modalViewAllTask';


const GET_TASK=gql`
query MyQuery {
  task(order_by: {task: asc}) {
    task
    level
  }
}
`

const GET_DATA=gql`
query MyQuery {
  data {
    average
    averageFirst
    onHold
    open
    overdue
    pending
    received
    resolved
    sla
    today
    unresolved
    waitingCustomer
    waitingDeveloper
    waitingFeature
    yesterdey
  }
}
`

const Home=({dataLogin,setDataLogin})=>{
  
  const[isOpen,setIsopen]=useState(false)
  const[isOpenView,setIsopenView]=useState(false)
  const{data,loading}=useQuery(GET_DATA,{
    onCompleted:()=>{
      console.log("sad")
      console.log(data?.data[0])
    }
  })

  const[get_task,{data:dataTask,loading:loadingTask}]=useLazyQuery(GET_TASK,{
    onCompleted:()=>{
      console.log(dataTask)
    },
    fetchPolicy: "network-only",   // Used for first execution
    nextFetchPolicy: "cache-and-network" 
  })

  useEffect(()=>{
    get_task()
  },[])

  const { state, setState } = useContext(MyContext);
  
  const {chartOptions}=Chart()
    
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
      }
  }

      return (
      <Layout title="Overview" dataLogin={dataLogin} setDataLogin={setDataLogin}>
        <div style={style.backgroundContainer} className='home'>
          <ModalCreateTask get_task={get_task} isOpen={isOpen} setIsopen={setIsopen}/>
          <ModalViewAllTask dataTask={dataTask} isOpen={isOpenView} setIsopen={setIsopenView}/>
          {/* ===================TOP================ */}
          <div className='top'>
            <div style={style.backgroundText} className='top-card shadow-md'>
              <p>{loading?"loading":"Unresolved"}</p>
              <p>{data?.data[0].unresolved}</p>
            </div>
            <div style={style.backgroundText} className='top-card shadow-md'>
              <p>Overdue</p>
              <p>{data?.data[0].overdue}</p>
            </div>
            <div style={style.backgroundText} className='top-card shadow-md'>
              <p>Open</p>
              <p>{data?.data[0].open}</p>
            </div>
            <div style={style.backgroundText} className='top-card shadow-md'>
              <p>On hold</p>
              <p>{data?.data[0].onHold}</p>
            </div>
          </div>

          {/* ===================MID================ */}
            <div  className='mid shadow-md'>
              <div style={style.backgroundText} className='chart shadow-md'>
                <div className='chart-title'>
                  <h1>Today's trends</h1>
                    <p>as of 25 May 2024 09:41 PM</p>
                </div>
                <ReactApexChart
                  options={chartOptions.options}
                  series={chartOptions.series}
                  type="area"
                  // height={400}
                />
              </div>
              <div className='side-chart'>
                <div style={style.backgroundText}  className='side-card shadow-md'>
                  <p>Resolved</p>
                  <p>{data?.data[0].resolved}</p>
                </div>
                <div style={style.backgroundText}  className='side-card shadow-md'>
                  <p>Received</p>
                  <p>{data?.data[0].received}</p>
                </div>
                <div style={style.backgroundText}  className='side-card shadow-md'>
                  <p>Average first response Time</p>
                  <p>{data?.data[0].averageFirst}m</p>
                </div>
                <div style={style.backgroundText}  className='side-card shadow-md'>
                  <p>Average response Time</p>
                  <p>{data?.data[0].average}h</p>
                </div>
                <div style={style.backgroundText}  className='side-card shadow-md'>
                  <p>Resolution within SLA</p>
                  <p>{data?.data[0].sla}%</p>
                </div>
              </div>
            </div>

          {/* ==========BOTTOM=========== */}
          <div className='bottom'>

            <div style={style.backgroundText} className='bottom-card shadow-md'>
              <div  className='header-card-bottom'>
                <div  className='heder-card-bottom-left'>
                  <p>Unresolved tickets</p>
                  <p>Grup Support</p>
                </div>
                <div>
                  <p style={style.text} className='view-all'>View all</p>
                </div>
              </div>
              <div className='bottom-list'>
                <p>Waiting on Feature Request</p>
                <p>{data?.data[0].waitingFeature}</p>
              </div>
              {/* <div className='devider'></div> */}
              <div className='bottom-list'>
                <p>Waiting Customer Response</p>
                <p>{data?.data[0].waitingCustomer}</p>
              </div>
              <div className='bottom-list'>
                <p>Waiting Developer Fix</p>
                <p>{data?.data[0].waitingDeveloper}</p>
              </div>
              <div className='bottom-list'>
                <p>Pending</p>
                <p>{data?.data[0].pending}</p>
              </div>
              
            </div>

            <div style={style.backgroundText} className='bottom-card shadow-md'>
              <div className='header-card-bottom'>
                <div  className='heder-card-bottom-left'>
                  <p>Task</p>
                  <p>Today</p>
                </div>
                <div className='view-all'>
                  <p onClick={()=>setIsopenView(true)} style={style.text}>View all</p>
                </div>
              </div>
              <div onClick={()=>setIsopen(true)} className='bottom-list'>
                <p>Create new task</p>
                <p>{Icon.new}</p>
              </div>
              {
                dataTask?.task.map((v,i)=>{
                  if(i<3){
                    return<div className='bottom-list'>
                          <p>{v.task}</p>
                          <p><Label name={v.level}/></p>
                    </div>
                  }
                })
              }
    
            </div>
          </div>
         

        </div>
        </Layout>
    )
}

export default Home