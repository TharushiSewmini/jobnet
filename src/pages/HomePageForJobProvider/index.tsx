import React from 'react'
import LeftSection from '../../components/JobProvider/index'
import RightSection from '../../components/JobProvider/rightsection'
const HomePageForJobProvider : React.FC = () => {
  return (
    <div className='flex overflow-y-hidden flex-col   lg:flex-row justify-between items-start bg-white '>
      <LeftSection/>
      <RightSection />
    </div>
  )
}

export default HomePageForJobProvider