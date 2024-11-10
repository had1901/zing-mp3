import React from 'react'
import { Col, Divider, Row, Statistic  } from 'antd'



function Dashboard() {
  return (
    <div>
       <Row wrap gutter={[16, 16]}>
          <Col className="gutter-row" span={6}>
            <Statistic 
              valueStyle={{ fontStyle: 'bold' }}
              title="Active Users" 
              value={112893} 
              className='h-32 shadow-md rounded-md bg-primaryAdmin p-4'
            />
          </Col>
          <Col className="gutter-row" span={6}>
            <Statistic 
              title="Active Users" 
              value={112893} 
              className='h-32 shadow-md rounded-md bg-primaryAdmin p-4'
            />
          </Col>
          <Col className="gutter-row" span={6}>
            <Statistic 
              title="Active Users" 
              value={112893} 
              className='h-32 shadow-md rounded-md bg-primaryAdmin p-4'
            />
          </Col>
          <Col className="gutter-row" span={6}>
            <Statistic 
              title="Active Users" 
              value={112893} 
              className='h-32 shadow-md rounded-md bg-primaryAdmin p-4'
        
              />
          </Col>

          <Col className="gutter-row" span={16}>
            <div className='h-56 shadow-md rounded-md bg-primaryAdmin '>col-6</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className='h-56 shadow-md rounded-md bg-primaryAdmin '>col-6</div>
          </Col>
          <Col className="gutter-row" span={16}>
            <div className='h-56 shadow-md rounded-md bg-primaryAdmin '>col-6</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className='h-56 shadow-md rounded-md bg-primaryAdmin '>col-6</div>
          </Col>
       </Row>
          
    </div>
  )
}

export default Dashboard