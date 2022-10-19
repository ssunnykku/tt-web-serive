import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



const data = [
    {
        "년도":"2014",
        "발생 및 처리(총계)":"388486",
        "1인당 발생량(kg/일)":"0.95"
        
    },
    {
        "년도":"2015",
        "발생 및 처리(총계)":"404812",
        "1인당 발생량(kg/일)":"0.97"
        
    },
    {
        "년도":"2016",
        "발생 및 처리(총계)":"404812",
        "1인당 발생량(kg/일)":"1.01"
        
    },
    {
        "년도":"2017",
        "발생 및 처리(총계)":"414626",
        "1인당 발생량(kg/일)":"1.01"
        
    },
    {
        "년도":"2018",
        "발생 및 처리(총계)":"430713",
        "1인당 발생량(kg/일)":"1.06"
        
    },
    {
        "년도":"2019",
        "발생 및 처리(총계)":"481682",
        "1인당 발생량(kg/일)":"1.09"
        
    },
    {
        "년도":"2020",
        "발생 및 처리(총계)":"518731",
        "1인당 발생량(kg/일)":"1.16"
        
    }
    
]

const Waste = () => {
  return (
    <>
    <ResponsiveContainer width="100%" aspect={4}>
      <AreaChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="년도" />
        <YAxis />
        <Tooltip />
        
        <Area type='number' dataKey="발생 및 처리(총계)" fill='rgb(49, 130, 189)' stroke='rgb(17, 17, 234)' />
        
       
        
      </AreaChart>
    </ResponsiveContainer>
    <ResponsiveContainer width="100%" aspect={4}>
      <AreaChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="년도" />
        <YAxis />
        <Tooltip />
        
        
        <Area type='monotone' dataKey="1인당 발생량(kg/일)" fill='rgb(49, 130, 189)' stroke='rgb(17, 17, 234)' />
       
        
      </AreaChart>
    </ResponsiveContainer>
    </>

    
    
  );
};
export default Waste;
