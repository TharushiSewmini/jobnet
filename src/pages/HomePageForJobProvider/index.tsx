import React from 'react';
import LeftSection from '../../components/JobProvider/index';
import RightSection from '../../components/JobProvider/rightsection'

const App = () => {
  return (
    <div className="min-h-screen bg-gwhite lg:w-full lg:h-full overflow-hidden flex flex-col lg:flex-row">
      <LeftSection />
      <RightSection />
    </div>
  );
};

export default App;

